return {
  Footer: styled.div`
    position: relative;
    width: 100%;
    height: 130px;
    padding: 3.5rem 4.5rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background: #151718;

    .header-text {
      color: #fcf8ff;
      font-size: 24px;
      font-weight: 750;
    }

    .color-text {
      font-size: 24px;
      font-weight: 750;
      background: linear-gradient(
        270deg,
        #59d -9.91%,
        #e89dbb 53.26%,
        #f8c050 113.62%
      );
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;

      @media screen and (max-width: 768px) {
        display: none;
      }
    }

    @media screen and (max-width: 768px) {
      padding: 2rem;
      justify-content: center;

      img {
        width: 35px;
        height: 35px;
      }
    }
  `,

  Social: styled.div`
    display: flex;
    justify-content: space-between;
    width: 200px;
    margin-left: -100px;

    img {
      height: 30px;
    }

    @media screen and (max-width: 768px) {
      margin-left: 0;
    }
  `,

  DashboardText: styled.div`
    @media screen and (max-width: 768px) {
      display: none;
    }
  `,

  NearLogo: styled.div`
    img {
      height: 30px;
    }
    @media screen and (max-width: 768px) {
      display: none;
    }
  `,
};
