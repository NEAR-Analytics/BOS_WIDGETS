const Theme = styled.div`
  --button-text-color: #fff;
  --button-color: #783bf0;
  --primary-color: #783bf0;
  --border-color: #292c42;
  --supply-bg-color: rgba(84, 101, 255, 0.2);
  --borrow-bg-color: rgba(199, 71, 171, 0.2);
  --supply-color: #5465ff;
  --borrow-color: #c747ab;
  --withdraw-bg-color: rgba(84, 101, 255, 0.2);
  --withdraw-bg-hover-color: #5465ff;
  --withdraw-border-color: #5465ff;
  --repay-bg-color: rgba(196, 71, 217, 0.2);
  --repay-bg-hover-color: #c747ab;
  --repay-border-color: #c747ab;
  --switch-color: #5465ff;
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
