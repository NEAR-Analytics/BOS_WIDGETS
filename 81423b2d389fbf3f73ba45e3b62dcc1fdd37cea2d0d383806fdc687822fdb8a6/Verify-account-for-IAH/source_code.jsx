const Input = styled.input`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.5em 0.75em;
  gap: 0.5em;
  background: #ff9933; /* Saffron color */
  border: 4px solid #138808; /* Green color */
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 4px;
`;

const LabelArea = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.25em;
  margin-bottom: 0.5em;
  flex-wrap: wrap;
`;

const Error = styled.small`
  color: red;
`;

State.init({
  valid: true,
  accountId: "",
  errorMessage: <></>,
});

const validate = (accountId) => {
  const accountIdRegex =
    /^(([a-z\d]+[\-_])*[a-z\d]+\.)*([a-z\d]+[\-_])*[a-z\d]+$/;

  if (typeof accountId !== "string") {
    State.update({
      accountId: "",
      valid: false,
      errorMessage: "Account ID must be a text value!",
    });
    return;
  }

  if (accountId.length < 2) {
    State.update({
      accountId: "",
      valid: false,
      errorMessage: "Account ID must be at least 2 characters long!",
    });
    return;
  }

  if (accountId.length > 64) {
    State.update({
      accountId: "",
      valid: false,
      errorMessage: "Account ID must be at most 64 characters long!",
    });
    return;
  }

  if (!accountIdRegex.test(accountId)) {
    State.update({
      accountId: "",
      valid: false,
      errorMessage: (
        <>
          Account ID must follow the rules specified{" "}
          <a href="https://nomicon.io/DataStructures/Account#account-id-rules">
            here
          </a>
          and ends on .near!
        </>
      ),
    });
    return;
  }

  State.update({ valid: true, errorMessage: "", accountId });
};

const accountId = props.accountId ?? "Login with NEAR Wallet";

const getFirstSBTToken = (accountId) => {
  const view = Near.view("registry.i-am-human.near", "sbt_tokens_by_owner", {
    account: `${accountId}`,
    issuer: "fractal.i-am-human.near",
  });
  return view?.[0]?.[1]?.[0];
};

const hasSBTToken = getFirstSBTToken(state.accountId) !== undefined;

const Card = ({ children, className }) => {
  return (
    <div
      className={`card ${className}`}
      style={{ maxWidth: "400px", padding: "2px" }}
    >
      <div className="card-body p-2">{children}</div>
    </div>
  );
};

const CardTitle = ({ children, className }) => {
  return <p className={`card-title ${className}`}>{children}</p>;
};

return (
  <div className="d-flex flex-column align-items-center">
    <p>
      Type the account, which you want to validate, and it will check if it has
      IAH
    </p>
    <LabelArea>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <img
          src="https://zealy-webapp-images-prod.s3.eu-west-1.amazonaws.com/public/5d8a56da-0df6-4e25-ba2d-c2029e8dd760-logo.png"
          alt="Indian Flag"
          style={{
            width: "50px",
            height: "50px",
            position: "absolute",
            top: "10px",
            right: "10px",
          }}
        />
        <Input
          id
          type="text"
          value={v}
          onChange={(e) => validate(e.target.value)}
          className="w-100"
          style={{ maxWidth: "200px" }}
        />
        <Error>{state.valid ? <></> : state.errorMessage}</Error>
      </div>
    </LabelArea>
    {hasSBTToken ? (
      <Card className="border-success">
        <CardTitle className="text-success m-0">Human</CardTitle>
      </Card>
    ) : (
      <Card className="border-danger">
        <CardTitle className="text-danger m-0">Not Human</CardTitle>
      </Card>
    )}
  </div>
);
