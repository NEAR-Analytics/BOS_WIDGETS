let { tab, routes } = props;
if (!tab) {
  tab = "home";
}

let activeTab = null;
routes.find((t) => {
  if (Array.isArray(t)) {
    return t.find((subTab) => {
      if (tab === subTab.handle) {
        activeTab = subTab;
        return true;
      }
      return false;
    });
  }
  if (t.handle === tab) {
    activeTab = t;
    return true;
  }
  return false;
});

const tabContent = activeTab ? (
  <Widget
    src={activeTab.widgetSrc}
    props={{
      ...activeTab.defaultProps,
      ...props,
    }}
  />
) : (
  "404"
); // TODO, map with 404 template

const Root = styled.div` 
  font-family: "Open Sans", "Manrope", system-ui, -apple-system, "Segoe UI",
    Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-size: 16px;
  line-height: 1.5;
  color: #000;

  a {
    color: #000;
    text-decoration: none;
  }

  a:hover {
    color: #4498e0;
  }

  .ndc-card {
    border-radius: 16px;
    box-shadow: rgba(0, 0, 0, 0.1) 0 1px 3px, rgba(0, 0, 0, 0.05) 0 1px 20px;
    background-color: #fff;
  }
`; // Map with container template

return (
  <Root className="row">
    {/** loop through typography dependencies? */}
    <Widget src={`nui.sking.near/widget/Typography.OpenSansFont`} />
    {/** customize header */}
    <Widget
      src="astro.sking.near/widget/Common.Layout.Header"
      props={{
        items: tabs,
      }}
    />
    <div className="col ms-sm-4 ps-lg-5 py-3 py-md-5 overflow-hidden">
      {tabContent}
    </div>
  </Root>
);
