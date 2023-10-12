const defaultFilters = props.defaultFilters ?? {};

const bountiesLink = "#/astraplusplus.ndctools.near/widget/home?tab=bounties";

const publicApiKey = "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5";
const resPerPage = 10;

// dummy data
const bounties = [
    {
        description: "description 1",
        token: "megha19.near",
        amount: 100,
        times: 3,
        max_deadline: 33,
        name: "name",
        id: 222
    },
    {
        description: "description 1",
        token: "megha19.near",
        amount: 100,
        times: 3,
        max_deadline: 33,
        name: "dddd",
        id: 22
    },
    {
        description: "description 1",
        token: "megha19.near",
        amount: 100,
        times: 3,
        max_deadline: 33,
        name: "ssss",
        id: 2
    }
];

const renderBounties = () => {
    return (
        <Widget
            src="astraplusplus.ndctools.near/widget/Bounties.List"
            props={{
                bounties
            }}
        />
    );
};

return <div>Page under Development</div>;
