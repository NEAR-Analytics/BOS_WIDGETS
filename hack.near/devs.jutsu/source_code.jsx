const widgets = Social.get(`*/widget/*/metadata/platform`, "final");

if (!widgets) {
  return "";
}

const builders = Object.keys(widgets);

return (
  <>
    <h3>
      <a href="https://jutsu.ai">Jutsu.ai</a>
    </h3>
    <h5>{builders.length} builders</h5>
    {builders.map((builder, index) => (
      <div className="m-1" key={index}>
        <Widget
          src="mob.near/widget/N.ProfileLine"
          props={{ accountId: builder }}
        />
      </div>
    ))}
  </>
);
