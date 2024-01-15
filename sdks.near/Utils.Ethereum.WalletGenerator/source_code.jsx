const code = `
<script type="module" crossorigin>
    import { ethers } from "https://unpkg.com/ethers@6.10.0/dist/ethers.min.js";
    
    const wallet = ethers.Wallet.createRandom();

    const data = {
        pubKey: wallet.publicKey,
        priKey: wallet.privateKey
    };

    window.top.postMessage(data, "*");
</script>
`;

const WalletGenerator = <iframe srcDoc={code} />;

return WalletGenerator;