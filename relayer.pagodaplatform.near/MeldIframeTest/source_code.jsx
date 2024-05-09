const website = "https://fluidmoney.xyz/";

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
}
iframe {
    display: block;
    width: 100%;
    border: none;
    overflow-y: auto;
    overflow-x: hidden;
}
`;

state = State.init({
  opened: false,
});

return (
  <css>
    <iframe
      onMessage={(response) =>
        State.update({ opened: true, url: response.url })
      }
      frameborder="0"
      marginheight="0"
      marginwidth="0"
      width="100%"
      height="100%"
      scrolling="auto"
      src="https://fluidmoney.xyz"
    ></iframe>
  </css>
);
