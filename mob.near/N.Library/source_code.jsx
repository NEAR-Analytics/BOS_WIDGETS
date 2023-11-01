const accountId = context.accountId || "root.near";
const authorId = "mob.near";

const components = [
  {
    title: "Profile Block",
    widgetName: "Profile.InlineBlock",
    demoProps: { accountId },
    requiredProps: {
      accountId: "The account ID of the profile",
    },
    optionalProps: {
      profile: "Object that holds profile information to display",
      fast: "Render profile picture faster using external cache, default false",
    },
  },
  {
    title: "Profile Inline",
    widgetName: "N.ProfileLine",
    demoProps: { accountId },
    requiredProps: {
      accountId: "The account ID of the profile",
    },
    optionalProps: {
      profile: "Object that holds profile information to display",
      fast: "Render profile picture faster using external cache, default false",
    },
  },
  {
    title: "Profile Picture",
    widgetName: "ProfileImage",
    demoProps: { accountId, fast: true },
    requiredProps: {
      accountId: "The account ID of the profile",
    },
    optionalProps: {
      profile: "Object that holds profile information to display",
      fast: "Render profile picture faster using external cache, default false",
    },
  },
];

const renderProps = (props, optional) => {
  return Object.entries(props || {}).map(([key, desc]) => {
    return (
      <tr key={key}>
        <td>
          <span className={`code prop-key${optional ? " optional" : ""}`}>
            {key}
          </span>
        </td>
        <td className="prop-desc">{desc}</td>
      </tr>
    );
  });
};

const renderComponent = (c, i) => {
  const widgetSrc = `${authorId}/widget/${c.widgetName}`;
  const embedCode = `<Widget\n  src="${widgetSrc}"\n  props={{${JSON.stringify(
    c.demoProps,
    undefined,
    4
  ).slice(1, -1)}  }}\n/>\n`;
  const id = c.title.toLowerCase().replace(" ", "-");
  return (
    <div className="component" key={i}>
      <a href={`#${id}`} id={id}>
        <h3>{c.title}</h3>
      </a>
      <label>Preview</label>
      <div className="preview mb-3" style={c.previewStyle}>
        <Widget src={widgetSrc} props={c.demoProps} />
      </div>
      <label>Component</label>
      <div className="d-flex flex-row justify-content-between mb-3">
        <div className="path font-monospace">
          <Widget
            src="mob.near/widget/CopyButton"
            props={{
              text: widgetSrc,
              label: widgetSrc,
            }}
          />
        </div>
        <div className="source">
          <a
            href={`/mob.near/widget/WidgetSource?src=${widgetSrc}`}
            target="_blank"
            className="btn btn-outline-primary border-0"
          >
            Source
          </a>
        </div>
      </div>
      <label>Props</label>
      <table className="props table table-bordered mb-3">
        <thead>
          <tr>
            <th>Key</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {renderProps(c.requiredProps)}
          {renderProps(c.optionalProps, true)}
        </tbody>
      </table>
      <label>Example</label>
      <div className="embed-code mb-3">
        <Markdown text={`\`\`\`jsx\n${embedCode}\n\`\`\``} />
        <div className="embed-copy">
          <Widget
            src="mob.near/widget/CopyButton"
            props={{ text: embedCode, className: "btn btn-outline-light" }}
          />
        </div>
      </div>
      <div></div>
    </div>
  );
};

const Wrapper = styled.div`
  .component {
    label {
      font-size: 20px;
    }

    .code {
      display: inline-flex;
      line-height: normal;
      border-radius: 0.3em;
      padding: 0 4px;
      border: 1px solid #ddd;
      background: rgba(0, 0, 0, 0.03);
      font-family: var(--bs-font-monospace);
    }
    .path {

    }
    .preview {
      padding: 12px;
      border: 1px solid #eee;
      border-radius: 12px;
    }
    .props {
      .prop-key {
        font-weight: 600;
        &.optional {
          font-weight: normal;
        }
      }
    }
    .embed-code {
      position: relative;

      .embed-copy {
        position: absolute;
        top: 18px;
        right: 10px;
      }
    }
  }
`;

return (
  <Wrapper>
    <h3>Social Components Library</h3>
    <div className="mb-3">
      This library contains common social components used by near.social
    </div>
    <div>{components.map(renderComponent)}</div>
  </Wrapper>
);
