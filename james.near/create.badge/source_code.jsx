const [badgeSrc, setBadgeSrc] = useState("every.near");
const [badgeId, setBadgeId] = useState("builder");

const blockHeight = props.blockHeight || "final";
const [resolverType, setResolverType] = useState(null);
const [accountIds, setAccountIds] = useState([]);
const [inputValue, setInputValue] = useState("");

const handleAddAccountId = () => {
  if (inputValue.trim() !== "" && !accountIds.includes(inputValue)) {
    const newAccountIds = [...accountIds, inputValue];
    setAccountIds(newAccountIds);
    onResolverChange(newAccountIds);
    setInputValue("");
  }
};

const handleRemoveAccountId = (accountId) => {
  const newAccountIds = accountIds.filter((id) => id !== accountId);
  setAccountIds(newAccountIds);
  onResolverChange(newAccountIds);
};

const handleInputChange = (e) => {
  setInputValue(e.target.value);
};

const [badgeName, setBadgeName] = useState("Proof of Build");
const [description, setDescription] = useState("validation as a builder");
const [image, setImage] = useState(
  `"ipfs_cid": "QmQmKGGJXhkhGrTbE4MgJ3G1wUUu8eo7mNKwRSCB5tihCw"`
);

const badge = Social.get(`${badgeSrc}/badge/${badgeId}`, "final");

let importedTypes = [];
const availableTypes = JSON.parse(props.availableTypes) || [
  "string",
  "boolean",
  "number",
  "date",
  "time",
  "tags",
  ...importedTypes,
];

const Container = styled.div`
  margin: 20px 0;
`;

const FormContainer = styled.div`
  border: 1px solid #ccc;
  padding: 23px;
  margin: 19px;
`;

const Row = styled.div`
  display: flex;
  gap: 8px;
`;

const Input = styled.input`
  flex: 1;
  max-width: 200px;
  margin-bottom: 10px;
  height: 30px;
`;

const Select = styled.select`
  height: 30px;
`;

const Button = styled.button`
  height: 30px;
`;

const Text = styled.p`
  display: inline-block;
  margin-right: 10px;
`;

const handleBadgeIdChange = (e) => {
  setBadgeId(e.target.value.toLowerCase());
};

const handleBadgeNameChange = (e) => {
  setBadgeName(e.target.value);
};
const handleDescriptionChange = (e) => {
  setDescription(e.target.value);
};
const handleAccountIdsChange = (e) => {
  setAccountIds(e.target.value);
};
const composeData = () => {
  const imageObject = JSON.parse(`{${image}}`);

  const accountsObject = accountIds.reduce((acc, accountId) => {
    acc[accountId] = "";
    return acc;
  }, {});

  const data = {
    [badgeId]: {
      metadata: {
        name: badgeName,
        description: description,
        image: imageObject,
      },
      accounts: accountsObject,
    },
  };

  return JSON.stringify(data, null, 2);
};

function TypeSelect({ value, onChange }) {
  return (
    <Select value={value} onChange={onChange}>
      {availableTypes.map((it) => (
        <option value={it} key={it}>
          {it}
        </option>
      ))}
    </Select>
  );
}

function MultiSelect({ value, onChange }) {
  return (
    <Select value={value} onChange={onChange}>
      <option value={false}>single</option>
      <option value={true}>multi</option>
    </Select>
  );
}

const handleResolverTypeChange = (e) => {
  setResolverType(e.target.value);
};

const handleResolverDataChange = (newData) => {
  setResolverData(newData);
};

const serializedAccountsObject = JSON.stringify(
  accountIds.reduce((acc, accountId) => {
    acc[accountId] = "";
    return acc;
  }, {}),
  null,
  2
);

const markdownText = `
\`\`\`json
{
  "${badgeId}": {
    "metadata": {
      "name": "${badgeName}",
      "description": "${description}",
      "image": { ${image} }
    },
    "accounts": ${serializedAccountsObject}
  }
}`;

return (
  <Container>
    <FormContainer>
      <Text>
        <Row>
          <h3 className="m-1">Near Social Badge Creator</h3>
          <div className="m-2">
            <Widget src="james.near/widget/BuilderHat" props={{ accountId }} />
          </div>
        </Row>
        <h5 className="m-1">
          -- inspired by <a href="https://everything.dev">everything</a>,
          <a href="https://hyperfiles.org">Hyperfiles</a>,
          <a href="https://archetype.computer">Archetype</a>, and
          <a href="https://near.social/zavodil.near/widget/social-avatar-editor">
            NS Avatars
          </a>
        </h5>
        <i className="m-1">
          You may customize fields to represent attestations of a particular
          type:{" "}
          <a href="https://github.com/NearSocial/standards/blob/main/types/badge">
            <b>badges</b>
          </a>
        </i>
      </Text>
      <div className="m-3">
        <h5 className="m-2">
          <b>Badge ID:</b>
        </h5>
        <div className="m-3">
          <input
            type="text"
            placeholder="badge name"
            value={badgeId}
            onChange={handleBadgeIdChange}
          />
        </div>
        <h5 className="m-2">
          <b>Badge Name:</b>
        </h5>
        <div className="m-3">
          <input
            type="text"
            placeholder="name"
            value={badgeName}
            onChange={handleBadgeNameChange}
          />
        </div>
        <h5 className="m-2">
          <b>Description:</b>
        </h5>
        <div className="m-3">
          <input
            type="text"
            placeholder="description"
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
        <h5 className="m-2">
          <b>Image:</b>
        </h5>
        <div className="m-3">
          <Widget
            src="near/widget/ImageEditorTabs"
            props={{
              image,
              onChange: (image) => State.update({ image }),
            }}
          />
        </div>
      </div>
      <h4 className="m-4">Data Structure</h4>
      <p className="m-4">
        Badges can be saved under your account in the `badge/xyz` namespace.
      </p>
      <div className="m-3">
        <Markdown
          text={markdownText}
          syntaxHighlighterProps={{
            wrapLines: true,
            lineProps,
            showLineNumbers: true,
            lineNumberStyle: { display: !props.showLineNumber && "none" },
          }}
        />
      </div>
      <div className="m-4">
        <h5>
          <b>Resolver Accounts:</b>
        </h5>
        <i>
          OPTIONAL ~ choose which accounts have permission to give this badge
        </i>
        <div className="m-2">
          <div className="d-flex flex-row mt-3">
            <div style={{ flexGrow: 1, marginRight: "8px" }}>
              <input
                type="text"
                style={{ width: "100%" }}
                value={inputValue}
                onChange={handleInputChange}
                placeholder="example.near"
              />
            </div>
            <button className="btn btn-dark" onClick={handleAddAccountId}>
              Add
            </button>
          </div>
          <br />
          {accountIds.map((accountId) => (
            <>
              <div
                className="d-flex flex-row justify-content-between"
                key={accountId}
              >
                <Widget
                  src="james.near/widget/profile.inline"
                  props={{ accountId }}
                />
                <div className="ml-auto">
                  <button
                    className="btn btn-light"
                    onClick={() => handleRemoveAccountId(accountId)}
                  >
                    Remove
                  </button>
                </div>
              </div>
              <br />
            </>
          ))}
        </div>
      </div>
      <CommitButton force data={composeData()}>
        Save
      </CommitButton>
    </FormContainer>
  </Container>
);
