const API_KEY = props.API_KEY;
const themeColor = props.themeColor;
const singer = props.singer;
const interval = props.interval || "week";
const queries = [
  {
    hash: null,
    firstReqTime: 5,
    id: 1,
    queryOption: {
      sortBy: [
        {
          column: "count",
          direction: "desc",
        },
      ],
    },
    query: `

WITH call as (
  SELECT
    livequery.live.udf_api(
      'POST',
      'https://graph.mintbase.xyz/mainnet',
      {'Content-Type': 'application/json','mb-api-key': 'anon'},
      {
       'query': 'query MyQuery {
  mb_views_nft_activities_rollup(
where: {
      _or: [
        { action_receiver: { _eq: "{{singer}}" } },
        { action_sender: { _eq:  "{{singer}}"  } }
      ] 
    }  ) {
    tx_sender
    token_ids
    title
    timestamp
    reference
    receipt_id
    price
    nft_contract_id
    metadata_id
    media_hash
    media
    kind
    extra
    description
    currency
    count
    action_sender
    action_receiver
  }
}',
       'variables':{}
      }
    ) as response
)

,b as 
(select 
value:timestamp::date as "timestamp" ,
value:tx_sender as "tx_sender" ,
value:action_sender as "action_sender" ,
value:action_receiver as "action_receiver" ,
value:kind as "kind" ,
value:count as "count" ,
value:receipt_id as "receipt_id" ,
value:currency as "currency" ,
value:nft_contract_id as "nft_contract_id" ,
value:price/pow(10,24) as "price" ,
value:title as "title" ,
value:description as "description" 


   from   call,
     LATERAL FLATTEN (
            input => response:data:data:mb_views_nft_activities_rollup
     )
 where value:timestamp::date>'2023-01-01'
)
select 
      "kind" ,
      sum("count") as "count" ,
      count("nft_contract_id") as "nft_contract_id" , 
     COALESCE(round(sum("price"),2),0) as "price"
from b 
group by 1 `,
  },

  {
    hash: null,
    firstReqTime: 5,
    id: 3,
    query: `
SELECT  
      case when LABEL_TYPE is not null then LABEL_TYPE 
      else  'other'  end as "contract",  
      COUNT(DISTINCT tx_hash) as "transactions" 
    FROM  near.core.dim_address_labels 
    right JOIN  near.core.fact_transactions
    ON ADDRESS = TX_RECEIVER
    WHERE TX_STATUS = 'Success'
    and TX_SIGNER = lower('{{singer}}')    
    and BLOCK_TIMESTAMP::date >='2023-01-01' 

  GROUP BY 1 
  order by 2`,
  },
  {
    hash: null,
    firstReqTime: 5,
    id: 4,
    query: `
  SELECT 
  TX_SIGNER as "signer",
  split(min(block_timestamp)::date,'T')[0] as "min_time" ,
  split(max(block_timestamp)::date,'T')[0] as "max_time" ,
  count(DISTINCT date_trunc('day', block_timestamp)) as "active_days",
  count(DISTINCT date_trunc('month', block_timestamp)) as "active_month",
  count(DISTINCT date_trunc('year', block_timestamp)) as "active_year" ,
----------------------------------------------------------------------
  count(DISTINCT tx_hash) as "transactions",
  sum(case when tx_status = 'Success' then 1 end )as "success" ,
----------------------------------------------------------------------
  round(sum(transaction_fee / power(10, 24)),3) as "fee_near",
  round(("fee_near"/"transactions"),3) as "avg_gas_per_trx" ,
----------------------------------------------------------------------
  round(sum(case when TX:actions[0]:FunctionCall:deposit / POW(10, 24) is not null then TX:actions[0]:FunctionCall:deposit / POW(10, 24)
  else  TX:actions[0]:Transfer:deposit / POW(10, 24)  end ),3) as "volume",
  round(("volume"/"transactions"),3) as "avg_volume_per_trx" ,
  count (distinct PROJECT_NAME)  as "project"

FROM near.core.fact_transactions  
              left JOIN  near.core.dim_address_labels 
             ON ADDRESS = TX_RECEIVER
where TX_SIGNER='{{singer}}'
and block_timestamp::date> '2023-01-01'
GROUP BY 1 `,
  },
  {
    hash: null,
    firstReqTime: 5,
    id: 5,
    query: `
WITH 

raw1 as (
 SELECT livequery.live.udf_api(
  'GET',
  'https://api.pikespeak.ai/sbt/sbt-by-owner?holder={{singer}}&registry=registry.i-am-human.near',
  {'accept': 'application/json', 'x-api-key':'716bd858-852e-4866-9099-becd83d5e0d2'},
  {}
 ) as response)


,raw11 as (
        SELECT
              split(value:expired_at,'T')[0]::string   as "expired_at",
              split(value:issued_at,'T')[0]::string   as "issued_at",
              DATEDIFF('day',"issued_at" ,"expired_at") as "period",
              DATEDIFF('day',current_date, "expired_at" )||'-'||DATEDIFF('day',"issued_at" ,"expired_at") as "to_deadline" ,
              --value:issuer_id::string   as "issuer_id",
              --value:owner_id::string   as "owner_id",
             -- value:sbt_issuer::string   as "sbt_issuer",
               case when  value:sbt_issuer::string='community.i-am-human.near' and value:class_id::string='1' then 'OG'
                    when  value:sbt_issuer::string='community.i-am-human.near' and value:class_id::string='2' then 'Ndc contributor'
                    when  value:sbt_issuer::string='community.i-am-human.near' and value:class_id::string='3' then 'Ndc core contributor'
                    when  value:sbt_issuer::string='community.i-am-human.near' and value:class_id::string='4' then 'Ndc champion'
                    when  value:sbt_issuer::string='fractal.i-am-human.near' then 'Fractal'
                    when  value:sbt_issuer::string='gooddollar-v1.i-am-human.near' then 'Gooddollar'
                    when  value:sbt_issuer::string='issuer.proofofvibes.near' then 'Vibes'
                    when  value:sbt_issuer::string='issuer.regens.near' then 'Regens'
                    else 'other' end as "issuer" ,
              value:token_id::string   as "token_id"
        from raw1, LATERAL FLATTEN (input => response:data))

select * from raw11
`,
  },
  {
    hash: null,
    firstReqTime: 5,
    id: 6,
    queryOption: {
      sortBy: [
        {
          column: "date",
          direction: "asc",
        },
      ],
    },
    query: `
WITH call as (
  SELECT
    livequery.live.udf_api(
      'POST',
      'https://graph.mintbase.xyz/mainnet',
      {'Content-Type': 'application/json','mb-api-key': 'anon'},
      {
       'query': 'query MyQuery {
  mb_views_nft_activities_rollup(
where: {
      _or: [
        { action_receiver: { _eq: "{{singer}}" } },
        { action_sender: { _eq:  "{{singer}}"  } }
      ] 
    }  ) {
    tx_sender
    token_ids
    title
    timestamp
    reference
    receipt_id
    price
    nft_contract_id
    metadata_id
    media_hash
    media
    kind
    extra
    description
    currency
    count
    action_sender
    action_receiver
  }
}',
       'variables':{}
      }
    ) as response
)

,b as 
(select 
value:timestamp::date as "timestamp" ,
value:tx_sender as "tx_sender" ,
value:action_sender as "action_sender" ,
value:action_receiver as "action_receiver" ,
value:kind as "kind" ,
value:count as "count" ,
value:receipt_id as "receipt_id" ,
value:currency as "currency" ,
value:nft_contract_id as "nft_contract_id" ,
value:price as "price" ,
value:title as "title" ,
value:description as "description" 


   from   call,
     LATERAL FLATTEN (
            input => response:data:data:mb_views_nft_activities_rollup
     )
 where value:timestamp::date>'2023-01-01'
)
select 
      date_part(epoch, date_trunc('{{week}}',"timestamp")) as "date",
      count(distinct "receipt_id") as "hash" ,
      sum("count") as "count"
from b 
group by 1 `,
  },
];

