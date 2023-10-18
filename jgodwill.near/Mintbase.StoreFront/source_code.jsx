const storeData = props ?? props.storeInfo;

const Card = styled.div`
padding: 1em;
border: 1px solid #e5e8eb;
gap: 2em;
margin: 10px auto;
border-radius: .7em;
& input{
  display: block;
  padding:.5em;
  width:100%;
  border: 1px solid #e5e8eb;
  border-radius: 10px;
  outline: none;
  background: #f4f5f6;
  color: #525c76;
  :focus{
  box-shadow:none;
    border:1px solid #0d99ff;
  }
  &::placeholder {
    color: palevioletred;
  }
  }
  .soulbound{
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  img{
    width: 100%;
    height: 200px;
    object-fit:cover;
  }
`;

return (
  <Card>
    <img
      src={
        storeData.media ||
        "https://arweave.net/cjSBAKOSIV-ElbiqsdcT0aJ9xXBzPKYlGnUtWqkhrTY"
      }
      alt="store Image"
    />
    <div className="bottom">
      <h4 className="title">{storeData.title || "Store Title"}</h4>
      <p className="desc">{storeData.description || "Description"}</p>
    </div>
  </Card>
);
