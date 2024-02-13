const [loading, setLoading] = useState(true);

VM.prepare(["sdks.near/widget/Utils.NearFS"]).then((result) => {
  setLoading(false);
});

if (!loading) {
  const NearFS = VM.require("sdks.near/widget/Utils.NearFS");
  console.log(NearFS.getIpfsUrl("somecid"));
}

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
