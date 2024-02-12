
return <>
    <button onClick={() => console.log(VM.asyncRequire("sdks.near/widget/Utils.CryptoJS"))}>Click me sync</button>
    <button onClick={() => VM.asyncRequire("sdks.near/widget/Utils.CryptoJS").then((data) => console.log(data))}>Click me async</button>
</>;
