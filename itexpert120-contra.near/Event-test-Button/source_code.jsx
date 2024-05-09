const { Button } = VM.require("buildhub.near/widget/components") || { Button: () => <></> };

  return <Button onClick={() => { console.log("Hello World"); }} variant="primary">
    Test Button
  </Button>