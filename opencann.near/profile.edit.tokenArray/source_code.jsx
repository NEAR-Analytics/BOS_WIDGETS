const tokenPattern = props.tokenPattern ?? "*/profile/token/*";
const placeholder = props.placeholder ?? "Token";
const initialTokenObject = props.initialTokenObject || {};

const tokenObject = Social.keys(tokenPattern, "final");

if (tokenObject === null) {
  return "Loading";
}

const normalizeProf = (prof) =>
  prof
    .replaceAll(/[- \.]/g, "_")
    .replaceAll(/[^\w]+/g, "")
    .replaceAll(/_+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "")
    .toLowerCase()
    .trim("-");

const tokenCount = {};

const processTokenObject = (obj) => {
  Object.entries(obj).forEach((kv) => {
    if (typeof kv[1] === "object") {
      processTokenObject(kv[1]);
    } else {
      const prof = normalizeProf(kv[0]);
      tokenCount[prof] = (tokenCount[prof] || 0) + 1;
    }
  });
};

const getToken = () => {
  processTokenObject(tokenObject);
  const token = Object.entries(tokenCount);
  token.sort((a, b) => b[1] - a[1]);
  return token.map((t) => ({
    name: t[0],
    count: t[1],
  }));
};

if (!state.allToken) {
  initState({
    allToken: getToken(),
    token: Object.keys(initialTokenObject).map((prof) => ({
      name: normalizeProf(prof),
    })),
    originalToken: Object.fromEntries(
      Object.keys(initialTokenObject).map((prof) => [prof, null])
    ),
    id: `token-selector-${Date.now()}`,
  });
}

const setToken = (token) => {
  token = token.map((o) => {
    o.name = normalizeProf(o.name);
    return o;
  });
  State.update({ token });
  if (props.setTokenObject) {
    props.setTokenObject(
      Object.assign(
        {},
        state.originalToken,
        Object.fromEntries(token.map((prof) => [prof.name, ""]))
      )
    );
  }
};

return (
  <>
    <Typeahead
      id={state.id}
      multiple
      labelKey="name"
      onChange={setToken}
      options={state.allToken}
      placeholder={placeholder}
      selected={state.token}
      positionFixed
      allowNew
    />
    {props.debug && (
      <div>
        Debugging token:
        <pre>{JSON.stringify(state.token)}</pre>
      </div>
    )}
  </>
);
