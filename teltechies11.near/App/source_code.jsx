const srcDoc = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Homepage</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.15/dist/tailwind.min.css" rel="stylesheet">
</head>

<style>
    body {
      background-color: #171C2C;
      margin: 0;
      height: 100vh;
      overflow: hidden;
    }

    .button {
      border: 2px solid;
      border-color: #FFFFFF;
      padding: 8px;
    }

    .button:hover {
      background-color: #1D267D;
    }
</style>

<body style="color:#D4ADFC;">
    <div class="flex flex-col justify-center items-center h-screen space-y-6">
      <h1 style="font-size:230%; font-family:verdana;"> <i>Teletubby Hackers</i> </h1>
      <p style="font-family:courier;">Click below to get started</p>
      <button class="button" type="button" onclick="navigateToLogin()">Click Me!</button>
      <a href="login.jsx" class="button">Click Me!</a>
    </div>

    <script>
      function navigateToLogin() {
        window.location.href = 'login.jsx';
      }
    </script>
</body>

</html>`;

return (
  <iframe
    style={{
      width: "100%",
      height: "100%",
    }}
    srcDoc={srcDoc}
  />
);
