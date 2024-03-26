const Wrapper = styled.div`
    gap: 12px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #808080;
    
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

    @media (max-width: 620px) {
        margin-bottom: 10px;
    }
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
          "Creators:  Can use these NEP-141 tokens for rewards and platform charges in your campaign creation. "
        }
        <br />
        {"Users: Winnings from campaigns are credited here. "}
        <br />
        {"You can withdraw these tokens to your wallet at any time."}
      </p>
      {state.error && (
        <p style={{ fontSize: 12, color: "red" }}>{state.error}</p>
      )}
    </div>
  </Wrapper>
);
