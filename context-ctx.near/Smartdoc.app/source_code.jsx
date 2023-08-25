// Set config data
const configdata = {
  core: {
    name: `Core`,
    schemas: {
      human: {
        name: `core/human#1.0.0`,
        schema: {
          type: "object",
          properties: {
            name: { type: "string" },
            avatar: { type: "string" },
            website: { type: "string" },
          },
          required: [],
          additionalProperties: false,
        },
      },
      organization: {
        name: `core/organization#1.0.0`,
        schema: {
          type: "object",
          properties: {
            name: { type: "string" },
            legalName: { type: "string" },
            companyNumber: { type: "string" },
            country: { type: "string" },
            website: { type: "string" },
            logo: { type: "string" },
          },
          required: ["name"],
          additionalProperties: false,
        },
      },
      project: {
        name: `core/project#1.0.0`,
        schema: {
          type: "object",
          properties: {
            name: { type: "string" },
            description: { type: "string" },
            organization: { type: "string" },
            website: { type: "string" },
            logo: { type: "string" },
          },
          required: ["name"],
          additionalProperties: false,
        },
      },
    },
  },
  software: {
    name: `Software`,
    schemas: {
      code: {
        name: `software/code#1.0.0`,
        schema: {
          type: "object",
          properties: {
            changes: { type: "string" },
            codebase: { type: "string" },
            major: { type: "integer" },
            minor: { type: "integer" },
            patch: { type: "integer" },
            github: { type: "string" },
          },
          required: ["codebase", "major", "minor", "patch"],
          additionalProperties: false,
        },
      },
    },
  },
};

// Styles
const NotLogged = styled.div`
  margin-top: 20px;
  .title {
    font-size: 16px;
    color: red;
  }
  .description {
    margin-top: 10px;
    font-size: 14px;
  }
`;
const AddMenuLabel = styled.div`
  font-size: 12px;
  font-style: italic;
  text-decoration: underline;
  color: #345AD5; 
  cursor: pointer;
`;
const CloseMenuLabel = styled.div`
  position: absolute;
  top: -20px;
  right: 5px;
  font-size: 12px;
  font-style: italic;
  color: #345AD5; 
  cursor: pointer;
`;
const Menu = styled.div`
  position: relative;
  border: 1px dashed black;
  padding: 10px 0;
`;
const MainGroupMenu = styled.div`

`;
const SchemasMenu = styled.div`
  margin-top: 10px;
`;
const MySchemas = styled.div`
  margin-top: 20px;
`;
const Form = styled.div`
  margin-top: 20px;
`;

// States
State.init({ initialized: false, initialzedInitialSates: false });
State.init({
  network: ``,
  ctxApiUrl: ``,
  ctxApiKey: ``,
  contract: ``,
  donation: 0,
});
State.init({ showAddSchemas: false });
State.init({ selectedGroup: "" });
State.init({ mySchemas: [] });
State.init({ form: null });
State.init({
  showDialog: false,
  dialogTitle: ``,
  dialogDescription: ``,
  dialogHideButton: false,
});

/**
 * Set initial states
 */
if (!state.setInitialStates) {
  State.update({ setInitialStates: true });
  setTimeout(() => {
    console.log("App > setInitialStates > setTimeout!");
    // Set network
    let network;
    switch (context.networkId) {
      case "testnet":
        network = props.network === "devnet" ? "devnet" : "testnet";
        break;
      default:
        network = "mainnet";
        break;
    }
    // Set API & contract vars
    let ctxApiUrl;
    let ctxApiKey;
    let contract;
    switch (network) {
      case "devnet":
        ctxApiUrl = "http://localhost:4200";
        ctxApiKey =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OWMwM2U1NmE4OTc1OTBkYzhhNjUxMyIsImlhdCI6MTY4Nzk0NjIxMywiZXhwIjoxNzE5NDgyMjEzfQ.3ghbEFvwBj2Xx7jRxGS5uuOY8Rot3t5EOJau0uuy0YM";
        contract = "dev-1688120938235-71660557893116";
        break;
      case "testnet":
        ctxApiUrl = "https://testnet.near-bos.ctx.xyz";
        ctxApiKey =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OWVhMTVhMmYzMDBjMmRkZWI3NzI5MCIsImlhdCI6MTY4ODExNzU5NSwiZXhwIjoxNzE5NjUzNTk1fQ.mwiVJCLEwmqsKSnRIKD04kwoqktEezde_x-OwYT-Nlg";
        contract = "dev-1688120938235-71660557893116";
        break;
      default:
        // ctxApiUrl = "https://near-bos.ctx.xyz";
        ctxApiUrl = "http://localhost:4200";
        ctxApiKey =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZThhNjllZjFmMWU3NWJkYjlkMDIyZCIsImlhdCI6MTY5Mjk2ODYwNiwiZXhwIjoxNzI0NTA0NjA2fQ.QHhiVdyx7eKW_N4cl_Ec0JJKH10tE0_5Id5sP22tEu8";
        contract = "context-ctx.near";
        break;
    }
    console.log("network", network, ctxApiUrl, contract);
    const donation = 100000000000000000000000; // YoctoNear amount
    // Update state vars
    if (!!context.accountId) setLoading(true);
    State.update({
      network,
      ctxApiUrl,
      ctxApiKey,
      contract,
      donation,
    });
  }, 300);
}

