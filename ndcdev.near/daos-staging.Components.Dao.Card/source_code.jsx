let { content } = VM.require(`ndcdev.near/widget/daos-staging.Config`);
const { dao, index } = props;

if (!content) return <Widget src="flashui.near/widget/Loading" />;

const daoContent = JSON.parse(dao.metadata.contacts);

const DaoCard = styled.div`
  width: 420px;
  height: 400px;
  border-radius: 10px;
  color: #11181c;
  background: #fbfcfd;
  border: 1px solid #d7dbdf;

  h4 {
    color: #000
    font-size: 24px;
  }

  .inner {
    height: 100%;
    padding: 2rem;
  }

  p {
    font-size: 16px;
    font-weight: 300;
    margin: 0;
  }

  @media screen and (max-width: 786px) {
    width: 100%;
    height: 450px;
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
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 20px 30px 0px rgba(0, 0, 0, 0.25);
  background: black;
  padding: 10px 25px;
  color: white !important;

  &.secondary {
    background: transparent;
    border: 1px solid black;
    color: black !important;
  }
`;

const ButtonsWrapper = styled.div`
  @media screen and (max-width: 786px) {
    flex-direction: column;
  }
`;

const CardLinks = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-beetwen;

  @media screen and (max-width: 786px) {
    flex-direction: column;
    gap: 20px;
  }
`;

return (
  <DaoCard>
    <div className="inner d-flex flex-column justify-content-between gap-3 align-items-center">
      <Widget
        src={`ndcdev.near/widget/daos-staging.Components.CommunityImage`}
        props={{ image: dao.logo_url, index }}
      />
      <div className="gap-2">
        <h4 className="bold color-text px-3 mt-1 text-center">{dao.title}</h4>
        <DaoDesc>{dao.description}</DaoDesc>
      </div>

      <CardLinks>
        <a
          href={`/ndcdev.near/widget/daos-staging.App?page=dao&id=${dao.handle}`}
          className="btn btn-primary d-flex justify-content-center"
        >
          <div className="d-flex gap-2 justify-content-center w-100">
            <i class="ph ph-plus fs-5"></i>
            Join DAO
          </div>
        </a>
        {daoContent.website && (
          <a href={daoContent.website} className="btn btn-secondary">
            <div className="d-flex gap-2 justify-content-center w-100">
              <i class="ph ph-arrow-square-out fs-5"></i>
              Visit Website
            </div>
          </a>
        )}
      </CardLinks>
    </div>
  </DaoCard>
);
