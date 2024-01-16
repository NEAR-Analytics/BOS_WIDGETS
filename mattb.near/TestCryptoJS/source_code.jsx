const $ = VM.require("sdks.near/widget/Loader");
const { CryptoJS } = $("@sdks/utils");

State.init({
  crypto: null,
});

return (
  <>
    <button onClick={() => console.log(state.crypto)}>Log</button>
    <CryptoJS onCreate={(lib) => State.update({ crypto: lib })} />
  </>
);
