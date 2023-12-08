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

const { handleCreateProject, defaultProject, buttonChildren, buttonProps } =
  props;

State.init({
  error: undefined,
  project: defaultProject ?? {
    id: UUID.generate(),
    logo: undefined,
    title: undefined,
    description: undefined,
    tags: undefined,
  },
});

const wsize = "100px";
const hsize = "100px";

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

handleCreateProject = () => {
  // First task
  const responseOne = Near.call(
    "mint.sharddog.near",
    "create_series",
    {
      series_id: state.project.seriesid,
      metadata: {
        title: state.project.title,
        description: state.project.description,
        media: state.project.logo,
        extra: "",
        reference: "",
        reference_hash: "",
      },
    },
    300,
    1
  );

  // Second task
  const responseTwo = Near.call("v1.devsnoopy.near", "add_event", {
    event: {
      event_id: state.project.seriesid,
      event_name: state.project.title,
      entity_name: "Snoopy Events",
      creator_wallet: "testuser.near",
      event_created_at: 1633036800,
      event_txn_receipt_id: "",
      launch_date_start: 1633123200,
      end_date: 1635724800,
      location: "Online",
      event_type: "webinar",
      campaign_type: "developer onboarding",
      event_description: state.project.description,
      event_image: state.project.logo,
    },
  });

  // Return combined or relevant response
  return { responseOne, responseTwo };
};

const IT = "nearui.near/widget/Input.ExperimentalText";
const SI = "nearui.near/widget/Social.ImageUpload";
const IB = "nearui.near/widget/Input.Button";
return (
  <div
    className="p-4 bg-white rounded-4"
    style={{
      fontFamily: "'Open Sans', sans-serif",
      maxWidth: "500px",
      margin: "auto",
      background:
        "url('https://my.shard.dog/assets/img/dog_pattern.png'), rgba(251, 249, 245)",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    }}
  >
    <div className="d-flex flex-column gap-3" style={{ margin: "20px 0" }}>
      <h3 style={{ textAlign: "center", color: "#333" }}>
        {buttonChildren || "Create Event"}
      </h3>
      <Widget
        src={IT}
        props={{
          label: "Event ID",
          placeholder: "Event Number",
          inputProps: {
            defaultValue: state.project.seriesid,
          },
          onChange: (v) => updateP("seriesid", v),
        }}
        style={{
          width: "100%",
          padding: "10px",
          margin: "10px 0",
          borderRadius: "4px",
          border: "1px solid #ddd",
          boxShadow: "inset 0 2px 4px rgba(0,0,0,0.06)",
        }}
      />
      <Widget
        src={IT}
        props={{
          label: "Title",
          placeholder: "My project",
          inputProps: {
            defaultValue: state.project.title,
          },
          onChange: (v) => updateP("title", v),
        }}
        style={{
          width: "100%",
          padding: "10px",
          margin: "10px 0",
          borderRadius: "4px",
          border: "1px solid #ddd",
          boxShadow: "inset 0 2px 4px rgba(0,0,0,0.06)",
        }}
      />
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
        style={{
          width: "100%",
          padding: "10px",
          margin: "10px 0",
          borderRadius: "4px",
          border: "1px solid #ddd",
          boxShadow: "inset 0 2px 4px rgba(0,0,0,0.06)",
        }}
      />
      <Widget
        src={IT}
        props={{
          label: "Metadata (Entity or Collection Name)",
          placeholder: "Additional metadata",
          onChange: (v) => updateP("tags", v),
        }}
        style={{
          width: "100%",
          padding: "10px",
          margin: "10px 0",
          borderRadius: "4px",
          border: "1px solid #ddd",
          boxShadow: "inset 0 2px 4px rgba(0,0,0,0.06)",
        }}
      />
      <h6 className="mb-0">Image</h6>
      {state.project.logo && (
        <img src={state.project.logo} alt="" height={100} width={100} />
      )}
      <Widget
        src={SI}
        props={{
          onChange: (v) => updateP("logo", v),
          value: state.project.logo,
        }}
        style={{
          width: "100%",
          padding: "15px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        }}
      />
      <div className="text-danger mt-2">{state.error}</div>
      <Widget
        src={IB}
        props={{
          children: buttonChildren ?? "Create Event",
          variant: "success",
          onClick: () => beforeHandleCreateProject(),
        }}
        style={{
          width: "100%",
          padding: "15px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        }}
      />
    </div>
    <p>Powered by</p>
    <Widget
      src="sharddog.near/widget/Image"
      title={nft.owner_id}
      props={{
        image: {
          url: "https://nftstorage.link/ipfs/bafkreif7m4ey7b5ux2ffvhebxy65jntx5mjrlgr2l4vyrcvjj33sn7ojmq",
        },
        style: {
          width: wsize,
          height: hsize,
          objectFit: "cover",
          minWidth: wsize,
          minHeight: hsize,
          maxWidth: wsize,
          maxHeight: hsize,
        },
      }}
    />
  </div>
);
