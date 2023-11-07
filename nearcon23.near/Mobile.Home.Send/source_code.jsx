const theme = props.theme;
const accountId = props.accountId || context.accountId;
const ownerId = "nearcon23.near";
const apiUrl =
  "https://gqqkd7l7mk.execute-api.us-east-1.amazonaws.com/mainnet/api/v1";
const splitSubstring = ".nearcon23.near";

const receiverId = props.receiverId || context.receiverId;

const [loading, setLoading] = useState(false);
const [value, setValue] = useState(null);

const Container = styled.div`
   width: 100%;
   padding-top:30px;
`;
const Content = styled.div`
   width: 100%;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
  gap:20px;
  padding-left: 20px;
  padding-right : 20px;
`;
const Input = styled.input`
    width: 100%;
    font-size: 64px;
    font-weight: 600;

    margin: 0;
    text-align: center;
    border: none;
    outline: none;

    ::placeholder {
        font-size: 64px !important;
        font-weight: 600;
    }

    ::-webkit-outer-spin-button,
    ::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    [type=number] {
      -moz-appearance: textfield;
    }

`;

const Button = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  min-width: 10.625em;
  gap: 0.5em;
  border: 1px solid #00ec97;
  border-radius: 50px;
  background: #00ec97;
  color: #11181c;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  text-align: center;
  white-space: nowrap;
  transition: all 0.3s ease-in-out;
  font-family: Mona Sans;

  width:100%;
  height:  48px;

  &:hover,
  &:focus,
  &:active {
    text-decoration: none;
    background: #11181c;
    border: 1px solid #11181c;
    color: #fff;
  }
`;

const DisabledButton = styled.div`
 display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  min-width: 10.625em;
  gap: 0.5em;
  opacity:0.5;
  border: 1px solid #00ec97;
  border-radius: 50px;
  background: #00ec97;
  color: #11181c;
  font-family: Mona Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  text-align: center;
  white-space: nowrap;
  transition: all 0.3s ease-in-out;

  width:100%;
  height:  48px;
`;

const Button2 = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  min-width: 10.625em;
  gap: 0.5em;
  border: 1px solid #00ec97;
  border-radius: 50px;
  background: #00ec97;
  color: #11181c;
  font-style: normal;
  font-weight: 600;
  font-family: Mona Sans;
  font-size: 18px;
  text-align: center;
  white-space: nowrap;
  transition: all 0.3s ease-in-out;

  width:100%;

  &:hover,
  &:focus,
  &:active {
    text-decoration: none;
    background: #11181c;
    border: 1px solid #11181c;
    color: #00000099;
  }
`;

function isPositiveFloatOrEmpty(value) {
  const regex = /^(?:\d+\.\d*|\.\d+|\d+)?$/;
  return regex.test(value);
}

const { secretkey } = props;
const storedSecretKey = Storage.get(
  "newPrivateKey",
  `${ownerId}/widget/Ticket.Page`
)
  ? Storage.get("newPrivateKey", `${ownerId}/widget/Ticket.Page`)
  : Storage.get("newPrivateKey", `${ownerId}/widget/RegisterMobile.Index`);
const key = secretkey ? secretkey : storedSecretKey;
const fetchData = () => {
  asyncFetch(`${apiUrl}/accounts/auth/${key}`).then(({ body }) => {
    State.update({ userData: body });
  });
};

useEffect(() => {
  fetchData();
}, [secretkey, storedSecretKey]);

if (state.redirectToSuccess) {
  return (
    <Redirect
      to={`/${ownerId}/widget/Mobile.Home.SendSuccess?receiverId=${receiverId}&amount=${value}`}
    />
  );
}

const isValid = () => {
  // console.log("state?.userData?.balance : ", state?.userData?.balance);
  // console.log("parseFloat(value) : ", parseFloat(value));

  // const balance = state?.userData?.balance
  //   ? parseFloat(state?.userData?.balance?.replace(/,/g, ''))
  //   : 0;

  const balance = state?.userData?.balance
    ? parseFloat(state?.userData?.balance?.replace(/,/g, ""))
    : 0;
  if (balance >= parseFloat(value)) {
    return true;
  }
  return false;
};

const ComponentToRender = isValid() ? Button : DisabledButton;

function splitStringAtSubstring(str, substring) {
  const splitIndex = str?.indexOf?.(substring);
  if (splitIndex === -1) {
    // Substring not found, return the original string in an array
    return [str];
  }

  // Split the string into the part before the substring and the substring with the rest
  return [str?.substring?.(0, splitIndex), str?.substring?.(splitIndex)];
}

// Test the function
const originalString = receiverId;
const result = splitStringAtSubstring(originalString, splitSubstring);

return (
  <>
    <Widget
      props={{
        nearconId: state.userData.nearconId,
        cid: state.userData.cid,
      }}
      src={`${ownerId}/widget/Navbar`}
    />
    <Container>
      <Content>
        <h4
          style={{
            fontFamily: "FK Grotesk",
            fontWeight: 500,
            color: theme.textColor3,
            textAlign: "center",
          }}
        >
          To{" "}
          <span style={{ color: theme.textColor }}>
            {result[0]}
            <span style={{ color: "#868682" }}>{result[1]}</span>
          </span>
        </h4>

        <div
          style={{
            borderRadius: 8,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",

            aspectRatio: 3 / 1,
          }}
        >
          <Input
            inputmode="numeric"
            pattern="[0-9]*"
            type="number"
            placeholder="0"
            value={value}
            onChange={(e) => {
              let value = e.target.value;
              let formattedValue = parseFloat(value);

              if (isNaN(formattedValue) && formattedValue < 0) {
                formattedValue = "";
              } else {
                formattedValue = formattedValue.toString();
              }

              setValue(formattedValue);
            }}
          />

          <h3
            style={{
              fontSize: 24,
              fontWeight: 500,
              margin: 0,
              color: "#00EC97",
            }}
          >
            NCON
          </h3>
        </div>

        <ComponentToRender
          disabled={loading}
          onClick={() => {
            if (isValid()) {
              setLoading(true);
              console.log(state.userData);
              asyncFetch(`${apiUrl}/accounts/transfer`, {
                body: JSON.stringify({
                  accountId: state.userData.nearconId,
                  secretKey: key,
                  sendTo: receiverId,
                  amount: `${parseFloat(value)}`,
                }),
                headers: {
                  "Content-Type": "application/json",
                },
                method: "POST",
              }).then((res) => {
                const { body } = res;
                const { newPrivateKey, newPublicKey, accountId } = body;
                Storage.set("newPrivateKey", newPrivateKey);
                Storage.set("newPublicKey", newPublicKey);
                Storage.set("accountId", accountId);
                State.update({
                  redirectToSuccess: true,
                });
                setLoading(false);
              });
            }
          }}
        >
          {loading ? (
            <div class="spinner-border text-light" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          ) : (
            "Send"
          )}
        </ComponentToRender>

        <Link to={`/mobile`}>
          <Button2
            style={{
              backgroundColor: "#FFFFFF",
              color: "#000000 !important",
              border: "none",
            }}
          >
            Cancel
          </Button2>
        </Link>

        <p
          style={{
            color: "#90908C",
            fontFamily: "Mona Sans",
            fontSize: 12,
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: 1.5,

            textAlign: "center",
          }}
        >
          All NCON expire at the end of the conference <br /> and are worth no
          monetary value.
        </p>
      </Content>
    </Container>
  </>
);
