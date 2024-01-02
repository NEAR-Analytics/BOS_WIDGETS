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
          column: "trxs",
          direction: "desc",
        },
      ],
    },
    query: `
with 
a as 
      (
select 
            BLOCK_TIMESTAMP,
            TX_HASH,
            EVENT_TYPE,
            'sell' as action,
            PLATFORM_NAME,
            SELLER_ADDRESS,
            BUYER_ADDRESS,
            PROJECT_NAME,
            TOKENID,
            PRICE,
            PRICE_USD,
            case  when CURRENCY_ADDRESS= 'AVAX' then 'AVAX'
                  when CURRENCY_ADDRESS= '0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7' then 'WAVAX'
                  when CURRENCY_ADDRESS= '0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e' then 'USDC'
                  end as  CURRENCY_SYMBOL,
            CURRENCY_ADDRESS,
            TOTAL_FEES,
            PLATFORM_FEE,
            CREATOR_FEE
      from avalanche.nft.ez_nft_sales 
      where  SELLER_ADDRESS ='{{singer}}'
      and BLOCK_TIMESTAMP::date>'2023-01-01'

union all 


select 
            BLOCK_TIMESTAMP,
            TX_HASH,
            EVENT_TYPE,
            'buy' as action,
            PLATFORM_NAME,
            SELLER_ADDRESS,
            BUYER_ADDRESS,
            PROJECT_NAME,
            TOKENID,
            PRICE,
            PRICE_USD,
            case  when CURRENCY_ADDRESS= 'AVAX' then 'AVAX'
                  when CURRENCY_ADDRESS= '0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7' then 'WAVAX'
                  when CURRENCY_ADDRESS= '0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e' then 'USDC'
                  end as  CURRENCY_SYMBOL,
            CURRENCY_ADDRESS,
            TOTAL_FEES,
            PLATFORM_FEE,
            CREATOR_FEE

      from avalanche.nft.ez_nft_sales 
      where  BUYER_ADDRESS ='{{singer}}'
      and BLOCK_TIMESTAMP::date>'2023-01-01'




)

select 
      PLATFORM_NAME  as "platform",
      count(distinct TX_HASH) as "trxs",
      round(sum(PRICE_USD)) as "usd",
      round(sum(PLATFORM_FEE),1) as "fee",
      count(distinct BLOCK_TIMESTAMP::date) as "date",
      count(distinct PROJECT_NAME) as "collection",
      round(sum(case when action='buy' then (PRICE_USD) else 0 end)) as "buy_usd",
      round(sum(case when action='sell' then (PRICE_USD) else 0 end)) as "sell_usd",
      count(distinct (case when action='buy' then TX_HASH  end)) as "buy_trxs",
      count(distinct (case when action='sell' then TX_HASH  end)) as "sell_trxs"
from a
group by 1 `,
  },
  {
    hash: null,
    firstReqTime: 5,
    id: 2,
    queryOption: {
      sortBy: [
        {
          column: "trxs",
          direction: "desc",
        },
      ],
    },
    query: `
with 
bb as 
      (
select 
            BLOCK_TIMESTAMP,
            TX_HASH,
            EVENT_TYPE || ' (sell)' as EVENT_TYPE ,
            BUYER_ADDRESS as "from",
            SELLER_ADDRESS as "to",
            PROJECT_NAME,
            TOKENID,
            PRICE_USD
      from avalanche.nft.ez_nft_sales 
      where  SELLER_ADDRESS  ='{{singer}}'
      and BLOCK_TIMESTAMP::date>'2023-01-01'

union all 


select 
            BLOCK_TIMESTAMP,
            TX_HASH,
            EVENT_TYPE || ' (buy)' as EVENT_TYPE ,
            BUYER_ADDRESS as "from",
            SELLER_ADDRESS as "to",
            PROJECT_NAME,
            TOKENID,
            PRICE_USD

      from avalanche.nft.ez_nft_sales 
      where  BUYER_ADDRESS  ='{{singer}}'
      and BLOCK_TIMESTAMP::date>'2023-01-01'

union all 


select 
            BLOCK_TIMESTAMP,
            TX_HASH,
            'transfer (' || EVENT_TYPE||')' as EVENT_TYPE ,
            NFT_FROM_ADDRESS as "from",
            NFT_TO_ADDRESS as "to",
            PROJECT_NAME,
            TOKENID,
            null as PRICE_USD

      from avalanche.nft.ez_nft_transfers
      where  NFT_FROM_ADDRESS ='{{singer}}'
      and BLOCK_TIMESTAMP::date>'2023-01-01'
      and EVENT_TYPE='mint'
union all 


select 
            BLOCK_TIMESTAMP,
            TX_HASH,
            'transfer (' || EVENT_TYPE||')' as EVENT_TYPE ,
            NFT_FROM_ADDRESS as "from",
            NFT_TO_ADDRESS as "to",
            PROJECT_NAME,
            TOKENID,
            null as PRICE_USD

      from avalanche.nft.ez_nft_transfers
      where  NFT_TO_ADDRESS  ='{{singer}}'
      and BLOCK_TIMESTAMP::date>'2023-01-01'
      and EVENT_TYPE='mint'
)
,b as (

select 
            BLOCK_TIMESTAMP,
            TX_HASH,
            'transfer (' || EVENT_TYPE||')' as EVENT_TYPE ,
            NFT_FROM_ADDRESS as "from",
            NFT_TO_ADDRESS as "to",
            PROJECT_NAME,
            TOKENID,
            null as PRICE_USD

      from avalanche.nft.ez_nft_transfers
      where  NFT_FROM_ADDRESS  ='{{singer}}'
      and BLOCK_TIMESTAMP::date>'2023-01-01'
      and tx_hash not in (select distinct tx_hash from bb )
      and EVENT_TYPE ='other'
union all 


select 
            BLOCK_TIMESTAMP,
            TX_HASH,
            'transfer (' || EVENT_TYPE||')' as EVENT_TYPE ,
            NFT_FROM_ADDRESS as "from",
            NFT_TO_ADDRESS as "to",
            PROJECT_NAME,
            TOKENID,
            null as PRICE_USD

      from avalanche.nft.ez_nft_transfers
      where  NFT_TO_ADDRESS  ='{{singer}}'
      and BLOCK_TIMESTAMP::date>'2023-01-01'
      and tx_hash not in (select distinct tx_hash from bb )
      and EVENT_TYPE='other'

)
, c as (
select * from bb 
union all 
select * from b 
)
select 
      EVENT_TYPE as "type",
      count(distinct TX_HASH) as "trxs",
      round(sum(coalesce(PRICE_USD,0))) as "usd",
      count(distinct PROJECT_NAME ) as "collection"


from c
group by 1  `,
  },
  {
    hash: null,
    firstReqTime: 10,
    id: 3,

    query: `
with 
a as 
      (
select 
            BLOCK_TIMESTAMP,
            TX_HASH,
            EVENT_TYPE,
            'sell' as action,
            PLATFORM_NAME,
            SELLER_ADDRESS,
            BUYER_ADDRESS,
            PROJECT_NAME,
            TOKENID,
            PRICE,
            PRICE_USD,
            case  when CURRENCY_ADDRESS= 'AVAX' then 'AVAX'
                  when CURRENCY_ADDRESS= '0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7' then 'WAVAX'
                  when CURRENCY_ADDRESS= '0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e' then 'USDC'
                  end as  CURRENCY_SYMBOL,
            CURRENCY_ADDRESS,
            TOTAL_FEES,
            PLATFORM_FEE,
            CREATOR_FEE
      from avalanche.nft.ez_nft_sales 
      where  SELLER_ADDRESS ='{{singer}}'
      and BLOCK_TIMESTAMP::date>'2023-01-01'

union all 


select 
            BLOCK_TIMESTAMP,
            TX_HASH,
            EVENT_TYPE,
            'buy' as action,
            PLATFORM_NAME,
            SELLER_ADDRESS,
            BUYER_ADDRESS,
            PROJECT_NAME,
            TOKENID,
            PRICE,
            PRICE_USD,
            case  when CURRENCY_ADDRESS= 'AVAX' then 'AVAX'
                  when CURRENCY_ADDRESS= '0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7' then 'WAVAX'
                  when CURRENCY_ADDRESS= '0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e' then 'USDC'
                  end as  CURRENCY_SYMBOL,
            CURRENCY_ADDRESS,
            TOTAL_FEES,
            PLATFORM_FEE,
            CREATOR_FEE

      from avalanche.nft.ez_nft_sales 
      where  BUYER_ADDRESS ='{{singer}}'
      and BLOCK_TIMESTAMP::date>'2023-01-01'




)

select 
      PROJECT_NAME  as "collection",
      count(distinct TX_HASH) as "trxs",
      round(sum(PRICE_USD)) as "usd",
      round(sum(PLATFORM_FEE),1) as "pfee",
      round(sum(CREATOR_FEE),1) as "cfee",
      count(distinct PLATFORM_NAME ) as "platform",
      round(sum(case when action='buy' then (PRICE_USD) else 0 end)) as "buy_usd",
      round(sum(case when action='sell' then (PRICE_USD) else 0 end)) as "sell_usd",
      count(distinct (case when action='buy' then TX_HASH  end)) as "buy_trxs",
      count(distinct (case when action='sell' then TX_HASH  end)) as "sell_trxs"

from a
group by 1 
`,
  },
  {
    hash: null,
    firstReqTime: 5,
    id: 4,
    query: `

with 
bb as 
      (
select 
            BLOCK_TIMESTAMP,
            TX_HASH,
            EVENT_TYPE,
            'sell' as action,
            BUYER_ADDRESS as "from",
            SELLER_ADDRESS as "to",
            PROJECT_NAME,
            TOKENID,
            PRICE_USD
      from avalanche.nft.ez_nft_sales 
      where  SELLER_ADDRESS  ='{{singer}}'
      and BLOCK_TIMESTAMP::date>'2023-01-01'

union all 


select 
            BLOCK_TIMESTAMP,
            TX_HASH,
            EVENT_TYPE,
            'buy' as action,
            BUYER_ADDRESS as "from",
            SELLER_ADDRESS as "to",
            PROJECT_NAME,
            TOKENID,
            PRICE_USD

      from avalanche.nft.ez_nft_sales 
      where  BUYER_ADDRESS  ='{{singer}}'
      and BLOCK_TIMESTAMP::date>'2023-01-01'


union all 


select 
            BLOCK_TIMESTAMP,
            TX_HASH,
            EVENT_TYPE,
            'transfer' as action,
            NFT_FROM_ADDRESS as "from",
            NFT_TO_ADDRESS as "to",
            PROJECT_NAME,
            TOKENID,
            null as PRICE_USD

      from avalanche.nft.ez_nft_transfers
      where  NFT_FROM_ADDRESS  ='{{singer}}'
      and BLOCK_TIMESTAMP::date>'2023-01-01'

union all 


select 
            BLOCK_TIMESTAMP,
            TX_HASH,
            EVENT_TYPE,
            'transfer' as action,
            NFT_FROM_ADDRESS as "from",
            NFT_TO_ADDRESS as "to",
            PROJECT_NAME,
            TOKENID,
            null as PRICE_USD

      from avalanche.nft.ez_nft_transfers
      where  NFT_TO_ADDRESS  ='{{singer}}'
      and BLOCK_TIMESTAMP::date>'2023-01-01'

)

select 
      count(distinct BLOCK_TIMESTAMP::date) as "timestamp",
      count(distinct PROJECT_NAME ) as "nft_contract_id" ,
      count(distinct TX_HASH) as "count" ,
      COALESCE(round(sum( PRICE_USD),2),0) as "price"

from bb `,
  },
  {
    hash: null,
    firstReqTime: 5,
    id: 5,
    queryOption: {
      sortBy: [
        {
          column: "date",
          direction: "desc",
        },
      ],
    },
    query: `
with 
a as 
      (
select 
            BLOCK_TIMESTAMP,
            TX_HASH,
            EVENT_TYPE,
            'sell' as action,
            BUYER_ADDRESS as "from",
            SELLER_ADDRESS as "to",
            PROJECT_NAME,
            TOKENID,
            PRICE_USD
      from avalanche.nft.ez_nft_sales 
      where  SELLER_ADDRESS ='{{singer}}'
      and BLOCK_TIMESTAMP::date>'2023-01-01'

union all 


select 
            BLOCK_TIMESTAMP,
            TX_HASH,
            EVENT_TYPE,
            'buy' as action,
            BUYER_ADDRESS as "from",
            SELLER_ADDRESS as "to",
            PROJECT_NAME,
            TOKENID,
            PRICE_USD

      from avalanche.nft.ez_nft_sales 
      where  BUYER_ADDRESS ='{{singer}}'
      and BLOCK_TIMESTAMP::date>'2023-01-01'


union all 


select 
            BLOCK_TIMESTAMP,
            TX_HASH,
            EVENT_TYPE,
            'transfer' as action,
            NFT_FROM_ADDRESS as "from",
            NFT_TO_ADDRESS as "to",
            PROJECT_NAME,
            TOKENID,
            null as PRICE_USD

      from avalanche.nft.ez_nft_transfers
      where  NFT_FROM_ADDRESS ='{{singer}}'
      and BLOCK_TIMESTAMP::date>'2023-01-01'

union all 


select 
            BLOCK_TIMESTAMP,
            TX_HASH,
            EVENT_TYPE,
            'transfer' as action,
            NFT_FROM_ADDRESS as "from",
            NFT_TO_ADDRESS as "to",
            PROJECT_NAME,
            TOKENID,
            null as PRICE_USD

      from avalanche.nft.ez_nft_transfers
      where  NFT_TO_ADDRESS ='{{singer}}'
      and BLOCK_TIMESTAMP::date>'2023-01-01'

)

select 
      split(BLOCK_TIMESTAMP,' ')[0] as "date",
      EVENT_TYPE as "event",
      ACTION as "action",
      PROJECT_NAME as "project",
      TOKENID as "id",
      round(PRICE_USD,1) as "usd",
      "from",
      "to",
      TX_HASH as "trxs"

from a`,
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

with 
a as 
      (
select 
            BLOCK_TIMESTAMP,
            TX_HASH,
            EVENT_TYPE,
            'sell' as action,
            BUYER_ADDRESS as "from",
            SELLER_ADDRESS as "to",
            PROJECT_NAME,
            TOKENID,
            PRICE_USD
      from avalanche.nft.ez_nft_sales 
      where  SELLER_ADDRESS ='{{singer}}'
      and BLOCK_TIMESTAMP::date>'2023-01-01'

union all 


select 
            BLOCK_TIMESTAMP,
            TX_HASH,
            EVENT_TYPE,
            'buy' as action,
            BUYER_ADDRESS as "from",
            SELLER_ADDRESS as "to",
            PROJECT_NAME,
            TOKENID,
            PRICE_USD

      from avalanche.nft.ez_nft_sales 
      where  BUYER_ADDRESS ='{{singer}}'
      and BLOCK_TIMESTAMP::date>'2023-01-01'


union all 


select 
            BLOCK_TIMESTAMP,
            TX_HASH,
            EVENT_TYPE,
            'transfer' as action,
            NFT_FROM_ADDRESS as "from",
            NFT_TO_ADDRESS as "to",
            PROJECT_NAME,
            TOKENID,
            null as PRICE_USD

      from avalanche.nft.ez_nft_transfers
      where  NFT_FROM_ADDRESS ='{{singer}}'
      and BLOCK_TIMESTAMP::date>'2023-01-01'

union all 


select 
            BLOCK_TIMESTAMP,
            TX_HASH,
            EVENT_TYPE,
            'transfer' as action,
            NFT_FROM_ADDRESS as "from",
            NFT_TO_ADDRESS as "to",
            PROJECT_NAME,
            TOKENID,
            null as PRICE_USD

      from avalanche.nft.ez_nft_transfers
      where  NFT_TO_ADDRESS ='{{singer}}'
      and BLOCK_TIMESTAMP::date>'2023-01-01'

)

select 
      date_part(epoch, date_trunc('{{week}}',BLOCK_TIMESTAMP)) as "date",
      count(distinct TX_HASH) as "hash" ,
      round(sum((PRICE_USD)),1) as "usd"

from a
group by 1 `,
  },
];

//---------------------------------------------------------------------------------------------------
const tabs = {
  left: "Platform activity",
  middle: "Collection activity",
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
const formatNumber = (num) => {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(2).replace(/\.0$/, "") + "b";
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(2).replace(/\.0$/, "") + "m";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(2).replace(/\.0$/, "") + "k";
  }

  if (num < 1000 && num > 0.0001) {
    return (Math.round(num * 1000) / 1000).toFixed(3) + "";
  }

  return num;
};
const general_theme = {
  height: "90px",
  align: "center",
  description: "",
  brand: "NFT ",
  fontsize: "35px",
  fontweight: "50px",
  afterbrand: "Transactions",
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
const tabelabove = {
  height: "90px",
  align: "center",
  description: "",
  brand: "",
  fontsize: "30px",
  fontweight: "25px",
  afterbrand: "Activity",
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
const chartabove = {
  height: "90px",
  align: "center",
  description: "",
  brand: "Action ",
  fontsize: "30px",
  fontweight: "25px",
  afterbrand: "Info",
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
const tabletop = {
  height: "90px",
  align: "center",
  description: "",
  brand: "NFT ",
  fontsize: "30px",
  fontweight: "25px",
  afterbrand: "Trend",
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
const transactions = {
  height: "110px",
  align: "center",
  brand: "Transactions",
  description: `${formatNumber(state.result.query4?.data[0]?.count) || "0"}`,
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
  brand: "Active Days",
  description: `${state.result.query4?.data[0]?.timestamp || "0"}`,
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
  brand: "Total Collections",
  description: `${state.result.query4?.data[0]?.nft_contract_id || "0"}`,
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
  brand: "Trade Volume",
  description: `${formatNumber(state.result.query4?.data[0]?.price) || "0"}`,
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
//---------------------------------------------------------------------------------------------------

// state ####################################

State.init({
  searchedSinger: "",
  searchedInterval: "",
  result: {},
  loader: [],
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
      loader: [],
      result: {},
      isLoading: true,
      queriesRuned: false,
    });
  }
};
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
    const newLoader = loader.filter(({ id: loaderId }) => loaderId !== id);
    if (error) {
      const queryError = `query${id} : ${error}`;
      return {
        ...state,
        result: { ...newResult },
        loader: newLoader.length === 0 ? [] : newLoader,
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
        ...(data && { loader: newLoader.length === 0 ? [] : newLoader }),
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

let TableLeft = (
  <div
    style={{
      background: themeColor?.sbt_area?.section_bg,
      display: state.tab === tabs.left ? "" : "none",
    }}
    className="shadow-sm rounded-2 overflow-auto p-2"
  >
    <div
      style={{ background: themeColor?.sbt_area?.card_bg }}
      className="shadow-sm rounded-4 overflow-auto"
    >
      {CardIsLoading(1)}
      {CardHasError(1)}
      {state.result["query" + 1]?.data && (
        <Widget
          src="lord1.near/widget/table-pagination"
          props={{
            themeColor: { table_pagination: themeColor.table_pagination },
            data: state.result["query" + 1]?.data,
            rowsCount: 6,
            columns: [
              { title: "Platform", key: "platform", colors: "#806ce1" },
              { title: "Transaction Number", key: "trxs", round: "yes" },
              { title: "Volume (USD)", key: "usd", round: "yes" },
              { title: "Platform_fee (Avax)", key: "fee", round: "yes" },
              { title: "Active days", key: "date" },
              { title: "Collection Numbers", key: "collection" },
              {
                title: "Buy Volume (USD)",
                key: "buy_usd",
                colors: "#806ce1",
                round: "yes",
              },
              {
                title: "Sell Volume (USD)",
                key: "sell_usd",
                colors: "#334a93",
                round: "yes",
              },
              {
                title: "Buy Trxs",
                key: "buy_trxs",
                colors: "#806ce1",
                round: "yes",
              },
              {
                title: "Sell Trxs",
                key: "sell_trxs",
                colors: "#334a93",
                round: "yes",
              },
            ],
          }}
        />
      )}
    </div>
  </div>
);

let TableMiddle = (
  <div
    style={{
      background: themeColor?.sbt_area?.section_bg,
      display: state.tab === tabs.middle ? "" : "none",
    }}
    className="shadow-sm rounded-2 overflow-auto p-2"
  >
    <div
      style={{ background: themeColor?.sbt_area?.card_bg }}
      className="shadow-sm rounded-4 overflow-auto"
    >
      {CardIsLoading(3)}
      {CardHasError(3)}
      {state.result["query" + 3]?.data && (
        <Widget
          src="lord1.near/widget/table-pagination"
          props={{
            themeColor: { table_pagination: themeColor.table_pagination },
            data: state.result["query" + 3]?.data,
            rowsCount: 6,
            columns: [
              { title: "Collection", key: "collection", colors: "#806ce1" },
              { title: "Transactions", key: "trxs", round: "yes" },
              { title: "Volume (USD)", key: "usd", round: "yes" },
              { title: "Platform Fee", key: "pfee", round: "yes" },
              { title: "Creator Fee", key: "cfee", round: "yes" },
              { title: "Platform", key: "platform" },
              { title: "Buy USD", key: "buy_usd", round: "yes" },
              { title: "Sell USD", key: "sell_usd", round: "yes" },
              { title: "Buy Trxs", key: "buy_trxs", round: "yes" },
              { title: "Sell Trxs", key: "sell_trxs", round: "yes" },
            ],
          }}
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
      className="shadow-sm rounded-4 overflow-auto"
    >
      {CardIsLoading(5)}
      {CardHasError(5)}
      {state.result["query" + 5]?.data && (
        <Widget
          src="lord1.near/widget/table-pagination"
          props={{
            themeColor: { table_pagination: themeColor.table_pagination },
            data: state.result["query" + 5]?.data,
            rowsCount: 10,
            columns: [
              { title: "Timestamp", key: "date" },
              { title: "Type", key: "event", colors: "#334a93" },
              { title: "Action", key: "action", colors: "#806ce1" },
              { title: "Collection", key: "project", colors: "#334a93" },
              { title: "Token ID", key: "id" },
              { title: "USD", key: "usd" },
              { title: "Sender/Buyer", key: "from" },
              { title: "Receiver/Seller", key: "to" },
              {
                title: "Transaction",
                key: "trxs",
                link: "yes",
                beforehref: "https://avascan.info/blockchain/c/tx/",
                afterhref: "",
              },
            ],
          }}
        />
      )}
    </div>
  </div>
);

let TopTable = (
  <div
    style={{ background: themeColor?.sbt_area?.section_bg }}
    className="shadow-sm rounded-2 overflow-auto p-2"
  >
    <div
      style={{ background: themeColor?.sbt_area?.card_bg }}
      className="shadow-sm rounded-4 overflow-auto"
    >
      {CardIsLoading(2)}
      {CardHasError(2)}
      {state.result["query" + 2]?.data && (
        <Widget
          src="lord1.near/widget/table-pagination"
          props={{
            themeColor: { table_pagination: themeColor.table_pagination },
            data: state.result["query" + 2]?.data,
            rowsCount: 6,
            columns: [
              { title: "Action", key: "type", colors: "#806ce1" },
              { title: "Transaction Number", key: "trxs", round: "yes" },
              { title: "Volume (USD)", key: "usd", round: "yes" },
              { title: "Collections", key: "collection" },
            ],
          }}
        />
      )}
    </div>
  </div>
);
let ChartSections = (
  <div className=" col-12 col-md-12">
    <div className=" col-12">
      <div
        style={{ background: themeColor?.sbt_area?.card_bg }}
        className="shadow-sm rounded-2"
      >
        {ChartIsLoading(6)}
        {ChartHasError(6)}
        {state.result["query" + 6]?.data && (
          <Widget
            src="lord1.near/widget/mix-chart"
            props={getMixProps(
              state.result["query" + 6]?.data,
              "date",
              [
                {
                  key: "hash",
                  seriesName: "Transaction",
                  type: "spline",
                  id: 1,
                },
                {
                  key: "usd",
                  seriesName: "Volume(USD)",
                  type: "column",
                  id: 2,
                },
              ],
              themeColor.chartColor,
              {
                title: "",
                subtitle: `Number of transactions `,
                stacking: "normal",
              }
            )}
          />
        )}
      </div>
    </div>
  </div>
);
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
            <div className="row">
              <div className="col-md-3">
                <Widget
                  src="lord1.near/widget/header-dynamic"
                  props={transactions}
                />
              </div>
              <div className="col-md-3">
                <Widget src="lord1.near/widget/header-dynamic" props={volume} />
              </div>
              <div className="col-md-3">
                <Widget src="lord1.near/widget/header-dynamic" props={date} />
              </div>
              <div className="col-md-3">
                <Widget
                  src="lord1.near/widget/header-dynamic"
                  props={contract}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <Widget
                  src="lord1.near/widget/header-dynamic"
                  props={chartabove}
                />
                <div>{TopTable} </div>
              </div>
              <div className="col-md-8">
                <Widget
                  src="lord1.near/widget/header-dynamic"
                  props={tabelabove}
                />
                <Container>
                  <ul className="tabContent">
                    {Object.values(tabs).map((tab) => (
                      <li key={tab} className="tab-item">
                        <button
                          className={`${state.tab === tab ? "active" : ""}`}
                          aria-current="page"
                          onClick={() => setTab(tab)}
                        >
                          {tab}
                        </button>
                      </li>
                    ))}
                  </ul>
                </Container>
                <div>
                  <div className="content">
                    {TableLeft}
                    {TableMiddle}
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <Widget src="lord1.near/widget/header-dynamic" props={tabletop} />
              <div className="col-md-12"> {ChartSections} </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <Widget
              src="lord1.near/widget/header-dynamic"
              props={general_theme}
            />
            <div className="row">
              <div className="col-md-12"> {BelowRight} </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);
