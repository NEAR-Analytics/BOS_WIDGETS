import { REPL_DEVHUB } from "@/includes/common";
const availableOptions = props.availableOptions;
const options =
  (availableOptions ?? []).map((i) => {
    return { label: i.title, value: i.value };
  }) ?? [];
options.push({ label: "None", value: null });
const setSelected = props.onStateChange ?? (() => {});

return (
  <div>
    <Widget
      src={`${REPL_DEVHUB}/widget/devhub.components.molecule.DropDown`}
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
