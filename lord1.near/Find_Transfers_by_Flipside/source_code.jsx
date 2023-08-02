// header ------------------------------------------------------------------------------------------
const Gradient = styled.div`
   {
    margin-top: -25px;
    margin-bottom: 25px;
    height: 250px;
    text-align: center;
    background: radial-gradient(
      circle,
      rgba(29, 55, 57, 1) 30%,
      rgba(24, 24, 24, 1) 80%
    );

    font-family: Arial, sans-serif;
  }

  .text-primary-gradient {
    color: #53fdca;
    -webkit-text-fill-color: transparent;
    background-image: linear-gradient(#fc3fff, #789efb);
    -webkit-background-clip: text;
    background-clip: text;
  }

  .subtitle-above {
    font-size: 18px;
    letter-spacing: 1px;
    font-family: Courier, monospace;
  }

  .subtitle-below {
    font-size: 16px;
  }

  .slogan {
    font-weight: 600;
    font-size: 60px;
  }
`;
let header = (
  <Gradient
    className="d-flex flex-column justify-content-center"
    style={{ "border-radius": "15px", "margin-top": "10px" }}
  >
    <h1 class="mb-3 text-white slogan">
      <span>
        <img
          src="https://yt3.googleusercontent.com/zkArEwljuLKjF7S1rbXoyQWW1VC8QzgVzrFP7KKqOypFtSv0cKgIXbfOBdIFO3ZoBD_wJJUyyw=s900-c-k-c0x00ffffff-no-rj"
          style={{
            width: "80px",
            height: "80px",
            "box-shadow": "0 0px 20px rgba(1300, 60, 231, 20)",
            "border-radius": "1000px",
          }}
        ></img>
      </span>
      <span class="text-primary-gradient">Flipside </span>Crypto
    </h1>
    <div class="subtitle-below text-white opacity-75">
      Access the most reliable blockchain data, for free. Discover analyses on
      leading protocols from expert analysts.
    </div>
  </Gradient>
);
// header ------------------------------------------------------------------------------------------

