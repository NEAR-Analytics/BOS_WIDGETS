const Container = styled.div`
  .profile-image {
    width: 120px;
    height: 120px;
  }

  @media (max-width: 576px) {
    .profile-image {
      width: 160px;
      height: 160px;
    }
  }
`;

const daoId = props.daoId ?? "build.sputnik-dao.near";
const code = props.code;
const starCount = props.starCount;

const policy = Near.view(daoId, "get_policy");

const deposit = policy.proposal_bond;

const widgetPath = props.widgetPath ?? "mob.near/widget/WidgetSource";
const [accountId, widget, widgetName] = widgetPath.split("/");

const blockHeight = props.blockHeight;
const metadata = props.metadata ?? Social.getr(`${widgetPath}/metadata`);
const renderTag = props.renderTag;

const name = metadata.name ?? widgetName;
const image = metadata.image;

const item = {
  type: "dev",
  path: widgetPath,
  blockHeight,
};

const widget_args = JSON.stringify({
  data: {
    [daoId]: {
      widget: {
        [`${widgetName}`]: {
          "": `${code}`,
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
                  gas: "21900000000000",
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
        "": `${code}`,
        metadata: {
          tags: {
            build: "",
          },
        },
      },
    },
  });

const Card = styled.div`
  position: relative;
  width: 100%;
  border-radius: 12px;
  justify-content: center;
  background: #fff;
  border: 1px solid #eceef0;
  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1),
    0px 1px 2px rgba(16, 24, 40, 0.06);
  overflow: hidden;
  padding: 23px;
`;

const StarButton = styled.div`
  position: absolute;
  top: 23px;
  right: 18px;
`;

const ForkButton = styled.div`
  position: absolute;
  bottom: 23px;
  right: 18px;
`;

return (
  <Card>
    <div className="row mb-2">
      <div className="col-6">
        <div className="m-2 mb-3 text-truncate">
          <Widget
            src="mob.near/widget/Profile"
            props={{ accountId, link: props.profileLink }}
          />
        </div>
      </div>
      <div className="col-5">
        <StarButton>
          {starCount && (
            <a
              href={`#/hack.near/widget/star.list?accountId=${accountId}&widgetName=${widgetName}`}
            >
              <h5>
                {starCount} builder{starCount !== 1 && "s"}
              </h5>
            </a>
          )}
          <Widget src="hack.near/widget/star.button" props={{ widgetPath }} />
        </StarButton>
      </div>
    </div>
    <div className="m-2">
      <h3 className="mb-2 mt-3">
        <a href={`#/${widgetPath}`}>
          <b>{name}</b>
        </a>
      </h3>
    </div>
    <div className="row mt-4 mb-3">
      <div className="col-auto">
        <a
          href={`#/mob.near/widget/WidgetSource?src=${widgetPath}`}
          className="btn btn-sm btn-outline-secondary border-0"
          target="_blank"
        >
          <i className="bi bi-code me-1"></i>source
        </a>
        <a
          href={`#/bozon.near/widget/WidgetHistory?widgetPath=${widgetPath}`}
          className="btn btn-sm btn-outline-secondary border-0"
          target="_blank"
        >
          <i className="bi bi-clock me-1"></i>history
        </a>
      </div>
      <div className="col-auto d-flex flex-column align-items-end">
        <ForkButton>
          <a className="btn btn-outline-success" href={`#/edit/${widgetPath}`}>
            <i className="bi bi-git me-1"></i>
            {accountId === context.accountId ? "edit" : "fork"}
          </a>
        </ForkButton>
      </div>
    </div>
  </Card>
);
