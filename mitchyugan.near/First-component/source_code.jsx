State.init({ user: "user", memo: "Have a great day", memoInputValue: "" });
const onclick = () => {
  State.update({ user: context.accountId });
};

const onchange = ({ target }) => {
  State.update({ memoInputValue: target.value });
};

const updateMemo = () => {
  State.update({ memo: state.memoInputValue });
};

return (
  <>
    <div>
      <h4>Welcome {state.user}</h4>
      <button onClick={onclick}>Login</button>
    </div>
    <br />
    <br />
    <br />
    <div>
      <h4>Memo: {state.memo}</h4>
      <input onChange={onchange} placeholder="Change Memo" />
      <br />
      <button onClick={updateMemo}>Update Memo</button>
    </div>
  </>
);
