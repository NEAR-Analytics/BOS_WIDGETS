const xSocialCardData = {
  name: "PorXD",
  role: "Driver",
  nftImage: {
    // contractId: "porx-dev.near",
    tokenId: "50",
  },
  email: "porxdev@mail.com",
  social: {
    linkedin: props.social?.linkedin,
    twitter: props.social?.twitter || "https://twitter.com/nearprotocol",
    instagram:
      props.social?.instagram || "https://www.instagram.com/near_protocol",
    phone: props.social?.phone,
  },
};

State.init({
  name: "",
});

let input = "";

const handleChange = (v) => {
  State.update({
    name: v,
  });
};

return (
  <>
    <p>Hello Near</p>
    <input
      onChange={({ target }) => {
        handleChange(target.value);
      }}
    />
    <Widget src="evangel.near/widget/connect" props={{}} />
    <Widget
      src="ahnff.near/widget/SocialCard"
      props={{
        ...xSocialCardData,
        name: State.name,
      }}
    />
  </>
);
