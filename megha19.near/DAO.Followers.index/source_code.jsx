const daoId = props.daoId;
const publicApiKey = "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5";
const baseApi = "https://api.pikespeak.ai";
let followers = [];

function fetchFollowers() {
    const resp = Social.keys(`*/graph/follow/${daoId}`, "final", {
        values_only: true,
        return_type: "BlockHeight"
    });
    if (resp) {
        for (const key of Object.keys(resp)) {
            const followEdge = Social.keys(
                `${context.accountId}/graph/follow/${key}`,
                undefined,
                { values_only: true }
            );
            followers.push({
                account: key,
                isUserFollowed: Object.keys(followEdge || {}).length > 0,
                blockHeight: resp[key]?.graph?.follow?.[daoId]
            });
        }
    }
}

fetchFollowers();

const Wrapper = styled.div`
    .userRow {
        width: 100%;
        @media screen and (min-width: 600px) {
            width: calc(50% - 1rem);
        }
        @media screen and (min-width: 1400px) {
            width: calc(33% - 1rem);
        }
    }
`;

return (
    <div>
        <Wrapper className="d-flex flex-column gap-4">
            <Widget
                src="megha19.near/widget/DAO.Followers.FollowersList"
                props={{
                    data: followers
                }}
            />
        </Wrapper>
    </div>
);
