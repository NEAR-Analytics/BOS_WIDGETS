const ownerId = "nearcon23.near";
const baseUrl =
  "https://gqqkd7l7mk.execute-api.us-east-1.amazonaws.com/mainnet/api/v1";
const {
  props: { contractId, secretKey },
} = props;

const [isValidTicket, setValidTicket] = useState(false);
const [redirectToMobile, setRedirectToMobile] = useState(false);
const [redirectCreateAccount, setRedirectCreateAccount] = useState(false);

const apiURL = `${baseUrl}/accounts/${secretKey}/validate`;
const apiURL2 = `${baseUrl}/accounts/auth/${secretKey}`;

const redirect = () => {
  asyncFetch(apiURL)
    .then(({ body }) => {
      if (body.redirectTo === "CREATE_ACCOUNT_PAGE") {
        setRedirectCreateAccount(true);
      } else if (body.redirectTo === "QR_CODE_PAGE") {
        setValidTicket(true);
      }
    })
    .catch((err) => {
      setValidTicket(false);
    });
};

const checkIfValidAccount = () => {
  asyncFetch(apiURL2).then(({ body }) => {
    const { nearconId, newPrivateKey, newPublicKey } = body;
    if (newPrivateKey) {
      Storage.set("newPrivateKey", newPrivateKey);
      Storage.set("newPublicKey", newPublicKey);
      Storage.set("accountId", nearconId);
      setRedirectToMobile(true);
    }
  });
};

useEffect(() => {
  redirect();
  checkIfValidAccount();
  const interval = setInterval(() => redirect(), 5000);
  return () => {
    clearInterval(interval);
  };
}, []);

if (redirectToMobile) {
  return <Redirect to="/mobile" />;
}

return redirectCreateAccount ? (
  <>
    <Widget
      props={{
        secretKey,
      }}
      src={`${ownerId}/widget/RegisterMobile.Index`}
    />
  </>
) : (
  <>
    <Widget src={`${ownerId}/widget/Ticket.Header`} />
    <Widget
      src={`${ownerId}/widget/Ticket.Content`}
      props={{ isValidTicket, contractId, secretKey }}
    />
  </>
);
