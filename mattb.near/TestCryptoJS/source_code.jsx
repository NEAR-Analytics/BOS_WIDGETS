const $ = VM.require("sdks.near/widget/Loader");
const { IframeDependency } = $("@sdks/abstracts");

const code = `
<script type="module" crossorigin>
    import { ethers } from "https://unpkg.com/ethers@6.10.0/dist/ethers.min.js";

    window.top.postMessage(ethers, "*");
</script>
`;

State.init({
  crypto: null,
});

return (
  <>
    <button onClick={() => console.log(state.crypto)}>Log</button>
    <IframeDependency code={code} onUpdate={(lib) => console.log(lib)} />
  </>
);
