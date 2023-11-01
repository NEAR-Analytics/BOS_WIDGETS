const { secretkey } = props;
const ownerId = "nearcon23.near";
const baseUrl =
  "https://gqqkd7l7mk.execute-api.us-east-1.amazonaws.com/mainnet";

const storedSecretKey = Storage.get(
  "newPrivateKey",
  `${ownerId}/widget/Ticket.Page`
)
  ? Storage.get("newPrivateKey", `${ownerId}/widget/Ticket.Page`)
  : Storage.get("newPrivateKey", `${ownerId}/widget/RegisterMobile.Index`);

const fetchData = () => {
  const key = secretkey ? secretkey : storedSecretKey;
  asyncFetch(`${baseUrl}/api/v1/accounts/auth/${key}`).then(({ body }) => {
    if (!!storedSecretKey === false) {
      State.update({
        redirectToHome: "redirect",
      });
    }
    State.update({
      userData: body,
    });
  });
};

const fetchTransaction = () => {
  if (state?.userData?.nearconId) {
    const apiURL = `${baseUrl}/api/v1/transactions/${state?.userData?.nearconId}`;
    asyncFetch(apiURL).then(({ body }) => {
      State.update({ transactions: body });
    });
  }
};

useEffect(() => {
  fetchData();
  fetchTransaction();
}, [secretkey, storedSecretKey, state.userData]);

function convertToReadableDate(dateString) {
  const date = new Date(dateString);

  // Get the components of the date
  let hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const day = date.getUTCDate();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = months[date.getUTCMonth()];

  // Convert to 12-hour format and set AM or PM
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  // Formatting minutes to always be two digits
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

  // Construct the formatted string
  return `${hours}:${formattedMinutes} ${ampm}  ${day} ${month}`;
}

return (
  <>
    <Widget
      props={{
        nearconId: state.userData.nearconId,
        cid: state.userData.cid,
      }}
      src={`${ownerId}/widget/Navbar`}
    />
    <Widget src={`${ownerId}/widget/Mobile.TransactionsTitleBar`} />
    {(state.transactions ?? []).map((item) => (
      <Widget
        props={{
          sent: item.senderId === state.userData.nearconId,
          image:
            item.senderId === state.userData.nearconId
              ? item?.receiverCid
              : item.senderCid,
          amount: item.amount,
          accountId:
            item.senderId === state.userData.nearconId
              ? item.receiverId
              : item.senderId,
          time: convertToReadableDate(item.createdAt),
        }}
        src={`${ownerId}/widget/Components.TransactionCard`}
      />
    ))}
  </>
);