//---------------------------------------------------------------------------------------------------
const tabs = {
  left: "nft activity",
  middle: "token activity",
};
const setTab = (tab) => State.update({ tab });
const Container = styled.div`
  && {
    text-align: left;
  }
  .tabContent {
    display: inline-flex;
    align-items: left;
    background: rgba(26, 46, 51, 0.25);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 10px;
    padding: 3px 4px;
    list-style-type: none;
    margin: 0 auto;
  }
  .tab-item .active {
    background: #304352;
  }
  .tab-item button {
    background-color: transparent;
    border-radius: 8px;
    font-weight: 500;
    font-size: 14px;
    color: #fff;
    height: 30px;
    padding: 0 22px;
    border: none;
  }
`;
//---------------------------------------------------------------------------------------------------
const general_theme = {
  height: "90px",
  align: "center",
  description: "",
  brand: "SBT ",
  fontsize: "25px",
  fontweight: "50px",
  afterbrand: "Tracker",
  afterbrandcolor: themeColor?.dynamic_header?.afterbrandcolor || "#789efb",
  fontbrand: " Arial, sans-serif",
  color1brand: themeColor?.dynamic_header?.color1brand || "#000",
  color2brand: themeColor?.dynamic_header?.color2brand || "#806ce1",
  colordescription: themeColor?.dynamic_header?.colordescription || "#806ce1",
  fontsubtitle: " Arial, sans-serif",
  background:
    themeColor?.dynamic_header?.background ||
    "radial-gradient(circle, rgba(210,202,250,1) 0%, rgba(230,230,231,0.01) 0%, rgba(235,238,255,1) 100%, rgba(235,231,253,1) 100%, rgba(255,241,241,1) 100%, rgba(46,52,90,1) 100%);",
};
const general_theme1 = {
  height: "90px",
  align: "center",
  description: "",
  brand: "Activity",
  fontsize: "25px",
  fontweight: "50px",
  afterbrand: "Area",
  afterbrandcolor: themeColor?.dynamic_header?.afterbrandcolor || "#789efb",
  fontbrand: " Arial, sans-serif",
  color1brand: themeColor?.dynamic_header?.color1brand || "#000",
  color2brand: themeColor?.dynamic_header?.color2brand || "#806ce1",
  colordescription: themeColor?.dynamic_header?.colordescription || "#806ce1",
  fontsubtitle: " Arial, sans-serif",
  background:
    themeColor?.dynamic_header?.background ||
    "radial-gradient(circle, rgba(210,202,250,1) 0%, rgba(230,230,231,0.01) 0%, rgba(235,238,255,1) 100%, rgba(235,231,253,1) 100%, rgba(255,241,241,1) 100%, rgba(46,52,90,1) 100%);",
};
//----------------------------------------
const formatNumbertransactions = (num) => {
  if (num >= 1000) {
    return "0.1%";
  }
  if (num < 1000 && num >= 100) {
    return "2%";
  }
  if (num < 100 && num >= 50) {
    return "5%";
  }
  if (num < 50 && num >= 10) {
    return "25%";
  }
  if (num < 10 && num >= 5) {
    return "35%";
  }
  if (num < 5 && num >= 3) {
    return "45%";
  }
  if (num < 3 && num >= 0) {
    return "(No)";
  }
  return num;
};
const formatNumbervolume = (num) => {
  if (num >= 1000) {
    return "0.5%";
  }
  if (num < 1000 && num >= 100) {
    return "2%";
  }
  if (num < 100 && num >= 50) {
    return "3%";
  }
  if (num < 50 && num >= 10) {
    return "5%";
  }
  if (num < 10 && num >= 5) {
    return "6%";
  }
  if (num < 5 && num >= 0) {
    return "(No)";
  }
  return num;
};
const formatNumberfee_near = (num) => {
  if (num >= 2) {
    return "0.1%";
  }
  if (num < 2 && num >= 0.5) {
    return "0.15%";
  }
  if (num < 0.5 && num >= 0.3) {
    return "0.3%";
  }
  if (num < 0.3 && num >= 0.1) {
    return "3%";
  }
  if (num < 0.1 && num >= 0) {
    return "(No)";
  }

  return num;
};
const formatNumberproject = (num) => {
  if (num >= 10) {
    return "0.1%";
  }
  if (num < 10 && num >= 5) {
    return "0.35%";
  }
  if (num < 5 && num >= 3) {
    return "1%";
  }
  if (num < 3 && num >= 2) {
    return "1.5%";
  }
  if (num < 2 && num >= 0) {
    return "(No)";
  }
  return num;
};
const transactions1 = {
  height: "70px",
  align: "center",
  brand: "Among the top ",
  description: "",
  fontsize: "18px",
  fontweight: "25px",
  afterbrand: `${
    formatNumbertransactions(state.result.query4?.data[0]?.transactions) || "0"
  }`,
  afterbrandcolor: themeColor?.dynamic_header?.afterbrandcolor || "#789efb",
  fontbrand: " Arial, sans-serif",
  color1brand: themeColor?.dynamic_header?.color1brand || "#000",
  color2brand: themeColor?.dynamic_header?.color2brand || "#806ce1",
  colordescription: themeColor?.dynamic_header?.colordescription || "#806ce1",
  fontsubtitle: " Arial, sans-serif",
  background:
    themeColor?.dynamic_header?.background ||
    "radial-gradient(circle, rgba(210,202,250,1) 0%, rgba(230,230,231,0.01) 0%, rgba(235,238,255,1) 100%, rgba(235,231,253,1) 100%, rgba(255,241,241,1) 100%, rgba(46,52,90,1) 100%);",
};
const onHandelId = (id) => {
  let customId = "";
  if (id.length > 20) {
    customId += id.substring(0, 5);
    customId += "...";
    customId += id.substring(id.length - 3);
    return customId;
  } else {
    return id;
  }
};
const hellosinger = {
  height: "110px",
  align: "center",
  brand: "Hello",
  description: "Thank you for being a valued user of Near throughout 2023",
  fontsize: "25px",
  fontweight: "25px",
  afterbrand: `${
    onHandelId(state.result.query4?.data[0]?.signer) || "Nearman"
  }`,
  afterbrandcolor: themeColor?.dynamic_header?.afterbrandcolor || "#789efb",
  fontbrand: " Arial, sans-serif",
  color1brand: themeColor?.dynamic_header?.color1brand || "#000",
  color2brand: themeColor?.dynamic_header?.color2brand || "#806ce1",
  colordescription: themeColor?.dynamic_header?.colordescription || "#806ce1",
  fontsubtitle: " Arial, sans-serif",
  background:
    themeColor?.dynamic_header?.background ||
    "radial-gradient(circle, rgba(210,202,250,1) 0%, rgba(230,230,231,0.01) 0%, rgba(235,238,255,1) 100%, rgba(235,231,253,1) 100%, rgba(255,241,241,1) 100%, rgba(46,52,90,1) 100%);",
};
const date1 = {
  height: "70px",
  align: "center",
  brand: "Among the top ",
  description: "",
  fontsize: "18px",
  fontweight: "25px",
  afterbrand: `${
    formatNumberfee_near(state.result.query4?.data[0]?.fee_near) || "0"
  }`,
  afterbrandcolor: themeColor?.dynamic_header?.afterbrandcolor || "#789efb",
  fontbrand: " Arial, sans-serif",
  color1brand: themeColor?.dynamic_header?.color1brand || "#000",
  color2brand: themeColor?.dynamic_header?.color2brand || "#806ce1",
  colordescription: themeColor?.dynamic_header?.colordescription || "#806ce1",
  fontsubtitle: " Arial, sans-serif",
  background:
    themeColor?.dynamic_header?.background ||
    "radial-gradient(circle, rgba(210,202,250,1) 0%, rgba(230,230,231,0.01) 0%, rgba(235,238,255,1) 100%, rgba(235,231,253,1) 100%, rgba(255,241,241,1) 100%, rgba(46,52,90,1) 100%);",
};
const contract1 = {
  height: "70px",
  align: "center",
  brand: "Among the top ",
  description: "",
  fontsize: "18px",
  fontweight: "25px",
  afterbrand: `${
    formatNumberproject(state.result.query4?.data[0]?.project) || "0"
  }`,
  afterbrandcolor: themeColor?.dynamic_header?.afterbrandcolor || "#789efb",
  fontbrand: " Arial, sans-serif",
  color1brand: themeColor?.dynamic_header?.color1brand || "#000",
  color2brand: themeColor?.dynamic_header?.color2brand || "#806ce1",
  colordescription: themeColor?.dynamic_header?.colordescription || "#806ce1",
  fontsubtitle: " Arial, sans-serif",
  background:
    themeColor?.dynamic_header?.background ||
    "radial-gradient(circle, rgba(210,202,250,1) 0%, rgba(230,230,231,0.01) 0%, rgba(235,238,255,1) 100%, rgba(235,231,253,1) 100%, rgba(255,241,241,1) 100%, rgba(46,52,90,1) 100%);",
};
const volume1 = {
  height: "70px",
  align: "center",
  brand: "Among the top ",
  description: "",
  fontsize: "18px",
  fontweight: "25px",
  afterbrand: `${
    formatNumbervolume(state.result.query4?.data[0]?.volume) || "0"
  }`,
  afterbrandcolor: themeColor?.dynamic_header?.afterbrandcolor || "#789efb",
  fontbrand: " Arial, sans-serif",
  color1brand: themeColor?.dynamic_header?.color1brand || "#000",
  color2brand: themeColor?.dynamic_header?.color2brand || "#806ce1",
  colordescription: themeColor?.dynamic_header?.colordescription || "#806ce1",
  fontsubtitle: " Arial, sans-serif",
  background:
    themeColor?.dynamic_header?.background ||
    "radial-gradient(circle, rgba(210,202,250,1) 0%, rgba(230,230,231,0.01) 0%, rgba(235,238,255,1) 100%, rgba(235,231,253,1) 100%, rgba(255,241,241,1) 100%, rgba(46,52,90,1) 100%);",
}; //-------------------------------------------------------
const transactions = {
  height: "110px",
  align: "center",
  brand: "Transactions",
  description: `${state.result.query4?.data[0]?.transactions || "0"}`,
  fontsize: "25px",
  fontweight: "25px",
  afterbrand: "",
  afterbrandcolor: themeColor?.dynamic_header?.afterbrandcolor || "#789efb",
  fontbrand: " Arial, sans-serif",
  color1brand: themeColor?.dynamic_header?.color1brand || "#000",
  color2brand: themeColor?.dynamic_header?.color2brand || "#806ce1",
  colordescription: themeColor?.dynamic_header?.colordescription || "#806ce1",
  fontsubtitle: " Arial, sans-serif",
  background:
    themeColor?.dynamic_header?.background ||
    "radial-gradient(circle, rgba(210,202,250,1) 0%, rgba(230,230,231,0.01) 0%, rgba(235,238,255,1) 100%, rgba(235,231,253,1) 100%, rgba(255,241,241,1) 100%, rgba(46,52,90,1) 100%);",
};
const date = {
  height: "110px",
  align: "center",
  brand: "Fee(Near)",
  description: `${state.result.query4?.data[0]?.fee_near || "0"}`,
  fontsize: "25px",
  fontweight: "25px",
  afterbrand: "",
  afterbrandcolor: themeColor?.dynamic_header?.afterbrandcolor || "#789efb",
  fontbrand: " Arial, sans-serif",
  color1brand: themeColor?.dynamic_header?.color1brand || "#000",
  color2brand: themeColor?.dynamic_header?.color2brand || "#806ce1",
  colordescription: themeColor?.dynamic_header?.colordescription || "#806ce1",
  fontsubtitle: " Arial, sans-serif",
  background:
    themeColor?.dynamic_header?.background ||
    "radial-gradient(circle, rgba(210,202,250,1) 0%, rgba(230,230,231,0.01) 0%, rgba(235,238,255,1) 100%, rgba(235,231,253,1) 100%, rgba(255,241,241,1) 100%, rgba(46,52,90,1) 100%);",
};
const contract = {
  height: "110px",
  align: "center",
  brand: "Total Platforms",
  description: `${state.result.query4?.data[0]?.project || "0"}`,
  fontsize: "25px",
  fontweight: "25px",
  afterbrand: "",
  afterbrandcolor: themeColor?.dynamic_header?.afterbrandcolor || "#789efb",
  fontbrand: " Arial, sans-serif",
  color1brand: themeColor?.dynamic_header?.color1brand || "#000",
  color2brand: themeColor?.dynamic_header?.color2brand || "#806ce1",
  colordescription: themeColor?.dynamic_header?.colordescription || "#806ce1",
  fontsubtitle: " Arial, sans-serif",
  background:
    themeColor?.dynamic_header?.background ||
    "radial-gradient(circle, rgba(210,202,250,1) 0%, rgba(230,230,231,0.01) 0%, rgba(235,238,255,1) 100%, rgba(235,231,253,1) 100%, rgba(255,241,241,1) 100%, rgba(46,52,90,1) 100%);",
};
const volume = {
  height: "110px",
  align: "center",
  brand: "Volume(Near)",
  description: `${state.result.query4?.data[0]?.volume || "0"}`,
  fontsize: "25px",
  fontweight: "25px",
  fontweight: "25px",
  afterbrand: "",
  afterbrandcolor: themeColor?.dynamic_header?.afterbrandcolor || "#789efb",
  fontbrand: " Arial, sans-serif",
  color1brand: themeColor?.dynamic_header?.color1brand || "#000",
  color2brand: themeColor?.dynamic_header?.color2brand || "#806ce1",
  colordescription: themeColor?.dynamic_header?.colordescription || "#806ce1",
  fontsubtitle: " Arial, sans-serif",
  background:
    themeColor?.dynamic_header?.background ||
    "radial-gradient(circle, rgba(210,202,250,1) 0%, rgba(230,230,231,0.01) 0%, rgba(235,238,255,1) 100%, rgba(235,231,253,1) 100%, rgba(255,241,241,1) 100%, rgba(46,52,90,1) 100%);",
};
const max_time = {
  height: "110px",
  align: "center",
  brand: "Last Transaction",
  description: `${state.result.query4?.data[0]?.max_time || "0"}`,
  fontsize: "20px",
  fontweight: "25px",
  afterbrand: "",
  afterbrandcolor: themeColor?.dynamic_header?.afterbrandcolor || "#789efb",
  fontbrand: " Arial, sans-serif",
  color1brand: themeColor?.dynamic_header?.color1brand || "#000",
  color2brand: themeColor?.dynamic_header?.color2brand || "#806ce1",
  colordescription: themeColor?.dynamic_header?.colordescription || "#806ce1",
  fontsubtitle: " Arial, sans-serif",
  background:
    themeColor?.dynamic_header?.background ||
    "radial-gradient(circle, rgba(210,202,250,1) 0%, rgba(230,230,231,0.01) 0%, rgba(235,238,255,1) 100%, rgba(235,231,253,1) 100%, rgba(255,241,241,1) 100%, rgba(46,52,90,1) 100%);",
};
const active_month = {
  height: "110px",
  align: "center",
  brand: "Active Month",
  description: `${state.result.query4?.data[0]?.active_month || "0"}`,
  fontsize: "20px",
  fontweight: "25px",
  afterbrand: "",
  afterbrandcolor: themeColor?.dynamic_header?.afterbrandcolor || "#789efb",
  fontbrand: " Arial, sans-serif",
  color1brand: themeColor?.dynamic_header?.color1brand || "#000",
  color2brand: themeColor?.dynamic_header?.color2brand || "#806ce1",
  colordescription: themeColor?.dynamic_header?.colordescription || "#806ce1",
  fontsubtitle: " Arial, sans-serif",
  background:
    themeColor?.dynamic_header?.background ||
    "radial-gradient(circle, rgba(210,202,250,1) 0%, rgba(230,230,231,0.01) 0%, rgba(235,238,255,1) 100%, rgba(235,231,253,1) 100%, rgba(255,241,241,1) 100%, rgba(46,52,90,1) 100%);",
};
const active_days = {
  height: "110px",
  align: "center",
  brand: "Active Days",
  description: `${state.result.query4?.data[0]?.active_days || "0"}`,
  fontsize: "20px",
  afterbrand: "",
  afterbrandcolor: themeColor?.dynamic_header?.afterbrandcolor || "#789efb",
  fontbrand: " Arial, sans-serif",
  color1brand: themeColor?.dynamic_header?.color1brand || "#000",
  color2brand: themeColor?.dynamic_header?.color2brand || "#806ce1",
  colordescription: themeColor?.dynamic_header?.colordescription || "#806ce1",
  fontsubtitle: " Arial, sans-serif",
  background:
    themeColor?.dynamic_header?.background ||
    "radial-gradient(circle, rgba(210,202,250,1) 0%, rgba(230,230,231,0.01) 0%, rgba(235,238,255,1) 100%, rgba(235,231,253,1) 100%, rgba(255,241,241,1) 100%, rgba(46,52,90,1) 100%);",
};
const min_time = {
  height: "110px",
  align: "center",
  brand: "First 2023 Transactions",
  description: `${state.result.query4?.data[0]?.min_time || "0"}`,
  fontsize: "20px",
  fontweight: "25px",
  afterbrand: "",
  afterbrandcolor: themeColor?.dynamic_header?.afterbrandcolor || "#789efb",
  fontbrand: " Arial, sans-serif",
  color1brand: themeColor?.dynamic_header?.color1brand || "#000",
  color2brand: themeColor?.dynamic_header?.color2brand || "#806ce1",
  colordescription: themeColor?.dynamic_header?.colordescription || "#806ce1",
  fontsubtitle: " Arial, sans-serif",
  background:
    themeColor?.dynamic_header?.background ||
    "radial-gradient(circle, rgba(210,202,250,1) 0%, rgba(230,230,231,0.01) 0%, rgba(235,238,255,1) 100%, rgba(235,231,253,1) 100%, rgba(255,241,241,1) 100%, rgba(46,52,90,1) 100%);",
};
//---------------------------------------------------------------------------------------------------

