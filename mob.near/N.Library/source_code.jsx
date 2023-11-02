const accountId = context.accountId || "root.near";
const authorId = "mob.near";

const components = [
  {
    title: "Profile Block",
    category: "Profile",
    widgetName: "Profile.InlineBlock",
    description:
      "Profile block for a given account ID with a picture, name, premium checkmark, account ID, a list of tags and the description",
    demoProps: { accountId },
    requiredProps: {
      accountId: "The account ID of the profile",
    },
    optionalProps: {
      profile: "Object that holds profile information to display",
      fast: "Render profile picture faster using external cache, default true if the `props.profile` is not provided",
      hideDescription: "Don't show description, default false",
    },
  },
  {
    title: "Profile Short Block",
    category: "Profile",
    widgetName: "Profile.ShortInlineBlock",
    description:
      "Short profile block for a given account ID with a picture, name, premium checkmark, account ID",
    demoProps: { accountId, tooltip: true },
    requiredProps: {
      accountId: "The account ID of the profile",
    },
    optionalProps: {
      profile: "Object that holds profile information to display",
      fast: "Render profile picture faster using external cache, default true if the `props.profile` is not provided",
      tooltip:
        "Display overlay tooltip when you hover over the profile, default false",
    },
  },
  {
    title: "Profile Line",
    category: "Profile",
    widgetName: "N.ProfileLine",
    description:
      "Profile line for a given account ID with a picture, name, premium checkmark, account ID. It's highly customizable and is useful to embed into a text or a single line",
    demoProps: { accountId, tooltip: true },
    requiredProps: {
      accountId: "The account ID of the profile",
    },
    optionalProps: {
      link: "Whether to make profile clickable with a link to the profile page, default true.",
      hideAccountId: "Don't show account ID, default false",
      hideName: "Don't show profile name, default false",
      hideImage: "Don't show profile picture, default false",
      hideCheckmark: "Don't show premium checkmark, default false",
      profile: "Object that holds profile information to display",
      fast: "Render profile picture faster using external cache, default true if the `props.profile` is not provided",
      title:
        'Optional title when you hover over the profile. Default `"${name} ${accountId}"`',
      tooltip:
        "Display overlay tooltip or title when you hover over the profile, default false. Will display a custom title if tooltip is given. If tooltip is true, the full tooltip is displayed. Default false",
    },
  },
  {
    title: "Profile Picture",
    category: "Profile",
    widgetName: "ProfileImage",
    description:
      "Profile picture for a given account ID. It's highly customizable with style and classes.",
    demoProps: { accountId, fast: true },
    requiredProps: {
      accountId: "The account ID of the profile",
    },
    optionalProps: {
      className:
        'HTML class name for the image wrapper, default `"profile-image d-inline-block"`',
      style:
        'React DOM styles for the image wrapper, default `{ width: "3em", height: "3em" }`',
      imageStyle:
        'React DOM styles for the image, default `{ objectFit: "cover" }`',
      imageClassName:
        'HTML class name for the image, default `"rounded-circle w-100 h-100"`',
      thumbnail:
        'Thumbnail type, can be `"large"`, `"thumbnail"` or `null`, default is `"thumbnail"`',
      profile: "Object that holds profile information to display",
      fast: "Render profile picture faster using external cache, default true if the `props.profile` is not provided",
      title:
        'Optional title when you hover over the profile. Default `"${name} ${accountId}"`',
      tooltip:
        "Display overlay tooltip or title when you hover over the profile, default false. Will display a custom title if tooltip is given. If tooltip is true, the full tooltip is displayed. Default false",
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
        <td className="prop-desc">
          <Markdown text={desc} />
        </td>
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
  const id = c.title.toLowerCase().replaceAll(" ", "-");
  return (
    <div className="component" key={i}>
      <a href={`#${id}`} id={id}>
        <h3>{c.title}</h3>
      </a>
      <p>{c.description}</p>
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
      <div className="embed-code">
        <Markdown text={`\`\`\`jsx\n${embedCode}\n\`\`\``} />
        <div className="embed-copy">
          <Widget
            src="mob.near/widget/CopyButton"
            props={{ text: embedCode, className: "btn btn-outline-light" }}
          />
        </div>
      </div>
    </div>
  );
};

const Wrapper = styled.div`
  .component {
    padding: 0.5em 0;
    padding-bottom: 0;
    margin-bottom: 3em;

    &:hover {
      background: rgba(0, 0, 0, 0.03); 
    }

    table {
      background: white;
    }
    
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
      background-color: white;
      padding: 12px;
      border: 1px solid #eee;
      border-radius: 12px;
      pre {
        margin-bottom: 0;
      }
    }
    .props {
      .prop-key {
        font-weight: 600;
        &.optional {
          font-weight: normal;
        }
      }
      .prop-desc {
        p {
          margin-bottom: 0;
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
