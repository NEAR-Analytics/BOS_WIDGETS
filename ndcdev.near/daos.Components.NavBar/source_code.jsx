const { assets } = VM.require(`ndcdev.near/widget/daos.Config`);
const { hasNotifications } = props;

const Navbar = styled.div`
  padding: 1.5rem 3rem;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: #151718;

  @media screen and (max-width: 768px) {
    padding: 1.5rem 2rem;

    img {
      width: 50px;
      height: 50px;
    }
  }
`;

const LinksContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 3rem;
  color: #a4c2fd;

  a {
    &:hover {
      text-decoration: none;
    }
  }

  .circle {
    position: absolute;
    top: 5px;
    width: 15px;
    height: 15px;
    background-color: #ee9cbf;
    border-radius: 50%;
    border: 3px solid #151718;
  }
`;

return (
  <Navbar className="position-relative">
    <a href={`/ndcdev.near/widget/daos.App?page=home`}>
      <img src={assets.logoWhite} />
    </a>
    <div className="d-flex gap-5 align-items-center">
      <LinksContainer>
        <div className="position-relative">
          <a href="/ndcdev.near/widget/daos.App?page=notifications">
            <i className="bi bi-bell-fill fs-3" />
          </a>
          {hasNotifications && <div class="circle" />}
        </div>
        <a href="/ndcdev.near/widget/daos.App?page=setttings">
          <i className="bi bi-gear-fill fs-3" />
        </a>
        <a href="/ndcdev.near/widget/daos.App?page=profile">
          <i className="bi bi-person-circle fs-3" />
        </a>
      </LinksContainer>
    </div>
  </Navbar>
);
