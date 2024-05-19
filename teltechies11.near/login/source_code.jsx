const srcDoc = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Page</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.15/dist/tailwind.min.css" rel="stylesheet">
    <style>
        html, body {
            background-color: #171C2C;
            margin: 0;
            height: 100%;
            width: 100%;
        }
        .custom-btn {
            color: #1D267D;
            border: 2px solid #1D267D;
            background-color: transparent;
            transition: background-color 0.3s, color 0.3s;
            padding: 12px 24px;
            font-size: 1.25rem; /* 20px */
        }
        .custom-btn:hover {
            background-color: #1D267D;
            color: white;
        }
        #canvas3d {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
        }
    </style>
</head>
<body>

    <canvas id="canvas3d"></canvas>

    <div class="flex flex-col justify-center items-center h-screen space-y-6">
        <h1 class="text-6xl font-bold text-white">I'm A...</h1>
        <div class="flex space-x-7">
            <button id="business" class="custom-btn font-bold rounded">
                Business
            </button>
            <button id="creator" class="custom-btn font-bold rounded">
                Creator
            </button>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/@splinetool/runtime@0.9.355"></script>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const canvas = document.getElementById('canvas3d');
            const app = new Application(canvas);
            app.load('https://prod.spline.design/hphP5SgIKuC8O20P/scene.splinecode');
        });
    </script>
</body>
</html>`;

return <iframe style={{ width: "100%", height: "100%" }} srcDoc={srcDoc} />;