// state ####################################
State.init({
  searchedSinger: "",
  searchedInterval: "",
  result: {},
  //loader: [],
  isLoading: false,
  error: [],
  queriesRuned: false,
  tab: tabs.left,
});

const checkNewSinger = () => {
  if (state.searchedSinger === singer && state.searchedInterval === interval) {
    return;
  } else {
    State.update({
      searchedSinger: singer,
      searchedInterval: interval,
      //loader: [],
      loader: false,
      result: {},
      isLoading: true,
      queriesRuned: false,
    });
  }
  return true;
};
if (checkNewSinger()) {
  return <div>loading...</div>;
}

checkNewSinger();
// handle hashed data #############################
const handleHasedData = ({ hash, id }) => {
  if (state.result["query" + id].isDone) return;
  const result = fetchData(hash);
  if (result.isLoading) {
    State.update({
      isLoading: true,
      result: {
        ...state.result,
        ["query" + id]: { isLoading: true, error: false, data: null },
      },
    });
  }
  if (result.error) {
    const errors = state.error;
    errors.push(`query ${id}: ${result.error}`);
    State.update({
      error: errors,
      result: {
        ...state.result,
        ["query" + id]: {
          isLoading: false,
          error: true,
          data: null,
          isDone: true,
        },
      },
    });
  }
  if (result.data) {
    const filteredData = result.data.filter(
      (row) => row.SINGER === state.searchedSinger
    );
    State.update({
      result: {
        ...state.result,
        ["query" + id]: {
          isLoading: false,
          error: false,
          data: filteredData,
          isDone: true,
        },
      },
    });
  }
};
const fetchData = (hash) => {
  const data = fetch(
    `https://api.flipsidecrypto.com/api/v2/queries/${hash}/data/latest`,
    {
      subscribe: true,
      method: "GET",
      headers: {
        Accept: "*/*",
      },
    }
  );
  const result = {
    data: (data && data.body) || null,
    error: (data && !data.ok && (data.status || data.error)) || null,
    isLoading: !data && !error,
  };
  console.log(result);
  return result;
};
// handle runed data ###################################
const createQuery = (queries, singer, interval) => {
  const queriesArr = queries.map((q) => {
    const queryWithProps = q.query
      .replaceAll("{{singer}}", singer)
      .replaceAll("{{week}}", interval);
    q.query = queryWithProps;
    return q;
  });
  return queriesArr;
};
const isAllDataLoaded = () => {
  const resultArr = Object.entries(state.result);
  if (resultArr.length === 0) return false;
  return resultArr.every((query) => {
    return !query[1].isLoading;
  });
};
const updateResultState = ({ data, error, isLoading, queryRunId, id }) => {
  State.update(({ result, loader }) => {
    const newResult = {
      ...result,
      [`query${id}`]: {
        data:
          data?.rows === undefined ? null : data.rows === null ? [] : data.rows,
        error: !!error,
        isLoading: isLoading,
        queryRunId: queryRunId,
        id: id,
      },
    };
    //const newLoader = loader.filter(({ id: loaderId }) => loaderId !== id);
    if (error) {
      const queryError = `query${id} : ${error}`;
      return {
        ...state,
        result: { ...newResult },
        // loader: newLoader.length === 0 ? [] : newLoader,
        error: [...state.error, queryError],
      };
    } else {
      if (data) {
        Storage.set(
          `${state.searchedSinger}-${state.searchedInterval}-${id}`,
          queryRunId
        );
      }
      return {
        ...state,
        result: { ...newResult },
        // ...(data && { loader: newLoader.length === 0 ? [] : newLoader }),
      };
    }
  });
};

