const account_id = context.accountId ?? props.accountId;

const profileData = props.profile ?? Social.getr(account_id);//`idknwhoru.near/profile`
const fast = !props.profile;

if (profileData === null) {
  return "Loading";
}
/* 
[
    {
        "accountId":"party-dhsimpson.near",
        "blockHeight":101193567,
        "value":{"type":"md"}},
    {
        "accountId":"party-dhsimpson.near",
        "blockHeight":101190682,
        "value":{"type":"md"}}
]
*/

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
            <MySocialData>
                <h4>
                    Number of posts: {Object.keys(postList).length}
                </h4>
                <ul>
                    {Object.entries(postList).map(([key, value])=>{
                        const {text, image} = JSON.parse(value);
                        return (
                            <div>
                                <p>{text}</p>
                                <img src={`${nearIpfsBaseUrl}${image.ipfs_cid}`} alt="profile-image"/>
                            </div>
                        )
                    })}
                </ul>
            </MySocialData>
            <MySocialData>
                <h4>
                    Number of widgets: {Object.keys(componentData).length}
                </h4>
                <ul>
                    {Object.entries(componentData).map(([key, value])=>{
                        return (
                            <div>
                                <a href={`${widgetBaseUrl}${key}`}>{key}</a>
                            </div>
                        )
                    })}
                </ul>
            </MySocialData>
        </MySocialDataWrapper>
    </MyPageWrapper>
  <div>
    {JSON.stringify(profileData)}
    <br />
    {/*{JSON.stringify(componentData)}*/}
    <br />
    <br />
    {JSON.stringify(postData)}
    {/*{JSON.stringify(idxData)} */}
    {JSON.stringify(postList)}
  </div>
  </>
);
