const regenText = props.regenText;

State.init({
  regenText:
    "Regeneration (shortly 'regen') in our context means the restoration and responsible utilization and management of environmental systems.",
});

return (
  <>
    <h1>{props.regenTitle}</h1>

    <div>{state.regenText}</div>

    <input
      type="text"
      onChange={(e) => State.update({ regenText: e.target.value })}
    />
  </>
);
