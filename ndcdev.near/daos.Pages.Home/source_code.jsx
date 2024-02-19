let { assets, content } = VM.require(`ndcdev.near/widget/daos.Config`);
let { Hero } = VM.require(`ndcdev.near/widget/daos.Components.Hero`);

assets = assets.home;
content = content.home;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;

  h3 {
    font-size: 2rem;
    font-weight: 400;
  }

  h4 {
    font-size: 1.5rem;
    font-weight: 300;
  }
`;

return <Container></Container>;
