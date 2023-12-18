const page = props.page;
const imageLink =
  "https://i.postimg.cc/g0J5RRWR/The-Decentralized-Donation-Hub-4.png";

const ImageContainer = styled.img`
  ${page !== "home" && "display: none;"}

  object-fit: fit;
`;

return (
  <>
    <ImageContainer src={imageLink} />
  </>
);
