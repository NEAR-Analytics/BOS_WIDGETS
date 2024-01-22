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
        width: 75%;
        min-width: 150px;
      }
    }
    .select-period {
      width: 150px;
    }
  `,

  ChartContainer: styled.div`
    display: flex;
    gap: 3rem;
    justify-content: space-between;

    @media screen and (max-width: 768px) {
      flex-direction: column;
    }
  `
};
