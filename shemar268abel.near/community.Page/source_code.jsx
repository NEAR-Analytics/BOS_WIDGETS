const Gradient = styled.div`
   {
    width: 100%;
    margin-top: -25px;
    margin-bottom: 25px;
    height: 250px;
    text-align: center;
    background: #000;

    font-family: Arial, sans-serif;
  }

  .subtitle-above {
    font-size: 18px;
    letter-spacing: 1px;
    font-family: Courier, monospace;
  }

  .subtitle-below {
    font-size: 16px;
        font-family: Courier, monospace;

  }

  .slogan {
    font-weight: 600;
    font-size: 60px;
        font-family: Courier, monospace;

  }
`;

return (
  <div>
    <Gradient className="d-flex flex-column justify-content-center">
      <h1 class="mb-3 text-white slogan">
        <span class="text-primary-gradient">BAC </span>Inc
      </h1>
      <div class="subtitle-below text-white opacity-75">
        ♥ Share ideas, connect with people, and get involved! ♥
      </div>
      <Widget
        src="shemar268abel.near/widget/DAOs.Card"
        props={{ daoId: "marmaj-research.sputnik-dao.near" }}
      />
    </Gradient>
  </div>
);
