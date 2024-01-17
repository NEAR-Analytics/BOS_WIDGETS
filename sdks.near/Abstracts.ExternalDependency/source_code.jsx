return (props) => {
  const code = `
        <script type="text/javascript" src="https://unpkg.com/${props.package}"></script>
        <script type="text/javascript">
            const getPackageMethod = (instruction, package) => {
                return instruction.split(".").reduce((path, nextPath) => (path || {})[nextPath], package);
            };
        
            window.addEventListener("message", (e) => {
              if (e.data.instruction) {
                 let value = Array.isArray(e.data.value) ? e.data.value : [e.data.value];
                 let result = getPackageMethod(e.data.instruction, ${props.adapter.name})(...value);
                 let parseResult = (result) => {
                    if (e.data.returnType == "object" || e.data.returnType == "array") {
                        return JSON.stringify(result);
                    }
        
                    if (e.data.returnType == "string") {
                        return result.toString();
                    }

                    if (e.data.returnType == "number") {
                        return result;
                    }
                 }
        
                 window.top.postMessage({
                    index: e.data.index,
                    instruction: e.data.instruction,
                    returnType: e.data.returnType,
                    result: parseResult(result)
                 }, "*");
              }
            })
        </script>
   `;

  return (
    <iframe
      srcDoc={code}
      style={{ display: "none" }}
      message={props.adapter.getRequest()}
      onMessage={(data) => props.adapter.setResponse(data)}
    />
  );
};
