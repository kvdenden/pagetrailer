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

ipcMain.on("fetchHistory", (event, key) => {
  documentStore
    .get(key)
    .then(({ document }) => document.history())
    .then(history => {
      event.sender.send("fetchHistory", history);
    });
});

ipcMain.on("storeDocument", (event, key, file, message) => {
  documentStore
    .get(key)
    .then(({ document }) => document.store(file, message))
    .then(version => {
      event.sender.send("storeDocument", version);
    });
});
