if (props.now) {
  return "now";
}

const keyPath = props.keyPath;
let blockHeight = props.blockHeight ? parseInt(props.blockHeight) : undefined;
console.log({ blockHeight });

if (blockHeight === undefined && keyPath) {
  blockHeight = Social.keys(keyPath, undefined, {
    return_type: "BlockHeight",
  });
  if (blockHeight === null) {
    return "Loading";
  }
  keyPath.split("/").forEach((key) => {
    blockHeight = blockHeight[key];
  });
}

return <>hey kucklehead</>;