const runqueries = (queries) => {
  if (state.searchedSinger.length === 0) {
    State.update({
      isLoading: false,
      error: [...state.error, "singer is not provided"],
    });
    return;
  }

  const queriesArr = createQuery(
    queries,
    state.searchedSinger,
    state.searchedInterval
  );
  const loader = queriesArr.map((q) => {
    const queryRunId = Storage.get(
      `${state.searchedSinger}-${state.searchedInterval}-${q.id}`
    );
    const props = {
      apiKey: API_KEY,
      id: q.id,
      query: q.query,
      onResult: updateResultState,
      firstReqTime: q.firstReqTime,
      queryRunId,
      queryOption: {
        page: {
          number: 1,
          size: 1000,
        },
        cacheTime: 60,
        ...q?.queryOption,
      },
    };
    return {
      id: q.id,
      element: (
        <Widget src="lord1.near/widget/api-flipside" id={q.id} props={props} />
      ),
    };
  });
  State.update({
    loader: loader,
    isLoading: true,
    queriesRuned: true,
  });
};

if (isAllDataLoaded()) {
  State.update({ isLoading: false });
}

if (state.isLoading) {
  const withHashQueries = [];
  const withoutHashQueries = [];
  queries.forEach(({ hash, id, query, ...other }) => {
    if (hash) {
      withHashQueries.push({ hash, id });
    }
    if (query) {
      withoutHashQueries.push({ query, hash, id, ...other });
    }
  });
  withHashQueries.forEach((query) => handleHasedData(query));
  if (!state.queriesRuned) {
    runqueries(withoutHashQueries);
  }
}

