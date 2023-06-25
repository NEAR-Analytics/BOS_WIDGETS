const css = styled.b`
html {overflow: auto;}    
html,
body,
div,
iframe {
    margin: 0px;
    padding: 0px;
    height: 100%;
    min-height: 5000px;
    border: none;
    display: block;
    width: 100%;
    border: none;
    overflow-y: auto;
    overflow-x: hidden;
}
`;

return (
  <css>
    <iframe
      iframeResizer
      src="https://sepolia.easscan.org/schema/view/0x447cefc057bdd611bc853756d3fd633e495d4d8d75a1aaed7ae5598573984c13"
    />
  </css>
);
