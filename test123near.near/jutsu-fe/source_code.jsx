const srcDoc = `<!DOCTYPE html>
<html lang="en">

<head>
    <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
    <script src="https://www.gstatic.com/firebasejs/3.1.0/firebase.js"></script>
    <script src="https://nearlib.github.io/near-api-js/dist/near-api-js.js"></script>
    
    <title>Web3 Login Page</title>
</head>

<body>
    <div class="min-h-screen flex items-center justify-center bg-gray-50">
        <form class="m-8">
            <h2 class="text-center text-3xl font-extrabold">Sign in to your account</h2>

            <div class="my-2">
                <input type="email" id="email" required placeholder="Email address" class="block w-full">
            </div>

            <div class="my-2">
                <input type="password" id="password" required placeholder="Password" class="block w-full">
            </div>
            
            <button type="submit" id="login-email" class="w-full my-2 bg-purple-500 rounded-md">Sign in</button>
            <button type="button" id="login-google" class="w-full my-2 bg-purple-500 rounded-md">Sign in with Google</button>
            <button type="button" id="login-near" class="w-full my-2 bg-purple-500 rounded-md">Sign in with Near Wallet</button>
        </form>
    </div>

    <script>
        const config = {
            apiKey: "YOUR_API_KEY",
            authDomain: "YOUR_AUTH_DOMAIN",
        };
        firebase.initializeApp(config);

        const provider = new firebase.auth.GoogleAuthProvider();

        document.querySelector('#login-email').addEventListener('click', e => {
            e.preventDefault();
            const email = document.querySelector('#email').value;
            const password = document.querySelector('#password').value;
            firebase.auth().signInWithEmailAndPassword(email, password);
        });

        document.querySelector('#login-google').addEventListener('click', e => {
            e.preventDefault();
            firebase.auth().signInWithPopup(provider);
        });

        const nearConfig = {
            networkId: "default",
            nodeUrl: "https://rpc.testnet.near.org",
            contractName: "near.example.testnet",
            walletUrl: "https://wallet.testnet.near.org",
        };

        document.querySelector('#login-near').addEventListener('click', async e => {
            e.preventDefault();
            const near = await nearApiJS.connect(nearConfig);
            const wallet = new nearApiJS.WalletConnection(near, nearConfig.contractName);
            if(!wallet.isSignedIn()) {
                wallet.requestSignIn();
            }
        });
    </script>
</body>

</html>`;

return <iframe style={{ width: "100%", height: "100%" }} srcDoc={srcDoc} />;
