const Square = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between;
    width:40px;
    background-color:var(--rubik-red-color);
    border-radius:11px;
    margin:10px;
    border:3px solid #fafafa;
    box-shadow: 0 0 0 3px var(--rubik-red-color);
    box-sizing:border-box;
    padding:3px;
    flex-wrap:wrap;
`;

const Dot = styled.div`
    width:8px;
    height:8px;
    background-color: var(--rubik-white-color);
    border-radius:2px;
    
    :nth-child(1) {
        border-top-left-radius:4px;
    }

    :nth-child(3) {
        border-top-right-radius:4px;
    }

    :nth-child(7) {
        border-bottom-left-radius:4px;
    }

    :nth-child(9) {
        border-bottom-right-radius:4px;
    }

    :not(:nth-child(7), :nth-child(8), :nth-child(9)) {
        margin-bottom:2px;
    }
`;

const LogoWrapper = styled.div`
    display:flex;
    align-items:center;
    
    h1 {
        font-weight:bold;
        padding:0;
        margin:0;
        color:#000;
        font-family: sans-serif;
        letter-spacing:-1px;
        font-size:2rem;
    }

    &.black {
        > div {
            background-color:#000;
        }
    }
`;

return {
  Square,
  Dot,
  LogoWrapper,
};