const API_KEY = "3343d809-832a-470b-a45f-1157029ef0a7";
const queries = {
  bsc: (__formatedAddressIds, __isConnected) => {
    return `with bsc_r as (
    SELECT
      split(BLOCK_TIMESTAMP, '.') [0] as Time,
      SYMBOL as Symbol,
      round(AMOUNT, 1) as AMOUNT,
      round(AMOUNT_USD, 1) as AMOUNT_USD,
      FROM_ADDRESS as address,
      'bsc_r1' as title,
      TO_ADDRESS as address2,
      'https://bscscan.com/tx/' || TX_HASH as TX_HASH
    FROM
      BSC.core.ez_token_transfers
    WHERE
      TO_ADDRESS in (
        ${__formatedAddressIds}
      )
      and ORIGIN_FROM_ADDRESS not in (
        ${__formatedAddressIds}
      )
      and FROM_ADDRESS != ORIGIN_TO_ADDRESS
      and ORIGIN_TO_ADDRESS = CONTRACT_ADDRESS
    UNION
    SELECT
      split(BLOCK_TIMESTAMP, '.') [0] as Time,
      SYMBOL as Symbol,
      round(AMOUNT, 1) as AMOUNT,
      round(AMOUNT_USD, 1) as AMOUNT_USD,
      to_address as address,
      'bsc_r2' as title,
      ORIGIN_FROM_ADDRESS as address2,
      'https://bscscan.com/tx/' || TX_HASH as TX_HASH
    FROM
      BSC.core.ez_token_transfers
    WHERE
      to_address in (
        ${__formatedAddressIds}
      )
      and FROM_ADDRESS = ORIGIN_TO_ADDRESS
      and FROM_ADDRESS != ORIGIN_FROM_ADDRESS
      and ORIGIN_TO_ADDRESS IN (
        '0x692b5a7ecccad243a07535e8c24b0e7433238c6a',
        '0xd152f549545093347a162dce210e7293f1452150',
        '0x4fafb87de15cff7448bd0658112f4e4b0d53332c',
        '0x8eA8573c4BfD04e9405D30253C5E30Ea97D23b7C'
      )
    UNION
    SELECT
      split(BLOCK_TIMESTAMP, '.') [0] as Time,
      'BNB' as Symbol,
      round(AMOUNT, 1) as AMOUNT,
      round(AMOUNT_USD, 1) as AMOUNT_USD,
      ORIGIN_FROM_ADDRESS as address,
      'bsc_r3' as title,
      BNB_TO_ADDRESS as address2,
      'https://bscscan.com/tx/' || TX_HASH as TX_HASH
    FROM
      BSC.core.ez_BNB_transfers
    WHERE
      BNB_TO_ADDRESS in (
        ${__formatedAddressIds}
      )
      and (BNB_FROM_ADDRESS = ORIGIN_TO_ADDRESS)
      and ORIGIN_TO_ADDRESS = '0xd152f549545093347a162dce210e7293f1452150'
      and ORIGIN_FROM_ADDRESS not in (
        ${__formatedAddressIds}
      )
    UNION
    SELECT
      split(BLOCK_TIMESTAMP, '.') [0] as Time,
      'BNB' as Symbol,
      round(AMOUNT, 1) as AMOUNT,
      round(AMOUNT_USD, 1) as AMOUNT_USD,
      ORIGIN_FROM_ADDRESS as address,
      'bsc_r4' as title,
      BNB_TO_ADDRESS as address2,
      'https://bscscan.com/tx/' || TX_HASH as TX_HASH
    FROM
      BSC.core.ez_BNB_transfers
    WHERE
      BNB_TO_ADDRESS in (
        ${__formatedAddressIds}
      )
      and BNB_FROM_ADDRESS != ORIGIN_TO_ADDRESS
      and ORIGIN_FROM_ADDRESS not in (
        ${__formatedAddressIds}
      )
      and ORIGIN_FUNCTION_SIGNATURE = '0x'
  ),
  bsc_s as (
    SELECT
      split(BLOCK_TIMESTAMP, '.') [0] as Time,
      SYMBOL as Symbol,
      round(AMOUNT, 1) as AMOUNT,
      round(AMOUNT_USD, 1) as AMOUNT_USD,
      origin_FROM_ADDRESS as address,
      'bsc_s1' as title,
      TO_ADDRESS as address2,
      'https://bscscan.com/tx/' || TX_HASH as TX_HASH
    FROM
      bsc.core.ez_token_transfers
    WHERE
      origin_FROM_ADDRESS in (
        ${__formatedAddressIds}
      )
      and ORIGIN_FROM_ADDRESS = FROM_ADDRESS
      and ORIGIN_TO_ADDRESS = CONTRACT_ADDRESS
      and TO_ADDRESS != '0x0000000000000000000000000000000000000000'
    union
    SELECT
      split(BLOCK_TIMESTAMP, '.') [0] as Time,
      'BNB' as Symbol,
      round(AMOUNT, 1) as AMOUNT,
      round(AMOUNT_USD, 1) as AMOUNT_USD,
      BNB_FROM_ADDRESS as address,
      'bsc_s2' as title,
      BNB_TO_ADDRESS as address2,
      'https://bscscan.com/tx/' || TX_HASH as TX_HASH
    FROM
      bsc.core.ez_BNB_transfers
    WHERE
      BNB_FROM_ADDRESS in (
        ${__formatedAddressIds}
      )
      and BNB_TO_ADDRESS = ORIGIN_TO_ADDRESS
      and ORIGIN_FUNCTION_SIGNATURE in ('0x')
  )
  select
    *
  from
    bsc_s
  where
    AMOUNT_USD > 0
    ${
      __isConnected
        ? `and address2 in (
      ${__formatedAddressIds}
    )
    and address in (
      ${__formatedAddressIds}
    )`
        : ""
    }
  union
  select
    *
  from
    bsc_r
  where
    AMOUNT_USD > 0
    ${
      __isConnected
        ? `and address2 in (
      ${__formatedAddressIds}
    )
    and address in (
      ${__formatedAddressIds}
    )`
        : ""
    }`;
  },
  ethereum: (__formatedAddressIds, __isConnected) => {
    return `with ether_r as (
      SELECT
          split(BLOCK_TIMESTAMP, '.') [0] as Time,
          SYMBOL as Symbol,
          round(AMOUNT, 1) as AMOUNT,
          round(AMOUNT_USD, 1) as AMOUNT_USD,
          FROM_ADDRESS as address,
          'ether_r1' as title,
          TO_ADDRESS as address2,
          'https://etherscan.io/tx/' || TX_HASH as TX_HASH
      FROM
          ethereum.core.ez_token_transfers
      WHERE
          TO_ADDRESS in (
              ${__formatedAddressIds}
          )
          and ORIGIN_FROM_ADDRESS not in (
              ${__formatedAddressIds}
          )
          and FROM_ADDRESS != ORIGIN_TO_ADDRESS
          and ORIGIN_TO_ADDRESS = CONTRACT_ADDRESS
      UNION
      SELECT
          split(BLOCK_TIMESTAMP, '.') [0] as Time,
          SYMBOL as Symbol,
          round(AMOUNT, 1) as AMOUNT,
          round(AMOUNT_USD, 1) as AMOUNT_USD,
          ORIGIN_FROM_ADDRESS as address,
          'ether_r2' as title,
          to_address as address2,
          'https://etherscan.io/tx/' || TX_HASH as TX_HASH
      FROM
          ethereum.core.ez_token_transfers
      WHERE
          to_address in (
              ${__formatedAddressIds}
          )
          and FROM_ADDRESS = ORIGIN_TO_ADDRESS
          and FROM_ADDRESS != ORIGIN_FROM_ADDRESS
          and ORIGIN_TO_ADDRESS IN (
              '0xd152f549545093347a162dce210e7293f1452150',
              '0x4fafb87de15cff7448bd0658112f4e4b0d53332c',
              '0x8eA8573c4BfD04e9405D30253C5E30Ea97D23b7C'
          )
      UNION
      SELECT
          split(BLOCK_TIMESTAMP, '.') [0] as Time,
          'ETH' as Symbol,
          round(AMOUNT, 1) as AMOUNT,
          round(AMOUNT_USD, 1) as AMOUNT_USD,
          ORIGIN_FROM_ADDRESS as address,
          'ether_r3' as title,
          eth_TO_ADDRESS as address2,
          'https://etherscan.io/tx/' || TX_HASH as TX_HASH
      FROM
          ethereum.core.ez_eth_transfers
      WHERE
          eth_TO_ADDRESS in (
              ${__formatedAddressIds}
          )
          and (ETH_FROM_ADDRESS = ORIGIN_TO_ADDRESS)
          and ORIGIN_TO_ADDRESS = '0xd152f549545093347a162dce210e7293f1452150'
          and ORIGIN_FROM_ADDRESS not in (
              ${__formatedAddressIds}
          )
      UNION
      SELECT
          split(BLOCK_TIMESTAMP, '.') [0] as Time,
          'ETH' as Symbol,
          round(AMOUNT, 1) as AMOUNT,
          round(AMOUNT_USD, 1) as AMOUNT_USD,
          ORIGIN_FROM_ADDRESS as address,
          'ether_r4' as title,
          eth_TO_ADDRESS as address2,
          'https://etherscan.io/tx/' || TX_HASH as TX_HASH
      FROM
          ethereum.core.ez_eth_transfers
      WHERE
          eth_TO_ADDRESS in (
              ${__formatedAddressIds}
          )
          and ETH_FROM_ADDRESS != ORIGIN_TO_ADDRESS
          and ORIGIN_FROM_ADDRESS not in (
              ${__formatedAddressIds}
          )
          and ORIGIN_FUNCTION_SIGNATURE = '0x'
  ),
  ether_s as (
      SELECT
          split(BLOCK_TIMESTAMP, '.') [0] as Time,
          SYMBOL as Symbol,
          round(AMOUNT, 1) as AMOUNT,
          round(AMOUNT_USD, 1) as AMOUNT_USD,
          origin_FROM_ADDRESS as address,
          'ether_s1' as title,
          TO_ADDRESS as address2,
          'https://etherscan.io/tx/' || TX_HASH as TX_HASH
      FROM
          ethereum.core.ez_token_transfers
      WHERE
          origin_FROM_ADDRESS in (
              ${__formatedAddressIds}
          )
          and ORIGIN_FROM_ADDRESS = FROM_ADDRESS
          and ORIGIN_TO_ADDRESS = CONTRACT_ADDRESS
      union
      SELECT
          split(BLOCK_TIMESTAMP, '.') [0] as Time,
          'ETH' as Symbol,
          round(AMOUNT, 1) as AMOUNT,
          round(AMOUNT_USD, 1) as AMOUNT_USD,
          ETH_FROM_ADDRESS as address,
          'ether_s2' as title,
          ETH_TO_ADDRESS as address2,
          'https://etherscan.io/tx/' || TX_HASH as TX_HASH
      FROM
          ethereum.core.ez_eth_transfers
      WHERE
          ETH_FROM_ADDRESS in (
              ${__formatedAddressIds}
          )
          and ETH_TO_ADDRESS = ORIGIN_TO_ADDRESS
          and ORIGIN_FUNCTION_SIGNATURE in ('0x')
  )
  select
      *
  from
      ether_s
  where
      AMOUNT_USD > 0
      ${
        __isConnected
          ? `and address2 in (
      ${__formatedAddressIds}
    )
    and address in (
      ${__formatedAddressIds}
    )`
          : ""
      }
  union
  select
      *
  from
      ether_r
  where
      AMOUNT_USD > 0
      ${
        __isConnected
          ? `and address2 in (
      ${__formatedAddressIds}
    )
    and address in (
      ${__formatedAddressIds}
    )`
          : ""
      }`;
  },
  avalanch: (__formatedAddressIds, __isConnected) => {
    return `with avax_r as (
      SELECT
          split(BLOCK_TIMESTAMP, '.') [0] as Time,
          SYMBOL as Symbol,
          round(AMOUNT, 1) as AMOUNT,
          round(AMOUNT_USD, 1) as AMOUNT_USD,
          FROM_ADDRESS as address,
          'avax_r' as title,
          TO_ADDRESS as address2,
          'https://snowtrace.io/tx/' || TX_HASH as TX_HASH
      FROM
          avalanche.core.ez_token_transfers
      WHERE
          TO_ADDRESS in (
              ${__formatedAddressIds}
          )
          and ORIGIN_FROM_ADDRESS not in (
              ${__formatedAddressIds}
          )
          and FROM_ADDRESS != ORIGIN_TO_ADDRESS
          and ORIGIN_TO_ADDRESS = CONTRACT_ADDRESS
      UNION
      SELECT
          split(BLOCK_TIMESTAMP, '.') [0] as Time,
          SYMBOL as Symbol,
          round(AMOUNT, 1) as AMOUNT,
          round(AMOUNT_USD, 1) as AMOUNT_USD,
          ORIGIN_FROM_ADDRESS as address,
          'avax_r' as title,
          TO_ADDRESS as address2,
          'https://snowtrace.io/tx/' || TX_HASH as TX_HASH
      FROM
          avalanche.core.ez_token_transfers
      WHERE
          to_address in (
              ${__formatedAddressIds}
          )
          and FROM_ADDRESS = ORIGIN_TO_ADDRESS
          and FROM_ADDRESS != ORIGIN_FROM_ADDRESS
          and ORIGIN_TO_ADDRESS IN (
              '0x692b5a7ecccad243a07535e8c24b0e7433238c6a',
              '0xd152f549545093347a162dce210e7293f1452150',
              '0x4fafb87de15cff7448bd0658112f4e4b0d53332c',
              '0x8eA8573c4BfD04e9405D30253C5E30Ea97D23b7C'
          )
      UNION
      SELECT
          split(BLOCK_TIMESTAMP, '.') [0] as Time,
          'avax' as Symbol,
          round(AMOUNT, 1) as AMOUNT,
          round(AMOUNT_USD, 1) as AMOUNT_USD,
          ORIGIN_FROM_ADDRESS as address,
          'avax_r' as title,
          AVAX_TO_ADDRESS as address2,
          'https://snowtrace.io/tx/' || TX_HASH as TX_HASH
      FROM
          avalanche.core.ez_AVAX_transfers
      WHERE
          AVAX_TO_ADDRESS in (
              ${__formatedAddressIds}
          )
          and (AVAX_FROM_ADDRESS = ORIGIN_TO_ADDRESS)
          and ORIGIN_TO_ADDRESS = '0xd152f549545093347a162dce210e7293f1452150'
          and ORIGIN_FROM_ADDRESS not in (
              ${__formatedAddressIds}
          )
      UNION
      SELECT
          split(BLOCK_TIMESTAMP, '.') [0] as Time,
          'avax' as Symbol,
          round(AMOUNT, 1) as AMOUNT,
          round(AMOUNT_USD, 1) as AMOUNT_USD,
          ORIGIN_FROM_ADDRESS as address,
          'avax_r' as title,
          AVAX_TO_ADDRESS as address2,
          'https://snowtrace.io/tx/' || TX_HASH as TX_HASH
      FROM
          avalanche.core.ez_AVAX_transfers
      WHERE
          AVAX_TO_ADDRESS in (
              ${__formatedAddressIds}
          )
          and AVAX_FROM_ADDRESS != ORIGIN_TO_ADDRESS
          and ORIGIN_FROM_ADDRESS not in (
              ${__formatedAddressIds}
          )
          and ORIGIN_FUNCTION_SIGNATURE = '0x'
  ),
  avax_s as (
      SELECT
          split(BLOCK_TIMESTAMP, '.') [0] as Time,
          SYMBOL as Symbol,
          round(AMOUNT, 1) as AMOUNT,
          round(AMOUNT_USD, 1) as AMOUNT_USD,
          origin_FROM_ADDRESS as address,
          'avax_s' as title,
          TO_ADDRESS as address2,
          'https://snowtrace.io/tx/' || TX_HASH as TX_HASH
      FROM
          avalanche.core.ez_token_transfers
      WHERE
          origin_FROM_ADDRESS in (
              ${__formatedAddressIds}
          )
          and ORIGIN_FROM_ADDRESS = FROM_ADDRESS
          and ORIGIN_TO_ADDRESS = CONTRACT_ADDRESS
      union
      SELECT
          split(BLOCK_TIMESTAMP, '.') [0] as Time,
          'avax' as Symbol,
          round(AMOUNT, 1) as AMOUNT,
          round(AMOUNT_USD, 1) as AMOUNT_USD,
          avax_FROM_ADDRESS as address,
          'avax_s' as title,
          avax_TO_ADDRESS as address2,
          'https://snowtrace.io/tx/' || TX_HASH as TX_HASH
      FROM
          avalanche.core.ez_avax_transfers
      WHERE
          avax_FROM_ADDRESS in (
              ${__formatedAddressIds}
          )
          and avax_TO_ADDRESS = ORIGIN_TO_ADDRESS
          and ORIGIN_FUNCTION_SIGNATURE in ('0x')
  )
  select
      *
  from
      avax_s
  where
      AMOUNT_USD > 0
      ${
        __isConnected
          ? `and address2 in (
      ${__formatedAddressIds}
    )
    and address in (
      ${__formatedAddressIds}
    )`
          : ""
      }
  UNION
  select
      *
  from
      avax_r
  where
      AMOUNT_USD > 0
      ${
        __isConnected
          ? `and address2 in (
      ${__formatedAddressIds}
    )
    and address in (
      ${__formatedAddressIds}
    )`
          : ""
      }`;
  },
  arbitrum: (__formatedAddressIds, __isConnected) => {
    return `with arbi_r as (
      SELECT
        split(BLOCK_TIMESTAMP, '.') [0] as Time,
        SYMBOL as Symbol,
        round(AMOUNT, 1) as AMOUNT,
        round(AMOUNT_USD, 1) as AMOUNT_USD,
        FROM_ADDRESS as address,
        'arbi_r1' as title,
        TO_ADDRESS as address2,
        'https://arbiscan.io/tx/' || TX_HASH as TX_HASH
      FROM
        arbitrum.core.ez_token_transfers
      WHERE
        TO_ADDRESS in (
          ${__formatedAddressIds}
        )
        and ORIGIN_FROM_ADDRESS not in (
          ${__formatedAddressIds}
        )
        and FROM_ADDRESS != ORIGIN_TO_ADDRESS
        and ORIGIN_TO_ADDRESS = CONTRACT_ADDRESS
      UNION
      SELECT
        split(BLOCK_TIMESTAMP, '.') [0] as Time,
        SYMBOL as Symbol,
        round(AMOUNT, 1) as AMOUNT,
        round(AMOUNT_USD, 1) as AMOUNT_USD,
        ORIGIN_FROM_ADDRESS as address,
        'arbi_r2' as title,
        to_address as address2,
        'https://arbiscan.io/tx/' || TX_HASH as TX_HASH
      FROM
        arbitrum.core.ez_token_transfers
      WHERE
        to_address in (
          ${__formatedAddressIds}
        )
        and FROM_ADDRESS = ORIGIN_TO_ADDRESS
        and FROM_ADDRESS not in (
          ${__formatedAddressIds}
        )
        and ORIGIN_TO_ADDRESS IN (
          '0x692b5a7ecccad243a07535e8c24b0e7433238c6a',
          '0xd152f549545093347a162dce210e7293f1452150',
          '0x4fafb87de15cff7448bd0658112f4e4b0d53332c',
          '0x8eA8573c4BfD04e9405D30253C5E30Ea97D23b7C'
        )
      UNION
      SELECT
        split(BLOCK_TIMESTAMP, '.') [0] as Time,
        'ETH' as Symbol,
        round(AMOUNT, 1) as AMOUNT,
        round(AMOUNT_USD, 1) as AMOUNT_USD,
        ORIGIN_FROM_ADDRESS as address,
        'arbi_r3' as title,
        eth_TO_ADDRESS as address2,
        'https://arbiscan.io/tx/' || TX_HASH as TX_HASH
      FROM
        arbitrum.core.ez_eth_transfers
      WHERE
        eth_TO_ADDRESS in (
          ${__formatedAddressIds}
        )
        and (ETH_FROM_ADDRESS = ORIGIN_TO_ADDRESS)
        and ORIGIN_TO_ADDRESS = '0xd152f549545093347a162dce210e7293f1452150'
        and ORIGIN_FROM_ADDRESS not in (
          ${__formatedAddressIds}
        )
      UNION
      SELECT
        split(BLOCK_TIMESTAMP, '.') [0] as Time,
        'ETH' as Symbol,
        round(AMOUNT, 1) as AMOUNT,
        round(AMOUNT_USD, 1) as AMOUNT_USD,
        ORIGIN_FROM_ADDRESS as address,
        'arbi_r4' as title,
        eth_TO_ADDRESS as address2,
        'https://arbiscan.io/tx/' || TX_HASH as TX_HASH
      FROM
        arbitrum.core.ez_eth_transfers
      WHERE
        eth_TO_ADDRESS in (
          ${__formatedAddressIds}
        )
        and ETH_FROM_ADDRESS != ORIGIN_TO_ADDRESS
        and ORIGIN_FROM_ADDRESS not in (
          ${__formatedAddressIds}
        )
        and ORIGIN_FUNCTION_SIGNATURE = '0x'
    ),
    arbi_s as (
      SELECT
        split(BLOCK_TIMESTAMP, '.') [0] as Time,
        SYMBOL as Symbol,
        round(AMOUNT, 3) as AMOUNT,
        round(AMOUNT_USD, 3) as AMOUNT_USD,
        origin_FROM_ADDRESS as address,
        'arbi_s1' as title,
        TO_ADDRESS as address2,
        'https://arbiscan.io/tx/' || TX_HASH as TX_HASH
      FROM
        arbitrum.core.ez_token_transfers
      WHERE
        origin_FROM_ADDRESS in (
          ${__formatedAddressIds}
        )
        and ORIGIN_FROM_ADDRESS = FROM_ADDRESS
        and ORIGIN_TO_ADDRESS = CONTRACT_ADDRESS
        AND TO_ADDRESS not in (
          '0x0000000000000000000000000000000000000000',
          '0x80c67432656d59144ceff962e8faf8926599bcf8'
        )
      union
      SELECT
        split(BLOCK_TIMESTAMP, '.') [0] as Time,
        'ETH' as Symbol,
        round(AMOUNT, 3) as AMOUNT,
        round(AMOUNT_USD, 3) as AMOUNT_USD,
        ETH_FROM_ADDRESS as address,
        'arbi_s1' as title,
        ETH_TO_ADDRESS as address2,
        'https://arbiscan.io/tx/' || TX_HASH as TX_HASH
      FROM
        arbitrum.core.ez_eth_transfers
      WHERE
        ETH_FROM_ADDRESS in (
          ${__formatedAddressIds}
        )
        and ETH_TO_ADDRESS = ORIGIN_TO_ADDRESS
        and ORIGIN_FUNCTION_SIGNATURE in ('0x')
        AND ETH_TO_ADDRESS not in ('0x80c67432656d59144ceff962e8faf8926599bcf8')
    )
    select
      *
    from
      arbi_s
    where
      AMOUNT_USD > 0
      ${
        __isConnected
          ? `and address2 in (
      ${__formatedAddressIds}
    )
    and address in (
      ${__formatedAddressIds}
    )`
          : ""
      }
    union
    select
      *
    from
      arbi_r
    where
      AMOUNT_USD > 0
      ${
        __isConnected
          ? `and address2 in (
      ${__formatedAddressIds}
    )
    and address in (
      ${__formatedAddressIds}
    )`
          : ""
      }`;
  },
  optimism: (__formatedAddressIds, __isConnected) => {
    return `with op_r as (
      SELECT
          split(BLOCK_TIMESTAMP, '.') [0] as Time,
          SYMBOL as Symbol,
          round(AMOUNT, 1) as AMOUNT,
          round(AMOUNT_USD, 1) as AMOUNT_USD,
          FROM_ADDRESS as address,
          'op_r1' as title,
          TO_ADDRESS as address2,
          'https://optimistic.etherscan.io/tx/' || TX_HASH as TX_HASH
      FROM
          optimism.core.ez_token_transfers
      WHERE
          TO_ADDRESS in (
              ${__formatedAddressIds}
          )
          and ORIGIN_FROM_ADDRESS not in (
              ${__formatedAddressIds}
          )
          and FROM_ADDRESS != ORIGIN_TO_ADDRESS
          and ORIGIN_TO_ADDRESS = CONTRACT_ADDRESS
      UNION
      SELECT
          split(BLOCK_TIMESTAMP, '.') [0] as Time,
          SYMBOL as Symbol,
          round(AMOUNT, 1) as AMOUNT,
          round(AMOUNT_USD, 1) as AMOUNT_USD,
          ORIGIN_FROM_ADDRESS as address,
          'op_r2' as title,
          TO_ADDRESS as address2,
          'https://optimistic.etherscan.io/tx/' || TX_HASH as TX_HASH
      FROM
          optimism.core.ez_token_transfers
      WHERE
          to_address in (
              ${__formatedAddressIds}
          )
          and FROM_ADDRESS = ORIGIN_TO_ADDRESS
          and FROM_ADDRESS != ORIGIN_FROM_ADDRESS
          and FROM_ADDRESS = '0xd152f549545093347a162dce210e7293f1452150'
      UNION
      SELECT
          split(BLOCK_TIMESTAMP, '.') [0] as Time,
          'ETH' as Symbol,
          round(AMOUNT, 1) as AMOUNT,
          round(AMOUNT_USD, 1) as AMOUNT_USD,
          ETH_FROM_ADDRESS as address,
          'op_r3' as title,
          eth_TO_ADDRESS as address2,
          'https://optimistic.etherscan.io/tx/' || TX_HASH as TX_HASH
      FROM
          optimism.core.ez_eth_transfers
      WHERE
          eth_TO_ADDRESS in (
              ${__formatedAddressIds}
          )
          and ETH_TO_ADDRESS = ORIGIN_TO_ADDRESS
          and ORIGIN_FROM_ADDRESS not in (
              ${__formatedAddressIds}
          )
  ),
  op_s as (
      SELECT
          split(BLOCK_TIMESTAMP, '.') [0] as Time,
          SYMBOL as Symbol,
          round(AMOUNT, 1) as AMOUNT,
          round(AMOUNT_USD, 1) as AMOUNT_USD,
          origin_FROM_ADDRESS as address,
          'op_s1' as title,
          TO_ADDRESS as address2,
          'https://optimistic.etherscan.io/tx/' || TX_HASH as TX_HASH
      FROM
          optimism.core.ez_token_transfers
      WHERE
          origin_FROM_ADDRESS in (
              ${__formatedAddressIds}
          )
          and ORIGIN_FROM_ADDRESS = FROM_ADDRESS
          and ORIGIN_TO_ADDRESS = CONTRACT_ADDRESS
      union
      SELECT
          split(BLOCK_TIMESTAMP, '.') [0] as Time,
          'ETH' as Symbol,
          round(AMOUNT, 1) as AMOUNT,
          round(AMOUNT_USD, 1) as AMOUNT_USD,
          ETH_TO_ADDRESS as address,
          'op_s2' as title,
          ETH_FROM_ADDRESS as address2,
          'https://optimistic.etherscan.io/tx/' || TX_HASH as TX_HASH
      FROM
          optimism.core.ez_eth_transfers
      WHERE
          ETH_FROM_ADDRESS in (
              ${__formatedAddressIds}
          )
          and ETH_TO_ADDRESS = ORIGIN_TO_ADDRESS
          and ORIGIN_FUNCTION_SIGNATURE in ('0x')
  )
  select
      *
  from
      op_s
  where
      AMOUNT_USD > 0
      ${
        __isConnected
          ? `and address2 in (
      ${__formatedAddressIds}
    )
    and address in (
      ${__formatedAddressIds}
    )`
          : ""
      }
  union
  select
      *
  from
      op_r
  where
      AMOUNT_USD > 0
      ${
        __isConnected
          ? `and address2 in (
      ${__formatedAddressIds}
    )
    and address in (
      ${__formatedAddressIds}
    )`
          : ""
      }`;
  },
  polygon: (__formatedAddressIds, __isConnected) => {
    return `with polygon_r as (
      SELECT
          split(BLOCK_TIMESTAMP, '.') [0] as Time,
          SYMBOL as Symbol,
          round(AMOUNT, 1) as AMOUNT,
          round(AMOUNT_USD, 1) as AMOUNT_USD,
          FROM_ADDRESS as address,
          'polygon' as title,
          TO_ADDRESS as address2,
          'https://polygonscan.com/tx/' || TX_HASH as TX_HASH
      FROM
          polygon.core.ez_token_transfers
      WHERE
          TO_ADDRESS in (
              ${__formatedAddressIds}
          )
          and ORIGIN_FROM_ADDRESS not in (
              ${__formatedAddressIds}
          )
          and FROM_ADDRESS != ORIGIN_TO_ADDRESS
          and ORIGIN_TO_ADDRESS = CONTRACT_ADDRESS
      UNION
      SELECT
          split(BLOCK_TIMESTAMP, '.') [0] as Time,
          SYMBOL as Symbol,
          round(AMOUNT, 1) as AMOUNT,
          round(AMOUNT_USD, 1) as AMOUNT_USD,
          TO_ADDRESS as address,
          'polygon' as title,
          TO_ADDRESS as address2,
          'https://polygonscan.com/tx/' || TX_HASH as TX_HASH
      FROM
          polygon.core.ez_token_transfers
      WHERE
          to_address in (
              ${__formatedAddressIds}
          )
          and FROM_ADDRESS = ORIGIN_TO_ADDRESS
          and FROM_ADDRESS != ORIGIN_FROM_ADDRESS
          and ORIGIN_FROM_ADDRESS = '0xc2f41b3a1ff28fd2a6eee76ee12e51482fcfd11f'
      UNION
      SELECT
          split(BLOCK_TIMESTAMP, '.') [0] as Time,
          'Matic' as Symbol,
          round(AMOUNT, 1) as AMOUNT,
          round(AMOUNT_USD, 1) as AMOUNT_USD,
          MATIC_FROM_ADDRESS as address,
          'polygon' as title,
          MATIC_TO_ADDRESS as address2,
          'https://polygonscan.com/tx/' || TX_HASH as TX_HASH
      FROM
          polygon.core.ez_matic_transfers
      WHERE
          MATIC_TO_ADDRESS in (
              ${__formatedAddressIds}
          )
          and MATIC_TO_ADDRESS = ORIGIN_TO_ADDRESS
          and ORIGIN_FROM_ADDRESS not in (
              ${__formatedAddressIds}
          )
  ),
  polygon_s as (
      SELECT
          split(BLOCK_TIMESTAMP, '.') [0] as Time,
          SYMBOL as Symbol,
          round(AMOUNT, 1) as AMOUNT,
          round(AMOUNT_USD, 1) as AMOUNT_USD,
          origin_FROM_ADDRESS as address,
          'polygon' as title,
          TO_ADDRESS as address2,
          'https://polygonscan.com/tx/' || TX_HASH as TX_HASH
      FROM
          polygon.core.ez_token_transfers
      WHERE
          origin_FROM_ADDRESS in (
              ${__formatedAddressIds}
          )
          and ORIGIN_FROM_ADDRESS = FROM_ADDRESS
          and ORIGIN_TO_ADDRESS = CONTRACT_ADDRESS
      union
      SELECT
          split(BLOCK_TIMESTAMP, '.') [0] as Time,
          'Matic' as Symbol,
          round(AMOUNT, 1) as AMOUNT,
          round(AMOUNT_USD, 1) as AMOUNT_USD,
          origin_FROM_ADDRESS as address,
          'polygon' as title,
          MATIC_TO_ADDRESS as address2,
          'https://polygonscan.com/tx/' || TX_HASH as TX_HASH
      FROM
          polygon.core.ez_matic_transfers
      WHERE
          MATIC_FROM_ADDRESS in (
              ${__formatedAddressIds}
          )
          and MATIC_TO_ADDRESS = ORIGIN_TO_ADDRESS
          and ORIGIN_FUNCTION_SIGNATURE in ('0x')
  )
  select
      *
  from
      polygon_r
  where
      AMOUNT_USD > 0
      ${
        __isConnected
          ? `and address2 in (
      ${__formatedAddressIds}
    )
    and address in (
      ${__formatedAddressIds}
    )`
          : ""
      }
  union
  select
      *
  from
      polygon_s
  where
      AMOUNT_USD > 0
      ${
        __isConnected
          ? `and address2 in (
      ${__formatedAddressIds}
    )
    and address in (
      ${__formatedAddressIds}
    )`
          : ""
      }`;
  },
};
State.init({
  queryData: {
    address: [
      {
        id: 1,
        value: "",
        isValid: "new", //valid - notValid
      },
    ],
    chain: "arbitrum",
    isConnected: true,
  },
  ui: {
    isActiveSendQueryBtn: false,
  },
  diagram: {
    imageUrl: null,
    diagramError: null,
  },
  queryRunId: null,
  isLoading: false,
  isQueryRunning: false,
  data: null,
  error: null,
});
const getChart = ({ chart, width, height, format }) => {
  if (!chart) return;
  const body = {
    chart: chart,
    width: width || 700,
    height: height || 500,
    format: format || "base64",
    version: 3,
  };
  asyncFetch("https://quickchart.io/chart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((res) => {
    if (!res.ok || res.error) {
      State.update({
        diagram: {
          diagramError: "problem to load diagram image",
          imageUrl: null,
        },
      });
    }
    const data = res.body;
    const url = `data:image/png;base64,${data}`;
    State.update({ diagram: { imageUrl: url, diagram: null } });
  });
};

