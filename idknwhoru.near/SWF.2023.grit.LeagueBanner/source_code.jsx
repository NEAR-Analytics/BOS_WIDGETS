const BannerWrapper = styled.div`
    width: 100%;

    .banner-image {
        width: 80%;
    }
`;

return (
  <>
    <div>
      <img
        className="banner-image"
        src={`https://ipfs.near.social/ipfs/bafkreidcivpo3eh3m2voreinoq2adx2yutndmgldzn4c6mmxqyfxhxzcda`}
      />
      <div>
        <h1 className="league-title">
          1등 우승: 500만원 상당의 상품권, 2등 우승: 300만원 상당의 상품권
        </h1>
        <h2 className="league-holders">참가자들: 1311명</h2>
        <h3 className="league-date">우승 추첨: 2023년 8월 14일 21:00시</h3>
        <button>참가하기</button>
      </div>
      <div>
        <img
          className="banner-image"
          src={`https://ipfs.near.social/ipfs/bafkreifxtf2zrapxri4vlbkxo2qjbkyxnafqr3cri2ceurj6erqueqhna4`}
        />
      </div>
    </div>
  </>
);
