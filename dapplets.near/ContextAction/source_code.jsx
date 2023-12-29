const Action = styled.div`
    display: flex;
    width: 34px;
    height: 34px;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background: #db504a;
    margin-bottom: 6px;
    cursor: pointer;
    box-sizing: border-box;

    @keyframes translateAnimationItem {
      0% {
        opacity: 0;
      }
      50% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
    animation: translateAnimationItem 1.5s linear forwards;
    transition: all 0.3s;
    &:hover {
      border: 1px solid #c1c6ce;
      box-shadow: 0px 4px 20px 0px rgba(11, 87, 111, 0.15),
        0px 4px 5px 0px rgba(45, 52, 60, 0.1);
    }
    .ItemActive {
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        border: 1px solid #19ceae;
        object-fit: cover;
        border-radius: 50%;
        width: 34px;
        height: 34px;
        display: block;
      }
      &:before {
        content: "";
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        background: #fff;
        width: 12px;
        height: 12px;
        border-radius: 50%;
      }

      &:after {
        content: "";
        display: block;
        position: absolute;
        top: 2px;
        right: 2px;
        background: #19ceae;
        width: 8px;
        height: 8px;
        border-radius: 50%;
      }
    }
`;

return <Action>{props.children}</Action>;
