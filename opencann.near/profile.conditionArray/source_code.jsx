const conditionPattern = props.conditionPattern ?? "*/profile/condition/*";
const placeholder = props.placeholder ?? "Condition";
const initialConditionObject = props.initialConditionObject || {};

const conditionObject = Social.keys(conditionPattern, "final");

const conditionArray = [
  { name: "Depression" },
  { name: "Anxiety" },
  { name: "Chronic Pain" },
  { name: "ADD/ADHD" },
  { name: "Boredom" },
];

if (conditionObject === null) {
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

const conditionCount = {};

const processConditionObject = (obj) => {
  Object.entries(obj).forEach((kv) => {
    if (typeof kv[1] === "object") {
      processConditionObject(kv[1]);
    } else {
      const prof = normalizeProf(kv[0]);
      conditionCount[prof] = (conditionCount[prof] || 0) + 1;
    }
  });
};

const getCondition = () => {
  processConditionObject(conditionObject);
  const condition = Object.entries(conditionCount);
  condition.sort((a, b) => b[1] - a[1]);
  return condition.map((t) => ({
    name: t[0],
    count: t[1],
  }));
};

if (!state.allCondition) {
  initState({
    allCondition: getCondition(),
    condition: Object.keys(initialConditionObject).map((prof) => ({
      name: normalizeProf(prof),
    })),
    originalCondition: Object.fromEntries(
      Object.keys(initialConditionObject).map((prof) => [prof, null])
    ),
    id: `condition-selector-${Date.now()}`,
  });
}

const setCondition = (condition) => {
  condition = condition.map((o) => {
    o.name = normalizeProf(o.name);
    return o;
  });
  State.update({ condition });
  if (props.setConditionObject) {
    props.setConditionObject(
      Object.assign(
        {},
        state.originalCondition,
        Object.fromEntries(condition.map((prof) => [prof.name, ""]))
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
      onChange={setCondition}
      options={state.allCondition}
      placeholder={placeholder}
      selected={state.condition}
      positionFixed
      allowNew
    />
    {props.debug && (
      <div>
        Debugging condition:
        <pre>{JSON.stringify(state.condition)}</pre>
      </div>
    )}
  </>
);
