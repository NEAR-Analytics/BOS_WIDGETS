return {
  Select: styled.div`
    position: relative;
    width: 100%;
    cursor: pointer;

    .selected-container {
      color: white !important;
      width: 100%;
      border-radius: 10px;
      background: #a39acd;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 25px;

      &.black {
        background: #1e1d22;
      }

      .selected {
        border: 0;
        width: 100%;
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px;
        text-transform: capitalize;
        letter-spacing: 0.12px;
      }
    }

    ul {
      width: 100%;
      max-height: 12rem;
      overflow-y: scroll;
      font-size: 18px;
      background: #fff;
      color: initial;
      border-radius: 6px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      display: flex;
      flex-direction: column;
      position: absolute;
      padding: 0.5rem 0;
      top: 50px;
      z-index: 100;

      li {
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;

        .truncate {
          font-weight: normal;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        &:hover {
          color: black;
          background: rgb(163 155 205 / 20%);
        }
      }
    }

    span {
      color: white;
      text-overflow: ellipsis;
      display: block;
      overflow: hidden;
      text-wrap: nowrap;
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

  Check: styled.div`
    border-radius: 5px;
    width: 100%;
    max-width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid
      ${(props) => (props.selected ? "#a39acd" : "rgb(216 216 216)")};
    color: #a39acd;
  `,

  TooltipContainer: styled.div`
    position: relative;
    display: inline-block;
    cursor: pointer;
  `,

  TooltipText: styled.span`
    visibility: hidden;
    min-width: 150px;
    background-color: #ffffff;
    text-align: justify;
    border-radius: 5px;
    padding: 5px;
    position: absolute;
    z-index: 1;
    bottom: 120%;
    left: 50%;
    margin-left: -60px;
    opacity: 0;
    transition: opacity 0.3s;

    &::after {
      content: "";
      position: absolute;
      bottom: -10px;
      left: 50%;
      margin-left: -5px;
      border-width: 5px;
      border-style: solid;
      border-color: transparent transparent white transparent;
      transform: translateX(-50%);
    }
  `,
};