const chartOption = (queryResult) => {
  if (!queryResult.rows) return null;
  const data = queryResult?.rows.map((row) => {
    const addressLabel1 = `${row.address.slice(0, 6)}...${row.address.slice(
      -4
    )}`;
    const addressLabel2 = `${row.address2.slice(0, 6)}...${row.address2.slice(
      -4
    )}`;

    return { from: addressLabel1, to: addressLabel2, flow: row.amount_usd };
  });
  const chartConfig = {
    type: "sankey",
    data: {
      datasets: [
        {
          label: "tx diagram",
          data: data || [],
          colorFrom: "#8dd3c7",
          colorTo: "#bebada",
          colorMode: "gradient",
        },
      ],
    },
  };
  return chartConfig;
};
const createQuery = (queryData) => {
  if (!queryData?.address.length) return null;
  const formatedAddressIds = queryData.address
    .map(({ value }) => `lower('${value.toLowerCase()}')`)
    .join();
  const query = queries[queryData.chain]?.(
    formatedAddressIds,
    queryData.isConnected
  );
  return query || null;
};
const addressValidation = () => {
  return state.queryData.address.every(({ isValid }) => isValid === "valid");
};
const addNewAddress = () => {
  const newAddresses = [
    ...state.queryData.address,
    { id: Date.now(), value: "", isValid: "new" },
  ];
  State.update({
    queryData: { ...state.queryData, address: newAddresses },
    ui: { isActiveSendQueryBtn: false },
  });
};
const removeAddress = (addressId) => {
  if (state.queryData.address.length === 1) return;
  const newAddresses = state.queryData.address.filter(
    ({ id }) => id !== addressId
  );
  State.update({ queryData: { ...state.queryData, address: newAddresses } });
  if (addressValidation()) {
    State.update({ ui: { isActiveSendQueryBtn: true } });
  } else {
    State.update({ ui: { isActiveSendQueryBtn: false } });
  }
};
const handleBlur = ({ target }, inputId) => {
  const address = target.value.toLowerCase().trim();
  let isValidAddress = true;
  if (address.length !== 42) {
    isValidAddress = false;
    State.update({ error: "a valid address has 42 character" });
  }

  const newAddresses = state.queryData.address.map(({ id, value, isValid }) => {
    if (inputId === id) {
      return {
        id,
        value: address,
        isValid: isValidAddress ? "valid" : "notValid",
      };
    }
    return { id, value, isValid };
  });
  State.update({ queryData: { ...state.queryData, address: newAddresses } });
  if (addressValidation()) {
    State.update({ ui: { isActiveSendQueryBtn: true } });
  } else {
    State.update({ ui: { isActiveSendQueryBtn: false } });
  }
};
const handleChain = ({ target }) => {
  const chain = target.value;
  State.update({ queryData: { ...state.queryData, chain } });
};
const handleConnect = ({ target }) => {
  const isConnected = target.value === "connect" ? true : false;
  State.update({
    queryData: { ...state.queryData, isConnected },
  });
};

