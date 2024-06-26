console.log("Hello from node.js");

const GRAPHQL_ENDPOINT = "https://near-queryapi.api.pagoda.co";

const paginationQuery = (offset, limit) => `
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

function getNumKeypomKeys() {
  let response = fetch(`${GRAPHQL_ENDPOINT}/v1/graphql`, {
    method: "POST",
    headers: { "x-hasura-role": "root_benjiman_near" },
    body: JSON.stringify({
      query: countQuery,
    }),
  });
  console.log("RESPONSE: ", response);
  return response.body.data
    .root_benjiman_near_all_keypom_key_additions_keys_aggregate.aggregate.count;
}

function fetchKeypomKeyDataFromDb(offset, limit) {
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

    keyData = keyData.concat(fetchedKeyData);
  }

  return keyData;
};

const getKeyData = () => {
  let numKeys = getNumKeypomKeys();
  console.log("Num Keys: ", numKeys);
  return paginateKeys(numKeys, 10000);
};

const keyData = getKeyData();

let dataSet = {};
let totalNumberOfExperiences = 1;
for (var data of keyData) {
  let date = new Date(0);
  date.setUTCMilliseconds(data.block_timestamp / 1e6);
  let dateForSet = date.toLocaleDateString();
  dataSet[dateForSet] = dataSet[dateForSet] || 0;
  dataSet[dateForSet] = totalNumberOfExperiences;

  totalNumberOfExperiences += 1;
}

// Extract dates and values
const dates = Object.keys(dataSet);
const experiences = Object.values(dataSet);

// Reverse dates
const reversedDates = dates.reverse();

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
    data: reversedDates,
  },
  yAxis: {
    type: "value",
  },
  series: colsToShow.map((col) => ({
    name: col,
    type: "line",
    data: experiences,
  })),
};

return (
  <div>
    <Widget src={`nearpavel.near/widget/EChart`} props={{ definition }} />
  </div>
);
