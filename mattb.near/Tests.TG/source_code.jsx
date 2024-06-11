const src = `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Telegram Auth Example</title>
</head>
<body>
    <h1>Telegram Auth</h1>
    <div>
        <script async src="https://telegram.org/js/telegram-widget.js?7"
                data-telegram-login="NearbadgerBot"
                data-size="large"
                data-auth-url="https://near.social"
                data-request-access="read"></script>
    </div>
</body>
</html>
`;

return <iframe srcDoc={src} />;
