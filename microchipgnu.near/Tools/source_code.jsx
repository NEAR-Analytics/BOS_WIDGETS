return [
  {
    name: "storeSet",
    description: "Stores data",
    inputDescription: "takes data to store as input",
    callback: (data) => {
      Storage.set("storage-manager", data);
      return "Stored data in Local Storage";
    },
  },
  {
    name: "storeGet",
    description: "Retrieves data",
    callback: () => {
      const data = Storage.get("storage-manager");
      return "Data retrieved. Value: " + data;
    },
  },
];
