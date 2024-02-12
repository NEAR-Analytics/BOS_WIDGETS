
return <>
    <button onClick={() => console.log(VM.require("sdks.near/widget/Utils.CryptoJS"))}>Click me synchronous</button>
    <button onClick={() => VM.asyncRequire("sdks.near/widget/Utils.CryptoJS").then((data) => console.log(data))}>Click me asynchronous</button>
</>;
