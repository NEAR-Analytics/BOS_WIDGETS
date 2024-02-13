VM.prepare(["sdks.near/widget/Utils.CryptoJS"]).then((result) => {
    console.log("Load: ", result);
    console.log(VM.require("sdks.near/widget/Utils.CryptoJS"));
});

return (
  <>
    <button
      onClick={() => console.log(VM.require("sdks.near/widget/Utils.CryptoJS"))}
    >
      Click me synchronous
    </button>
    <button
      onClick={() =>
        console.log(VM.asyncRequire("sdks.near/widget/Utils.CryptoJS"))
      }
    >
      Click me asynchronous
    </button>
  </>
);
