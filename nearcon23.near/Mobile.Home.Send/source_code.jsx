const theme = props.theme;
const accountId = props.accountId || context.accountId;
const ownerId = "nearcon23.near";

const receiverId = props.receiverId || context.receiverId;

const [value, setValue] = useState(null);

const Container = styled.div`
   width: 100%;
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

  width:100%;

  &:hover,
  &:focus,
  &:active {
    text-decoration: none;
    background: #11181c;
    border: 1px solid #11181c;
    color: #fff;
  }
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

return (
  <Container>
    <Widget src={`${ownerId}/widget/Navbar`} />

    <Content>
      <h4
        style={{
          fontWeight: 500,
          color: theme.textColor3,
          textAlign: "center",
        }}
      >
        To <span style={{ color: theme.textColor }}>{receiverId}</span>
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
          type="number"
          placeholder="0"
          value={value}
          onChange={(e) => setValue(e.target.value)}
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

      <Link
        to={`/nearcon23/home/${ownerId}/widget/Mobile.Home.SendSuccess?receiverId=${receiverId}&amount=${value}`}
      >
        <Button
        // href={props.href ?? `/${ownerId}/widget/Index?tab=register`}
        >
          Send
        </Button>
      </Link>

      <Link to={`/nearcon23/home/${ownerId}/widget/Mobile.Home`}>
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
    </Content>
  </Container>
);