let timeOutId;
if (state.isQueryRunning) {
  console.log("ti1", Date.now() / 1000);
  const refetch = () => {
    console.log("ti2", Date.now() / 1000);

    queryStatus(state.queryRunId).then(({ error, isRunning }) => {
      if (error) {
        State.update({ isLoading: false });
        State.update({ isQueryRunning: false });
        State.update({ error });
      } else if (isRunning) {
        console.log("ti runing", Date.now() / 1000);

        timeOutId = setTimeout(refetch, 5000);
      } else {
        queryResult(state.queryRunId).then(({ data, error }) => {
          if (error) {
            State.update({ isLoading: false });
            State.update({ isQueryRunning: false });
            State.update({ error });
          } else {
            console.log("data", data);
            getChart({ chart: chartOption(data) });
            State.update({ isLoading: false });
            State.update({ isQueryRunning: false });
            State.update({ data });
          }
        });
      }
    });
  };
  timeOutId = setTimeout(refetch, 5000);
} else {
  clearTimeout(timeOutId);
}
if (state.error) {
  setTimeout(() => {
    State.update({ error: null });
  }, 2000);
}
const sendQuery = () => {
  if (!state.ui.isActiveSendQueryBtn) return;
  const query = createQuery(state.queryData);
  // console.log(query);
  // return;
  State.update({ isLoading: true });

  runQuery(query).then(({ queryRunId, error }) => {
    if (error) {
      State.update({ isLoading: false });
      State.update({ isQueryRunning: false });
      State.update({ error });
    } else {
      State.update({ queryRunId });
    }
  });
};

