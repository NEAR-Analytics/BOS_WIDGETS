State.init({
  tab: props.tab || Storage.get("tab") || "Templates",
  tabProp: props.tab,
});

const accountId = context.accountId;

if (props.tab && props.tab !== state.tabProp) {
  State.update({ tab: props.tab, tabProp: props.tab });
}

const cur_mode = Storage.get("ref-mode", "ref-admin.near/widget/user-builder");

const role = cur_mode === "builder" && !!accountId ? "Builder" : "user";

const Wrapper = styled.div``;

const Tab = (
  <Widget
    src="ref-admin.near/widget/ref-component-tab"
    props={{
      tab: state.tab,
      changeTab: (newTab) => {
        State.update({
          tab: newTab,
        });
        Storage.set("tab", newTab);
      },
    }}
  />
);

const content =
  state.tab === "Templates" ? (
    <Widget
      src="ref-admin.near/widget/ref-template-page"
      props={{
        role,
      }}
    />
  ) : (
    <Widget
      src="ref-admin.near/widget/ref-components-page"
      props={{
        role,
      }}
    />
  );

return (
  <Wrapper>
    {Tab}

    {content}
  </Wrapper>
);
