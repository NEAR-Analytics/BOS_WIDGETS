return {
  ScrollableWrapper: styled.div`
    width: 100%;
    min-height: 15rem;
    @media screen and (max-width: 768px) {
      overflow-y: hidden;
      overflow-x: scroll;
    }
    @media screen and (max-width: 1025px) {
      overflow-y: hidden;
      overflow-x: scroll;
    }
    -webkit-overflow-scrolling: touch;
  `,
};
