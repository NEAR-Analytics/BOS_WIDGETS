const { defaultProject, buttonChildren, buttonProps } = props;
const contractId = "refoundjournalism.near";
State.init({
  error: undefined,
  lastSeries: null,
  lastSeriesIsFetched: false,
  project: defaultProject ?? {
    logo: undefined,
    title: undefined,
    description: undefined,
    tags: [],
  },
});

const update = (k, v) => State.update({ [k]: v });
const updateP = (k, v) => update("project", { ...state.project, [k]: v });

if (!state.lastSeriesIsFetched) {
  Near.asyncView(contractId, "get_series").then((seriess) => State.update({lastSeries: seriess.length, lastSeriesIsFetched: true}))
}

const handleCreateProject = (project) => {
  Near.call(contractId, "create_series", {
    series_id: state.lastSeries.toString(),
    metadata: {
      title: project.title,
      description: project.description,
      media: project.image,
      extra: JSON.stringify({
        locationTaken: project.location,
        dateTaken: project.dateTaken,
      }),
    },
  });
};

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
const SI = "nearui.near/widget/Social.ImageUpload";
const IB = "nearui.near/widget/Input.Button";
return (
  <div className="p-4 bg-white rounded-4 row">
    <div className="d-flex flex-column gap-3 col">
      <h3>{buttonChildren}</h3>
      <h6 className="mb-0">Images(Up To 5)</h6>
      {state.project.image && (
        <img src={state.project.image} alt="" height={100} width={100} />
      )}
      <Widget
        src={SI}
        props={{
          onChange: (v) => updateP("image", v),
          value: state.project.image,
        }}
      />

      <Widget
        src={IT}
        props={{
          label: "Title",
          placeholder: "My post",
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
          label: "Tags",
          placeholder: "Separate with commas",
          inputProps: {
            defaultValue: state.project.tags.join(", "),
          },
          onChange: (v) =>
            updateP(
              "tags",
              (v || "")
                .split(",")
                .filter((v) => v !== "")
                .map((v) => v.trim())
            ),
        }}
      />

      <Widget
        src={IT}
        props={{
          label: "Pricing",
          placeholder: "",
          inputProps: {
            defaultValue: state.project.pricing,
          },
          onChange: (v) => updateP("pricing", v),
        }}
      />
    </div>
    <div className="d-flex flex-column gap-2 col">
      <br></br>
      <button>Take a Photo</button>
      <Widget
        src={IT}
        props={{
          label: "Description",
          placeholder: "Describe your post",
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
          label: "Date Taken",
          placeholder: "",
          inputProps: {
            defaultValue: state.project.dateTaken,
          },
          onChange: (v) => updateP("dateTaken", v),
        }}
      />
      <div className="row">
        <div className="col">
          <Widget
            src={IB}
            props={{
              children: buttonChildren ?? "Cancel",
              variant: "alert",
              onClick: () => beforeHandleCreateProject(),
            }}
          />
        </div>
        <div className="col">
          <Widget
            src={IB}
            props={{
              children: buttonChildren ?? "Create Project",
              variant: "success",
              onClick: () => beforeHandleCreateProject(),
            }}
          /> 
          // <Link href="https://near.org/refoundonbos.near/widget/create.post.success">
          //   <button>Create Post</button>
          // </Link>
        </div>
      </div>
    </div>
  </div>
);
