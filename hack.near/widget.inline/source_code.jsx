const accountId = props.accountId;
const daoId = props.daoId ?? "build.sputnik-dao.near";
const code = props.code;

const policy = Near.view(daoId, "get_policy");

const deposit = policy.proposal_bond;

const widgetName = props.widgetName;
const widgetPath = `${accountId}/widget/${widgetName}`;
const blockHeight = props.blockHeight;
const metadata = props.metadata ?? Social.getr(`${widgetPath}/metadata`);
const renderTag = props.renderTag;

const name = metadata.name ?? widgetName;
const description = metadata.description;
const image = metadata.image;
const tags = Object.keys(metadata.tags ?? {});
const expanded = !!props.expanded;

const linktree = Object.entries(metadata.linktree ?? {});
const linktreeElements = {
  website: {
    prefix: "https://",
    icon: "bi-globe2",
  },
};

const linktreeObjects = linktree.map((o, i) => {
  const key = o[0];
  let value = o[1];
  if (!value) {
    return null;
  }
  const e = linktreeElements[key];
  if (e.prefix) {
    value = value && value.replace(e.prefix, "");
  }
  const icon = e.icon ? (
    <i className={`bi ${e.icon ?? ""} text-secondary me-1`}></i>
  ) : (
    ""
  );
  return e.prefix ? (
    <div key={i} className="text-truncate">
      <a href={`${e.prefix}${value}`}>
        {icon}
        {value}
      </a>
    </div>
  ) : (
    <div key={i} className="text-truncate">
      {key}: {icon}
      {value}
    </div>
  );
});

const descriptionKey = `${widgetPath}-description`.replaceAll(/[._\/-]/g, "--");

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
        "": `${code}`,
        metadata: {
          tags: {
            build: "",
          },
        },
      },
    },
  });

return (
  <div className="card" style={{ borderRadius: "12px" }}>
    <div className="row py-3">
      <div className="m-auto text-center" style={{ maxWidth: "12em" }}>
        <div className="d-inline-block" style={{ width: "5em", height: "5em" }}>
          <Widget
            src="mob.near/widget/Image"
            props={{
              image,
              className: "w-100 h-100 shadow",
              style: { objectFit: "cover", borderRadius: "12px" },
              thumbnail: false,
              fallbackUrl:
                "https://ipfs.near.social/ipfs/bafkreido7gsk4dlb63z3s5yirkkgrjs2nmyar5bxyet66chakt2h5jve6e",
              alt: widgetName,
            }}
          />
        </div>
      </div>
      <div className="col-5">
        <div className="m-1 mb-3 text-truncate">
          <Widget
            src="mob.near/widget/ProfileLine"
            props={{ accountId, link: props.profileLink }}
          />
        </div>
        <div className="m-1 position-relative">
          <h5 className="card-title">{name}</h5>
          <div className="text-truncate mb-1">
            <a className="stretched-link" href={`#/${widgetPath}`}>
              <i className="bi bi-box-arrow-up-right text-secondary me-1" />
              {widgetPath}
            </a>
          </div>
        </div>
        <div className="card-text">
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
      </div>
      <div className="col-3 m-2">
        <Widget
          src="hack.near/widget/StarButton"
          props={{ notifyAccountId, item }}
        />
        <div className="mt-4">
          <small className="text-nowrap text-muted ms-auto m-1">
            <i className="bi bi-hourglass me-1"></i>
            <Widget
              src="mob.near/widget/TimeAgo"
              props={{ keyPath: widgetPath, now: props.metadata, blockHeight }}
            />
          </small>
        </div>
      </div>
    </div>
  </div>
);