/**
 * Init
 */
if (!state.initialized && !!state.ctxApiUrl && !!context.accountId) {
  // Get data & send the tx
  let url = `${state.ctxApiUrl}/api/v1/smartdoc/${context.accountId}`;
  if (!!props.transactionHashes) {
    url += `?tx=${props.transactionHashes}`;
  }
  console.log("Fetching form", url);
  asyncFetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${state.ctxApiKey}`,
    },
  })
    .then((res) => {
      if (!res.body) {
        console.log("Fetching form > res", res);
        State.update({
          showDialog: true,
          dialogTitle: null,
          dialogDescription: `Error getting data from Context`,
          dialogHideButton: false,
        });
        return;
      }
      const response = res.body;
      if (!response.success) {
        console.log("Fetching form > response.message", response.message);
        State.update({
          showDialog: true,
          dialogTitle: null,
          dialogDescription: response.message,
          dialogHideButton: false,
        });
        return;
      }
      console.log("Fetching form > response.data", response.data);
      State.update({
        initialized: true,
        form: response.data.data,
        mySchemas: !!response.data.schemas
          ? response.data.schemas.split(`,`)
          : [],
        showDialog: false,
      });
    })
    .catch((e) => {
      console.log("Error", e);
      State.update({
        showDialog: true,
        dialogTitle: null,
        dialogDescription: `Error getting data from Context`,
        dialogHideButton: false,
      });
    });
}

/**
 * Get widget owner
 */
const getWidgetOwner = () => {
  return context.networkId === "testnet"
    ? `context-dev.testnet`
    : `context-ctx.near`;
};

/**
 * Get classified schemas
 */
const getSchemas = () => {
  const ret = {};
  for (let group of Object.keys(configdata)) {
    const schemas = configdata[group].schemas;
    for (let code of Object.keys(schemas)) {
      const schema = schemas[code].schema;
      ret[schemas[code].name] = schema;
    }
  }
  return ret;
};

/**
 * Merge 2 objects
 *
 * @param {any} obj1
 * @param {any} obj2
 * @returns {any}
 */
const mergeObjects = (obj1, obj2) => {
  Object.entries(obj2).forEach((element) => {
    const key = element[0];
    const value = element[1];
    if (Array.isArray(value)) {
      if (!obj1[key]) obj1[key] = [];
      for (let i = 0; i < value.length; i++) {
        if (!obj1[key].includes(value[i])) obj1[key].push(value[i]);
      }
    } else if (typeof value === "object") {
      if (!obj1[key]) obj1[key] = {};
      obj1[key] = mergeObjects(obj1[key], value);
    } else {
      obj1[key] = value;
    }
  });
  return obj1;
};

/**
 * Build the final schema (merged with all)
 */
const buildFinalSchema = () => {
  const data = {};
  if (!state.mySchemas) return data;
  const schemas = getSchemas();
  for (let i = 0; i < state.mySchemas.length; i++) {
    const schemaRaw = state.mySchemas[i];
    const schema = schemas[schemaRaw];
    if (!schema) continue;
    data = mergeObjects(data, schema);
  }
  return data;
};

/**
 * Send form to ctx api
 */
const sendForm = (form) => {
  console.log(`sendForm`, form, state.ctxApiUrl);
  const url = `${state.ctxApiUrl}/api/v1/smartdoc`;
  return asyncFetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${state.ctxApiKey}`,
    },
    body: JSON.stringify({
      accountId: context.accountId,
      data: form,
      schemas: state.mySchemas,
    }),
  });
};

