const [loading, setLoading] = useState(true);

VM.prepare(["sdks.near/widget/Utils.Ethereum.ENSResolver"]).then((result) => {
  setLoading(false);
});

const ENSResolver = VM.require("sdks.near/widget/Utils.Ethereum.ENSResolver");
console.log(ENSResolver.resolve("ionoproxy.eth"));

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
