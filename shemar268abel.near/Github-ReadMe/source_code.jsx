const code = `
<html>
<head>
    <!-- Include a specific version of the marked library -->
    <script src="https://cdn.jsdelivr.net/npm/marked@1.2.9/lib/marked.js"></script>
    <style>
        /* Remove margins and padding for full fit */
        html, body {
            margin: 0;
            padding: 0;
            height: 100%;
            width: 100%;
            overflow: hidden; /* Prevent potential scrollbars */
        }
    </style>
</head>
<body>

<div style="height: 100%; width: 100%;">
    <iframe srcdoc="" id="github-iframe" style="width: 100%; height: 100%; border: none;"></iframe>
</div>

<script>
document.addEventListener("DOMContentLoaded", function() {
    console.log("Marked function:", window.marked);  // Log the marked function

    const GITHUB_TOKEN = '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';  // Replace with your token

    fetch('https://api.github.com/repos/Dark-St-r/Dark-St-r/readme', {
        headers: {
            'Authorization': 'token ' + GITHUB_TOKEN
        }
    })
    .then(response => response.json())
    .then(data => {
        const rawMarkdown = atob(data.content);
        const htmlContent = window.marked(rawMarkdown);  // Convert markdown to HTML
        const styledContent = '<!DOCTYPE html>' +
    '<html>' +
    '<head>' +
        '<meta name="viewport" content="width=device-width, initial-scale=1">' +
        '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/4.0.0/github-markdown.min.css">' +
        '<style>' +
            'body {' +
                'margin: 0;' +
                'padding: 0;' +
            '}' +
        '</style>' +
    '</head>' +
    '<body>' +
        '<div class="markdown-body">' + htmlContent + '</div>' +
    '</body>' +
    '</html>';  
        const iframe = document.getElementById('github-iframe');
        iframe.srcdoc = styledContent;
    });
});
</script>

</body>
</html>
  `;

const Root = styled.div`
  
  iframe {
    width: 100%; 
    height: 100vh;
    border: none;
  }

  html, body {
            margin: 0;
            padding: 0;
            height: 100%;
            width: 100%;
            overflow: hidden; /* Prevent potential scrollbars */
    }

  `;

return (
  <Root>
    <iframe srcDoc={code} />
  </Root>
);
