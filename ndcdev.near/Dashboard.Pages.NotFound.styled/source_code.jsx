return {
  Text: styled.div`
    width: 640px;
    color: #1e1d22;
    text-align: center;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin: 50px 0;
    @media screen and (max-width: 1188px) {
      width: 70%;
    }
  `,

  Social: styled.div`
    display: flex;
    justify-content: space-between;
    width: 250px;
    margin-bottom: 100px;
  `,

  Logo: styled.img`
    @media screen and (max-width: 1188px) {
      width: 70%;
    }
  `,
};
