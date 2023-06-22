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
  TransparancyCommision: {
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

const CompletedIcon = styled.i`
  border-radius: 50%;
  padding-bottom: 0;
  color: #239f28;
  background: #cee9cf;

  &:before {
    vertical-align: -0.2rem;
  }
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
    className="d-flex p-3 px-4 align-items-center mb-3 justify-content-between"
    onClick={() => handleSelect(item)}
    selected={selectedHouse === item.id}
  >
    <div className="d-flex align-items-center">
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
      <div>
        <h6>{housesMapping[item.typ].title}</h6>
        <Small>{item.seats} votes left</Small>
      </div>
    </div>
    <div>
      {item.available_seats === 0 && (
        <CompletedIcon
          className="bi bi-check-circle fs-5"
          selected={selectedHouse === item.id}
        />
      )}
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
