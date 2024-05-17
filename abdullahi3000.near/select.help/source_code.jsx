const code = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Beautiful Lorem Ipsum</title>
  <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
  <style>
    body {
      background-color: #f8f9fa;
    }
    .content {
      margin-top: 50px;
    }
    .hero {
      background: url('https://via.placeholder.com/1920x600') no-repeat center center;
      background-size: cover;
      color: white;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
      padding: 100px 0;
      text-align: center;
    }
    .hero h1 {
      font-size: 4rem;
    }
    .hero p {
      font-size: 1.25rem;
    }
    .article-title {
      font-size: 2.5rem;
      margin-bottom: 20px;
    }
    .article-content {
      line-height: 1.8;
    }
  </style>
</head>
<body>
  <header class="hero">
    <div class="container">
      <h1 class="display-4">Welcome to the World of Lorem Ipsum</h1>
      <p class="lead">A Journey Through the Classical Dummy Text of the Printing Industry</p>
    </div>
  </header>

  <main class="content">
    <div class="container">
      <div class="row">
        <div class="col-md-8">
          <article>
            <h2 class="article-title">Lorem Ipsum Dolor Sit Amet</h2>
            <div class="article-content">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
              <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
              <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
          </article>
        </div>
        <div class="col-md-4">
          <aside>
            <div class="p-4 mb-4 bg-white shadow-sm rounded">
              <h3 class="h5">About Lorem Ipsum</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
            </div>
            <div class="p-4 mb-4 bg-white shadow-sm rounded">
              <h3 class="h5">Related Articles</h3>
              <ul class="list-unstyled">
                <li><a href="#" class="text-primary">History of Lorem Ipsum</a></li>
                <li><a href="#" class="text-primary">Why Use Lorem Ipsum?</a></li>
                <li><a href="#" class="text-primary">Alternatives to Lorem Ipsum</a></li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  </main>

  <footer class="text-center py-4 mt-4 bg-dark text-white">
    <p>&copy; 2024 Lorem Ipsum Inc. All rights reserved.</p>
  </footer>
</body>
</html>

`;

return (
  <div
    className="container-fluid justify-content-center align-items-center"
    style={{ backgroundColor: "#151718", overflowY: "auto", height: "100vh" }}
  >
    <Widget src={"abdullahi3000.near/widget/Select.nav"} />
    <iframe
      className="w-100 h-100"
      style={{ border: "none" }}
      srcDoc={code}
      title="PDF Viewer"
    />
  </div>
);
