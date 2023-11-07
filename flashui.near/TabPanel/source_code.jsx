let children = props.children || "No Content";
let panelId = props.panelId || "";
let active = props.active || false;
return (
  <>
    <div
      class={active == true ? "tab-pane active" : "tab-pane"}
      role="tabpanel"
      id={panelId}
    >
      {children}
    </div>
  </>
);
