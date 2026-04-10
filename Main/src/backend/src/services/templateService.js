import fs from "fs";
import path from "path";

export const generateSiteFromTemplate = (templateType, data) => {
  const templatePath = path.resolve(
    `src/templates/${templateType}/index.html`
  );

  let template = fs.readFileSync(templatePath, "utf-8");

  Object.keys(data).forEach((key) => {
    template = template.replaceAll(`{{${key}}}`, data[key] || "");
  });

  return template;
};