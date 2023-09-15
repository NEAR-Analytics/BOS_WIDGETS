const account_id = context.accountId ?? props.accountId;

const profileData = props.profile ?? Social.getr(`idknwhoru.near/profile`);
const fast = !props.profile;

if (profileData === null) {
  return "Loading";
}
const componentData = Social.getr(`${account_id}/widget`);
const postData = Social.getr(`${account_id}/post`);

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
                    Number of posts: {Object.keys(postData).length}
                </h4>
                <ul>
                    {Object.entries(postData).map(([key, value])=>{
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
                                <p>{key}</p>
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
    <br />
    {/*{JSON.stringify(componentData)}*/}
    <br />
    <br />
    {JSON.stringify(postData)}
  </div>
  </>
);
