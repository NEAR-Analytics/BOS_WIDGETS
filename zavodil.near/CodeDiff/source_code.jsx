const widget1 = props.widget1 ?? "zavodil.near/widget/NearX";
const widget2 = props.widget2 ?? "linearprotocol.near/widget/LiNEAR";

if (state.code1 === undefined) {
  const code1 = Social.get(`${widget1}`, props.blockHeight1);
  if (code1 === undefined) return "Loading";
  State.update({ code1 });
}

if (state.code2 === undefined) {
  const code2 = Social.get(`${widget2}`, props.blockHeight2);
  if (code2 === undefined) return "Loading";
  State.update({ code2 });
}

if (!state.code1 || !state.code2) return "Loading";

return (
  <Widget
    src="bozon.near/widget/CodeDiff"
    props={{ currentCode: state.code1, prevCode: state.code2, ...props }}
  />
);
