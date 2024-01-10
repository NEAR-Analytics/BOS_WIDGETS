const { id, review_notes, status } = props;

const cardData = Social.getr(`${id}/profile`);

const MAX_DESCRIPTION_LENGTH = 60;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 408px;
  border-radius: 2px;
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

const CardBody = styled.div`
    position: relative;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const CardImage = styled.img`
  height: 150px;
  width: 100%;
`;

const CardTitle = styled.div`
    color: #292929;
    font-size: 17px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
`;

const CardDescription = styled.div`
    color: #292929;
    font-size: 17px;
    font-style: normal;
    font-weight: 400;
    line-height: 28px;
`;

const CardTag = styled.div`
    color: #292929;
    width: max-content;
    white-space: nowrap;
    padding: 8px;
    border-radius: 4px;
    box-shadow: 0px -1px 0px 0px #C7C7C7 inset, 0px 0px 0px 0.5px #C7C7C7; 
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
`;

const CardTagContainer = styled.div`
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
`;

const CardAvatar = styled.img`
    position: absolute;
    top: -20px;
    left: 24px;
    border-radius: 100%;
    width: 40px;
    height: 40px;
    border: 3px solid #FFF;
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
    <CardBody>
      <CardAvatar src={cardData?.image.ipfs_cid} alt="project avatar" />
      <CardTitle>{cardData?.name}</CardTitle>
      {/* <CardDescription>
        {cardData && cardData?.description.length > MAX_DESCRIPTION_LENGTH
          ? cardData.description.slice(0, MAX_DESCRIPTION_LENGTH) + "..."
          : cardData.description}
      </CardDescription> */}
      <CardTagContainer>
        <CardTag>{cardData?.category}</CardTag>
      </CardTagContainer>
    </CardBody>
  </Card>
);
