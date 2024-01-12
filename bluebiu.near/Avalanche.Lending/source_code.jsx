const Theme = styled.div`
  --button-text-color: #fff;
  --button-color: #f44d4e;
  --primary-color: #e84142;
  --border-color: #292c42;
  --supply-bg-color: rgba(39, 197, 187, 0.2);
  --borrow-bg-color: rgba(202, 85, 85, 0.2);
  --supply-color: #62fff6;
  --borrow-color: #ff6767;
  --withdraw-bg-color: #505260;
  --withdraw-bg-hover-color: rgba(255, 255, 255, 0.17);
  --withdraw-border-color: #e1e1e1;
  --repay-bg-color: rgba(202, 85, 85, 0.2);
  --repay-bg-hover-color: rgba(202, 85, 85, 0.2);
  --repay-border-color: #ca5555;
  --switch-color: #5baea9;
  --switch-border-color: #32496a;
  --secondary-border-color: #3f577b;
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
