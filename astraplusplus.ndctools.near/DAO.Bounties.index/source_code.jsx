const defaultFilters = props.defaultFilters ?? {};
const daoId = props.accountId;
const bountiesLink = "#/astraplusplus.ndctools.near/widget/home?tab=bounties";
const publicApiKey = "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5";
const resPerPage = 10;
const baseApi = "https://api.pikespeak.ai";

State.init({
    bounties: []
});

function fetchBounties() {
    const res = fetch(`${baseApi}/daos/bounties/${daoId}`, {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": publicApiKey
        }
    });

    if (res?.body?.length) State.update({ bounties: res.body });
}

fetchBounties();

return (
    <Widget
        src="astraplusplus.ndctools.near/widget/DAO.Bounties.List"
        props={{ bounties: state.bounties }}
    />
);
