const props = {
  widget_id: "devhub",
  widget_name_link:
    "https://near.social/marketplacebos.near/widget/Feedback.Widget.Devhub",
  widget_name: "DevHub",
  logo_link: "https://ipfs.near.social/ipfs/bafkreiggwajains3kbgc7h2s5yr73dvmgmmhe2afyatxrkihqcisrbe56i",
};

return (
  <>
    <Widget
      src="marketplacebos.near/widget/CardMain.CardWidget"
      props={props}
    />
  </>
);
