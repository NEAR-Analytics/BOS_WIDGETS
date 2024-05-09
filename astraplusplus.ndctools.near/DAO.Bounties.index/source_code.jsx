const defaultFilters = props.defaultFilters ?? {};
const daoId = props.accountId;
const bountiesLink = "#/astraplusplus.ndctools.near/widget/home?tab=bounties";
const publicApiKey = "LzOQDSCBMAeuNO7vDwIvP";
const baseApi = "https://api.app.astrodao.com/api/v1/bounty-contexts";
let offset = 0;
const limit = 50;

State.init({ bounties: [] });

function fetchBounties() {
    asyncFetch(
        `${baseApi}?accountId=${daoId}&limit=${limit}&offset=${offset}&s=%7B%20%22%24and%22%3A%20%5B%7B%20%22daoId%22%3A%20%22${daoId}%22%20%7D%5D%20%7D`,
        {
            method: "GET",
            headers: { "x-api-key": publicApiKey }
        }
    ).then((res) => {
        if (res?.body?.data) State.update({ bounties: res.body.data });
    });
}

fetchBounties();

return (
    <Widget
        src="astraplusplus.ndctools.near/widget/DAO.Bounties.List"
        props={{ bounties: state.bounties }}
    />
);
