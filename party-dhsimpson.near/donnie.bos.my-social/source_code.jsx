const account_id = context.accountId ?? props.accountId;

const profileData = props.profile ?? Social.getr(account_id);//`idknwhoru.near/profile`
const fast = !props.profile;

if (profileData === null) {
  return "Loading";
}

const componentData = Social.getr(`${account_id}/widget`);
const postIdxData = Social.index("post", "main", {limit: 30, order: "desc", accountId: [account_id]});
const postBlockHashList = postIdxData.map(idxData => {
    return idxData.blockHeight
});
const postList = postBlockHashList.map(blockHash => {
    return Social.get(`${account_id}/post/main`, blockHash);
});

const MyPageWrapper = styled.div`
    width: 100%;
    height: 100%;
    padding: 20px;
`;

const ProfileWrapper = styled.div`
    width: 100%;
    height: 300px;
    background-color: black;
    display: flex;
    align-items: center;
`;

const ProfileImage = styled.img`
    width: 150px;
    height: 150px;
    margin-right: 20px;
`;

const nearIpfsBaseUrl = "https://ipfs.near.social/ipfs/";

const MyName = styled.h2`
`;

const MyWallet = styled.p`
`;

const MySocialDataWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

const MySocialData = styled.div`
    width: 45%;
    min-height: 500px;
`;

const widgetBaseUrl = `https://near.social/${account_id}/widget/`;//${key}

function RenderPostListItem(key, value) {
    const {text, image} = JSON.parse(value);
    return (
        <>
            <p>{text}</p>
            <img src={`${nearIpfsBaseUrl}${image.ipfs_cid}`} alt="profile-image"/>
        </>
    )
}

function RenderWidgetListItem(key, value) {
    return (
        <a href={`${widgetBaseUrl}${key}`} target='_blank'>
            {key}
        </a>
    )
}

function SocialData({data, renderer}) {
    return (
        <MySocialData>
            <h4>
                Number of widgets: {Object.keys(data).length}
            </h4>
            <ul>
                {Object.entries(data).map(([key, value])=>{
                    return (
                        <li>
                            {renderer(key, value)}
                        </li>
                    )
                })}
            </ul>
        </MySocialData>
    )
}
return (
    <>
    <MyPageWrapper>
        <ProfileWrapper>
            <ProfileImage src={`${nearIpfsBaseUrl}${profileData.image.ipfs_cid}`} alt="profile-image"/>
            <div>
                <MyName>
                    {profileData.name}
                </MyName>
                <MyWallet>
                    {account_id}
                </MyWallet>
            </div>
        </ProfileWrapper>
        <MySocialDataWrapper>
            <SocialData data={postList} renderer={RenderPostListItem} />
            <SocialData data={componentData} renderer={RenderWidgetListItem} />
        </MySocialDataWrapper>
    </MyPageWrapper>
  <div>
    {/*{JSON.stringify(profileData)} */}
    <br />
    {/*{JSON.stringify(componentData)}*/}
    <br />
    <br />
    {/*{JSON.stringify(postData)} */}
    {/*{JSON.stringify(idxData)} */}
    {/*{JSON.stringify(postList)} */}
  </div>
  </>
);