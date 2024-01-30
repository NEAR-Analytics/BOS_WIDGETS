const Theme = styled.div`
  --button-text-color: #ffffff;
  --button-color: #04795b;
  --primary-color: #04795b;
  --border-color: #292c42;
  --supply-bg-color: rgba(4, 121, 91, 0.2);
  --borrow-bg-color: rgba(217, 71, 124, 0.2);
  --supply-color: #00c391;
  --borrow-color: #ff6767;
  --withdraw-bg-color: rgba(4, 121, 91, 0.2);
  --withdraw-bg-hover-color: rgba(4, 121, 91, 1);
  --withdraw-border-color: rgba(4, 121, 91, 1);
  --repay-bg-color: rgba(217, 71, 124, 0.2);
  --repay-bg-hover-color: rgba(217, 71, 124, 1);
  --repay-border-color: rgba(217, 71, 124, 1);
  --switch-color: #04795b;
  --switch-border-color: #32496a;
  --secondary-border-color: #3f577b;
  --yours-table-title: #ffffff;
  --claim-bg-hover-color: rgba(4, 121, 91, 1);
  --claim-bg-color: rgba(4, 121, 91, 0.2);
  --claim-border-color: rgba(4, 121, 91, 1);
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
