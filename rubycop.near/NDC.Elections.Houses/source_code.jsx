const { houses, selectedHouse, handleSelect } = props;

const housesMapping = {
  CouncileOfAdvisors: {
    title: "Council of Advisors",
    src: "https://ipfs.near.social/ipfs/bafkreie4rfa63zedwnpbwm5lglqrwqhahcnf6slllqmq7sh46ngf5y4vsq",
  },
  HouseOfMerit: {
    title: "House of Merit",
    src: "https://ipfs.near.social/ipfs/bafkreie4rfa63zedwnpbwm5lglqrwqhahcnf6slllqmq7sh46ngf5y4vsq",
  },
  TransparencyCommission: {
    title: "Transparency Commission",
    src: "https://ipfs.near.social/ipfs/bafkreie4rfa63zedwnpbwm5lglqrwqhahcnf6slllqmq7sh46ngf5y4vsq",
  },
};

const profileImg =
  "https://ipfs.near.social/ipfs/bafkreie4rfa63zedwnpbwm5lglqrwqhahcnf6slllqmq7sh46ngf5y4vsq";

const Small = styled.small`
  font-weight: 400;
`;

const H6 = styled.h6`
  margin-bottom: 0;
  font-weight: 600;
`;

const ImgContainer = styled.div`
  margin-right: 20px;
`;

const WarningCircle = styled.div`
  position: absolute;
  right: 15px;
  top: -3px;
  border-radius: 50%;
  border: 3px solid;
  border-color: ${(props) => (props.selected ? "#9333EA" : "#FFFFFF")};
  background: red;
  z-index: 100;
  width: 17px;
  height: 17px;
`;

const ItemContainer = styled.div`
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  border: 1px solid;
  background: ${(props) =>
    props.selected
      ? "linear-gradient(90deg, #9333EA 0%, #4F46E5 100%)"
      : "#FFFFFF"};
  border-color: ${(props) => (props.selected ? "#4F46E5" : "#ffffff")};
  color: ${(props) => (props.selected ? "white" : "inherit")};

  &:hover {
    border: 1px solid #4F46E5;
    background: ${(props) =>
      props.selected
        ? "linear-gradient(90deg, #9333EA 0%, #4F46E5 100%)"
        : "linear-gradient(90deg, rgba(147, 51, 234, 0.08) 0%, rgba(79, 70, 229, 0.08) 100%)"};
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.05);
  }
`;

const GroupItem = ({ item }) => (
  <ItemContainer
    role="button"
    className="d-flex p-3 px-4 align-items-center mb-3"
    onClick={() => handleSelect(item)}
    selected={selectedHouse === item.id}
  >
    <div className="position-relative">
      {!item.submitted && (
        <WarningCircle selected={selectedHouse === item.id} />
      )}
      <ImgContainer>
        <Widget
          src="mob.near/widget/Image"
          props={{
            image: { url: housesMapping[item.typ].src },
            alt: housesMapping[item.typ].title,
            style: {
              height: "40px",
              objectFit: "cover",
              maxHeight: "40px",
              borderRadius: "50%",
            },
            fallbackUrl:
              "https://ipfs.near.social/ipfs/bafkreibmiy4ozblcgv3fm3gc6q62s55em33vconbavfd2ekkuliznaq3zm",
          }}
        />
      </ImgContainer>
    </div>
    <div>
      <h6>{housesMapping[item.typ].title}</h6>
      <Small>
        {item.seats} / {item.seats} votes left
      </Small>
    </div>
  </ItemContainer>
);

return (
  <div>
    {houses.map((item) => (
      <GroupItem item={item} />
    ))}
  </div>
);
