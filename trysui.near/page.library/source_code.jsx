const accountId = context.accountId || "root.near";
const itemDescription =
  'The identifier item. It will be used as a unique identifier of the entity that receives the action. It\'s also used as a key of the action in the index.\nThe item should be an object with the following keys: `type`, `path` and optional `blockHeight`.\n- `type`: If the data is stored in the social DB, then the type is likely `"social"`, other types can be defined in the standards.\n- `path`: The path to the item. For a `"social"` type, it\'s absolute path within SocialDB, e.g. `alice.near/post/main`.\n- `blockHeight`: An optional paremeter to indicate the block when the data was stored. Since SocialDB data can be overwritten to save storage, the exact data should be referenced by the block height (e.g. for a given post). But if the latest data should be used, then `blockHeight` should be ommited.\n\nExamples of `item`:\n- `{type: "social", path: "mob.near/widget/N.Library"}`\n- `{type: "social", path: "mob.near/post/main", blockHeight: 81101335}`\n';
const components = [
  {
    title: "ConnectButton",
    category: "zkLogin",
    widgetName: "ConnectButton",
    description:
      "The ConnectButton shows the user a button to connect and disconnect a wallet. It automatically uses the connected state to show a connect or disconnect button.",
    optionalProps: {
      connectText:
        "The text that displays in the button when the user is not currently connected to a wallet.",
    },
    example: `<ConnectButton connectText="Connect Wallet" />`,
  },
  {
    title: "EnokiFlow",
    category: "Enoki",
    widgetName: "EnokiFlow",
    description:
      "Wrapping your main app with the Enoki context provider delivers Enoki functions and state across all your components.",
    demoProps: { accountId, tooltip: true },
    requiredProps: {
      provides:
        "Pass in the content to render with access to the methods and data that the client provides",
    },
    optionalProps: {},
    example: `<EnokiFlow provides={({ handleEnokiFlow }) => <button onClick={() => handleEnokiFlow()>click me</button>}} />`,
  },
  {
    title: "SuiClientQuery",
    category: "Sui",
    widgetName: "SuiClientQuery",
    description:
      "An instance of the Sui client and connected wallet for quering data",
    demoProps: { accountId, tooltip: true },
    requiredProps: {
      provides:
        "Pass in the content to render with access to the methods and data that the client provides",
      query:
        "The query object that defines the method, params, and options for the client to fetch data",
    },
    optionalProps: {},
    availableMethods: {
      data: "Result of query",
      isPending: "Boolean indicating if the query is pending",
      isError: "Boolean indicating if there was an error with the query",
      error: "Error object if there was an error with the query",
      refetch: "Function to refetch the query",
    },
    example: `<SuiClientQuery
  provides={({ data }) => (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )}
  query={{
    method: "getOwnedObjects",
    params: { owner: "0x123" },
    options: { gcTime: 10000 },
  }}
/>`,
  },
  {
    title: "SuiSigner",
    category: "Sui",
    widgetName: "SuiSigner",
    description:
      "An instance of Sui client and connected wallet for signing transactions",
    demoProps: { accountId, tooltip: true },
    requiredProps: {
      provides:
        "Pass in the content to render with access to the methods and data that the client provides",
    },
    optionalProps: {},
    availableMethods: {
      signTransaction:
        "Hook to prompt the user to sign a transaction with their wallet.",
      signAndExecuteTransaction:
        "Hook to prompt the user to sign and execute a transaction block with their wallet.",
      signPersonalMessage:
        "Hook to prompt the user to sign a message with their wallet.",
    },
    example: `<SuiSigner
  provides={({ signTransaction }) => (
    <button
			onClick={() => {
        signPersonalMessage({
          message: "hello world",
          onSuccess: (result) => console.log(result)
        })
      }}
    >
      Sign message
    </button>
  )}
/>`,
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
  const widgetSrc = `sui.near/widget/${c.widgetName}`;
  const id = c.title.toLowerCase().replaceAll(" ", "-");
  return (
    <div className="component" key={i}>
      <div className="anchor" id={id} />
      <a href={`#${id}`}>
        <h3>{c.title}</h3>
      </a>
      <p>{c.description}</p>
      <label>Preview</label>
      <div className="preview mb-3" style={c.previewStyle}>
        <Widget src={widgetSrc} props={c.demoProps} />
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
      {c.availableMethods && (
        <>
          <label>API </label>
          <table className="props table table-bordered mb-3">
            <thead>
              <tr>
                <th>Key</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>{renderProps(c.availableMethods)}</tbody>
          </table>
        </>
      )}
      <label>Example</label>
      <div className="embed-code">
        <Markdown text={`\`\`\`jsx\n${c.example}\n\`\`\``} />
        <div className="embed-copy">
          <Widget
            src="mob.near/widget/CopyButton"
            props={{ text: c.example, className: "btn btn-outline-light" }}
          />
        </div>
      </div>
    </div>
  );
};
const renderMenuItem = (c, i) => {
  const prev = i ? components[i - 1] : null;
  const res = [];
  if (!prev || prev.category !== c.category) {
    res.push(
      <h5 className="category" key={c.category}>
        {c.category}
      </h5>
    );
  }
  const id = c.title.toLowerCase().replaceAll(" ", "-");
  res.push(
    <div className="menu-item" key={i}>
      <a href={`#${id}`}>{c.title}</a>
    </div>
  );
  return res;
};
const Wrapper = styled.div`
  padding: 20px;
  @media (min-width: 992px) {
    .b-s {
      border-left: 1px solid #eee;
    }
    .b-e {
      border-right: 1px solid #eee;
    }
  }
  .category:not(:first-child) {
    margin-top: 1em;
  }
  .component {
    padding: 0.5em 12px;
    padding-bottom: 0;
    margin-bottom: 3em;
    margin: 0 -12px 3em;
    position: relative;
    &:hover {
      background: rgba(0, 0, 0, 0.03);
    }
    .anchor {
      position: absolute;
      top: -70px;
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
    <h3>Components Library</h3>
    <div className="mb-3">
      This library contains the available Sui components
    </div>
    <div className="row">
      <div className="col-lg-3 b-e b-s">{components.map(renderMenuItem)}</div>
      <div className="col-lg-9 b-e">{components.map(renderComponent)}</div>
    </div>
  </Wrapper>
);
