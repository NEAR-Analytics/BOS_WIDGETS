let { assets, content, contractName } = VM.require(
  `ndcdev.near/widget/daos.Config`
);

assets = assets.home;
content = content.home;

const Description = styled.div`
  color: #1e1d22;
  font-family: Montserrat;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 2rem;

  a {
    text-decoration-line: underline;
  }

  padding-bottom: 3rem;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Item = styled.div`
  width: 370px;
  height: 400px;
  border-radius: 10px;
  border: none;
  border-radius: 10px;
  background: linear-gradient(270deg, #efdcd1 -1.69%, #e0c6f7 43.78%, #adc3fb 99.83%);
  padding: 2px;
  
  span {
    color: #ffffff;
  }

  .bi-plus-circle:hover {
    color: rgb(164, 194, 253);
    fill: rgb(164, 194, 253);
  }

  a.btn {
    &:hover {
      text-decoration: none;
    }
  }

  h4 {
    color: #000
    font-size: 24px;
  }

  .inner {
    height: 100%;
    padding: 0 2rem;
    background: white;
    border-radius: 10px;
    background: #ffffff;
  }

  svg {
    margin: 7px;
  }

  i, svg {
    color: ${darkTheme ? "#f0ddce" : "#A4C2FD"};
    fill: ${darkTheme ? "#f0ddce" : "#A4C2FD"};

    &:hover {
      color: ${darkTheme ? "#fff" : "#151718"};
      fill: ${darkTheme ? "#fff" : "#151718"};
    }
  }

  p {
    font-size: 16px;
    font-weight: 300;
    margin: 0;
  }

  @media screen and (max-width: 786px) {
    width: 100%;
  }
`;

const DaoDesc = styled.div`
  color: #1e1d22;
  text-align: center;
  font-size: 16px;
  font-weight: 400;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DaoLink = styled.a`
  min-width: 200px;
  box-shadow: 0px 20px 30px 0px rgba(0, 0, 0, 0.25);
  background: black;
  i {
    padding-left: 30px;
  }
  span {
    padding-right: 35px;
  }
  :hover {
    background: black;
  }
`;

const CreateGrassrootContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  background: #1e1d22;
  height: 650px;

  @media screen and (max-width: 768px) {
    height: auto;
    padding-bottom: 20px;
  }

  .wrapper {
    position: relative;
    width: 80%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .circle {
      width: 500px;
      height: 500px;
      position: absolute;
      right: 0rem;
      bottom: 0;
      z-index: 1;
      border-radius: 1007px;
      background: linear-gradient(
        180deg,
        rgba(253, 202, 48, 0.5) 0%,
        rgba(235, 157, 187, 0.5) 50%,
        rgba(91, 153, 219, 0.5) 100%
      );
      filter: blur(100px);
      animation: spin 4s linear infinite;

      @keyframes spin {
        0% {
          transform: rotate(0deg);
          scale: 90%;
        }
        50% {
          scale: 100%;
          transform: rotate(180deg);
        }
        100% {
          scale: 90%;
          transform: rotate(360deg);
        }
      }
    }

    .title {
      color: #fff;
      font-size: 48px;
      font-weight: 700;
      padding-top: 6rem;
      z-index: 3;
    }

    .description {
      width: 50%;
      color: #fff;
      font-size: 26px;
      font-weight: 300;
      z-index: 3;

      @media screen and (max-width: 786px) {
        width: 100%;
      }
    }

    a {
      width: 50%;
      z-index: 3;

      @media screen and (max-width: 786px) {
        width: 100%;
      }
    }

    img {
      width: 463px;
      height: 580px;
      position: absolute;
      right: 0rem;
      bottom: 0;
      z-index: 2;

      @media screen and (max-width: 786px) {
        display: none;
      }
    }
  }
`;

const ParalaxImg = styled.div`
  width: 100%;
  background-image: url(${(p) => p.src});
  min-height: 500px;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const [loading, setLoading] = useState(false);

const daos = Near.view(contractName, "get_dao_list");
let proposals = Near.view(contractName, "get_all_posts", {
  page: 0,
  limit: 100,
});

if (!daos || !contractName || !content || !assets || !proposals)
  return <Widget src="flashui.near/widget/Loading" />;

let groupedDaos = daos
  .map((element) => {
    let result = {};
    element.verticals.forEach((list) => {
      if (!result[list]) {
        result[list] = [];
      }
      result[list].push(element);
    });

    return result;
  })
  .filter((item) => Object.keys(item).length !== 0);

proposals = proposals.map((proposal) => {
  return {
    proposal,
    dao: daos.find((dao) => dao.id === proposal.dao_id),
  };
});

let types = new Set();
groupedDaos.forEach((item) => types.add(...Object.keys(item)));

const typeOfProject = Array.from(types).map((item) => {
  return {
    name: item.charAt(0).toUpperCase() + item.slice(1),
    color: "#68D895",
  };
});

return (
  <Container>
    <Widget
      src={`ndcdev.near/widget/daos.Components.RunnerContainer`}
      props={{ proposals }}
    />
    <Wrapper>
      <Widget
        src={`ndcdev.near/widget/daos.Components.Title`}
        props={{
          imgUrl: content.communityTreasury.image,
          text: content.communityTreasury.title,
        }}
      />

      <Widget
        src={`ndcdev.near/widget/daos.Components.MetricsDisplay.index`}
        props={{
          totalTreasury: 3000,
          deliverTreasury: 5000,
          typeOfProject,
          loading,
          text: content.communityTreasury.metrics,
        }}
      />

      <Widget
        src={`ndcdev.near/widget/daos.Components.Title`}
        props={{
          imgUrl: content.whatIsNDC.image,
          text: content.whatIsNDC.title,
        }}
      />
      <Description>{content.whatIsNDC.text}</Description>
    </Wrapper>
    <ParalaxImg src="https://ipfs.near.social/ipfs/bafybeid2ckdorccexjqxnsi3kr4epif4xgqbagdykxtn7wacqk5ajujvy4" />
    <Wrapper>
      <Widget
        src={`ndcdev.near/widget/daos.Components.Title`}
        props={{
          imgUrl: content.whatisGrassrootDAO.image,
          text: content.whatisGrassrootDAO.title,
        }}
      />
      <Description>{content.whatisGrassrootDAO.text}</Description>

      <div className="d-flex flex-wrap justify-content-center gap-3">
        {daos.map((dao) => (
          <Item>
            <div className="inner d-flex flex-column justify-content-center gap-3 align-items-center">
              <Widget
                src={`ndcdev.near/widget/daos.Components.CommunityImage`}
                props={{ image: dao.logo_url, index }}
              />
              <h4 className="bold color-text px-3 mt-1 text-center">
                {dao.title}
              </h4>
              <DaoDesc>{dao.description}</DaoDesc>
              <DaoLink
                href={`/ndcdev.near/widget/daos.App?page=dao&id=${dao.id}`}
                className="btn btn-secondary d-flex justify-content-between"
              >
                <i class="bi bi-plus-circle"></i>
                <span>Join DAO</span>
              </DaoLink>
            </div>
          </Item>
        ))}
      </div>
    </Wrapper>
    <CreateGrassrootContainer>
      <div className="wrapper">
        <div className="d-flex flex-column gap-3">
          <h1 className="title">{content.createyourGrassrootDAO.title}</h1>
          <p className="description">
            <ul>
              <li>{content.createyourGrassrootDAO.items.first}</li>
              <li>{content.createyourGrassrootDAO.items.second}</li>
              <li>{content.createyourGrassrootDAO.items.third}</li>
            </ul>
          </p>
        </div>
        <div className="circle" />
        <img src="https://ipfs.near.social/ipfs/bafybeig2zwkn3lsogyekukxg3bvx5jxz6hsakfbc4zokzopexwksqo7xoe" />
      </div>
    </CreateGrassrootContainer>
    <Wrapper>
      <Widget
        src={`ndcdev.near/widget/daos.Components.Title`}
        props={{
          imgUrl: content.GetFundingForYourProject.image,
          text: content.GetFundingForYourProject.title,
        }}
      />

      <Description>{content.GetFundingForYourProject.text}</Description>
      <Widget
        src={`ndcdev.near/widget/daos.Components.DaosByVertical`}
        props={{ daos }}
      />
    </Wrapper>
  </Container>
);
