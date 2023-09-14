const widget = (src, props, other) => (
  <Widget src={src} props={props} {...other} />
);

const UUID = {
  generate: (template) => {
    if (typeof template !== "string") {
      template = "xxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx";
    }
    return template.replace(/[xy]/g, (c) => {
      var r = (Math.random() * 16) | 0;
      var v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  },
};

const { handleCreateSubstance, defaultSubstance, buttonChildren, buttonProps } =
  props;

State.init({
  error: undefined,
  substance: defaultSubstance ?? {
    id: UUID.generate(),
    logo: undefined,
    title: undefined,
    description: undefined,
    tags: [],
  },
});

const update = (k, v) => State.update({ [k]: v });
const updateP = (k, v) => update("substance", { ...state.substance, [k]: v });

const beforeHandleCreateSubstance = () => {
  update("error", undefined);
  if (!state.substance.title) {
    update("error", "Name is required");
  }
  if (!state.error) {
    handleCreateSubstance(state.substance);
  }
};

const IT = "nearui.near/widget/Input.ExperimentalText";
const SI = "nearui.near/widget/Social.ImageUpload";
const IB = "nearui.near/widget/Input.Button";
return (
  <div className="p-4 bg-white rounded-4">
    <div className="d-flex flex-column gap-3">
      <h3>{buttonChildren || "Create Substance"}</h3>
      {widget(IT, {
        label: "Substance Name",
        placeholder: "New substance",
        inputProps: {
          defaultValue: state.substance.title,
        },
        onChange: (v) => updateP("title", v),
      })}
      {widget(IT, {
        label: "Description",
        placeholder: "Describe this substance",
        textarea: true,
        inputProps: {
          defaultValue: state.substance.description,
        },
        onChange: (v) => updateP("description", v),
      })}
      {widget(IT, {
        label: "Tags",
        placeholder: "Separate with commas",
        inputProps: {
          defaultValue: state.substance.tags.join(", "),
        },
        onChange: (v) =>
          updateP(
            "tags",
            (v || "")
              .split(",")
              .filter((v) => v !== "")
              .map((v) => v.trim())
          ),
      })}
      <h6 className="mb-0">Logo</h6>
      {state.substance.logo && (
        <img src={state.substance.logo} alt="" height={100} width={100} />
      )}
      {widget(SI, {
        onChange: (v) => updateP("logo", v),
        value: state.substance.logo,
      })}
      <div className="text-danger mt-2">{state.error}</div>
      {widget(IB, {
        children: buttonChildren ?? "Create Substance",
        variant: "success",
        onClick: () => beforeHandleCreateSubstance(),
      })}
    </div>
  </div>
);
