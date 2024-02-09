return {
  Container: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    padding: 3rem 4.5rem;

    @media screen and (max-width: 768px) {
      padding: 3rem 2rem;
    }

    h3 {
      font-size: 2rem;
      font-weight: 400;
    }

    h4 {
      font-size: 1.5rem;
      font-weight: 300;
    }

    .select-dao {
      width: 50%;
      @media screen and (max-width: 768px) {
        width: 100%;
        min-width: 150px;
      }
    }
    .select-period {
      width: 150px;
      @media screen and (max-width: 768px) {
        width: 100%;
      }
    }
  `,

  ChartContainer: styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    gap: 3rem;

    @media screen and (max-width: 1188px) {
      justify-content: center;
      flex-wrap: wrap;
      gap: 2rem;
    }
  `,
};
