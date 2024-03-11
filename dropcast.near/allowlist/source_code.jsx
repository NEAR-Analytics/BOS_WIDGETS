const accountId = context.accountId;
const Owner = "dropcast.near";
const API_URL = props.API_URL || "http://localhost:2402";
const USER = props.USER || {};
const TOKEN = props.TOKEN || "";
const Logout = props.Logout;

//Styles
const Wrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 64px;
  height: fit-content;
  position: relative;
  align-items: stretch;
  flex-direction: column;
  color: rgb(229 229 229);
  background: rgb(23,23,23);
  @media (max-width: 510px) {
      padding: 30px;
  }
`;

const Card = styled.div`
    gap: 24px;
    display: flex;
    width: 100%;
    padding: 48px;
    border-radius: 8px;
    position: relative;
    flex-direction: column;
    background: rgb(38, 38, 38);
    @media (max-width: 620px) {
      padding: 15px;
      height: 100%;
      .menu {
        width: 74vw;
      }
    }  
`;

const Label = styled.label`
    font-size: 14px;
    margin-bottom: 4px;
`;

const Button = styled.button`
    color: #FFF;
    padding: 12px;
    border-radius: 6px;
    background-image: linear-gradient(to right, rgb(147, 51, 234), rgb(99, 102, 241));
`;

const NEAR_TOKEN = [
  {
    text: "> 1 $NEAR",
    value: "near1",
  },
  {
    text: "> 10 $NEAR",
    value: "near2",
  },
  {
    text: "> 100 $NEAR",
    value: "near3",
  },
  {
    text: "> 1000 $NEAR",
    value: "near4",
  },
  {
    text: "Not Applicable",
    value: "near0",
  },
];

const AGE_ACCOUNT = [
  {
    text: "> 1 Month",
    value: "age1",
  },
  {
    text: "> 6 Month",
    value: "age2",
  },
  {
    text: "> 1 Year",
    value: "age3",
  },
  {
    text: "> 2 Year",
    value: "age4",
  },
  {
    text: "Not Applicable",
    value: "age0",
  },
];

const TRANSACTION = [
  {
    text: "> 10 Transactions",
    value: "transaction1",
  },
  {
    text: "> 50 Transactions",
    value: "transaction2",
  },
  {
    text: "> 1000 Transactions",
    value: "transaction3",
  },
  {
    text: "> 10000 Transactions",
    value: "transaction4",
  },
  {
    text: "Not Applicable",
    value: "transaction0",
  },
];

const BOOL = [
  {
    text: "Yes",
    value: "yes",
  },
  {
    text: "Not Applicable",
    value: "no",
  },
];

State.init({
  near: "near0",
  age: "age0",
  transaction: "transaction0",
  nft: "no",
  meme: "no",
  activity: "no",
  error: "",
  download: false,
  file: "",
  loading: false,
});

const changeOption = (key, value) => {
  State.update({
    ...state,
    [key]: value,
  });
};

const convertObject = (params) => {
  return Object.keys(params)
    .map((param) => `${param}=${params[param]}`)
    .join("&");
};

const onSubmit = () => {
  State.update({
    ...state,
    loading: true,
    download: false,
    file: "",
  });
  let promise = asyncFetch(`${API_URL}/api/auth/download`, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "x-auth-token": TOKEN,
    },
    method: "POST",
    body: convertObject({
      near: state.near,
      age: state.age,
      transaction: state.transaction,
      nft: state.nft,
      meme: state.meme,
      activity: state.activity,
    }),
  });

  promise
    .then((data) => {
      if (data.status === 200) {
        if (data.body?.error) {
          State.update({
            ...state,
            loading: false,
            error: data.body,
          });
        } else {
          State.update({
            ...state,
            loading: false,
            download: true,
            file: data.body,
          });
        }
      } else {
        State.update({
          ...state,
          loading: false,
          error: data.body,
        });
      }
    })
    .catch(() => {
      State.update({
        ...state,
        loading: false,
        error: "Api error",
      });
    });
};

return (
  <Wrapper>
    <Card>
      <div>
        <h5 className="m-0" style={{ fontSize: 18 }}>
          {`Custom Allowlist`}
        </h5>
      </div>
      <div>
        <Label>{`Minimum $NEAR balance`}</Label>
        <Widget
          props={{
            noLabel: true,
            width: "40vw",
            options: NEAR_TOKEN,
            value: state.near,
            onChange: (val) => changeOption("near", val),
          }}
          src={`${Owner}/widget/Select`}
        />
      </div>
      <div>
        <Label>{`Age of the Account`}</Label>
        <Widget
          props={{
            noLabel: true,
            width: "40vw",
            options: AGE_ACCOUNT,
            value: state.age,
            onChange: (val) => changeOption("age", val),
          }}
          src={`${Owner}/widget/Select`}
        />
      </div>
      <div>
        <Label>{`Transaction Count`}</Label>
        <Widget
          props={{
            noLabel: true,
            width: "40vw",
            options: TRANSACTION,
            value: state.transaction,
            onChange: (val) => changeOption("transaction", val),
          }}
          src={`${Owner}/widget/Select`}
        />
      </div>
      <div>
        <Label>{`Holds NFTs`}</Label>
        <Widget
          props={{
            noLabel: true,
            width: "40vw",
            options: BOOL,
            value: state.nft,
            onChange: (val) => changeOption("nft", val),
          }}
          src={`${Owner}/widget/Select`}
        />
      </div>
      <div>
        <Label>{`Holds Meme Coins`}</Label>
        <Widget
          props={{
            noLabel: true,
            width: "40vw",
            options: BOOL,
            value: state.meme,
            onChange: (val) => changeOption("meme", val),
          }}
          src={`${Owner}/widget/Select`}
        />
        <p
          style={{ fontSize: 14, color: "grey", margin: 0 }}
        >{`Any meme coin ($Neko/$Lonk/$Blackdragon/$Shitzu)`}</p>
      </div>
      {/*
      <div>
        <Label>{`Has Near Social Activity`}</Label>
        <Widget
          props={{
            noLabel: true,
            width: "40vw",
            options: BOOL,
            value: state.activity,
            onChange: (val) => changeOption("activity", val),
          }}
          src={`${Owner}/widget/Select`}
        />
      </div> */}
      <Button className="btn" onClick={onSubmit} disabled={state.loading}>
        {state.loading ? `Processing...` : `Submit`}
      </Button>
      {state.download && state.file && (
        <div className="d-flex mt-1 justify-content-center align-items-center mb-2">
          <a href={`${API_URL}/${state.file}`}>Download CSV</a>
        </div>
      )}
    </Card>
  </Wrapper>
);