// error managment #######################
if (state.error.length > 0) {
  function hide() {
    const errors = state.error;
    errors.shift();
    if (errors.length > 0) setTimeout(hide, 2500);
    State.update({ error: errors });
  }
  setTimeout(hide, 2500);
}

// get props charts #######################################
const getMixProps = (data, dateKey, serieses, colors, chartOption) => {
  data = data || [];
  serieses = serieses || [{ key: "", seriesName: "", type: "", id: 1 }];
  colors = colors || [];
  chartOption = chartOption || {};

  const dataFormat = serieses.map((series) => {
    const dataFormated = data.map((d) => [d[dateKey] * 1000, d[series.key]]);
    return {
      data: dataFormated,
      name: series.seriesName,
      type: series.type,
      axisId: series.id,
    };
  });
  const props = {
    series: dataFormat,
    colors: colors,
    chartOption: {
      title: "chart title",
      subtitle: "chart subtitle",
      legend: true,
      stacking: "false",
      ...chartOption,
    },
    overrideOptions: {
      plotOptions: {
        column: {
          stacking: "false",
        },
        series: {
          dataGrouping: { enabled: false },
        },
      },
    },
    themeColor: { chart: themeColor.chart },
    spinnerColors: themeColor.spinnerColors,
  };
  return props;
};

