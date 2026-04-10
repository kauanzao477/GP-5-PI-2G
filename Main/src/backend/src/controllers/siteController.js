import { improveTextWithAI } from "../services/aiService.js";
import { saveSiteData } from "../services/firebaseService.js";
import { generateSiteFromTemplate } from "../services/templateService.js";

export const createSite = async (req, res) => {
  try {
    const formData = req.body;

    const improvedData = await improveTextWithAI(formData);

    const siteId = await saveSiteData(improvedData);

    const html = generateSiteFromTemplate(
      formData.template,
      improvedData
    );

    return res.json({
      success: true,
      siteId,
      html,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Erro ao criar site",
    });
  }
};