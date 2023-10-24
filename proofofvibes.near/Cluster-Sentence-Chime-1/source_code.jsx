const srcDoc = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Love Letter For My Boo</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-beta1/css/bootstrap.min.css">
    <style>
        body {
            background-color: #fce4ec;
            font-family: 'Courier New', monospace;
        }
        .wrapper {
            margin-top: 10%;
            padding: 3% 5%;
            background-color: #f3e5f5;
            border-radius: 15px;
            box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
        }
        h2, p {
            color: #ad1457;
        }
        h2 {
            font-size: 2em;
        }
        p {
            font-size: 1.2em;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-lg-8 wrapper">
                <h2 class="text-center">To My Beloved</h2>
                <p>
                My love, <br><br>

                Being with you has made me realize the true meaning of life. You are my everything, my inspiration, my strength, and my soulmate. You fill all the emptiness in my heart. I'm so thankful to have you in my life. I love you from the deepest part of my heart. <br><br>

                Yours forever, <br>
                [Your Name]
                </p>
            </div>
        </div>
    </div>
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-beta1/js/bootstrap.min.js"></script>
</body>

</html>`;

return <iframe style={{ width: "100%", height: "100%" }} srcDoc={srcDoc} />;
