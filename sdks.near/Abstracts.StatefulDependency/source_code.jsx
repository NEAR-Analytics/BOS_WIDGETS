return (Store, status) => {
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
    getLibrary: (library) => {
      return Repository.getRepository()[library] || {};
    },
    get: (library, key) => {
      return Repository.getLibrary(library)[key] || null;
    },
    set: (library, key, value) => {
      if (Repository.getLibrary(library)) {
        let newRepository = Repository.getRepository();
        newRepository[library][key] = value;

        Store.update({
          [Repository.name]: newRepository,
        });
      }
    },
    initDependency: (library, initState) => {
        let newRepository = Repository.getRepository();
        newRepository[library] = {
            ...initState
        };

        Store.update({
            [Repository.name]: newRepository
        });
    }
  };

  return Repository.init();
};