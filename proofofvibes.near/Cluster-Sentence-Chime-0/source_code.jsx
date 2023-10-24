const srcDoc = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LinkTree</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/css/bootstrap.min.css">
</head>
<body>
<div class="container d-flex flex-column align-items-center justify-content-center" style="height: 100vh;">
    <h1 class="mb-5">LinkTree</h1>

    <div class="d-grid gap-2">
        <a href="https://example1.com" class="btn btn-primary" type="button">Link 1</a>
        <a href="https://example2.com" class="btn btn-primary" type="button">Link 2</a>
        <a href="https://example3.com" class="btn btn-primary" type="button">Link 3</a>
        <a href="https://example4.com" class="btn btn-primary" type="button">Link 4</a>
    </div>

    <p class="mt-5">Follow us on:</p>
    <div>
        <a href="https://facebook.com" target="_blank">Facebook</a> |
        <a href="https://instagram.com" target="_blank">Instagram</a> |
        <a href="https://twitter.com" target="_blank">Twitter</a>
    </div>
</div>

<script src="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/js/bootstrap.min.js"></script>
</body>
</html>`;

return <iframe style={{ width: "100%", height: "100%" }} srcDoc={srcDoc} />;
