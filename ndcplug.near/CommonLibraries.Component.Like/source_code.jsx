// check if starred
// add click for more details

const Container = styled.div`
  .profile-image {
    width: 120px;
    height: 120px;
  }

  @media (max-width: 569px) {
    .profile-image {
      width: 160px;
      height: 160px;
    }
  }

  .profile-name {
    @media (max-width: 569px) {
      display: none;
    }
  }
`;

const daoId = props.daoId ?? "build.sputnik-dao.near";
const starCount = props.starCount ?? null;
const accountId = props.accountId ?? context.accountId;

const widgetPath =
  props.widgetPath ?? "proofofvibes.near/widget/Vibes.DAO.main";
const [ownerId, widget, widgetName] = widgetPath.split("/");

const starEdge = Social.keys(
  `${accountId}/graph/star/widget/${ownerId}/${widgetName}`,
  undefined,
  {
    values_only: true,
  }
);

const starred = starEdge && Object.keys(starEdge).length > 0;

const type = star ? "unstar" : "star";

const data = {
  graph: {
    star: { widget: { [ownerId]: { [widgetName]: starred ? null : "" } } },
  },
  index: {
    graph: JSON.stringify({
      key: "star",
      value: {
        type,
        src: widgetPath,
      },
    }),
    notify: JSON.stringify({
      key: ownerId,
      value: {
        type,
      },
    }),
  },
};

const policy = Near.view(daoId, "get_policy");

const deposit = policy.proposal_bond;

// const widgetPath =
//   props.widgetPath ?? props.updatedWidgetPath ?? "hack.near/widget/Academy";
// const [accountId, widget, widgetName] = widgetPath.split("/");

const code = props.code ?? Social.get(`${widgetPath}`);

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
    .join-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 8px 16px;
    height: 32px;
    border-radius: 100px;
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
    text-align: center;
    cursor: pointer;
    background: #FBFCFD;
    border: 1px solid #D7DBDF;
    color: ${props.primary ? "#006ADC" : "#11181C"} !important;
    white-space: nowrap;

    &:hover,
    &:focus {
      background: #ECEDEE;
      text-decoration: none;
      outline: none;
    }

    i {
      display: inline-block;
      color: #7E868C;
    }
  }
`;

const BuildersLink = styled.a`
  &:hover {
    text-decoration: none;
  }
`;

return (
  <Card>
    <div className="row justify-content-between">
      <div className="col-auto">
        <div className="m-2 mb-3 text-truncate">
          <Widget
            src="ndcplug.near/widget/CommonLibraries.Component.Profile"
            props={{ accountId: ownerId, widgetName, link: props.profileLink }}
          />
        </div>
        {false && starCount && (
          <div className="join-button">👍 {starCount}</div>
        )}
        {false && (
          <a
            href={`#/mob.near/widget/WidgetSource?src=${widgetPath}`}
            className="btn btn-sm btn-outline-secondary border-0"
            target="_blank"
          >
            <i className="bi bi-code me-1"></i>src
          </a>
        )}
        {false && (
          <a
            href={`#/bozon.near/widget/WidgetHistory?widgetPath=${widgetPath}`}
            className="btn btn-sm btn-outline-secondary border-0"
            target="_blank"
          >
            <i className="bi bi-clock me-1"></i>history
          </a>
        )}
        {false && (
          <a
            href={`#/edit/${widgetPath}`}
            className="btn btn-sm btn-outline-secondary border-0"
            target="_blank"
          >
            <i className="bi bi-code-slash me-1"></i>
            dev
          </a>
        )}
      </div>
      <div className="col-auto">
        <div className="row mt-3">
          <div className="col-auto m-1">
            {context.accountId !== accountId ? (
              <button
                disabled={!context.accountId}
                className="join-button"
                onClick={handleCreate}
              >
                <i className="bi bi-pencil"></i>
                create
              </button>
            ) : (
              <button
                disabled={!context.accountId}
                className="join-button"
                onClick={handleProposal}
              >
                <i className="bi bi-git me-1"></i>
                push
              </button>
            )}
          </div>
          <div className="col-auto m-1">
            <CommitButton
              disabled={!context.accountId}
              className="join-button"
              data={data}
            >
              <i
                className={`bi ${
                  starred ? "bi-hand-thumbs-up-fill" : "bi-hand-thumbs-up"
                }`}
              />
              <span style={{ marginLeft: "0.2rem" }}>
                {starred ? "liked" : "like"}
                {starCount && `(` + `${starCount}` + `)`}
              </span>
            </CommitButton>

            {false && starCount && (
              <BuildersLink
                href={`#/hack.near/widget/star.list?accountId=${accountId}&widgetName=${widgetName}`}
              >
                <h5 className="text-decoration-none link-dark align-items-center text-muted mt-3">
                  {starCount} 👍
                </h5>
              </BuildersLink>
            )}
          </div>
        </div>
      </div>
      <Markdown text={metadata.description} />
    </div>
  </Card>
);
