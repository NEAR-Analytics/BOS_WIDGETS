const $ = VM.require("sdks.near/widget/Loader");
const {
  Buttons: { ButtonPrimary },
} = $("@mattb/frensly/commons");

const Container = styled.div`
   padding: 0 20px;
`;

const WritePost = styled.div`
  display:flex;
  align-items:flex-start;
  width:100%;
  padding:1rem;
  margin:25px 0;
  border-radius:10px;
  background-color:#fafafa;
  border:1px solid rgba(0,0,0,.05);

  .textarea-container {
    position:relative;
    width:100%;
    box-sizing:border-box;
    margin-left:1rem;

    a {
        position:absolute;
        right:0px;
        bottom:13px;
    }
  }
`;

const Avatar = styled.div`
  display:flex;
  flex-grow:1;
  width:100%;
  max-width:60px;
  height:60px;
  border-radius:100%;
  background-color:rgba(0,0,0,.05);
  overflow:hidden;
  flex-shrink:0;
  border:1px solid rgba(0,0,0,.05);

  img {
    max-width:100%;
  }
`;

const TextArea = styled.textarea`
 width:100%;
 height:120px;
 border:0;
 background-color:#fff;
 border-radius:10px;
 border:1px solid rgba(0,0,0,.05);
 padding:1rem;
 resize:none;
 outline-style:none;
`;

return (
  <Container>
    <ButtonPrimary>See Lens posts</ButtonPrimary>
    <ButtonPrimary>See Frensly posts</ButtonPrimary>
    <WritePost>
      <Avatar></Avatar>
      <div className="textarea-container">
          <TextArea placeholder="What are you thinking?"></TextArea>
          <ButtonPrimary>Post</ButtonPrimary>
      </div>
    </WritePost>
  </Container>
);
