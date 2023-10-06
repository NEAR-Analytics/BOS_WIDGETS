const data1 = Social.keys("*/profile/image/nft", "final");
const data2 = Social.keys("*/profile/image/url", "final");
const data3 = Social.keys("*/profile/image/ipfs_cid", "final");

if (!data1 || !data2 || !data3) {
  return "Loading";
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  > div {
    width: 3em;
    height: 3em;
    display: inline-block;
    overflow: hidden;

    > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    } 
  }
`;

const accounts = [
  ...new Set([
    ...Object.keys(data1),
    ...Object.keys(data2),
    ...Object.keys(data3),
  ]),
].map((accountId) => (
  <div>
    <img
      src={`https://i.near.social/magic/thumbnail/https://near.social/magic/img/account/${accountId}`}
      alt={accountId}
      title={accountId}
    />
  </div>
));

return <Wrapper>{accounts}</Wrapper>;
