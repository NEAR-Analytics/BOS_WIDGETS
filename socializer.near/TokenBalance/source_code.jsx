const Wrapper = styled.div`
    gap: 12px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #808080;,
    @media (max-width: 620px) {
        flex-direction: column;
        align-items: flex-end;
        
        .title {
            gap: 0 !important;
        }
    }
`;

const Button = styled.button`
    gap: 7px;
    width: 100%;
    margin: auto;
    display: flex;
    font-size: 12px;
    font-weight: 600;
    text-align: center;
    border-radius: 6px;
    padding: 8px 9px 8px 28px;
    text-transform: capitalize;
    color: var(--light_95, #F3F3F3);
    background: var(--Dark, #121212);
    border: 1px solid var(--light_90, #E6E6E6);  
`;

return (
  <Wrapper>
    <div
      className="d-flex title"
      style={{
        gap: 12,
        flexDirection: "column",
      }}
    >
      <h5 style={{ fontWeight: 700, fontSize: 18, lineHeight: "150%" }}>
        {"Token Balances"}
      </h5>
      <p style={{ fontSize: 12 }}>
        {
          "These NEP Tokens Can be allocated as bounty for users that engage with your tweets. These can be withdrawn to you wallet at any time"
        }
      </p>
      {state.error && (
        <p style={{ fontSize: 12, color: "red" }}>{state.error}</p>
      )}
    </div>
    <div className="d-flex" style={{ minWidth: 150 }}>
      <Button>
        {"Select Token"}
        <span style={{ height: 18 }}>
          <svg
            width="30"
            height="26"
            viewBox="0 0 30 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_d_58_4394)">
              <rect
                x="4"
                y="18"
                width="18"
                height="22"
                rx="8"
                transform="rotate(-90 4 18)"
                fill="#141522"
                shape-rendering="crispEdges"
              />
              <path
                d="M19 5.27337L18.06 4.33337L15 7.38671L11.94 4.33337L11 5.27337L15 9.27337L19 5.27337Z"
                fill="white"
              />
              <path
                d="M19 9.66668L18.06 8.72668L15 11.78L11.94 8.72669L11 9.66669L15 13.6667L19 9.66668Z"
                fill="white"
              />
              <rect
                x="4.5"
                y="17.5"
                width="17"
                height="21"
                rx="7.5"
                transform="rotate(-90 4.5 17.5)"
                stroke="#141522"
                shape-rendering="crispEdges"
              />
            </g>
          </svg>
        </span>
      </Button>
    </div>
  </Wrapper>
);
