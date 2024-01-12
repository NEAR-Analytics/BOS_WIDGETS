const Theme = styled.div`
  --button-text-color: #fff;
  --button-color: #ea3431;
  --primary-color: #ea3431;
  --border-color: #32496a;
  --supply-bg-color: rgba(39, 197, 187, 0.2);
  --borrow-bg-color: rgba(202, 85, 85, 0.2);
  --supply-color: #62fff6;
  --borrow-color: #ff6767;
  --withdraw-bg-color: #505260;
  --withdraw-bg-hover-color: rgba(255, 255, 255, 0.17);
  --withdraw-border-color: #e1e1e1;
  --repay-bg-color: #4a2b37;
  --repay-bg-hover-color: rgba(202, 85, 85, 0.2);
  --repay-border-color: #ca5555;
  --switch-color: #ea3431;
  --switch-border-color: #32496a;
  --secondary-border-color: #32496a;
  --yours-table-title: #7c7f96;
`;

return (
  <Theme>
    <Widget
      src="bluebiu.near/widget/Avalanche.Lending.Collection"
      props={props}
    />
  </Theme>
);
