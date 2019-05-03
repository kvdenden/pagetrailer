const { ipcMain } = require("electron");

const documentStore = require("./documentStore");

ipcMain.on("fetchDocuments", event => {
  const documents = documentStore.list();
  event.sender.send("fetchDocuments", Object.values(documents));
});

ipcMain.on("createDocument", (event, { title, description }) => {
  documentStore.create(title, description).then(({ key }) => {
    event.sender.send("createDocument", { key, title, description });
  });
});

ipcMain.on("deleteDocument", (event, key) => {
  documentStore.delete(key).then(() => {
    event.sender.send("deleteDocument", key);
  });
});
