const srcDoc = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title> Homepage </title>
  <style>
    body {
      background-color: #171C2C;
      margin: 0;
      height: 100vh;
      overflow: hidden;
      color: #D4ADFC;
    }
    .button {
      border: 2px solid #FFFFFF;
      padding: 8px;
      cursor: pointer;
    }
    .button:hover {
      background-color: #1D267D;
    }
  </style>
</head>
<body>
  <div id="startPage" style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh; gap: 24px;">
    <h1 style="font-size: 230%; font-family: verdana;"> <i> Teletubby Hackers </i> </h1>
    <p style="font-family: courier;"> Click below to get started </p>
    <button class="button" type="button" onclick="window.location.href='start.jsx'"> Click Me! </button>
  </div>
</body>
</html>
`;

return <iframe style={{ width: "100%", height: "100%" }} srcDoc={srcDoc} />;
