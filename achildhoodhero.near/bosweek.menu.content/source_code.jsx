const defaultWidgets = [
  {
    src: "nearweekapp.near/widget/nearweek-newsletter",
  },
  {
    src: "achildhoodhero.near/widget/hero.certified-apps.bos",
  },
  {
    src: "nearweekapp.near/widget/NEARWEEKNews",
    requiresLogin: false,
  },
  {
    src: "nearweekapp.near/widget/Easy-DAO-Payout-Proposal",
  },
];

// Ignore any existing menu and only use your own components
const widgets = defaultWidgets;

const Div = styled.div`
  position: relative;
  @media (hover: hover) {
    > .edit-link {
      display: none;
    }
  }
  &:hover {
    > .edit-link {
      display: inline;
    }
  }
`;

return (
  <Div>
    {widgets.map(
      ({ src, requiresLogin }, i) =>
        (!requiresLogin || context.accountId) && (
          <div key={i} className="text-bg-light rounded-4 p-3 mb-3">
            <Widget src={src} />
          </div>
        )
    )}
  </Div>
);
