if (!props.src) {
  return (
    <>
      Plz set url first (Also make sure the site allows embedded in an iframe)
    </>
  );
}
const css = styled.b`
html {overflow: auto};
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
}`;
return (
  <>
    <css>
      <iframe
        src={props.src}
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
