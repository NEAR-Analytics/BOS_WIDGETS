const { id, review_notes, status } = props;

console.log("props: ", props);

const cardData = Social.getr(`${id}/profile`);

console.log("cardData: ", cardData);

const backgroundImage = `https://ipfs.near.social/ipfs/${cardData.backgroundImage.ipfs_cid}`;

console.log("background image: ", backgroundImage)

const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 12px;
  background: white;
  box-shadow: 0px -2px 0px #dbdbdb inset;
  border: 1px solid #dbdbdb;
  &:hover {
    text-decoration: none;
    cursor: pointer;
  }
  margin-left: auto;
  margin-right: auto;
  height: 422;
  overflow: hidden;
`;

const CardImage = styled.div`
  background-image: gray
    url(${
      backgroundImage ??
      "https://ipfs.near.social/ipfs/bafkreih4i6kftb34wpdzcuvgafozxz6tk6u4f5kcr2gwvtvxikvwriteci"
    });
  background-position: center;
  background-size: cover;
  height: 150px;
  width: 100%;
`;

return (
  <Card>
    <CardImage />
  </Card>
);
