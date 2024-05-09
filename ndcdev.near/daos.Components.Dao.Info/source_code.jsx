let { content } = VM.require(`ndcdev.near/widget/daos.Config`);
if (!content) return <Widget src="flashui.near/widget/Loading" />;

const { dao, section } = props;

const daoContent = JSON.parse(dao.metadata.content);

const Wrapper = styled.div`
  position: relative;
  overflow: hidden;
  z-index: 1;
  padding: 4rem;

  @media screen and (max-width: 786px) {
    padding: 2rem;
  }

  div.content {
    position: relative;
    z-index: 3;
  }
`;

const Info = ({ card }) => (
  <div className="item d-flex mt-5 flex-column gap-3">
    <div className="header d-flex gap-3 text-center">
      <img className="icon" src={card.icon} />
      <h4>{card.title}</h4>
    </div>
    <p>
      <Widget
        src="ndcdev.near/widget/daos.Components.MarkdownViewer"
        props={{
          text: daoContent.info[card.title].description,
        }}
      />
    </p>
    {daoContent.info[card.title].href && (
      <div className="d-flex justify-content-between">
        <a href={daoContent.info[card.title].href}>Read More</a>
        <i className="bi bi-chevron-right" />
      </div>
    )}
  </div>
);

return (
  <Wrapper>
    <div className="content">
      <div>
        <Widget
          src={`ndcdev.near/widget/daos.Components.Title`}
          props={{ title: dao.title, description: dao.description }}
        />
      </div>
      <div className="d-flex flex-column">
        {content.info.cards.map((card) => (
          <Info card={card} />
        ))}
      </div>
    </div>

    <Widget src={`ndcdev.near/widget/daos.Components.Circles`} />
  </Wrapper>
);
