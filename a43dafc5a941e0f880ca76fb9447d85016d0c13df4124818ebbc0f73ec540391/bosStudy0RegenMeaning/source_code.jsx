props = {
  regenText:
    "Regeneration (shortly 'regen') in our context means the restoration and responsible utilization and management of environmental systems.",
};

const regenText = props.regenText;

State.init({ regenTitle: "Regeneration" });

return (
  <>
    <h1>{state.regenTitle}</h1>

    <div>{regenText}</div>

    <input
      type="text"
      onChange={(e) => State.update({ regenTitle: e.target.value })}
    />
  </>
);
