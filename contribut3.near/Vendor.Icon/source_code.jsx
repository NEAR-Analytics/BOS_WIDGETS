const ownerId = "contribut3.near";
const accountId = props.accountId || context.accountId;
const size = props.size ?? "1.5em";

State.init({
  profile: null,
  profileIsFetched: false,
});

if (!state.profileIsFetched) {
  Near.asyncView(
    "social.near",
    "get",
    { keys: [`${accountId}/profile/**`] },
    "final",
    false
  ).then((profile) =>
    State.update({
      profile: profile[accountId].profile,
      profileIsFetched: true,
    })
  );
  return "Loading...";
}

const fullName = state.profile.name || state.profile.name || accountId;
const image = state.profile.image;
const url =
  (image.ipfs_cid
    ? `https://ipfs.near.social/ipfs/${image.ipfs_cid}`
    : image.url) || "https://thewiki.io/static/media/sasha_anon.6ba19561.png";

const imageSrc = `https://i.near.social/thumbnail/${url}`;

const ImageCircle = styled.img`
  background: #fafafa;
  border-radius: 100%;
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const ImageContainer = styled.div`
  display: inline-block;
  --size: ${({ size }) => size};
  width: var(--size, 1.5em);
  height: var(--size, 1.5em);
`;

return (
  <ImageContainer title={`${fullName} @${accountId}`} size={size}>
    <ImageCircle src={imageSrc} alt="profile image" />
  </ImageContainer>
);
