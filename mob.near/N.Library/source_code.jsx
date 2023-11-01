const accountId = context.accountId || "root.near";
const authorId = "mob.near";

const components = [
  {
    name: "Profile",
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
];

const renderProps = (props, optional) => {
  return Object.entries(props || {}).map(([key, desc]) => {
    return (
      <li key={key}>
        <span className={`code prop-key${optional ? " optional" : ""}`}>
          {key}
        </span>{" "}
        - <span className="prop-desc">{desc}</span>
      </li>
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
  return (
    <div className="component" key={i}>
      <h5>{c.name}</h5>
      <div className="d-flex flex-row justify-content-between">
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
      <div className="preview" style={c.previewStyle}>
        <Widget src={widgetSrc} props={c.demoProps} />
      </div>
      <label>Props</label>
      <ul className="props">
        {renderProps(c.requiredProps)}
        {renderProps(c.optionalProps, true)}
      </ul>
      <label>Example</label>
      <div className="embed-code">
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
      padding: 12px 0;
    
    }
    .props {
      
      .optional {

      }
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
    {components.map(renderComponent)}
  </Wrapper>
);
