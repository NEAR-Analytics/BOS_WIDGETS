const widgetProvider = props.widgetProvider;
const account = props.account || "foundation.near";
const apiUrl = `https://api.pikespeak.ai/account/near-transfer/${account}`;
const apiPolicyUrl = `https://api.pikespeak.ai/daos/policy`;
const publicApiKey = "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5";

const parseNear = (near) => {
    return Number((Number(near) / Math.pow(10, 24)).toFixed(2));
};


const policy = fetch(apiPolicyUrl + `?daos=${account}`, {
    mode: "cors",
    headers: {
        "x-api-key": publicApiKey,
    },
});
const minamount = policy.body?parseNear(policy.body.state.policy.proposal_bond):0;

const columns = [
    {
        id: "timestamp",
        label: "date",
        formatter: (data) => {
            const milliTimestamp = Math.trunc(
                Number(data["timestamp"]) / Math.pow(10, 6)
            );
            return new Date(Number(milliTimestamp)).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
            });
        },
    },
    {
        id: "sender",
        label: "Sender",
        formatter: (d) => {
            return (
                <a
                    href={`https://explorer.near.org/accounts/${d.sender}`}
                    target="_blank"
                >
                    {d.sender}
                </a>
            );
        },
    },
    {
        id: "receiver",
        label: "Receiver",
        formatter: (d) => {
            return (
                <a
                    href={`https://explorer.near.org/accounts/${d.receiver}`}
                    target="_blank"
                >
                    {d.receiver}
                </a>
            );
        },
    },
    {
        id: "amount",
        label: "Amount",
        formatter: (d) => Number(d["amount"]).toFixed(2),
    },
    {
        id: "transaction_id",
        label: "Tx id",
        formatter: (d) => {
            return (
                <a
                    href={`https://explorer.near.org/transactions/${d.transaction_id}`}
                    target="_blank"
                >
                    {d.transaction_id}
                </a>
            );
        },
    },
];

const resPerPage = 10;

State.init({
    txs: [],
    offset: 0,
    minamount: minamount
});

const nextPage = () => {
    State.update({offset: state.offset + resPerPage});
};

const previousPage = () => {
    State.update({offset: state.offset - resPerPage});
};

const GenericTable = (
    <Widget
        src={`${widgetProvider}/widget/generic_table`}
        props={{
            title: "NEAR transfers",
            columns,
            data: state.txs,
            nextPage,
            previousPage,
            offset: state.offset,
            resPerPage,
            filter:     <button
                onClick={
                    () => state.minamount!=0?State.update({minamount:0}):State.update({minamount})
                }
                style={{margin:"10px 0",}}
            >
                {state.minamount!=0?'Show':'Hide'} bond transactions
            </button>
        }}
    />
);

let transactions = [];
const fetchTransfers = (offset,minamount) => {
    const nearTransfers = fetch(
        apiUrl + `?offset=${offset}&limit=${resPerPage}&minamount=${minamount}`,
        {
            mode: "cors",
            headers: {
                "x-api-key": publicApiKey,
            },
        }
    );
    nearTransfers.body && State.update({txs: nearTransfers.body});
};

fetchTransfers(state.offset, state.minamount);

return <div>
    {GenericTable}
</div>;
