let json = props.json ||"Test here";
props.fileType ||
  initState({
    json: {json},
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

return (
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
    <br/>
    Your file:
      {state.file && (
      <div>
        <a href={ipfsUrl(state.file.cid)}>{state.file.cid}</a>
      </div>
    )}
    <Toggle onClick={() => UploadJson()}>Save</Toggle>

  
  </Wrapper>
);
