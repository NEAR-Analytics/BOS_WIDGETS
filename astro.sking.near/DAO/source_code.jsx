const widgetOwner = "astro.sking.near";

return (
  <Widget
    src={`${widgetOwner}/widget/DAO.index`}
    props={{ widgetOwner, ...props }}
  />
);