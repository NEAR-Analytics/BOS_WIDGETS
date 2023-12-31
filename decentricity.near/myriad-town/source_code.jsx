const css = styled.b`
html {overflow: auto;}    
html,
body,
div,
iframe {
    margin: 0px;
    padding: 0px;
    height: 100%;
    min-height: 720px;
    border: none;
}
iframe {
    display: block;
    width: 100%;
    max-width: 1280px; // maximum width
    max-height: 720px; // maximum height
    border: none;
    overflow-y: auto;
    overflow-x: hidden;
}
`;
return (
  <>
    <css>
      <iframe
        src={"https://myriad.town"}
        frameborder="0"
        marginheight="0"
        marginwidth="0"
        width="100%"
        height="100%"
        scrolling="auto"
      ></iframe>
    </css>
  </>
);
