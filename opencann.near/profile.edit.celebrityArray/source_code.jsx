const celebrityPattern = props.celebrityPattern ?? "*/profile/celebrity/*";
const placeholder = props.placeholder ?? "Celebrity";
const initialCelebrityObject = props.initialCelebrityObject || {};

const celebrityObject = Social.keys(celebrityPattern, "final");

if (celebrityObject === null) {
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

const celebrityCount = {};

const processCelebrityObject = (obj) => {
  Object.entries(obj).forEach((kv) => {
    if (typeof kv[1] === "object") {
      processCelebrityObject(kv[1]);
    } else {
      const prof = normalizeProf(kv[0]);
      celebrityCount[prof] = (celebrityCount[prof] || 0) + 1;
    }
  });
};

const getCelebrity = () => {
  processCelebrityObject(celebrityObject);
  const celebrity = Object.entries(celebrityCount);
  celebrity.sort((a, b) => b[1] - a[1]);
  return celebrity.map((t) => ({
    name: t[0],
    count: t[1],
  }));
};

if (!state.allCelebrity) {
  initState({
    allCelebrity: getCelebrity(),
    celebrity: Object.keys(initialCelebrityObject).map((prof) => ({
      name: normalizeProf(prof),
    })),
    originalCelebrity: Object.fromEntries(
      Object.keys(initialCelebrityObject).map((prof) => [prof, null])
    ),
    id: `celebrity-selector-${Date.now()}`,
  });
}

const setCelebrity = (celebrity) => {
  celebrity = celebrity.map((o) => {
    o.name = normalizeProf(o.name);
    return o;
  });
  State.update({ celebrity });
  if (props.setCelebrityObject) {
    props.setCelebrityObject(
      Object.assign(
        {},
        state.originalCelebrity,
        Object.fromEntries(celebrity.map((prof) => [prof.name, ""]))
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
      onChange={setCelebrity}
      options={state.allCelebrity}
      placeholder={placeholder}
      selected={state.celebrity}
      positionFixed
      allowNew
    />
    {props.debug && (
      <div>
        Debugging celebrity:
        <pre>{JSON.stringify(state.celebrity)}</pre>
      </div>
    )}
  </>
);
