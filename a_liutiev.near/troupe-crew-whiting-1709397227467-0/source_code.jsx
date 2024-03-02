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
            background-color: #4a5568;
            border-radius: 5px;
        }
    </style>
</head>

<body class="bg-gray-100">
    <div class="tabs">
        <button class="text-white">Tab 1</button>
        <button class="text-white ml-2">Tab 2</button>
        <button class="text-white ml-2">Tab 3</button>
    </div>

    <div class="navbar p-4">
        Marketplace
    </div>

    <div class="hero">
        <h1>AI Model Traded</h1>
    </div>

    <div class="container mx-auto p-8">
        <div class="flex flex-wrap -m-4">
            <div class="p-4">
                <div class="card">
                    <img src="https://source.unsplash.com/500x300/?product" alt="Product">
                    <div class="card-content">
                        <h3 class="text-lg font-bold mb-2">Trading Bot V1</h3>
                        <p class="text-gray-600 mb-4">Description of the product goes here.</p>
                        <p class="text-gray-600 ">Description of the product goes here.</p>
                        <span class="text-xl font-bold text-blue-500">$19.99</span>
                        <a href="#" class="btn ml-4">Add to Cart</a>
                    </div>
                </div>
            </div>

            <div class="p-4">
                <div class="card">
                    <img src="https://source.unsplash.com/500x300/?product" alt="Product">
                    <div class="card-content">
                        <h3 class="text-lg font-bold mb-2">Another Product</h3>
                        <p class="text-gray-600 mb-4">Description of another product goes here.</p>
                        <span class="text-xl font-bold text-blue-500">$29.99</span>
                        <a href="#" class="btn ml-4">Add to Cart</a>
                    </div>
                </div>
            </div>

            <div class="p-4">
                <div class="card">
                    <img src="https://source.unsplash.com/500x300/?product" alt="Product">
                    <div class="card-content">
                        <h3 class="text-lg font-bold mb-2">Best Product Ever</h3>
                        <p class="text-gray-600 mb-4">Description of the best product goes here.</p>
                        <span class="text-xl font-bold text-blue-500">$39.99</span>
                        <a href="#" class="btn ml-4">Add to Cart</a>
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
