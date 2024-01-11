let TYPES = {};
const TYPE_LIBRARY = "@";
const TYPE_IMAGE = "img:";
const TYPE_JSON = "json:";
const TYPE_URL = "url:";
TYPES[TYPE_LIBRARY] = "libs";
TYPES[TYPE_IMAGE] = "images";
TYPES[TYPE_JSON] = "data";
TYPES[TYPE_URL] = "links";

const loaders = {
  string: (account, dependency) => {
    let result = {};
    result[dependency.split(".").pop()] = VM.require(
      `${account}/widget/${dependency}`
    );
    return result;
  },
  object: (account, dependencies) => {
    let result = {};

    if (Array.isArray(dependencies)) {
      dependencies.map(
        (dependency) =>
          (result[dependency.split(".").pop()] = VM.require(
            `${account}/widget/${dependency}`
          ))
      );
    } else {
      Object.keys(dependencies).map((containerName) =>
        dependencies[containerName].map(
          (dependency) =>
            (result[dependency.split(".").pop()] = VM.require(
              `${account}/widget/${dependency}`
            ))
        )
      );
    }

    return result;
  },
  void: () => {},
};

const getType = (type) => (type in TYPES ? TYPES[type] : null);
const getScope = (namespace) =>
  namespace[0] in TYPES
    ? namespace[0]
    : namespace.substring(0, namespace.indexOf(":") + 1) in TYPES
    ? namespace.substring(0, namespace.indexOf(":") + 1)
    : null;
const getAccount = (scope, namespace) =>
  `${namespace.substring(scope.length, namespace.indexOf("/"))}.near`;
const getPath = (namespace) =>
  namespace.substring(namespace.indexOf("/") + 1, namespace.length);
const parseRequest = (namespace) => [
  getAccount(getScope(namespace), namespace),
  getType(getScope(namespace)),
  getPath(namespace),
];
const getManifest = (account) => VM.require(`${account}/widget/Manifest`);
const getResource = (manifest, resourceType) => resourceType in manifest ? manifest[resourceType] : {};
const getDependencies = (resource, path) => path.split("/").reduce((path, nextPath) => (path || {})[nextPath], resource);
const loadDependencies = (account, dependencies) =>
  loaders[typeof dependencies !== "undefined" ? typeof dependencies : "void"](
    account,
    dependencies
  );
const load = (account, resourceType, path) =>
  loadDependencies(
    account,
    getDependencies(
        getResource(
            getManifest(account) || {},
            resourceType
        ), 
        path
    )
  );

return (namespace) => load(...parseRequest(namespace));
