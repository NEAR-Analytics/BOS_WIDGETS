const skillsPattern = props.skillsPattern ?? "*/profile/skills/*";
const placeholder = props.placeholder ?? "Skills";
const initialSkillsObject = props.initialSkillsObject || {};

const skillsObject = Social.keys(skillsPattern, "final");

if (skillsObject === null) {
  return "Loading";
}

const normalizeSkill = (skill) =>
  skill
    .replaceAll(/[- \.]/g, "_")
    .replaceAll(/[^\w]+/g, "")
    .replaceAll(/_+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "")
    .toLowerCase()
    .trim("-");

const skillsCount = {};

const processSkillsObject = (obj) => {
  Object.entries(obj).forEach((kv) => {
    if (typeof kv[1] === "object") {
      processSkillsObject(kv[1]);
    } else {
      const skill = normalizeSkill(kv[0]);
      skillsCount[skill] = (skillsCount[skill] || 0) + 1;
    }
  });
};

const getSkills = () => {
  processSkillsObject(skillsObject);
  const skills = Object.entries(skillsCount);
  skills.sort((a, b) => b[1] - a[1]);
  return skills.map((t) => ({
    name: t[0],
    count: t[1],
  }));
};

if (!state.allSkills) {
  initState({
    allSkills: getSkills(),
    skills: Object.keys(initialSkillsObject).map((skill) => ({
      name: normalizeSkill(skill),
    })),
    originalSkills: Object.fromEntries(
      Object.keys(initialSkillsObject).map((skill) => [skill, null])
    ),
    id: `skills-selector-${Date.now()}`,
  });
}

const setSkills = (skills) => {
  skills = skills.map((o) => {
    o.name = normalizeSkill(o.name);
    return o;
  });
  State.update({ skills });
  if (props.setSkillsObject) {
    props.setSkillsObject(
      Object.assign(
        {},
        state.originalSkills,
        Object.fromEntries(skills.map((skill) => [skill.name, ""]))
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
      onChange={setSkills}
      options={state.allSkills}
      placeholder={placeholder}
      selected={state.skills}
      positionFixed
      allowNew
    />
    {props.debug && (
      <div>
        Debugging skills:
        <pre>{JSON.stringify(state.skills)}</pre>
      </div>
    )}
  </>
);
