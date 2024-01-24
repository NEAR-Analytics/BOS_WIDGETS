return (Store, status, dependencyName) => {
  let Repository = {
    name: "Libraries",
    init: () => {
      if (typeof status === "undefined") {
        Store.init({ [Repository.name]: {} });
      } else if (!status.Libraries) {
        Store.update({ [Repository.name]: {} });
      }

      return Repository;
    },
    getRepository: () => {
      return status[Repository.name] || {};
    },
    getDependency: () => {
      return Repository.getRepository()[dependencyName] || {};
    },
    get: (key) => {
      return Repository.getDependency()[key] || null;
    },
    set: (key, value) => {
      if (Repository.getDependency()) {
        let newRepository = Repository.getRepository();
        newRepository[dependencyName][key] = value;

        Store.update({
          [Repository.name]: newRepository,
        });
      }
    },
    initDependency: (initState) => {
      let newRepository = Repository.getRepository();
      newRepository[dependencyName] = {
        ...initState,
      };

      Store.update({
        [Repository.name]: newRepository,
      });
    },
  };

  return Repository.init();
};
