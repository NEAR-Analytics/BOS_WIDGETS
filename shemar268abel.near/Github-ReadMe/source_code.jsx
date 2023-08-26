const code = `
<iframe srcdoc="" id="github-iframe"></iframe>
<script>
  fetch('https://api.github.com/repos/Dark-St-r/Dark-St-r/readme')
    .then(response => response.json())
    .then(data => {
      const iframe = document.getElementById('github-iframe');
      iframe.srcdoc += atob(data.content); // This will append the content from GitHub to the existing content in the iframe.
    });
</script>

`;
const code2 = `
<iframe srcdoc="" id="github-iframe"></iframe>
`;

return (
  <div>
    <iframe iframeResizer className="w-100" srcDoc={code} />
  </div>
);
