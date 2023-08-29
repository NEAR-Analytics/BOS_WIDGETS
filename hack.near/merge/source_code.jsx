const src = props.src;
const update = props.update;

const source = Social.get(`${src}`);
const newVersion = Social.get(`${update}`);

if (!src || !newVersion) {
  return "";
}

const [creatorId, type, name] = src.split("/");

const handleMerge = () =>
  Social.set({
    [`${type}`]: {
      [`${name}`]: {
        "": `${newVersion}`,
      },
    },
  });
