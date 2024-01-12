const Theme = styled.div`
  --button-text-color: #fff;
  --button-color: #3b6bdc;
  --primary-color: #3b6bdc;
  --border-color: #292c42;
  --supply-bg-color: rgba(78, 133, 255, 0.2);
  --borrow-bg-color: rgba(196, 71, 217, 0.2);
  --supply-color: #85abff;
  --borrow-color: #e88eff;
  --withdraw-bg-color: rgba(59, 107, 220, 0.2);
  --withdraw-bg-hover-color: #3b6bdc;
  --withdraw-border-color: #3b6bdc;
  --repay-bg-color: rgba(196, 71, 217, 0.2);
  --repay-bg-hover-color: #c447d9;
  --repay-border-color: #c447d9;
  --switch-color: #3b6bdc;
  --switch-border-color: #32496a;
  --secondary-border-color: #32496a;
  --yours-table-title: #ffffff;
`;

return (
  <Theme>
    <Widget
      src="bluebiu.near/widget/Avalanche.Lending.Collection"
      props={props}
    />
  </Theme>
);
