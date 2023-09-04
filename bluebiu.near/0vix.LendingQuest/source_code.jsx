const Quest = styled.div`
  padding-top: 20px;
  div {
    background: none;
    div {
      color: #7c7c96;
    }
    .highlight {
      color: #7c7c96;
    }
    .button-light {
      background: #8b71c2;
      .button-light-circle {
        background: #fff;
      }
    }
  }
`;

return (
  <Quest>
    <Widget src={`guessme.near/widget/ZKEVM.switch_quest_card`} />
  </Quest>
);
