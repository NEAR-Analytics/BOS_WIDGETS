const availableOptions = props.availableOptions;
const options =
  (availableOptions ?? []).map((i) => {
    return { label: i.title, value: i.value };
  }) ?? [];
options.unshift({ label: "All", value: null });
const setSelected = props.onStateChange ?? (() => {});
return (
  <div>
    <Widget
      src={`devhub.near/widget/devhub.components.molecule.DropDown`}
      props={{
        options: options,
        label: "Category",
        onUpdate: (v) => {
          setSelected(v);
        },
      }}
    />
  </div>
);
