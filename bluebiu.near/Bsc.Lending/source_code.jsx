const Theme = styled.div`
  --button-text-color: #000;
  --button-color: #f3ba2f;
  --primary-color: #f3ba2f;
  --border-color: #32496a;
  --supply-bg-color: rgba(217, 159, 71, 0.2);
  --borrow-bg-color: rgba(217, 71, 124, 0.2);
  --supply-color: #f3ba2f;
  --borrow-color: #d9477c;
  --withdraw-bg-color: rgba(243, 186, 47, 0.2);
  --withdraw-bg-hover-color: #f3ba2f;
  --withdraw-border-color: #f3ba2f;
  --repay-bg-color: rgba(217, 71, 124, 0.2);
  --repay-bg-hover-color: #d9477c;
  --repay-border-color: #d9477c;
  --switch-color: #f3ba2f;
  --switch-border-color: #32496a;
  --secondary-border-color: #32496a;
  --yours-table-title: #ffffff;
  --claim-bg-hover-color: #f3ba2f;
  --claim-bg-color: rgba(243, 186, 47, 0.2);
  --claim-border-color: #f3ba2f;
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
