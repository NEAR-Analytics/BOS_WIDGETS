const { id, review_notes, status } = props;

const cardData = Social.getr(`${id}/profile`);

console.log(cardData);

const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 408px;
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

const CardImage = styled.img`
  height: 150px;
  width: 100%;
`;

return (
  <Card>
    <CardImage
      src={
        cardData && cardData?.backgroundImage
          ? `https://ipfs.near.social/ipfs/${cardData.backgroundImage.ipfs_cid}`
          : "https://ipfs.near.social/ipfs/bafkreih4i6kftb34wpdzcuvgafozxz6tk6u4f5kcr2gwvtvxikvwriteci"
      }
      alt="project background image"
    />
  </Card>
);
