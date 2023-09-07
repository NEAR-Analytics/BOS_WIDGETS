const groupId = props.groupId || "6fd36ddf4884flm20pbe91e7b208b88d16";

State.init({
  groupId,
});

return (
  <>
    <h5>Group ID</h5>
    <input
      placeholder={groupId}
      onChange={(e) => State.update({ groupId: e.target.value })}
    />
    <hr />
    <Widget
      src="hack.near/widget/group.editor"
      props={{ groupId: state.groupId }}
    />
  </>
);