const runQuery = async (query) => {
  return queryFetch(query).then(({ queryRunId, error }) => {
    if (error) return { queryRunId, error };
    return queryStatus(queryRunId).then(({ error, isRunning, queryRunId }) => {
      if (error) return { queryRunId, error };
      if (isRunning) {
        State.update({ isQueryRunning: true });
        return { queryRunId, error };
      }
      return { queryRunId, error };
    });
  });
};

const queryFetch = async (query) => {
  const raw = JSON.stringify({
    jsonrpc: "2.0",
    method: "createQueryRun",
    params: [
      {
        resultTTLHours: 1,
        maxAgeMinutes: 0,
        sql: query,
        dataSource: "snowflake-default",
        dataProvider: "flipside",
      },
    ],
    id: 1,
  });

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    },
    body: raw,
  };
  const result = { error: null, queryRunId: null };
  return asyncFetch(
    "https://api-v2.flipsidecrypto.xyz/json-rpc",
    requestOptions
  ).then((res) => {
    if (!res.ok && res.error) {
      result.error = res.error;
      return result;
    } else if (!res.ok) {
      result.error =
        res.status === 401
          ? "Invalid API Key."
          : res.status === 404
          ? "query sent to wrong api address"
          : res.status;
      return result;
    }
    const data = res.body;
    if (data.error) {
      result.error = `${data.error.message} - (code${data.error.code})`;
      return result;
    } else {
      const queryRunId = data.result.queryRun.id;
      result.queryRunId = queryRunId;
      return result;
    }
  });
};