const getPieProps = (data, [key, value], colors, chartOption) => {
  data = data || [];
  colors = colors || [];
  chartOption = chartOption || {};

  const groupedData = {};
  for (const item of data) {
    const keyValue = item[key];
    const valueValue = item[value];

    if (groupedData[keyValue]) {
      groupedData[keyValue] += valueValue;
    } else {
      groupedData[keyValue] = valueValue;
    }
  }

  const dataFormat = Object.entries(groupedData).map(
    ([groupKey, groupValue]) => [groupKey, groupValue]
  );

  const props = {
    data: dataFormat,
    colors: colors,
    chartOption: {
      title: "chart title",
      type: "pie",
      legend: false,
      connector: false,
      ...chartOption,
    },
    themeColor: { chart: themeColor.chart },
    spinnerColors: themeColor.spinnerColors,
  };
  return props;
};

// dom sections ##############################################
const noData = <div className="w-100 py-4 text-center"> No data available</div>;
const ChartIsLoading = (queryId) => (
  <div
    className={`w-100 ${
      state.result?.[`query${queryId}`]?.isLoading ? "d-block" : "d-none"
    }`}
  >
    <Widget
      src={`easypoll-v0.ndc-widgets.near/widget/Common.Spinner`}
      props={{ ...spinnerColors }}
    />
  </div>
);
const ChartHasError = (queryId) =>
  state.result?.[`query${queryId}`]?.error && (
    <div className="py-4 text-center">An error occurred for this section</div>
  );

