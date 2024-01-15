return (props) => {
  const code = `
        <script type="text/javascript" src="https://unpkg.com/${props.package}"></script>
        <script type="text/javascript">
            window.top.postMessage(${props.name}, "*");
        </script>
   `;
  return <iframe
        srcDoc={code}
        style={{ display: "none" }}
        onMessage={(data) => props.onCreate(data)} />;
};