const queryStatus = async (queryRunId) => {
  console.log("qstat", Date.now() / 1000);

  const raw = JSON.stringify({
    jsonrpc: "2.0",
    method: "getQueryRun",
    params: [
      {
        queryRunId: queryRunId,
      },
    ],
    id: 1,
  });

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    },
    body: raw,
  };
  const result = { error: null, queryRunId, isRunning: false };

  return asyncFetch(
    "https://api-v2.flipsidecrypto.xyz/json-rpc",
    requestOptions
  ).then((res) => {
    if (!res.ok && res.error) {
      result.error = res.error;
      return result;
    } else if (!res.ok) {
      result.error =
        res.status === 401
          ? "Invalid API Key."
          : res.status === 404
          ? "query sent to wrong api address"
          : res.status;
      return result;
    }
    const data = res.body;
    if (data.error) {
      result.error = `${data.error.message} - (code${data.error.code})`;
      return result;
    } else {
      if (data.result.queryRun.state === "QUERY_STATE_FAILED") {
        result.isRunning = false;
        result.error = `Query run failed (code-${data.result.queryRun.errorData.code})`;
        return result;
      }
      if (data.result.queryRun.state !== "QUERY_STATE_SUCCESS") {
        result.isRunning = true;
        return result;
      }
      result.isRunning = false;
      return result;
    }
  });
};

