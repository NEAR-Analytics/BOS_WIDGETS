const page = props.page;
const imageLink = "https://i.postimg.cc/4dQF0gsY/Footer-Quote-1.png";

const ImageContainer = styled.img`
  ${page !== "home" && "display: none;"}
  height: 385px;
  width: 100%;
  object-fit: cover;
`;

return (
  <>
    <ImageContainer src={imageLink} />
  </>
);