const CardIsLoading = (queryId) =>
  state.result?.[`query${queryId}`]?.isLoading && (
    <div
      className="d-flex flex-column gap-1"
      style={{
        padding: "60px 12px",
      }}
    >
      <Widget
        src={`easypoll-v0.ndc-widgets.near/widget/Common.Spinner`}
        props={{
          ...spinnerColors,
        }}
      />
      <span
        style={{
          fontWeight: "bold",
          fontsize: 15,
          color: "#4f46e5",
          textAlign: "center",
        }}
      >
        Loading...
      </span>
    </div>
  );
const CardHasError = (queryId) =>
  state.result?.[`query${queryId}`]?.error && (
    <div className="d-flex justify-content-center align-items-center h-100 p-4 pb-1">
      An error occurred for this section
    </div>
  );

let TableMiddle = (
  <div
    style={{ background: themeColor?.sbt_area?.section_bg }}
    className="shadow-sm rounded-2 overflow-auto p-2"
  >
    <div className="p-2 rounded-4 overflow-auto">
      {CardIsLoading(3)}
      {CardHasError(3)}
      {state.result["query" + 3]?.data && (
        <Widget
          src="lord1.near/widget/Pie-chart"
          props={getPieProps(
            state.result["query" + 3]?.data,
            ["contract", "transactions"],
            themeColor.chartColor,
            {
              title: "",
              type: "pie",
              connector: true,
              legend: true,
            }
          )}
        />
      )}
    </div>
  </div>
);

