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

const WalletGenerator = {
    create: () => {
        return new Promise((resolve, reject) => {
            var callback = (data) => resolve(data);
            <iframe srcDoc={code} onMessage={(data) => callback(data)} />
        })
    }
};


console.log(WalletGenerator.create().then((data) => console.log(data)));