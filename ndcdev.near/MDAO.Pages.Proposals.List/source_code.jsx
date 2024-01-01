let { assets, content } = VM.require(`ndcdev.near/widget/MDAO.Config`);
assets = assets.home;
content = content.home;

const Container = styled.div`
  width: 100%;
  height: max-content;
  padding: 3rem;

  @media screen and (max-width: 786px) {
    padding: 1rem;
  }
`;

const Card = styled.div`
  border-radius: 10px;
  background: #fff;
  box-shadow: 0px 30px 80px 0px rgba(0, 0, 0, 0.1);
  padding: 2rem 3rem;

  h3 {
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    margin: 10px 0;
  }

  p {
    font-size: 14px;
  }

  .metric {
    border-radius: 10px;
    height: 80px;
    width: 120px;
    background: linear-gradient(
      258deg,
      rgba(162, 195, 254, 0.5) 0%,
      rgba(225, 197, 252, 0.5) 28.72%,
      rgba(241, 220, 210, 0.5) 100%
    );
    @media screen and (max-width: 786px) {
      width: 100%;
    }
  }

  .info {
    display: flex;
    align-items: center;
  }

  .actions {
    margin-top: 1rem;
    gap: 3rem;

    @media screen and (max-width: 786px) {
      gap: 0;
      justify-content: space-between;
    }
  }

  .tag {
    border-radius: 50px;
    background: #a4c2fd;
    width: 140px;
    padding: 2px 0;
    text-align: center;
    color: white;
  }

  @media screen and (max-width: 786px) {
    padding: 1.5rem;
  }
`;

const Button = styled.a`
  border-radius: 10px;
  background: #151718;
  color: white !important;
  text-decoration: none;
  display: flex;
  gap: 1rem;
  box-shadow: 0px 20px 30px 0px rgba(0, 0, 0, 0.25);
  padding: 10px 40px 10px 25px;

  &:hover {
    text-decoration: none;
  }
`;

const items = Social.index("graph", "ndc.mdao", { order: "desc" });
const [showMore, setShowMore] = useState(null);

const CardItem = ({ item, index }) => (
  <Card key={index} className="d-flex flex-column gap-3">
    <Widget
      src="mob.near/widget/Profile"
      props={{
        accountId: item.accountId,
        tooltip: true,
      }}
    />
    <div className="d-flex flex-column gap-1">
      <h3>{item.project_name}</h3>
      <div className="d-flex flex-column gap-1">
        {item.type === "proposal" && (
          <div className="info">
            <small style={{ width: "150px" }}>Requested amount:</small>
            <small>{item.requested_amount ?? 0} USD</small>
          </div>
        )}
        <div className="info">
          <small style={{ width: "150px" }}>Requested sponsor:</small>
          <div className="d-flex align-items-center gap-1">
            <small>
              <Widget
                src="mob.near/widget/ProfileImage"
                props={{
                  accountId: content.daoAccountId,
                  style: { height: "20px", width: "20px" },
                }}
              />
            </small>
            <small>{content.dao}</small>
          </div>
        </div>
        {item.attachments && (
          <div className="info">
            <small style={{ width: "150px" }}>Attachments:</small>
            <small>
              <a href={item.attachments} download>
                <i className="bi bi-download" />
                Download File
              </a>
            </small>
          </div>
        )}
        {item.contact && (
          <div className="info">
            <small style={{ width: "150px" }}>Contact telegram:</small>
            <small>{item.contact}</small>
          </div>
        )}
      </div>
    </div>
    <small>
      <div
        role="button"
        className="d-flex gap-2 align-items-center"
        onClick={() => setShowMore(showMore === index ? null : index)}
      >
        <i
          className={`fs-5 bi ${
            showMore === index ? "bi-eye-slash" : "bi-eye"
          }`}
        />
        <b>See more</b>
      </div>
    </small>
    {showMore === index && (
      <>
        {item.type === "report" ? (
          <>
            <div>
              <small>
                <b>Metrics</b>
              </small>
              <div className="d-flex flex-wrap gap-2">
                <div className="metric d-flex flex-column justify-content-center align-items-center">
                  <small>Audience</small>
                  <b>{item["metric:audience"]}%</b>
                </div>
                <div className="metric d-flex flex-column justify-content-center align-items-center">
                  <small>AER</small>
                  <b>{item["metric:average_engagement_rate"]}%</b>
                </div>
                <div className="metric d-flex flex-column justify-content-center align-items-center">
                  <small>Growth</small>
                  <b>{item["metric:growth"]}%</b>
                </div>
              </div>
            </div>
            <div>
              <small>
                <b>
                  Performance Statement: What is the biggest win (most improved
                  part of project) during this funding period vs. the previous
                  one (if applicable)?
                </b>
              </small>
              <Widget
                src="mob.near/widget/SocialMarkdown"
                props={{ text: item["performance_statement:answer_1"] }}
              />
            </div>
            <div>
              <small>
                <b>
                  Performance statement: What is the biggest challenge your
                  project is facing? What did not improve during this funding
                  period?
                </b>
              </small>
              <Widget
                src="mob.near/widget/SocialMarkdown"
                props={{ text: item["performance_statement:answer_2"] }}
              />
            </div>
          </>
        ) : (
          <div>
            <Widget
              src="mob.near/widget/SocialMarkdown"
              props={{ text: item.description }}
            />
          </div>
        )}
      </>
    )}

    {item.tag && (
      <div className="d-flex flex-wrap gap-2">
        {item.tag?.map((tag) => (
          <div className="tag">{tag}</div>
        ))}
      </div>
    )}
    <div className="actions d-flex">
      <div className="d-flex gap-2">
        <i className="bi bi-heart" /> Like
      </div>
      <div className="d-flex gap-2">
        <i className="bi bi-reply" /> Reply
      </div>
      <div className="d-flex gap-2">
        <i className="bi bi-share" /> Share
      </div>
    </div>
  </Card>
);

return (
  <Container>
    <h1>{items[0].value.type === "proposal" ? "Proposals" : "Reports"} List</h1>
    <div className="d-flex justify-content-end mb-4">
      <Button href="/ndcdev.near/widget/MDAO.App?page=createProposal">
        <i className="bi bi-plus-circle" />
        Post
      </Button>
    </div>
    <div className="d-flex flex-column gap-4">
      {items &&
        items
          .filter((i) => i.value.type === props.type)
          .map((item, index) => <CardItem item={item.value} index={index} />)}
    </div>
  </Container>
);