let BelowRight = (
  <div
    style={{ background: themeColor?.sbt_area?.section_bg }}
    className="shadow-sm rounded-2 overflow-auto p-2"
  >
    <div
      style={{ background: themeColor?.sbt_area?.card_bg }}
      className="shadow-sm rounded-2 overflow-auto"
    >
      {CardIsLoading(5)}
      {CardHasError(5)}
      {state.result["query" + 5]?.data &&
        (state.result["query" + 5]?.data.length > 0 ? (
          <Widget
            src="lord1.near/widget/table-pagination"
            props={{
              themeColor: { table_pagination: themeColor.table_pagination },
              data: state.result["query" + 5]?.data,
              rowsCount: 4,
              columns: [
                { title: "Issued At", key: "issued_at" },
                { title: "Expired At", key: "expired_at" },

                {
                  title: "To Deadline",
                  key: "to_deadline",
                  progress: "yes",
                  percent: "hidden",
                },
                { title: "Type", key: "issuer", colors: "#806ce1" },
                { title: "Token Id", key: "token_id" },
              ],
            }}
          />
        ) : (
          noData
        ))}
    </div>
  </div>
);
const Right = styled.div`
  padding: 2px;
  margin-bottom: 10px;
  border-radius: 8px;
`;

const H5 = styled.h5`
  color: ${themeColor.election?.textColor};
  text-align: center;
`;
const ChartContainer = styled.div`
  &:hover {
    transform: scale(1.1);
    transition: transform 0.5s;
  }
`;
return (
  <>
    {state.loader && (
      <div className="d-none">
        {state.loader.map((l) => (
          <pre key={l.id}>{l?.element}</pre>
        ))}
      </div>
    )}
    <div className="toast-container position-fixed bottom-0 end-0 p-3">
      {state.error.length > 0 &&
        state.error.map((er) => (
          <div
            key={er}
            className="toast show align-items-center text-bg-danger border-0"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className="d-flex">
              <div className="toast-body">{er}</div>
            </div>
          </div>
        ))}
    </div>
    <div
      className="w-100"
      style={{ backgroundColor: themeColor?.search_sbt?.table_bg }}
    >
      <div className="w-100">
        <div className="w-100 py-2"></div>

        <div className="row">
          <div className="col-md-12">
            <Widget
              src="lord1.near/widget/header-dynamic"
              props={hellosinger}
            />
            <div className="row">
              <div className="col-md-3">
                <Widget
                  src="lord1.near/widget/header-dynamic"
                  props={transactions}
                />
                <Widget
                  src="lord1.near/widget/header-dynamic"
                  props={transactions1}
                />
              </div>
              <div className="col-md-3">
                <Widget src="lord1.near/widget/header-dynamic" props={volume} />{" "}
                <Widget
                  src="lord1.near/widget/header-dynamic"
                  props={volume1}
                />
              </div>
              <div className="col-md-3">
                <Widget src="lord1.near/widget/header-dynamic" props={date} />{" "}
                <Widget src="lord1.near/widget/header-dynamic" props={date1} />
              </div>
              <div className="col-md-3">
                <Widget
                  src="lord1.near/widget/header-dynamic"
                  props={contract}
                />
                <Widget
                  src="lord1.near/widget/header-dynamic"
                  props={contract1}
                />
              </div>
            </div>
            <div
              style={{
                background: themeColor?.sbt_area?.section_bg,
                "margin-top": "25px",
              }}
              className="shadow-sm rounded-2  p-2"
            >
              <div className="row">
                <Right className="col-md-3">
                  <H5> Success Rate</H5>
                  <div className="d-flex justify-content-center">
                    <ChartContainer>
                      <Widget
                        src="lord1.near/widget/pie-percentage"
                        props={{
                          themeColor,
                          voted: `${
                            state.result.query4?.data[0]?.success || "0"
                          }`,
                          total: `${
                            state.result.query4?.data[0]?.transactions || 1
                          }`,
                          percent: 60,
                        }}
                      />
                    </ChartContainer>
                  </div>
                </Right>
                <div className="col-md-3">
                  <Widget
                    src="lord1.near/widget/header-dynamic"
                    props={min_time}
                  />
                </div>
                <div className="col-md-2">
                  <Widget
                    src="lord1.near/widget/header-dynamic"
                    props={active_days}
                  />
                </div>
                <div className="col-md-2">
                  <Widget
                    src="lord1.near/widget/header-dynamic"
                    props={active_month}
                  />
                </div>
                <div className="col-md-2">
                  <Widget
                    src="lord1.near/widget/header-dynamic"
                    props={max_time}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <Widget
                  src="lord1.near/widget/header-dynamic"
                  props={general_theme1}
                />
                {TableMiddle}
              </div>
              <div className="col-md-8">
                <Widget
                  src="lord1.near/widget/header-dynamic"
                  props={general_theme}
                />
                {BelowRight}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);