const queryResult = async (queryRunId) => {
  console.log("qres", Date.now() / 1000);

  const raw = JSON.stringify({
    jsonrpc: "2.0",
    method: "getQueryRunResults",
    params: [
      {
        queryRunId: queryRunId,
        format: "json",
        page: {
          number: 1,
          size: 10000,
        },
        sortBy: [
          {
            column: "time",
            direction: "desc",
          },
          {
            column: "symbol",
            direction: "desc",
          },
        ],
      },
    ],
    id: 1,
  });

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    },
    body: raw,
  };

  const result = { error: null, data: null };

  return asyncFetch(
    "https://api-v2.flipsidecrypto.xyz/json-rpc",
    requestOptions
  ).then((res) => {
    if (!res.ok && res.error) {
      result.error = res.error;
      return result;
    } else if (!res.ok) {
      result.error =
        res.status === 401
          ? "Invalid API Key."
          : res.status === 404
          ? "query sent to wrong api address"
          : res.status;
      return result;
    }
    const data = res.body;
    if (data.error) {
      result.error = `${data.error.message} - (code${data.error.code})`;
      return result;
    } else {
      result.data = data.result;
      return result;
    }
  });
};

return (
  <div className="container-xxl text-bg-light">
    {state.error && (
      <div class="alert alert-danger text-center" role="alert">
        {state.error}
      </div>
    )}
    <div>{header}</div>
    <div className="-form row justify-content-center gap-4 mx-auto py-5 border-bottom border-2">
      <div className="-address row justify-content-start g-2">
        {state.queryData.address.map(({ id, value, isValid }, i, array) => {
          const lastAddress = array.length === 1;
          const itemNumber = i + 1;
          return (
            <div key={id} className="col-lg-6">
              <div className="input-group">
                <label
                  htmlFor={"address" + itemNumber}
                  id={"addon" + itemNumber}
                  className="mb-0 form-label input-group-text"
                >
                  Address {itemNumber}
                </label>

                <input
                  placeholder="Account ID"
                  type="text"
                  defaultValue={value}
                  className={`form-control ${
                    isValid === "new"
                      ? ""
                      : isValid === "valid"
                      ? "border border-success"
                      : "border border-danger"
                  }`}
                  id={"address" + itemNumber}
                  aria-describedby={"addon" + itemNumber}
                  onBlur={(e) => handleBlur(e, id)}
                />

                {lastAddress || (
                  <button
                    className="btn btn-danger small"
                    aria-label="Close"
                    type="button"
                    onClick={() => removeAddress(id)}
                  >
                    remove
                  </button>
                )}
              </div>
            </div>
          );
        })}
        <div className="col-lg-6">
          <button
            onClick={addNewAddress}
            type="button"
            className="btn btn-outline-secondary"
          >
            Add New Address
          </button>
        </div>
      </div>
      <div className="-chain_connect row g-2">
        <div className="col-lg-6">
          <div className="input-group">
            <label className="input-group-text" htmlFor="chain">
              Chain
            </label>
            <select onChange={handleChain} className="form-select" id="chain">
              <option value="arbitrum">Arbitrum</option>
              <option value="avalanch">Avalanch</option>
              <option value="bsc">Bsc</option>
              <option value="ethereum">Ethereum</option>
              <option value="optimism">Optimism</option>
              <option value="polygon">Polygon</option>
            </select>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="input-group">
            <label className="input-group-text" htmlFor="connect">
              connect
            </label>
            <select
              onChange={handleConnect}
              className="form-select"
              id="connect"
            >
              <option value="connect">connect</option>
              <option value="total">total</option>
            </select>
          </div>
        </div>
      </div>
      <div className="-search row justify-content-center align-items-center col-lg-4">
        <button
          disabled={!state.ui.isActiveSendQueryBtn || state.isLoading}
          onClick={sendQuery}
          type="button"
          className="btn btn-primary btn-lg col-auto"
        >
          {state.isQueryRunning
            ? "query is running..."
            : state.isLoading
            ? "sending query..."
            : "Search Query"}
        </button>
      </div>
    </div>
    <div className="-table py-5 border-bottom border-2">
      <div className="table-responsive text-nowrap">
        {state.data.rows ? (
          <table className="table table-hover  table-bordered table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th className="col-2" scope="col">
                  Time
                </th>
                <th className="col-1" scope="col">
                  Symbol
                </th>
                <th className="col-1" scope="col">
                  Amount
                </th>
                <th className="col-1" scope="col">
                  Amount USD
                </th>
                <th className="col-3" scope="col">
                  Sender
                </th>
                <th className="col-3" scope="col">
                  Receiver
                </th>
                <th className="col-1" scope="col">
                  TX Hash
                </th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {state.data.rows ? (
                state.data.rows.map((dataRow, i) => {
                  const {
                    time,
                    symbol,
                    amount,
                    amount_usd,
                    address,
                    address2,
                    tx_hash,
                  } = dataRow;

                  return (
                    <tr key={tx_hash}>
                      <th scope="row">{i + 1}</th>
                      <td>
                        {new Date(time).toLocaleString("en-US", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </td>
                      <td>{symbol}</td>
                      <td>{amount}</td>
                      <td>{amount_usd}</td>
                      <td>{address}</td>
                      <td>{address2}</td>
                      <td>
                        <a
                          target="_blank"
                          href={tx_hash}
                          className="link-primary"
                        >
                          tx Link
                        </a>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td className="text-center" colspan="8">
                    query has no result
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        ) : (
          <div className="alert alert-secondary text-center" role="alert">
            no data to show table
          </div>
        )}
      </div>
    </div>
    <div className="-chart py-5 border-bottom border-2 text-center">
      {state.data?.rows ? (
        state.diagram.diagramError ? (
          <div className="alert text-center alert-secondary" role="alert">
            problem to show diagram
          </div>
        ) : state.diagram.imageUrl ? (
          <img
            src={state.diagram.imageUrl}
            className="img-fluid"
            alt="snaky diagram"
          />
        ) : (
          <div className="alert text-center alert-secondary" role="alert">
            loading diagram ...
          </div>
        )
      ) : (
        <div className="alert text-center alert-secondary" role="alert">
          no data to show charts
        </div>
      )}
    </div>
    <div style={{ "margin-top": "50px", "border-raduis-top": "15px" }}>
      <Widget src="lord1.near/widget/footer" props={{}} />
    </div>
  </div>
);
