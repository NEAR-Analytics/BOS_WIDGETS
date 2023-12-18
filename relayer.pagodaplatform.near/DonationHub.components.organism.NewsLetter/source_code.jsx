const page = props.page;
const imageLink = "https://i.postimg.cc/4dQF0gsY/Footer-Quote-1.png";

const ImageContainer = styled.img`
  ${page !== "home" && "display: none;"}

  object-fit: fit;
`;

return (
  <>
    <ImageContainer src={imageLink} />
  </>
);
