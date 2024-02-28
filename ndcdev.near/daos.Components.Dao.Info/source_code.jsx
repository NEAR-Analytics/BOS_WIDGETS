const { dao, section } = props;

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

const ReadMore = ({ title, href }) => (
  <a href="" className="text-center btn-primary d-flex justify-content-end">
    <div className="d-flex justify-content-between">
      <a href={href}>{title}</a>
      <i className="bi bi-chevron-right" />
    </div>
  </a>
);

const Info = ({ card }) => (
  <div className="item d-flex mt-5 flex-column gap-3">
    <div className="header d-flex gap-3 text-center">
      <img className="icon" src={card.icon} />
      <h4>{card.title}</h4>
    </div>
    <p>{card.description}</p>
  </div>
);

return (
  <Wrapper>
    <div className="content">
      <div>
        <Widget
          src={`ndcdev.near/widget/daos.Components.Title`}
          props={{ text: dao.title }}
        />
        <Widget
          src={`ndcdev.near/widget/daos.Components.Description`}
          props={{ text: dao.description }}
        />
      </div>
      <div className="d-flex flex-column">
        {section.info.cards.map((card) => (
          <Info card={card} />
        ))}
      </div>
    </div>

    <Widget src={`ndcdev.near/widget/daos.Components.Circles`} />
  </Wrapper>
);
