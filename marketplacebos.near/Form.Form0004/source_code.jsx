props.fileType ||
  initState({
    json: "upload json to ipfs",
  });
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ipfsUrl = (cid) => `https://ipfs.near.social/ipfs/${cid}`;
const Input = styled.input`
  width: 300px;
  height: 50px;
  border-radius:13px;
`;

const Toggle = styled.button`
  width: 100px;
  height: 50px;
  background-color: #000;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
`;

const UploadJson = () => {
  if (state.json.length) {
    const body = new Blob([state.json], { type: "application/json" });
    asyncFetch("https://ipfs.near.social/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body,
    }).then((res) => {
      const cid = res.body.cid;
      State.update({
        file: {
          cid,
        },
      });
    });
  } else {
    State.update({
      file: null,
    });
  }
};

const props = {
  copyBtn:
    "const Wrapper = styled.div`\n" +
    `  width: 300px;
  height: 50px;
  border-radius:13px;
` +
    "\n`;" +
    "\nconst Input = styled.input`\n" +
    `  width: 300px;
  height: 50px;
  border-radius:13px;
` +
    "\n`;" +
    "\nconst Toggle = styled.button`\n" +
    `    width: 100px;
  height: 50px;
  background-color: #000;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
` +
    "\n`;" +
    `props.fileType ||
  initState({
    json: "json" ,
  });\n` +
    "\nconst ipfsUrl = (cid) => `https://ipfs.near.social/ipfs/${cid}`;\n" +
    `\n const UploadJson = () => {
  if (state.json.length) {
    const body = new Blob([state.json], { type: "application/json" });
    console.log(body);
    asyncFetch("https://ipfs.near.social/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body,
    }).then((res) => {
      const cid = res.body.cid;
      console.log("CID", cid);
      State.update({
        file: {
          cid,
        },
      });
    });
  } else {
    State.update({
      file: null,
    });
  }
};
  ` +
    `\n return(
           <Wrapper>
    <Input
      type="text"
      class="form-control mb-2"
      rows={5}
      value={state.json}
      onChange={(e) => {
        state.json = e.target.value;
        State.update();
      }}
    />
    <br />
    Your file:
    {state.file && (
      <div>
        <a href={ipfsUrl(state.file.cid)}>{state.file.cid}</a>
      </div>
    )}
    <Toggle onClick={() => UploadJson()}>Save</Toggle>
  </Wrapper>
  )`,
  component: (
    <Wrapper>
      <Input
        type="text"
        class="form-control mb-2"
        rows={5}
        value={state.json}
        onChange={(e) => {
          state.json = e.target.value;
          State.update();
        }}
      />
      <Toggle onClick={() => UploadJson()}>Save</Toggle>
      <br />
      <br />
      Your file:
      {state.file && (
        <div>
          <a href={ipfsUrl(state.file.cid)}>{state.file.cid}</a>
        </div>
      )}
    </Wrapper>
  ),
  detailLink: "https://near.org/marketplacebos.near/widget/Detail.FP.F0004",
};

return (
  <>
    <Widget src="marketplacebos.near/widget/CardMain.CardForm" props={props} />
  </>
);
