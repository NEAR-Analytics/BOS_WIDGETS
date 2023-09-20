const style = {
  //
  wrapper: {
    // border: "3px solid black",
    padding: "20px",
    width: "100%",
  },
  profileBackgroundImage: {
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    // border: "3px solid black",
    backgroundSize: "cover",
    marginBottom: "20px",
    lineHeight: "200px",
    textAlign: "center",
    height: "200px",
    color: "white",
  },
  profileMiniWrapper: {
    // border: "3px solid black",
    flexDirection: "row",
    marginBottom: "20px",
    display: "flex",
    height: "150px",
    width: "100%",
  },
  profileImage: {
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    // border: "3px solid black",
    backgroundSize: "cover",
    borderRadius: "50%",
    textAlign: "center",
    lineHeight: "150px",
    minWidth: "150px",
    width: "150px",
    color: "white",
  },
  profileTextWrapper: {
    // border: "3px solid black",
    paddingTop: "20px",
    minWidth: "100px",
    margin: "10px",
  },
  profileName: {
    //
  },
  accountId: {
    overflow: "auto",
  },
  widgetCount: {
    overflow: "auto hidden",
    paddingBottom: "10px",
    minWidth: "100px",
  },
  widgets: {
    flexDirection: "column",
    overflow: "auto hidden",
    minWidth: "100px",
    display: "flex",
  },
};

// ㅜ 로그인한 니어 계정 가져오기
// ㅜ context.accountId이 널이거나 언디파인이면 props.accountId
const accountId = context.accountId ?? props.accountId;

// ㅜ ["loading", "accountId", "widgetSrc", "networkId"]
// console.log(Object.keys(context));

const profileData = Social.getr(`${accountId}/profile`);

// ㅜ ["image", "name", "backgroundImage"]
console.log(Object.keys(profileData));

// ㅜ 로그인한 니어 계정의 프로필 엘리먼트
const profileElements = () => {
  return (
    <>
      {/** ㅜ 프로필 배경 이미지 */}
      <div
        style={{
          ...style.profileBackgroundImage,
          backgroundImage: `url(https://ipfs.near.social/ipfs/${profileData.backgroundImage.ipfs_cid})`,
        }}
      >
        backgroundImage
      </div>
      {/**  */}
      <div style={style.profileMiniWrapper}>
        {/** ㅜ 프로필 이미지 */}
        <div
          style={{
            ...style.profileImage,
            backgroundImage: `url(https://ipfs.near.social/ipfs/${profileData.image.ipfs_cid})`,
          }}
        >
          profileImage
        </div>
        {/** */}
        <div style={style.profileTextWrapper}>
          {/** ㅜ 프로필 이름 */}
          <h3 style={style.profileName}>{profileData.name}</h3>
          {/** ㅜ 지갑 주소 */}
          <div style={style.accountId}>{accountId}</div>
        </div>
      </div>
    </>
  );
};

// ㅜ 로그인한 니어 계정의 위젯 목록 가져오기
const widgetData = Social.getr(
  `${accountId}/widget/*`,
  // ㅜ finality: final or 숫자
  "final",
  {
    // ㅜ subscribe: true이면 데이터가 5초마다 새로 고쳐집니다.
    subscribe: true,
  }
);

// ㅜ ["slide", "GreeterGaenchanaa", "collegium.bos.wk2.LiquityOpenTroveSepoliaExample"]
// console.log(Object.keys(data));

// ㅜ [Object, Object, Object]
// console.log(Object.values(data));

// ㅜ ["", "metadata"]
// console.log(Object.keys(Object.values(data)[1]));

// ㅜ ["코드", Object]
// console.log(Object.values(Object.values(data)[1]));

const widgetEntries =
  widgetData === undefined || widgetData === null
    ? []
    : Object.entries(widgetData);

// ㅜ 로그인한 니어 계정의 위젯 엘리먼트
// ㅜ map() 함수에 의해 위젯 개수에 따라 반복됨
const widgetElements = widgetEntries.map(([title]) => {
  //
  // ㅜ slide, GreeterGaenchanaa, collegium.bos.wk2.LiquityOpenTroveSepoliaExample
  console.log(title);

  return (
    <div
      style={{
        padding: "15px 15px 15px 15px",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
        }}
      >
        <a
          href={`/near/widget/ComponentDetailsPage?src=${accountId}/widget/${title}`}
          style={{
            padding: "15px",
            border: "solid 2px #bbb",
            backgroundColor: "#fff",
            color: "#0d6efd",
            fontSize: "2rem",
            fontWeight: "bold",
          }}
        >
          &lt;&nbsp;&gt;
        </a>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <a
            href={`/${accountId}/widget/${title}`}
            style={{
              padding: "0 0 0 15px",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              fontSize: "2em",
              fontWeight: "bold",
              color: "#000",
              wordBreak: "break-all",
            }}
          >
            {title}
          </a>
          <a
            href={`/near/widget/ProfilePage?accountId=${accountId}`}
            style={{
              padding: "0 0 0 14px",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              fontSize: "1.3em",
              color: "#888",
              wordBreak: "break-all",
            }}
          >
            @{accountId}
          </a>
        </div>
      </div>
      <hr />
    </div>
  );
});

return (
  <>
    <div style={style.wrapper}>
      {/** ㅜ 로그인한 니어 계정의 프로필 엘리먼트 */}
      <profileElements />
      {/** */}
      {/** ㅜ 수평 가로선 */}
      <hr />
      {/** ㅜ 로그인한 니어 계정의 게시물 엘리먼트 */}
      <Widget
        src={`idknwhoru.near/widget/collegium.bos.wk3.MyPosts`}
        props={props}
      />
      {/** */}
      {/** ㅜ 로그인한 니어 계정의 위젯 엘리먼트 */}
      <h1 style={style.widgetCount}>
        Your("{accountId}") Widgets: {widgetEntries.length}
      </h1>
      <hr />
      <div style={style.widgets}>
        {widgetElements}
        {/** */}
      </div>
    </div>
  </>
);
