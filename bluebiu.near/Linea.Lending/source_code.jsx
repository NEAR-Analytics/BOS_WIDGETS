const Theme = styled.div`
  --button-text-color: #000;
  --button-color: #56daff;
  --primary-color: #56daff;
  --border-color: #292c42;
  --supply-bg-color: rgba(86, 218, 255, 0.2);
  --borrow-bg-color: rgba(196, 71, 217, 0.2);
  --supply-color: #56daff;
  --borrow-color: #e88eff;
  --withdraw-bg-color: rgba(86, 218, 255, 0.2);
  --withdraw-bg-hover-color: #56daff;
  --withdraw-border-color: #56daff;
  --repay-bg-color: rgba(196, 71, 217, 0.2);
  --repay-bg-hover-color: #c447d9;
  --repay-border-color: #c447d9;
  --switch-color: #56daff;
  --switch-border-color: #3f577b;
  --secondary-border-color: #32496a;
  --yours-table-title: #ffffff;
  --claim-bg-hover-color: #56daff;
  --claim-bg-color: rgba(86, 218, 255, 0.2);
  --claim-border-color: #56daff;
  --withdraw-color: #fff;
  --replay-color: #fff;
  --claim-color: #fff;
`;

return (
  <Theme>
    <Widget
      src="bluebiu.near/widget/Avalanche.Lending.Collection"
      props={props}
    />
  </Theme>
);
