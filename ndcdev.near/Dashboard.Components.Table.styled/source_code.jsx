return {
  ScrollableWrapper: styled.div`
    width: 100%;
    min-height: 15rem;
    @media screen and (max-width: 1341px) {
      overflow-y: hidden;
      overflow-x: scroll;

      ::-webkit-scrollbar {
        height: 15px;
      }

      ::-webkit-scrollbar-track {
        background: #f1f1f1;
      }

      ::-webkit-scrollbar-thumb {
        background: #8799d2;
        border-radius: 5px;
      }

      ::-webkit-scrollbar-thumb:hover {
        background: #555;
      }
    }
    -webkit-overflow-scrolling: touch;
  `,
};
