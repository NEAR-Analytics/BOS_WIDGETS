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
    </MyPageWrapper>
  <div>
    {JSON.stringify(profileData)}
    <br />
    <br />
    {JSON.stringify(Object.keys(componentData))}
    <br />
    <br />
    {JSON.stringify(postData)}
  </div>
  </>
);
