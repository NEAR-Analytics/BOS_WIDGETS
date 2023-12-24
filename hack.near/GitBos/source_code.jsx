const accountId = props.accountId ?? context.accountId;
const daoId = props.daoId ?? "build.sputnik-dao.near";

const policy = Near.view(daoId, "get_policy");

const deposit = policy.proposal_bond;

const initWidgetPath =
  props.widgetPath ?? "build.sputnik-dao.near/widget/community";

State.init({
  accountId: accountId ?? "",
  widgetPath: initWidgetPath ?? "",
  updatedWidget: props.updatedWidget ?? "",
});

const [ownerId, oldWidget, widgetName] = state.widgetPath.split("/");

const newCode = Social.get(`${state.updatedWidget}`);

const oldCode = Social.get(`${state.widgetPath}`);

const widget_args = JSON.stringify({
  data: {
    [daoId]: {
      widget: {
        [`${widgetName}`]: {
          "": `${newCode}`,
        },
      },
    },
  },
});

const proposal_args = Buffer.from(widget_args, "utf-8").toString("base64");

const handleProposal = () => {
  Near.call([
    {
      contractName: daoId,
      methodName: "add_proposal",
      args: {
        proposal: {
          description: "update widget",
          kind: {
            FunctionCall: {
              receiver_id: "social.near",
              actions: [
                {
                  method_name: "set",
                  args: proposal_args,
                  deposit: "50000000000000000000000",
                  gas: "30000000000000",
                },
              ],
            },
          },
        },
      },
      deposit: deposit,
      gas: "219000000000000",
    },
  ]);
};

const handleCreate = () =>
  Social.set({
    widget: {
      [`${widgetName}`]: {
        "": `${oldCode}`,
      },
    },
  });

let CodeWrapper = styled.div`
  & > pre > div {
    margin: 0px !important;
  }

  & > pre {
    margin: 0px !important;
    border-radius: 0px 0px 5px 5px;
  }
`;

return (
  <div className="d-flex flex-column">
    <div className="p-1 m-1">
      <h2>
        <b>Request Updates</b>
      </h2>
      <div>
        <Widget
          src="near/widget/AccountProfileCard"
          props={{ accountId: daoId }}
        />
      </div>
    </div>
    <div className="p-1 m-1">
      <div className="row">
        <div className="col m-2">
          <h5>Base Widget</h5>
          <div className="input-group mb-3">
            <input
              className="form-control"
              placeholder={initWidgetPath}
              defaultValue={state.widgetPath || initWidgetPath}
              onChange={(e) => {
                State.update({
                  widgetPath: e.target.value,
                });
              }}
            />
          </div>
          <Widget
            src={`hack.near/widget/widget.inline`}
            props={{
              widgetPath: state.widgetPath,
            }}
          />
          <div className="m-2">
            {accountId !== daoId && (
              <button
                className="btn btn-primary border-0 m-1"
                onClick={handleCreate}
              >
                <i className="bi bi-bezier2 me-1"></i>
                Clone
              </button>
            )}
            <a
              className="btn btn-success border-0 m-1"
              href={`#/edit/${state.widgetPath}`}
            >
              <i className="bi bi-diagram-2 me-1"></i>
              {accountId === daoId ? "Edit" : "Fork"}
            </a>
          </div>
        </div>
        <br />
        <div className="col m-2">
          <h5>Updated Version</h5>
          <div className="input-group mb-3">
            <input
              className="form-control"
              placeholder={`${accountId}/widget/${widgetName}`}
              defaultValue={updatedWidget}
              onChange={(e) => {
                State.update({
                  updatedWidget: e.target.value,
                });
              }}
            />
          </div>
          <Widget
            src={`hack.near/widget/widget.inline`}
            props={{
              widgetPath:
                state.updatedWidget || `${accountId}/widget/community`,
            }}
          />
          <div className="m-2">
            <button
              disabled={!state.updatedWidget}
              className="btn btn-secondary border-0 m-1"
              onClick={handleProposal}
            >
              <i className="bi bi-git me-1"></i>
              {accountId === daoId ? "Update" : "Propose Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>

    <CodeWrapper>
      <Widget
        src={`hack.near/widget/widget.compare`}
        props={{
          widgetPath: state.widgetPath,
          updatedWidget: state.updatedWidget,
          findUniqueResult: (
            lineCountDeleted,
            lineCountInserted,
            lineCountCurrentCode,
            lineCountPrevCode,
            allLineCount
          ) => {
            if (
              state.lineCountDeleted === undefined ||
              state.lineCountInserted === undefined
            )
              State.update({ lineCountDeleted, lineCountInserted });
          },
        }}
      />
    </CodeWrapper>
  </div>
);
