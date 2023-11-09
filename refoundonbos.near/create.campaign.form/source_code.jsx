const { handleCreateProject, defaultProject, buttonChildren, buttonProps } =
  props;

State.init({
  error: undefined,
  project: defaultProject ?? {
    logo: undefined,
    title: undefined,
    description: undefined,
    tags: [],
  },
});

const update = (k, v) => State.update({ [k]: v });
const updateP = (k, v) => update("project", { ...state.project, [k]: v });

const beforeHandleCreateProject = () => {
  update("error", undefined);
  if (!state.project.title) {
    update("error", "Title is required");
  }
  if (!state.error) {
    handleCreateProject(state.project);
  }
};

const IT = "nearui.near/widget/Input.ExperimentalText";
const IS = "nearui.near/widget/Input.Select";
const SI = "nearui.near/widget/Social.ImageUpload";
const IB = "nearui.near/widget/Input.Button";
return (
  <div className="p-4 bg-white rounded-4 row">
    <div className="d-flex flex-column gap-3 col">
      <h3>{buttonChildren}</h3>
      <Widget
        src={IS}
        props={{
          label: "I want to",
          inputProps: {
            defaultValue: state.project.category,
          },
          onChange: (v) => updateP("category", v),
        }}
      />
      <Widget
        src={IT}
        props={{
          label: "Campaign Title",
          placeholder: "My project",
          inputProps: {
            defaultValue: state.project.title,
          },
          onChange: (v) => updateP("title", v),
        }}
      />

      <Widget
        src={IT}
        props={{
          label: "Location",
          placeholder: "",
          inputProps: {
            defaultValue: state.project.location,
          },
          onChange: (v) => updateP("location", v),
        }}
      />
      <Widget
        src={IT}
        props={{
          label: "Start Date",
          placeholder: "",
          inputProps: {
            defaultValue: state.project.startDate,
          },
          onChange: (v) => updateP("startDate", v),
        }}
      />

      <Widget
        src={IT}
        props={{
          label: "Goal",
          placeholder: "",
          inputProps: {
            defaultValue: state.project.goal,
          },
          onChange: (v) => updateP("goal", v),
        }}
      />
    </div>
    <div className="d-flex flex-column gap-3 col">
      <br></br>
      <Widget
        src={IT}
        props={{
          label: "Description",
          placeholder: "Describe your project",
          textarea: true,
          inputProps: {
            defaultValue: state.project.description,
          },
          onChange: (v) => updateP("description", v),
        }}
      />

      <Widget
        src={IT}
        props={{
          label: "End Date",
          placeholder: "",
          inputProps: {
            defaultValue: state.project.endDate,
          },
          onChange: (v) => updateP("endDate", v),
        }}
      />
    </div>
    <h6 className="mb-0">Images(Up To 5)</h6>
    {state.project.logo && (
      <img src={state.project.logo} alt="" height={100} width={100} />
    )}
    <Widget
      src={SI}
      props={{
        onChange: (v) => updateP("logo", v),
        value: state.project.logo,
      }}
    />
    <div className="text-danger mt-2">{state.error}</div>
    <Widget
      src={IB}
      props={{
        children: buttonChildren ?? "Cancel",
        variant: "alert",
        onClick: () => beforeHandleCreateProject(),
      }}
    />
    {/* <Widget
      src={IB}
      props={{
        children: buttonChildren ?? "Create Project",
        variant: "success",
        onClick: () => beforeHandleCreateProject(),
      }}
    /> */}

    <Link href="https://near.org/refoundonbos.near/widget/create.post.success"><button>Create Project</button></Link>
  </div>
);
