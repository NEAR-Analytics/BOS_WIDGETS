State.init({ reply: "Ini reply dari WidgetBaru" });
return (
  <>
    Ini embed widget lain:
    <div style={{ borderStyle: "solid" }}>
      <Widget
        src="irfi.near/widget/HelloWorld"
        props={{ reply: state.reply }}
      />
    </div>
  </>
);
