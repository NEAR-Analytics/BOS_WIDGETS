const srcDoc = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Marketplace</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <style>
        .navbar {
            background-color: #374151;
            color: #fff;
        }

        .hero {
            background-image: url('https://images.unsplash.com/photo-1535320903710-d993d3d77d29?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
            background-size: cover;
            height: 400px;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            color: #fff;
        }

        .hero h1 {
            font-size: 3rem;
            font-weight: bold;
        }

        .text-section {
            background-color: #edf2f7;
            padding: 20px;
        }

        .footer {
            background-color: #374151;
            color: #fff;
            text-align: center;
            padding: 10px 0;
        }

        .tabs {
            position: absolute;
            top: 10px;
            right: 10px;
            padding: 10px;
            background-color: #374151;
            border-radius: 5px;
        }
    </style>
</head>

<body class="bg-gray-100">
    <div class="tabs">
        <a href="#" class="text-white inline-block">Home</a>
        <a href="#" class="text-white inline-block">Shop</a>
        <a href="#" class="text-white inline-block">Contact</a>
    </div>

    <div class="navbar p-4">
        Marketplace
    </div>

    <div class="hero">
        <h1>AI Trading Model Marketplace</h1>
    </div>

    <div class="container mx-auto p-8">
        <div class="flex flex-wrap -m-4">
            <div class="p-4">
    <div class="card">
        <img src="https://source.unsplash.com/500x300/?trading,ai" alt="AlphaTrade Architect">
        <div class="card-content">
            <h3 class="text-lg font-bold mb-2">AlphaTrade Architect</h3>
            <p class="text-gray-600 mb-4">Unleash the power of market insights with AlphaTrade Architect, your AI-powered trading companion designed to adapt and evolve with the market.</p>
            <p class="text-gray-600 mb-1">30-day APY: 2.5%</p>
            <span class="text-xl font-bold text-blue-500">$19.99</span>
            <a href="#" class="btn ml-4">Add to Cart</a>
            <!-- 30 day APY Yield -->
            
            
        </div>
    </div>
</div>

<div class="p-4">
    <div class="card">
        <img src="https://source.unsplash.com/500x300/?quantum,ai" alt="Quantum Quotient Quotator">
        <div class="card-content">
            <h3 class="text-lg font-bold mb-2">Quantum Quotient Quotator</h3>
            <p class="text-gray-600 mb-4">Dive into the future of trading with Quantum Quotient Quotator, where cutting-edge AI meets community-driven innovation.</p>
            <p class="text-gray-600 mb-1">30-day APY: 3.0%</p>
            <span class="text-xl font-bold text-blue-500">$29.99</span>
            <a href="#" class="btn ml-4">Add to Cart</a>
            <!-- 30 day APY Yield -->
            
            
        </div>
    </div>
</div>

<div class="p-4">
    <div class="card">
        <img src="https://source.unsplash.com/500x300/?market,ai" alt="Market Maven Matrix">
        <div class="card-content">
            <h3 class="text-lg font-bold mb-2">Market Maven Matrix</h3>
            <p class="text-gray-600 mb-4">Elevate your trading game with Market Maven Matrix, the pinnacle of AI-driven trading solutions.</p>
            <p class="text-gray-600 mb-1">30-day APY: 3.5%</p>
            <span class="text-xl font-bold text-blue-500">$39.99</span>
            <a href="#" class="btn ml-4">Add to Cart</a>
            <!-- 30 day APY Yield -->
            
            
        </div>
    </div>
</div>

        </div>
    </div>

    <div class="text-section">
        <p class="text-center">Additional information about our products.</p>
    </div>

    <div class="footer">
        &copy; 2023 Marketplace. All rights reserved.
    </div>
</body>

</html>`;

return <iframe style={{ width: "100%", height: "100%" }} srcDoc={srcDoc} />;
