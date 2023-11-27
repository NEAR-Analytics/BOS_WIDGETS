const props = {
  widget_id: "devhub",
  widget_link: "devhub.near/widget/app",
  widget_name: "DevHub",
  logo_links:
    "https://ipfs.near.social/ipfs/bafkreido4srg4aj7l7yg2tz22nbu3ytdidjczdvottfr5ek6gqorwg6v74",
};
return (
  <>
    <Widget
      src="marketplacebos.near/widget/Feedback.Widget.Template"
      props={props}
    />
  </>
);
