const userId = context.accountId;

const HeaderContent = styled.div`
    width: 100%;
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const Contents = styled.div`

`;

const Category1 = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const NFT = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;

  img{
    width: 200px;
  }
`;

return (
  <div>
    <HeaderContent>
      <h1>Welcome to NFT Poll</h1>
      {userId ? (
        <p>Vote for your best NFT's</p>
      ) : (
        <p>Pls Login to Vote for your best NFT's</p>
      )}
    </HeaderContent>

    <Contents>
      <h1>All NFT's</h1>
      <Category1>
        <NFT>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXaqX9SxkzmJCfw1ThCXaXoLLhGLNiq0DpA2aw7jG--zm-YkCVl81_ezV-u9qEAjUYq28&usqp=CAU"
            alt="first nft image"
          />
          <button>Vote NFT</button>
        </NFT>
        <NFT>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqrLBwjRB6OXID6mhJhUbgHUZyDLvgijLmQJD4jZI8-4N54mEq6swOUmh_0ShJNWbQBnI&usqp=CAU" />
          <button>Vote NFT</button>
        </NFT>
        <NFT>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3ubiGg6d69WzgDCMhjNkx-adKWnnKm6JLrp0MST08K8xmi0XHvkyYUhHscqjzuggLpnY&usqp=CAU" />
          <button>Vote NFT</button>
        </NFT>
      </Category1>
      <Web3Connect />
    </Contents>
  </div>
);
