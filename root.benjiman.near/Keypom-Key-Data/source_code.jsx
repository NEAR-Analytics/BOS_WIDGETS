console.log("Hello from node.js");

const GRAPHQL_ENDPOINT = "https://near-queryapi.api.pagoda.co";

const paginationQuery = (offset, limit) => `sadasd
query MyQuery {
  root_benjiman_near_all_keypom_key_additions_keys(
    offset: ${offset}
    limit: ${limit}
    order_by: {block_timestamp: desc}
  ) {
    funder_id
    receipt_id
    block_height
    block_timestamp
    public_key
  }
}
`;

const countQuery = `
query MyQuery {
    root_benjiman_near_all_keypom_key_additions_keys_aggregate {
      aggregate {
        count
      }
    }
  }
`;

//
function getNumKeypomKeys() {
  return fetch(`${GRAPHQL_ENDPOINT}/v1/graphql`, {
    method: "POST",
    headers: { "x-hasura-role": "root_benjiman_near" },
    body: JSON.stringify({
      query: countQuery,
    }),
  }).body.data.root_benjiman_near_all_keypom_key_additions_keys_aggregate
    .aggregate.count;
}

function fetchKeypomKeyDataFromDb(offset, limit) {
  console.log(`fetching offset: ${offset}, limit: ${limit}`);
  let data = fetch(`${GRAPHQL_ENDPOINT}/v1/graphql`, {
    method: "POST",
    headers: { "x-hasura-role": "root_benjiman_near" },
    body: JSON.stringify({
      query: paginationQuery(offset, limit),
    }),
  });
  return data.body.data.root_benjiman_near_all_keypom_key_additions_keys;
}

State.init({ keyData: [] });

const paginateKeys = (limit, keysPerQuery) => {
  let keyData = [];
  for (let i = 0; i < limit; i += keysPerQuery) {
    let fetchedKeyData = fetchKeypomKeyDataFromDb(i, keysPerQuery);
    console.log("fetchedKeyData: ", fetchedKeyData.length);

    keyData = keyData.concat(fetchedKeyData);
  }

  return keyData;
};
// First get the number of keypom keys and then paginate 1000 at a time using fetch and .then instead of async await
const getKeyData = () => {
  let numKeys = getNumKeypomKeys();
  return paginateKeys(numKeys, 10000);
};

const keyData = getKeyData();

let dataSet = {};
let totalNumberOfExperiences = 1;
for (var data of keyData) {
  let date = new Date(0);
  date.setUTCMilliseconds(data.block_timestamp / 1e6);
  let dateForSet = date.toLocaleDateString();
  console.log("dateForSet: ", dateForSet);
  dataSet[dateForSet] = dataSet[dateForSet] || 0;
  dataSet[dateForSet] = totalNumberOfExperiences;

  totalNumberOfExperiences += 1;
}

//return <div>{JSON.stringify(data)}</div>;
const colsToShow = ["Experiences"];
const definition = {
  title: {
    text: "Keypom Experiences Created Over Time",
    subtext: `Executed by the Keypom core team`,
  },
  tooltip: {
    trigger: "axis",
  },
  legend: {
    data: colsToShow,
    top: "50",
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    top: "100",
    containLabel: true,
  },
  toolbox: {
    feature: {
      saveAsImage: {},
    },
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: Object.keys(dataSet),
  },
  yAxis: {
    type: "value",
  },
  series: colsToShow.map((col) => ({
    name: col,
    type: "line",
    data: Object.values(dataSet),
  })),
};

return (
  <div>
    <Widget src={`nearpavel.near/widget/EChart`} props={{ definition }} />
  </div>
);
