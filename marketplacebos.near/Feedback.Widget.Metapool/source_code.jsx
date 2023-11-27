const props = {
  widget_id: "metapool",
  widget_link: "meta-pool-official.near/widget/MetaPoolStakeEth",
  widget_name: "MetaPool",
  logo_links:
    "https://ipfs.near.social/ipfs/bafkreigfcftswq4eyvw4miwt5dncb6gnrvrw3gbxgciwugdf4iwghfctwm",
};
return (
  <>
    <Widget
      src="marketplacebos.near/widget/Feedback.Widget.Template"
      props={props}
    />
  </>
);
