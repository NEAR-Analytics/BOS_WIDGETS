const API_KEY = props.API_KEY;
const themeColor = props.themeColor;
const singer = props.singer;
const interval = props.interval || "week";
const queries = [
  {
    hash: null,
    firstReqTime: 10,
    id: 1,
    query: `
with 
    a AS (
            select
                  SWAPPER ,
                  TX_ID ,
                  block_timestamp,
                  round(SWAP_FROM_AMOUNT,3) as SWAP_FROM_AMOUNT,
                  C.SYMBOL as from_symbol,
                  round(SWAP_TO_AMOUNT,3) as SWAP_TO_AMOUNT,
                  B.SYMBOL  as to_symbol,
                  case when SWAP_TO_AMOUNT*B.Close is not null then round(SWAP_TO_AMOUNT*B.Close,3)
                  else round(SWAP_FROM_AMOUNT*C.Close,3) end as USD,
                  split(Swap_program,' ')[2] as Swap_program,
                  SUCCEEDED ,
                  round(SWAP_TO_AMOUNT*B.Close - SWAP_From_AMOUNT*C.Close,2) as arbitrage 
            from solana.defi.fact_swaps
                left join solana.price.ez_token_prices_hourly B on date_trunc('Hour',BLOCK_TIMESTAMP)=B.RECORDED_HOUR
                    and SWAP_TO_MINT=B.TOKEN_ADDRESS
                left join solana.price.ez_token_prices_hourly C on date_trunc('Hour',BLOCK_TIMESTAMP)=C.RECORDED_HOUR
                    and SWAP_FROM_MINT=C.TOKEN_ADDRESS
            where Swap_program like 'jupiter%' 
            )

select 
to_symbol as "symbol",
count(distinct TX_ID) as "transaction"
from a
where SWAPPER='{{singer}}'
and SUCCEEDED ='true'
group by 1`,
  },
  {
    hash: null,
    firstReqTime: 10,
    id: 3,
    query: `
with 
    a AS (
            select
                  SWAPPER ,
                  TX_ID ,
                  block_timestamp,
                  round(SWAP_FROM_AMOUNT,3) as SWAP_FROM_AMOUNT,
                  C.SYMBOL as from_symbol,
                  round(SWAP_TO_AMOUNT,3) as SWAP_TO_AMOUNT,
                  B.SYMBOL  as to_symbol,
                  case when SWAP_TO_AMOUNT*B.Close is not null then round(SWAP_TO_AMOUNT*B.Close,3)
                  else round(SWAP_FROM_AMOUNT*C.Close,3) end as USD,
                  split(Swap_program,' ')[2] as Swap_program,
                  SUCCEEDED ,
                  round(SWAP_TO_AMOUNT*B.Close - SWAP_From_AMOUNT*C.Close,2) as arbitrage 
            from solana.defi.fact_swaps
                left join solana.price.ez_token_prices_hourly B on date_trunc('Hour',BLOCK_TIMESTAMP)=B.RECORDED_HOUR
                    and SWAP_TO_MINT=B.TOKEN_ADDRESS
                left join solana.price.ez_token_prices_hourly C on date_trunc('Hour',BLOCK_TIMESTAMP)=C.RECORDED_HOUR
                    and SWAP_FROM_MINT=C.TOKEN_ADDRESS
            where Swap_program like 'jupiter%' 
            )

select 
from_symbol as "symbol",
count(distinct TX_ID) as "transaction"
from a
where SWAPPER='{{singer}}'
and SUCCEEDED ='true'
group by 1 `,
  },
  {
    hash: null,
    firstReqTime: 10,
    id: 4,
    query: `
  with 
    a AS (
            select
                  SWAPPER ,
                  TX_ID ,
                  block_timestamp,
                  round(SWAP_FROM_AMOUNT,3) as SWAP_FROM_AMOUNT,
                  C.SYMBOL as from_symbol,
                  round(SWAP_TO_AMOUNT,3) as SWAP_TO_AMOUNT,
                  B.SYMBOL  as to_symbol,
                  case when SWAP_TO_AMOUNT*B.Close is not null then round(SWAP_TO_AMOUNT*B.Close,3)
                  else round(SWAP_FROM_AMOUNT*C.Close,3) end as USD,
                  split(Swap_program,' ')[2] as Swap_program,
                  SUCCEEDED ,
                  round(SWAP_TO_AMOUNT*B.Close - SWAP_From_AMOUNT*C.Close,2) as arbitrage 
            from solana.defi.fact_swaps
                left join solana.price.ez_token_prices_hourly B on date_trunc('Hour',BLOCK_TIMESTAMP)=B.RECORDED_HOUR
                    and SWAP_TO_MINT=B.TOKEN_ADDRESS
                left join solana.price.ez_token_prices_hourly C on date_trunc('Hour',BLOCK_TIMESTAMP)=C.RECORDED_HOUR
                    and SWAP_FROM_MINT=C.TOKEN_ADDRESS
            where Swap_program like 'jupiter%' 
            )

select 
      
  SWAPPER as "signer",
  split(min(block_timestamp)::date,'T')[0] as "min_time" ,
  split(max(block_timestamp)::date,'T')[0] as "max_time" ,
  count(DISTINCT date_trunc('day', block_timestamp)) as "active_days",
  count(DISTINCT date_trunc('month', block_timestamp)) as "active_month",
  count(DISTINCT date_trunc('year', block_timestamp)) as "active_year" ,
----------------------------------------------------------------------
  count(DISTINCT TX_ID) as "transactions",
  sum(case when SUCCEEDED = 'true' then 1 end )as "success" ,
----------------------------------------------------------------------
  round(sum(ARBITRAGE ),2) as "fee_near",
  round(("fee_near"/"transactions"),3) as "avg_gas_per_trx" ,
----------------------------------------------------------------------
  round(sum(USD),2) as "volume",
  round(("volume"/"transactions"),2) as "avg_volume_per_trx" ,
  count (distinct SWAP_PROGRAM)  as "project"
 
from a
where SWAPPER='{{singer}}'
group by 1 `,
  },
  {
    hash: null,
    firstReqTime: 10,
    id: 5,
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
    a AS (
            select
                  SWAPPER as "swapper" ,
                  TX_ID as "trxs",
                  BLOCK_TIMESTAMP,
                  case when (SWAP_TO_AMOUNT*B.Close is not null ) then round(SWAP_TO_AMOUNT*B.Close,3)
                  else round(SWAP_FROM_AMOUNT*C.Close,3) end as "usd",
                  SUCCEEDED,
                  coalesce(round(SWAP_TO_AMOUNT*B.Close - SWAP_From_AMOUNT*C.Close,2),0) as "arbitrage" 
            from solana.defi.fact_swaps
                left join solana.price.ez_token_prices_hourly B on date_trunc('Hour',BLOCK_TIMESTAMP)=B.RECORDED_HOUR
                    and SWAP_TO_MINT=B.TOKEN_ADDRESS
                left join solana.price.ez_token_prices_hourly C on date_trunc('Hour',BLOCK_TIMESTAMP)=C.RECORDED_HOUR
                    and SWAP_FROM_MINT=C.TOKEN_ADDRESS
            where Swap_program like 'jupiter%' 
            )

select 
      date_part(epoch, date_trunc('{{week}}',BLOCK_TIMESTAMP::date)) as "date" ,
      count(distinct "trxs") as "hash" ,
      round(sum("usd"),3) as "usd"
from a
where "swapper"='{{singer}}'
and SUCCEEDED='true'
  GROUP BY 1 
  order by 1 asc 
`,
  },
  {
    hash: null,
    firstReqTime: 10,
    id: 6,
    query: `
 with 
    a AS (
            select
                  SWAPPER ,
                  TX_ID ,
                  block_timestamp,
                  round(SWAP_FROM_AMOUNT,3) as SWAP_FROM_AMOUNT,
                  C.SYMBOL as from_symbol,
                  round(SWAP_TO_AMOUNT,3) as SWAP_TO_AMOUNT,
                  B.SYMBOL  as to_symbol,
                  case when SWAP_TO_AMOUNT*B.Close is not null then round(SWAP_TO_AMOUNT*B.Close,3)
                  else round(SWAP_FROM_AMOUNT*C.Close,3) end as USD,
                  split(Swap_program,' ')[2] as Swap_program,
                  SUCCEEDED ,
                  round(SWAP_TO_AMOUNT*B.Close - SWAP_From_AMOUNT*C.Close,2) as arbitrage 
            from solana.defi.fact_swaps
                left join solana.price.ez_token_prices_hourly B on date_trunc('Hour',BLOCK_TIMESTAMP)=B.RECORDED_HOUR
                    and SWAP_TO_MINT=B.TOKEN_ADDRESS
                left join solana.price.ez_token_prices_hourly C on date_trunc('Hour',BLOCK_TIMESTAMP)=C.RECORDED_HOUR
                    and SWAP_FROM_MINT=C.TOKEN_ADDRESS
            where Swap_program like 'jupiter%' 
            )

select 
      'Jupiter '||SWAP_PROGRAM||'🪐' as "version",
      sum(round(ARBITRAGE,1))||' USD' as "arbitrage",
      sum(round(USD))||' USD' as "volume",
      count(distinct TX_ID) as "transactions",
      count(distinct from_symbol) as "from_symbol",
      count(distinct to_symbol) as "to_symbol",
      count(DISTINCT date_trunc('day', block_timestamp)) as "active_days",
      count(DISTINCT date_trunc('month', block_timestamp)) as "active_month"
from a
where SWAPPER='{{singer}}'
group by 1 order by 1
`,
  },
  {
    hash: null,
    firstReqTime: 10,
    id: 7,
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
    a AS (
            select
                  SWAPPER as "swapper" ,
                  TX_ID as "trxs",
                  split(block_timestamp::date,'T')[0] as "date",
                  round(SWAP_FROM_AMOUNT,3) as "swap_from_amount",
                  upper(coalesce(C.SYMBOL,'Unknown')) as "from_symbol",
                  round(SWAP_TO_AMOUNT,3) as "swap_to_amount",
                  upper(coalesce(B.SYMBOL,'Unknown'))  as "to_symbol",
                  case when (SWAP_TO_AMOUNT*B.Close is not null ) then round(SWAP_TO_AMOUNT*B.Close,3)
                  else round(SWAP_FROM_AMOUNT*C.Close,3) end as "usd",
                  split(Swap_program,' ')[2] as "swap_program",
                  case when SUCCEEDED='true' then '✅' else '❌' end as "success",
                  coalesce(round(SWAP_TO_AMOUNT*B.Close - SWAP_From_AMOUNT*C.Close,2),0) as "arbitrage" 
            from solana.defi.fact_swaps
                left join solana.price.ez_token_prices_hourly B on date_trunc('Hour',BLOCK_TIMESTAMP)=B.RECORDED_HOUR
                    and SWAP_TO_MINT=B.TOKEN_ADDRESS
                left join solana.price.ez_token_prices_hourly C on date_trunc('Hour',BLOCK_TIMESTAMP)=C.RECORDED_HOUR
                    and SWAP_FROM_MINT=C.TOKEN_ADDRESS
            where Swap_program like 'jupiter%' 
            )

select 
*
from a
where "swapper"='{{singer}}'
`,
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

const engagement = {
  height: "90px",
  align: "center",
  description: "",
  brand: "Version",
  fontsize: "25px",
  fontweight: "50px",
  afterbrand: "Engagement",
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
const scan = {
  height: "90px",
  align: "center",
  description: "",
  brand: "Transaction",
  fontsize: "25px",
  fontweight: "50px",
  afterbrand: "Scan",
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
const general_theme = {
  height: "90px",
  align: "center",
  description: "",
  brand: "Activity",
  fontsize: "25px",
  fontweight: "50px",
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
const general_theme2 = {
  height: "90px",
  align: "center",
  description: "Based on Transaction Number",
  brand: "Symbol",
  fontsize: "25px",
  fontweight: "50px",
  afterbrand: "Out",
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
  description: "Based on Transaction Number",
  brand: "Symbol",
  fontsize: "25px",
  fontweight: "50px",
  afterbrand: "In",
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
  if (num >= 100) {
    return "3%";
  }

  if (num < 100 && num >= 50) {
    return "6%";
  }
  if (num < 50 && num >= 20) {
    return "14%";
  }
  if (num < 20 && num >= 10) {
    return "25%";
  }
  if (num < 10 && num >= 3) {
    return "75%";
  }
  if (num < 3 && num >= 0) {
    return "(No)";
  }
  return num;
};
const formatNumbervolume = (num) => {
  if (num >= 10000) {
    return "8%";
  }
  if (num < 10000 && num >= 1000) {
    return "25%";
  }
  if (num < 1000 && num >= 50) {
    return "60%";
  }

  if (num < 50 && num >= 0) {
    return "(No)";
  }
  return num;
};
const formatNumberfee_near = (num) => {
  if (num >= 10) {
    return "5%";
  }
  if (num < 10 && num >= 1) {
    return "30%";
  }
  if (num < 1 && num >= 0) {
    return "(No)";
  }
  return num;
};
const formatNumberproject = (num) => {
  if (num >= 5) {
    return "1%";
  }
  if (num < 5 && num >= 3) {
    return "8%";
  }
  if (num < 3 && num >= 2) {
    return "25%";
  }
  if (num < 2 && num >= 1) {
    return "75%";
  }
  if (num < 1 && num >= 0) {
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
  description: "Thank you for being a valued user of Jupiter throughout 2023",
  fontsize: "25px",
  fontweight: "25px",
  afterbrand: `${onHandelId(state.result.query4?.data[0]?.signer) || "Jupion"}`,
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
  description: `${
    formatNumber(state.result.query4?.data[0]?.transactions) || "0"
  }`,
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
  brand: "Slippage",
  description: `${state.result.query4?.data[0]?.fee_near || "0"}` + " USD",
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
  brand: "Engagement",
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
  brand: "Trade Volume",
  description:
    `${formatNumber(state.result.query4?.data[0]?.volume) || "0"}` + " USD",
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
    }}
    className="shadow-sm rounded-2 overflow-auto p-2"
  >
    <div
      style={{ background: themeColor?.sbt_area?.card_bg }}
      className="shadow-sm rounded-4 overflow-auto"
    >
      {CardIsLoading(6)}
      {CardHasError(6)}
      {state.result["query" + 6]?.data && (
        <Widget
          src="lord1.near/widget/table-pagination"
          props={{
            themeColor: { table_pagination: themeColor.table_pagination },
            data: state.result["query" + 6]?.data,
            rowsCount: 6,
            columns: [
              { title: "Version", key: "version", colors: "#806ce1" },
              { title: "Transactions", key: "transactions", round: "yes" },
              { title: "Volume", key: "volume", round: "yes" },
              { title: "Slippage", key: "arbitrage" },
              { title: "Symbol In", key: "from_symbol" },
              { title: "Symbol Out", key: "to_symbol" },
              { title: "Active Days", key: "active_days" },
              { title: "Active Month", key: "active_month" },
            ],
          }}
        />
      )}
    </div>
  </div>
);
let TableScan = (
  <div
    style={{
      background: themeColor?.sbt_area?.section_bg,
    }}
    className="shadow-sm rounded-2 overflow-auto p-2"
  >
    <div
      style={{ background: themeColor?.sbt_area?.card_bg }}
      className="shadow-sm rounded-4 overflow-auto"
    >
      {CardIsLoading(7)}
      {CardHasError(7)}
      {state.result["query" + 7]?.data && (
        <Widget
          src="lord1.near/widget/table-pagination"
          props={{
            themeColor: { table_pagination: themeColor.table_pagination },
            data: state.result["query" + 7]?.data,
            rowsCount: 10,
            columns: [
              { title: "Timestamp", key: "date", colors: "#806ce1" },

              { title: "Version", key: "swap_program" },
              { title: "Success", key: "success" },
              { title: "Symbol In", key: "from_symbol", colors: "#806ce1" },
              { title: "Amount In", key: "swap_from_amount", round: "yes" },
              { title: "Symbol Out", key: "to_symbol", colors: "#806ce1" },
              { title: "Amount Out", key: "swap_to_amount", round: "yes" },
              { title: "Volume", key: "usd", colors: "#806ce1" },
              { title: "Slippage", key: "arbitrage" },
              {
                title: "Transactions",
                key: "trxs",
                link: "yes",
                beforehref: "https://solscan.io/tx/",
                afterhref: "",
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
    style={{ background: themeColor?.sbt_area?.section_bg }}
    className="shadow-sm rounded-2 overflow-auto p-2"
  >
    <div
      style={{ background: themeColor?.sbt_area?.card_bg }}
      className="shadow-sm rounded-2 overflow-auto"
    >
      {CardIsLoading(3)}
      {CardHasError(3)}
      {state.result["query" + 3]?.data && (
        <Widget
          src="lord1.near/widget/Pie-chart"
          props={getPieProps(
            state.result["query" + 3]?.data,
            ["symbol", "transaction"],
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

let BelowMiddle = (
  <div
    style={{ background: themeColor?.sbt_area?.section_bg }}
    className="shadow-sm rounded-2 overflow-auto p-2"
  >
    <div
      style={{ background: themeColor?.sbt_area?.card_bg }}
      className="shadow-sm rounded-2 overflow-auto"
    >
      {CardIsLoading(1)}
      {CardHasError(1)}
      {state.result["query" + 1]?.data &&
        (state.result["query" + 1]?.data.length > 0 ? (
          <Widget
            src="lord1.near/widget/Pie-chart"
            props={getPieProps(
              state.result["query" + 1]?.data,
              ["symbol", "transaction"],
              themeColor.chartColor,
              {
                title: "",
                type: "pie",
                connector: true,
                legend: true,
              }
            )}
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

let ChartSections = (
  <div className=" col-12 col-md-12">
    <div className=" col-12">
      <div
        style={{ background: themeColor?.sbt_area?.card_bg }}
        className="shadow-sm rounded-2"
      >
        {ChartIsLoading(5)}
        {ChartHasError(5)}
        {state.result["query" + 5]?.data && (
          <Widget
            src="lord1.near/widget/mix-chart"
            props={getMixProps(
              state.result["query" + 5]?.data,
              "date",
              [
                {
                  key: "hash",
                  seriesName: "Transaction",
                  type: "column",
                  id: 1,
                },
                {
                  key: "usd",
                  seriesName: "Volume(USD)",
                  type: "spline",
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
              <Widget
                src="lord1.near/widget/header-dynamic"
                props={engagement}
              />
              <div className="col-md-12">{TableLeft}</div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <Widget
                  src="lord1.near/widget/header-dynamic"
                  props={general_theme1}
                />

                {TableMiddle}
              </div>
              <div className="col-md-6">
                <Widget
                  src="lord1.near/widget/header-dynamic"
                  props={general_theme2}
                />
                {BelowMiddle}
              </div>
              <div className="col-md-12">
                <Widget
                  src="lord1.near/widget/header-dynamic"
                  props={general_theme}
                />
                {ChartSections}
              </div>
            </div>
            <div className="row">
              <Widget src="lord1.near/widget/header-dynamic" props={scan} />
              <div className="col-md-12">{TableScan}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);
