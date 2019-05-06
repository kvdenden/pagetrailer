const { dialog } = require("electron");
const fs = require("fs-extra");

module.exports = (fileBuffer, title) => {
  let filePath = dialog.showSaveDialog(null, {
    defaultPath: `${title}.docx`
  });
  if (filePath) {
    fs.writeFileSync(filePath, fileBuffer);
  }
  return filePath;
};
