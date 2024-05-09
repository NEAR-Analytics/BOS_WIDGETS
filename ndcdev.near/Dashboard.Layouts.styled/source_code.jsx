return {
  Theme: styled.div`
    position: fixed;
    inset: 73px 0px 0px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    overflow-y: scroll;
    font-weight: 600;
    font-family: "Avenir LT Pro", sans-serif;
    font-style: normal;
    background: #e8ecf0 !important;
    ${(props) => props.font};
  `,
  Container: styled.div`
    width: 100%;
    height: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;

    .section {
      width: 100%;
      border-radius: 20px;
      display: flex;
      padding: 1rem 3rem;
      justify-content: center;
      align-items: center;
      border-radius: 20px;
      background: #f9fcff;
      box-shadow: 0px 20px 40px 0px rgba(0, 0, 0, 0.05);

      @media screen and (max-width: 768px) {
        padding: 1rem;
      }
    }
  `,
};
