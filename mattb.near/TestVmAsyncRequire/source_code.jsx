const [loading, setLoading] = useState(true);

VM.asyncRequire(["sdks.near/widget/Utils.NearFS"]).then(({
    NearFS
}) => {
  console.log(NearFS.getIpfsUrl("somecid"));
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
