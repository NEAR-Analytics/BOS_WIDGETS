const srcDoc=`<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Decentralized Exchange</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.15/dist/tailwind.min.css" rel="stylesheet">
    <style>
        body {
            background-image: url('https://source.unsplash.com/aZjw7xI3QAA/1600x900');
            background-size: cover;
            background-position: center;
            color: #E5E7EB;
            font-family: 'Arial', sans-serif;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: rgba(25, 32, 44, 0.9);
            border-radius: 10px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }

        .card-bg {
            background-color: rgba(25, 32, 44, 0.9);
            border-radius: 10px;
            overflow: hidden;
        }

        .card-content {
            padding: 20px;
            border-radius: 10px;
        }

        select, button {
            background-color: #2563EB;
            color: #E5E7EB;
            border: 1px solid #2563EB;
            border-radius: 4px;
            padding: 8px 12px;
            margin-top: 4px;
            cursor: pointer;
        }

        select:focus, button:focus {
            outline: none;
            box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.5);
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="card-bg mb-4">
            <div class="card-content">
                <h1 class="text-2xl font-bold mb-4 text-center">Swap Tokens</h1>
                <div class="mb-4">
                    <label class="block text-sm font-bold mb-2" for="fromToken">From:</label>
                    <select id="fromToken" class="w-full">
                        <option value="ETH">Ethereum</option>
                        <option value="BTC">Bitcoin</option>
                        <option value="USDT">Tether</option>
                        <option value="BNB">Binance Coin</option>
                    </select>
                </div>
                <div class="mb-6">
                    <label class="block text-sm font-bold mb-2" for="toToken">To:</label>
                    <select id="toToken" class="w-full">
                        <option value="DAI">Dai</option>
                        <option value="USDC">USD Coin</option>
                        <option value="MATIC">Polygon</option>
                        <option value="SOL">Solana</option>
                    </select>
                </div>
                <div class="flex items-center justify-center">
                    <button id="swapBtn" class="font-bold py-2 px-4 rounded focus:outline-none" onclick="swapTokens()">Swap</button>
                </div>
            </div>
        </div>
    </div>

    <script>
        function swapTokens() {
            const fromToken = document.getElementById('fromToken').value;
            const toToken = document.getElementById('toToken').value;
            alert(\`Swapping ${fromToken} to ${toToken}\`);
        }
    </script>
</body>

</html>`
              
return <iframe style={{width:'100%', height:'100%'}} srcDoc={srcDoc} />;