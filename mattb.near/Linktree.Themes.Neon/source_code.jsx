const DefaultTheme = VM.require("mattb.near/widget/Linktree.Themes.Default");

const TagsSection = styled.div`
  display: grid;
  gap: 24px;

  ul {
    justify-content:center;

    li {
      padding: 7px 15px;
      background-color: rgba(255, 64, 129, .2);
      border: 2px solid rgba(255, 64, 129, .4);
      font-weight: 700;
      border-radius:0;
      color:#fff;
    }
  }
`;

const Linktree = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  gap: 16px;
  padding: 0 8px;
  height:100vh;
  background-color:#000;
  border-radius:20px;
  color:#fff;

  > a img {
    box-shadow: 0 0 0 10px rgba(255, 64, 129, .2);
  }
`;

const LinktreeLinks = styled.div`
  display:flex;
  flex-direction:column;
  gap:8px;
  width:100%;
  max-width:400px;
  margin-top:1rem;

  a {
    text-align:center;
    
    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius:0;
      max-width:230px;
      background-color:transparent;
      padding: 10px;
      border:0;
      color:#fff;
      text-transform:uppercase;
      border: 4px solid #FF4081;
      box-shadow: 0 0 5px 5px #d52f6763;
      text-transform: uppercase;
      color: #FF4081;
      font-weight: bold;
      letter-spacing:2px;

      i {
        font-size:1.4rem;
        margin-right:10px;
      }

      :hover {
        background-color:transparent;
        opacity:.8;
      }
    }
  }
`;

return {
  ...DefaultTheme,
  Linktree,
  LinktreeLinks,
  TagsSection,
};
