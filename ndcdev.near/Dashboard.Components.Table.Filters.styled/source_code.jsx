return {
  FilterContainer: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 1rem;
    width: 100%;
    & > div {
      width: 100%;
    }

    @media screen and (max-width: 1400px) {
      flex-wrap: wrap;
      & > div {
        width: 48%;
      }
    }

    @media screen and (max-width: 868px) {
      flex-wrap: wrap;
      & > div {
        width: 100%;
      }
    }
  `,

  FilterItem: styled.div`
    border-radius: 10px;
    background: #1e1d22;
    padding: 5px 10px;
    color: #fff;
    text-align: center;
    font-size: 24px;
    font-weight: 350;
    width: 100%;

    @media screen and (max-width: 868px) {
      width: 100%;
    }
  `,

  SubFilterItem: styled.div`
    border-radius: 10px;
    background: #a39acd;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    font-style: normal;
    font-weight: 350;
    width: 100%;
    height: 50px;

    div {
      text-align: center;
      text-overflow: ellipsis;
      text-wrap: nowrap;
      overflow: hidden;
      width: 200px;
    }

    @media screen and (max-width: 868px) {
      width: 100%;
    }
  `,
};
