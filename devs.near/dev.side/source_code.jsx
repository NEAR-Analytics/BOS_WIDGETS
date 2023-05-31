const side = context.accountId
  ? Social.get(`${context.accountId}/settings/dev/side`)
  : undefined;

if (side === null) {
  return "";
}

const defaultWidgets = [
  {
    src: "devs.near/widget/dev.info",
  },
  {
    src: "devs.near/widget/dev.start",
    requiresLogin: true,
  },
  {
    src: "devs.near/widget/dev.search",
  },
  {
    src: "devs.near/widget/dev.collab",
  },
];

const widgets = (side && JSON.parse(side)) ?? defaultWidgets;

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
    {context.accountId && (
      <a
        key="edit"
        href={"#/devs.near/widget/dev.config"}
        className="edit-link position-absolute top-0 end-0 link-secondary me-2 mt-1"
      >
        <i class="bi bi-pencil" /> Customize
      </a>
    )}
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