/**
 * Set loading
 */
const setLoading = (value) => {
  State.update({
    showDialog: value,
    dialogTitle: `Loading data...`,
    dialogDescription: `Wait a moment please. Thanks :)`,
    dialogHideButton: true,
  });
};

/**
 * Payment
 */
const donate = () => {
  console.log(`Pay for updating the form data`);
  Near.call(state.contract, "donate", {}, 0, state.donation);
};

/**
 * Render
 */
if (!context.accountId) {
  return (
    <div class="container p-2">
      <NotLogged>
        <div className="title">You are not logged in!</div>
        <div className="description">
          Please, create a new NEAR account or sign in with an existent one.
          Thanks!
        </div>
      </NotLogged>
    </div>
  );
}

const schemasToDisplay = !!configdata[state.selectedGroup]
  ? configdata[state.selectedGroup].schemas
  : {};
const indents = [];

if (!state.showAddSchemas) {
  indents.push(
    <div class="container">
      <AddMenuLabel
        onClick={() => {
          State.update({ showAddSchemas: true });
        }}
      >
        Add schema
      </AddMenuLabel>
    </div>
  );
} else {
  indents.push(
    <>
      <Menu>
        <CloseMenuLabel
          onClick={() => {
            State.update({ showAddSchemas: false });
          }}
        >
          {`Close menu`}
        </CloseMenuLabel>
        <MainGroupMenu>
          <Widget
            src={`${getWidgetOwner()}/widget/Smartdoc.MainGroupMenu`}
            props={{
              data: configdata,
              onSelect: (code) => {
                console.log(`Selected group`, code);
                State.update({ selectedGroup: code });
              },
            }}
          />
        </MainGroupMenu>
        {Object.keys(schemasToDisplay).length > 0 && (
          <SchemasMenu>
            <Widget
              src={`${getWidgetOwner()}/widget/Smartdoc.SchemasMenu`}
              props={{
                schemas: schemasToDisplay,
                mySchemas: state.mySchemas,
                onSelect: (code, schemaRaw) => {
                  console.log(`Selected schema`, code, schemaRaw);
                  const mySchemas = state.mySchemas;
                  if (mySchemas.includes(schemaRaw)) return;
                  mySchemas.push(schemaRaw);
                  State.update({ mySchemas });
                },
              }}
            />
          </SchemasMenu>
        )}
      </Menu>
    </>
  );
}

// Add My schemas container
indents.push(
  <MySchemas>
    <Widget
      src={`${getWidgetOwner()}/widget/Smartdoc.MySchemas`}
      props={{
        schemas: state.mySchemas,
        onDelete: (code) => {
          const newArray = state.mySchemas.filter((item) => item !== code);
          State.update({ mySchemas: newArray });
        },
      }}
    />
  </MySchemas>
);

// Ad form
indents.push(
  <Form>
    <Widget
      src={`${getWidgetOwner()}/widget/Smartdoc.Form`}
      props={{
        schema: buildFinalSchema(),
        form: state.form,
        network: state.network,
        sendForm,
        setLoading,
        loading: state.showDialog,
        donate,
      }}
    />
  </Form>
);

// Add alert dialog
if (state.showDialog)
  indents.push(
    <Widget
      src={`${getWidgetOwner()}/widget/Smartdoc.AlertDialog`}
      props={{
        title: !!state.dialogTitle ? state.dialogTitle : `Oups! We´re sorry!`,
        description: state.dialogDescription,
        close: () => {
          State.update({ showDialog: false });
        },
        hideButton: state.dialogHideButton,
      }}
    />
  );

// Add Context info
if (!!state.network)
  indents.push(
    <Widget
      src={`${getWidgetOwner()}/widget/Smartdoc.ContextInfo`}
      props={{
        network: state.network,
      }}
    />
  );

// Finally render
return (
  <>
    <div class="container p-2">{indents}</div>
  </>
);
