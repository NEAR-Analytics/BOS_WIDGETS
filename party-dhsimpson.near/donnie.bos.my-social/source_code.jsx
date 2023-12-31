const account_id = context.accountId ?? props.accountId;

const profileData = props.profile ?? Social.getr(`${account_id}/profile`);

if (profileData === null) {
  return "Loading";
}

const MyPageWrapper = styled.div`
    width: 100%;
    height: 100%;
    padding: 20px;
`;
const nearIpfsBaseUrl = "https://ipfs.near.social/ipfs/";
const defaultImgCid = "bafkreido7gsk4dlb63z3s5yirkkgrjs2nmyar5bxyet66chakt2h5jve6e";

function MyProfile() {
  const ProfileWrapper = styled.div`
        width: 100%;
        height: 300px;
        background-color: rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        border-radius: 25px;
        margin-bottom: 30px;
    `;

  const ProfileImage = styled.img`
        width: 150px;
        height: 150px;
        margin: 0 20px;
        border-radius: 100%;
    `;

  const MyName = styled.h2`
    `;

  const MyWallet = styled.p`
    `;

  return (
    <ProfileWrapper>
      <ProfileImage
        src={`${nearIpfsBaseUrl}${profileData?.image?.ipfs_cid ?? defaultImgCid}`}
        alt="profile-image"
      />
      <div>
        <MyName>{profileData.name}</MyName>
        <MyWallet>{account_id}</MyWallet>
      </div>
    </ProfileWrapper>
  );
}

const MySocialDataWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

function PostData() {
  const postIdxData = Social.index("post", "main", {
    limit: 30,
    order: "desc",
    accountId: [account_id],
  });

  const postBlockHashList = postIdxData.map((idxData) => {
    return idxData.blockHeight;
  });

  const postList = postBlockHashList.map((blockHash) => {
    return Social.get(`${account_id}/post/main`, blockHash);
  });

  function RenderPostListItem(key, value, idx) {
    const { text, image } = JSON.parse(value);
    const PostText = styled.span`
      font-size: 20px;
      overflow: hidden;
      max-height: 100px;
    `;

    const PostImg = styled.img`
      width: 50px;
      height: 50px;
    `;

    return (
      <>
        <PostText>
          <b>#{idx}</b>
          {text}
        </PostText>
        {image && (
          <PostImg
            src={`${nearIpfsBaseUrl}${image.ipfs_cid}`}
            alt="profile-image"
          />
        )}
      </>
    );
  }

  return (
    <SocialData data={postList} name="Posts" renderer={RenderPostListItem} />
  );
}

function WidgetData() {
  const componentData = Social.getr(`${account_id}/widget`);

  function RenderWidgetListItem(key, value) {
    const widgetBaseUrl = `https://near.social/${account_id}/widget/`;

    const OpenWidgetLink = styled.a`
        width: 100%;
        display: flex;
        justify-content: space-between;
        text-decoration: none;
        color: black;

        &:hover, &:focus {
            text-decoration: none;
            color: black;
        }
    `;
    const WidgetImg = styled.img`
      width: 35px;
      height: 35px;
      border-radius: 100%;
    `;

    const WidgetNameWrapper = styled.div`
        max-width: 70%;
        font-size: 20px;
        display: flex;
    `;

    const WidgetName = styled.span`
        margin-left: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
    `;

    return (
      <OpenWidgetLink href={`${widgetBaseUrl}${key}`} target="_blank">
        <WidgetNameWrapper>
          <WidgetImg
            src={`${nearIpfsBaseUrl}${defaultImgCid}`}
            alt="profile-image"
          />
          <WidgetName>{key}</WidgetName>
        </WidgetNameWrapper>
        <Widget
          src="party-dhsimpson.near/widget/gotoSvg"
          props={{ width: 15, heigh: 15 }}
        />
      </OpenWidgetLink>
    );
  }

  return (
    <SocialData
      data={componentData}
      name="Widgets"
      renderer={RenderWidgetListItem}
    />
  );
}

function SocialData({ data, name, renderer }) {
  const DataHead = styled.h3`
        border-bottom: 1px solid #DDD;
        line-height: 2;
        padding-bottom: 10px;
    `;

  const SocialDataList = styled.ul`
        padding: 0;
        margin-top: 20px;
        max-height: 800px;
        overflow-y: scroll;
        /* Firefox */
        scrollbar-width: none;

        /* IE and Edge */
        -ms-overflow-style: none;

        /* Chrome, Safari, newer versions of Opera */
        &::-webkit-scrollbar {
          display: none;
        }
    `;

  const SocialDataListItem = styled.li`
        list-style-type: none;
        width: 100%;
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 20px 0;
        padding: 10px;
        border-radius: 20px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        background-color: rgba(0,0,0,0.025);
    `;
  const MySocialData = styled.div`
        width: 45%;
        min-height: 500px;
    `;

  
  return (
    <MySocialData>
      <DataHead>
        Number of {name}: {Object.keys(data).length}
      </DataHead>
      <SocialDataList>
        {Object.entries(data).map(([key, value], idx) => {
          return (
            <SocialDataListItem>{renderer(key, value, idx)}</SocialDataListItem>
          );
        })}
      </SocialDataList>
    </MySocialData>
  );
}

  const BannerWrapper = styled.div`
        width: 100%;
        height: 200px;
        background-color: rgba(111,0,0,0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 25px;
        margin-bottom: 20px;
        font-size: 48px;
        font-weight: 700;
  `;

return (
  <MyPageWrapper>
    <BannerWrapper>
      베너광고
    </BannerWrapper>      
    <MyProfile />
    <MySocialDataWrapper>
      <PostData />
      <WidgetData />
    </MySocialDataWrapper>
  </MyPageWrapper>
);
