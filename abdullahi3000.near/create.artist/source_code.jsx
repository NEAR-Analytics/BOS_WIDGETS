const data = props.data || {};
const type = props.type || "";
const typeSrc = props.typeSrc || "every.near";
const buildEdges = props.buildEdges;
const template = props.template || "";
const thingId = props.thingId;
//const defaultView = props.defaultView || "CREATE_THING";

if (type !== "") {
  const parts = type.split("/");
  typeSrc = parts[0];
}

State.init({
  data,
  config: data,
  isModalOpen: false,
  typeSrc: "harmonic1.near",
  selectedType: "harmonic1.near/type/artist",
  view: defaultView,
  isPreview: false, //"TEMPLATE",
  template: "harmonic1.near/widget/artist",
  templateVal: template,
  thingId,
});

const handleOnChange = (value) => {
  State.update({ data: { ...state.data, ...value } });
};

const handleApply = () => {
  State.update({
    config: state.data,
    isPreview: !state.isPreview,
    //template: state.templateVal,
  });
  // set the props for the main content
};

const handleSave = () => {
  // create the thing
  State.update({ isModalOpen: false });
  const thingId = state.data.handle;
  //state.thingId || Math.random();
  let edges = [];
  if (buildEdges) {
    const newPath = `${context.accountId}/thing/${thingId}`;
    edges = buildEdges(newPath, state.selectedType);
  }

  const data = {
    thing: {
      artist: {
        [thingId]: JSON.stringify({
          data: state.config,
          template: {
            src: state.template,
          },
          type: state.selectedType,
        }),
      },
    },
    index: {
      thing: JSON.stringify({
        key: thingId,
        value: {
          type: state.selectedType,
        },
      }),
    },
  };
  if (edges.length) {
    data.index.edge = JSON.stringify(edges);
  }
  Social.set(data, {
    onCommit: () => {
      State.update({
        data: {},
        isModalOpen: false,
        config: undefined,
      });
    },
    onCancel: () => {
      State.update({
        isModalOpen: false,
      });
    },
  });
};

const handleTypeChange = (e) => {
  State.update({ selectedType: e.target.value, templateVal: "", data: {} });
};

const handleProfileSave = () => {
  State.update({
    config: state.data,
  });
  //check if handle is present
  // in future check if handle is unique
  if (!state.data.handle) {
    console.log("Needs handle.");
    //Alert does not work.
  } else {
    //State.update({ isModalOpen: true });
    handleSave();
  }
};

//  <MainContent>
//       <>
//         {(state.isPreview && (
//           <Widget src={state.template} props={{ data: state.config }} />
//         )) || <CenteredDiv>Click on Preview to see your profile.</CenteredDiv>}
//       </>
//     </MainContent>

return (
  <>
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 text-white">
      <div className="d-flex flex-column flex-lg-row w-100 p-3">
        <div
          className="bg-light text-dark p-3 d-flex flex-column gap-2"
          style={{
            minWidth: "100%",
            maxWidth: "100%",
            flexBasis: "400px",
            border: "1px solid",
            borderRadius: ".5rem",
          }}
        >
          {/* Form Container */}
          {state.isPreview ? (
            <Widget src={state.template} props={{ data: state.config }} />
          ) : (
            <Widget
              src="abdullahi3000.near/widget/create"
              props={{
                item: {
                  type: state.selectedType,
                  value: state.data,
                },
                onChange: handleOnChange,
              }}
            />
          )}

          {/* Footer Buttons */}
          <div className="d-flex flex-row gap-2 align-self-start w-100">
            <button
              className="btn btn-primary w-100"
              onClick={() => handleProfileSave()}
              disabled={state.config === undefined}
            >
              Save
            </button>
            <button
              className="btn btn-outline-primary w-100"
              onClick={() => handleApply()}
            >
              {state.isPreview ? "Edit" : "Preview"}
            </button>
          </div>
        </div>

        {/* Modal Overlay */}
        {state.isModalOpen && (
          <div
            className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
            style={{ backgroundColor: "rgba(0,0,0,.5)", zIndex: 100 }}
          >
            <div className="bg-white p-3 rounded" style={{ minWidth: "500px" }}>
              <h3>Create Profile</h3>
              <Widget
                src="efiz.near/widget/Every.Raw.View"
                props={{
                  value: {
                    data: state.config,
                    template: { src: state.template },
                  },
                }}
              />
              <button className="btn btn-primary me-2" onClick={handleSave}>
                Save
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => State.update({ isModalOpen: false })}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  </>
);
