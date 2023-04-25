if (
  !props.accountId ||
  !context.accountId ||
  context.accountId === props.accountId
) {
  return "";
}

const data = {
  index: {
    graph: JSON.stringify({
      key: "poke",
      value: {
        accountId: props.accountId,
      },
    }),
    notify: JSON.stringify({
      key: props.accountId,
      value: {
        type: "poke",
      },
    }),
  },
};

const Wrapper = styled.div`
  .poke-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 8px 16px;
    height: 32px;
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
    text-align: center;
    cursor: pointer;
    white-space: nowrap;
     background: rgba(26, 46, 51, 0.25);
     border: 0.5px solid rgba(255, 255, 255, 0.3);
     border-radius: 12px;
     color:#fff;

    // &:hover,
    // &:focus {
    //   background: #ECEDEE;
    //   text-decoration: none;
    //   outline: none;
    // }

    i {
      display: inline-block;
      transform: rotate(90deg);
      color: #7E868C;
    }
  }
`;

return (
  <Wrapper className={props.className}>
    <CommitButton className="poke-button" force data={data}>
      <i className="bi bi-hand-index-thumb"></i>
      {props.back ? "Poke Back" : "Poke"}
    </CommitButton>
  </Wrapper>
);
