const Theme = styled.div`
  --button-text-color: #fff;
  --button-color: #004bfc;
  --primary-color: #004bfc;
  --border-color: #32496a;
  --supply-bg-color: rgba(78, 133, 255, 0.2);
  --borrow-bg-color: rgba(196, 71, 217, 0.2);
  --supply-color: #85abff;
  --borrow-color: #e88eff;
  --withdraw-bg-color: rgba(0, 75, 252, 0.2);
  --withdraw-bg-hover-color: #004bfc;
  --withdraw-border-color: #004bfc;
  --repay-bg-color: rgba(196, 71, 217, 0.2);
  --repay-bg-hover-color: #c447d9;
  --repay-border-color: #c447d9;
  --switch-color: #004bfc;
  --switch-border-color: #32496a;
  --secondary-border-color: #3f577b;
  --yours-table-title: #ffffff;
  --claim-bg-hover-color: #004bfc;
  --claim-bg-color: rgba(0, 75, 252, 0.2);
  --claim-border-color: #004bfc;
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
