const professionPattern = props.professionPattern ?? "*/profile/profession/*";
const placeholder = props.placeholder ?? "Profession";
const initialProfessionObject = props.initialProfessionObject || {};

const professionObject = Social.keys(professionPattern, "final");

if (professionObject === null) {
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

const professionCount = {};

const processProfessionObject = (obj) => {
  Object.entries(obj).forEach((kv) => {
    if (typeof kv[1] === "object") {
      processProfessionObject(kv[1]);
    } else {
      const prof = normalizeProf(kv[0]);
      professionCount[prof] = (professionCount[prof] || 0) + 1;
    }
  });
};

const getProfession = () => {
  processProfessionObject(professionObject);
  const profession = Object.entries(professionCount);
  profession.sort((a, b) => b[1] - a[1]);
  return profession.map((t) => ({
    name: t[0],
    count: t[1],
  }));
};

if (!state.allProfession) {
  initState({
    allProfession: getProfession(),
    profession: Object.keys(initialProfessionObject).map((prof) => ({
      name: normalizeProf(prof),
    })),
    originalProfession: Object.fromEntries(
      Object.keys(initialProfessionObject).map((prof) => [prof, null])
    ),
    id: `profession-selector-${Date.now()}`,
  });
}

const setProfession = (profession) => {
  profession = profession.map((o) => {
    o.name = normalizeProf(o.name);
    return o;
  });
  State.update({ profession });
  if (props.setProfessionObject) {
    props.setProfessionObject(
      Object.assign(
        {},
        state.originalProfession,
        Object.fromEntries(profession.map((prof) => [prof.name, ""]))
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
      onChange={setProfession}
      options={state.allProfession}
      placeholder={placeholder}
      selected={state.profession}
      positionFixed
      allowNew
    />
    {props.debug && (
      <div>
        Debugging profession:
        <pre>{JSON.stringify(state.profession)}</pre>
      </div>
    )}
  </>
);
