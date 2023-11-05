const cardStyles = {
  image: {
    height: "10%",
    borderRadius: 10,
    border: "3px solid #ffffff",
    boxShadow: "5px 5px 8px #afafaf,    -5px -5px 8px #ffffff",
    objectFit: "cover",
  },
};
return (
  <img
    style={cardStyles.image}
    src={`https://ipfs.near.social/ipfs/${props.img.cid}`}
    alt="uploaded"
  />
);
