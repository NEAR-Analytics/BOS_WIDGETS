const account_id = context.accountId ?? props.accountId;

const profileData = props.profile ?? Social.getr(`idknwhoru.near/profile`);//`idknwhoru.near/profile`

if (profileData === null) {
  return "Loading";
}

const MyPageWrapper = styled.div`
    width: 100%;
    height: 100%;
    padding: 20px;
`;
const nearIpfsBaseUrl = "https://ipfs.near.social/ipfs/";

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
    )
}

const MySocialDataWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

function PostData() {
    const postIdxData = Social.index("post", "main", {limit: 30, order: "desc", accountId: [account_id]});

    const postBlockHashList = postIdxData.map(idxData => {
        return idxData.blockHeight
    });

    const postList = postBlockHashList.map(blockHash => {
        return Social.get(`${account_id}/post/main`, blockHash);
    });

    function RenderPostListItem(key, value) {
        const {text, image} = JSON.parse(value);
        return (
            <>
                <p>{text}</p>
                {image && <img src={`${nearIpfsBaseUrl}${image.ipfs_cid}`} alt="profile-image"/>}
            </>
        )
    }

    return <SocialData data={postList} renderer={RenderPostListItem} />
}

function WidgetData() {
    const componentData = Social.getr(`${account_id}/widget`);

    function RenderWidgetListItem(key, value) {
        const widgetBaseUrl = `https://near.social/${account_id}/widget/`;

        const Link = styled.a`
            text-decoration: none;
            color: black;

            &:hover, &:focus {
                text-decoration: none;
                color: black;
            }
        `;
        
        return (
            <Link href={`${widgetBaseUrl}${key}`} target='_blank'>
                {key}
            </Link>
        )
    }

    return <SocialData data={componentData} renderer={RenderWidgetListItem} />
}

function SocialData({data, renderer}) {
    const SocialDataListItem = styled.li`
        list-style-type: none;
    `;
    const MySocialData = styled.div`
        width: 45%;
        min-height: 500px;
    `;
    return (
        <MySocialData>
            <h4>
                Number of widgets: {Object.keys(data).length}
            </h4>
            <ul>
                {Object.entries(data).map(([key, value])=>{
                    return (
                        <SocialDataListItem>
                            {renderer(key, value)}
                        </SocialDataListItem>
                    )
                })}
            </ul>
        </MySocialData>
    )
}

return (
    <>
    <MyPageWrapper>
        <MyProfile/>
        <MySocialDataWrapper>
            <PostData/>
            <WidgetData/>
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