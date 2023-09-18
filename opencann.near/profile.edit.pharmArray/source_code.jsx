const pharmPattern = props.pharmPattern ?? "*/profile/pharm/*";
const placeholder = props.placeholder ?? "Pharm";
const initialPharmObject = props.initialPharmObject || {};

const pharmObject = Social.keys(pharmPattern, "final");

if (pharmObject === null) {
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

const pharmCount = {};

const processPharmObject = (obj) => {
  Object.entries(obj).forEach((kv) => {
    if (typeof kv[1] === "object") {
      processPharmObject(kv[1]);
    } else {
      const prof = normalizeProf(kv[0]);
      pharmCount[prof] = (pharmCount[prof] || 0) + 1;
    }
  });
};

const getPharm = () => {
  processPharmObject(pharmObject);
  const pharm = Object.entries(pharmCount);
  pharm.sort((a, b) => b[1] - a[1]);
  return pharm.map((t) => ({
    name: t[0],
    count: t[1],
  }));
};

if (!state.allPharm) {
  initState({
    allPharm: getPharm(),
    pharm: Object.keys(initialPharmObject).map((prof) => ({
      name: normalizeProf(prof),
    })),
    originalPharm: Object.fromEntries(
      Object.keys(initialPharmObject).map((prof) => [prof, null])
    ),
    id: `pharm-selector-${Date.now()}`,
  });
}

const setPharm = (pharm) => {
  pharm = pharm.map((o) => {
    o.name = normalizeProf(o.name);
    return o;
  });
  State.update({ pharm });
  if (props.setPharmObject) {
    props.setPharmObject(
      Object.assign(
        {},
        state.originalPharm,
        Object.fromEntries(pharm.map((prof) => [prof.name, ""]))
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
      onChange={setPharm}
      options={state.allPharm}
      placeholder={placeholder}
      selected={state.pharm}
      positionFixed
      allowNew
    />
    {props.debug && (
      <div>
        Debugging pharm:
        <pre>{JSON.stringify(state.pharm)}</pre>
      </div>
    )}
  </>
);
