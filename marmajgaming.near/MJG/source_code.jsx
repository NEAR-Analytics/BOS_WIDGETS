const ResponsiveContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  box-sizing: border-box;
  width: 100%;
  background: linear-gradient(45deg, #f3ec78, #af4261);


  @media screen and (min-width: 576px) {
    max-width: 540px;
    margin: auto;
  }

  @media screen and (min-width: 768px) {
    max-width: 720px;
    margin: auto;
  }

  @media screen and (min-width: 992px) {
    max-width: 960px;
    margin: auto;
  }

  @media screen and (min-width: 1200px) {
    max-width: 1140px;
    margin: auto;
  }
`;

return (
  <ResponsiveContainer>
    <Widget src="jay100.near/widget/MJG" />
  </ResponsiveContainer>
);
