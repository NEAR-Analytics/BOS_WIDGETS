const { houses, selectedHouse, handleSelect, myVotes } = props;

const housesMapping = {
  CouncilOfAdvisors: {
    title: "Council Of Advisors",
    src: "https://bafkreidejnek5zzwlhd3lxnr7s3tvtrgul6jobfpikbs7zjkpuovxdz7je.ipfs.nftstorage.link",
  },
  HouseOfMerit: {
    title: "House of Merit",
    src: "https://bafkreihoomeeaeyqerqftn3n7yb2jrnmqtpwgpsl3xpelek6qmly3qzob4.ipfs.nftstorage.link",
  },
  TransparencyCommission: {
    title: "Transparency Commission",
    src: "https://bafkreihcog3rs2gj4wgwfixk6yqir7k3csyaqiqwcvm2gedlh6dlvr7ik4.ipfs.nftstorage.link",
  },
};

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

const Stepper = styled.div`
  background: #FDFEFF;
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 16px;

  h3, h4 {
    margin: 0 3px;
  }
`;

const ProgressBar = styled.div`
  margin-top: 8px;
  border-radius: 100px;
  background: #F5F5F5;
  padding: 3px;
  height: 21px;

`;

const DoneBar = styled.div`
  border-radius: 100px;
  background: #239F28;
  height: 100%;
`;

const CompleteText = styled.span`
  color: #239F28;
  margin-bottom: 0px;
  font-weight: 900;
  font-size: 22px;
`;

State.init({ step: 1 });

const votesLeft = (house) =>
  house.seats - myVotes.filter((vote) => vote.house === house.typ).length;

const completedCount = () => {
  const step = 0;
  houses.map((house) => {
    step += votesLeft(house) === 0 ? 1 : 0;
  });
  State.update({ step });
};

const HouseItem = ({ house }) => (
  <ItemContainer
    role="button"
    className="d-flex p-3 px-4 align-items-center mb-3 justify-content-between"
    onClick={() => handleSelect(house)}
    selected={selectedHouse === house.id}
  >
    <div className="d-flex align-items-center">
      <ImgContainer>
        <Widget
          src="mob.near/widget/Image"
          props={{
            image: { url: housesMapping[house.typ].src },
            alt: housesMapping[house.typ].title,
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
        <h6>{housesMapping[house.typ].title}</h6>
        <Small>
          {votesLeft(house)} / {house.seats} votes left
        </Small>
      </div>
    </div>
    <div>
      {votesLeft(house) === 0 && (
        <CompletedIcon
          className="bi bi-check-circle fs-5"
          selected={selectedHouse === house.id}
        />
      )}
    </div>
  </ItemContainer>
);

return (
  <div>
    <div>
      {houses.map((house) => (
        <HouseItem house={house} />
      ))}
    </div>
    <Stepper className="position-sticky">
      <div className="d-flex justify-content-between">
        <div>Your voting progress</div>
        <div>
          <CompleteText> {state.step}</CompleteText>/
          <span className="text-secondary">{houses.length}</span>
          <span className="text-secondary">Houses</span>
        </div>
      </div>
      <ProgressBar className="position-relative">
        {state.step > 0 && <DoneBar className={`col-${state.step * 4}`} />}
        <div className="position-absolute top-0 start-50">
          <small>
            <b className={`${state.step > 1 ? "text-light" : "inherit"}`}>
              {state.step === 3 ? 100 : state.step * 33} %
            </b>
          </small>
        </div>
      </ProgressBar>
    </Stepper>
  </div>
);
