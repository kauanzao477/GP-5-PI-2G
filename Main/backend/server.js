import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import Groq from 'groq-sdk'
import admin from 'firebase-admin'
import fs from 'fs'

dotenv.config()

const serviceAccount = JSON.parse(fs.readFileSync('./serviceAccountKey.json', 'utf-8'))
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore()

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

const app = express()

app.use(cors())
app.use(express.json())

app.post('/api/generate-site', async (req, res) => {
    try {
        const { formData } = req.body

        if (!formData || !formData.subdomain) {
            return res.status(400).json({ error: "Dados do formulário e subdomínio são obrigatórios" })
        }

        const prompt = `Você é um copywriter profissional e web designer.
                        Abaixo estão os dados preenchidos por um usuário para criar um site.
                        Sua tarefa é melhorar os textos (como biografia, história, descrições de serviços) para torná-los altamente profissionais.
                        Corrija erros gramaticais e deixe o tom adequado para o template escolhido (${formData.template}).
                        Retorne APENAS um JSON válido contendo os mesmos campos de texto originais, mas com os valores melhorados. Não mude a estrutura dos dados, apenas o conteúdo dos textos.
                        Dados originais: ${JSON.stringify(formData)}`

        const chatCompletion = await groq.chat.completions.create({
            messages: [{ role: "system", content: prompt }],
            model: "llama-3.3-70b-versatile",
            temperature: 0.7,
            response_format: { type: "json_object" }
        })

        const enhancedTexts = JSON.parse(chatCompletion.choices[0].message.content);

        const finalSiteData = {
            ...formData,
            ...enhancedTexts,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        }

        await db.collection('sites').doc(formData.subdomain).set(finalSiteData);

        res.status(200).json({ 
            success: true, 
            message: "Site gerado e salvo com sucesso.",
            subdomain: formData.subdomain 
        });

    } catch (error) {
        console.error("Erro na geração do site:", error);
        res.status(500).json({ error: "Erro interno no servidor ao gerar o site." });
    }
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});