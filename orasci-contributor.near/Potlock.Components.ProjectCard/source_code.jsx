const {
  id,
  review_notes,
  status,
  totalAmount,
  isExistedInCart,
  removeProjectsFromCart,
  addProjectsToCart,
  setIsCartModalOpen,
} = props;

const donationContractId = "donate.potlock.near";
const IPFS_BASE_URL = "https://ipfs.near.social/ipfs/";
const cardData = Social.getr(`${id}/profile`);

const donationsForProject = Near.view(
  donationContractId,
  "get_donations_for_recipient",
  {
    recipient_id: id,
  }
);

const handleCart = () => {
  if (existsInCart) {
    removeProjectsFromCart([id]);
  } else {
    addProjectsToCart([
      {
        id: id,
        amount: "1",
        ft: "NEAR",
        referrerId: props.referrerId,
        potId: props.potId,
      },
    ]);
    setIsCartModalOpen(true);
  }
};

const getCategory = (category) => {
  switch (category) {
    case "social-impact":
      return "Social Impact";
    case "non-profit":
      return "Non Profit";
    case "climate":
      return "Climate";
    case "public-good":
      return "Public Good";
    case "de-sci":
      return "Desci";
    case "open-source":
      return "Open Source";
    case "community":
      return "Community";
    case "education":
      return "Education";
  }
};

const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 408px;
  border-radius: 2px;
  background: white;
  box-shadow: 0px -2px 0px #dbdbdb inset;
  border: 1px solid #292929; 
  min-height: 429px;
  margin-left: auto;
  margin-right: auto;
  height: max-content;
  overflow: hidden;
`;

const CardBody = styled.div`
    position: relative;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    flex-grow: 1;
`;

const CardImage = styled.img`
  height: 150px;
  min-height: 150px;
  width: 100%;
`;

const CardTitle = styled.div`
    color: #292929;
    font-size: 17px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const CardDescription = styled.div`
    color: #292929;
    font-size: 17px;
    font-style: normal;
    font-weight: 400;
    line-height: 28px;
    flex-grow: 1;
`;

const CardTag = styled.div`
    color: #292929;
    width: max-content;
    white-space: nowrap;
    padding: 8px;
    border-radius: 4px;
    box-shadow: 0px -1px 0px 0px #C7C7C7 inset, 0px 0px 0px 0.5px #C7C7C7; 
    border: 1px solid #c7c7c7;
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

const CardFooter = styled.div`
    border-top: 1px solid #000;
    padding: 16px 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const TotalDonate = styled.div`
    color: #292929;
    font-size: 17px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
`;

const DonationButton = styled.a`
    padding: 12px 16px;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; 
    background: #FEF6EE;
    border-radius: 6px; 
    border: none;
    color: #292929;
    box-shadow: 0px -2px 0px 0px #464646 inset, 0px 0px 0px 1px #464646; 
    &:hover {
        background: #dd3345;
        color: #FFF;
        text-decoration: none;
    }
`;

const AddToCartButton = styled.button`
    border: none;
    background: none;
    color: #dd3345;
    text-decoration: none;
    white-space: nowrap;
    &:hover {
        text-decoration: underline;
    }
    padding: 12px 16px;
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 16px;
    align-items: center;
`;

return (
  <Card>
    <CardImage
      src={
        cardData &&
        cardData?.backgroundImage &&
        cardData?.backgroundImage?.ipfs_cid
          ? `${IPFS_BASE_URL}${cardData.backgroundImage.ipfs_cid}`
          : "https://ipfs.near.social/ipfs/bafkreih4i6kftb34wpdzcuvgafozxz6tk6u4f5kcr2gwvtvxikvwriteci"
      }
      alt="background"
    />
    <CardBody>
      <CardAvatar
        src={
          cardData && cardData?.image && cardData?.image?.ipfs_cid
            ? `${IPFS_BASE_URL}${cardData.image.ipfs_cid}`
            : "https://ipfs.near.social/ipfs/bafkreih4i6kftb34wpdzcuvgafozxz6tk6u4f5kcr2gwvtvxikvwriteci"
        }
        alt="avatar"
      />
      <CardTitle>{cardData?.name}</CardTitle>
      <CardDescription>
        {cardData && cardData?.description.length > 60
          ? cardData.description.slice(0, 70) + "..."
          : cardData.description}
      </CardDescription>
      <CardTagContainer>
        <CardTag>
          {cardData && typeof cardData?.category === "object"
            ? getCategory(cardData.category.value)
            : getCategory(cardData.category)}
        </CardTag>
      </CardTagContainer>
    </CardBody>
    <CardFooter>
      <TotalDonate>
        ${totalAmount(donationsForProject)}{" "}
        <span style={{ fontWeight: 400 }}>Raised</span>
      </TotalDonate>
      <ButtonGroup>
        <AddToCartButton onClick={handleCart}>
          {isExistedInCart ? "Remove from cart" : "Add to cart"}
        </AddToCartButton>
        <DonationButton href={`?tab=project&projectId=${id}`} target="_blank">
          Donate
        </DonationButton>
      </ButtonGroup>
    </CardFooter>
  </Card>
);
