const { account, chainId, onLoad } = props;

useEffect(() => {
  let tokens = {};
  let config = {};

  const initData = {
    pools: [],
  };
  const getConfig = () => {
    asyncFetch("/config/hyperlock.json")
      .then((res) => {
        config = res.body;
        getTokens();
      })
      .catch((err) => {
        getTokens();
      });
  };
  const getTokens = () => {
    asyncFetch(
      "https://raw.githubusercontent.com/hyperlockfi/tokenlists/main/generated/hyperlock.tokenlist.json"
    )
      .then((res) => {
        const data = JSON.parse(res.body);
        tokens = data.tokens.reduce(
          (acc, cur) => ({ ...acc, [cur.address.toLowerCase()]: cur }),
          {}
        );

        getPoints();
      })
      .catch((err) => {
        getPoints();
      });
  };
  const getPoints = () => {
    asyncFetch(
      "https://graph.hyperlock.finance/subgraphs/name/hyperlock/points-blast-mainnet-B",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          operationName: "Pools",
          query:
            'query Pools($where: Pool_filter, $orderBy: Pool_orderBy, $orderDirection: OrderDirection, $account: String! = "") {\n  pools(where: $where, orderBy: $orderBy, orderDirection: $orderDirection) {\n    ...Pool__fields\n  }\n}\n\nfragment Pool__fields on Pool {\n  id\n  type\n  addedAt\n  lpToken {\n    ...Token__fields\n  }\n  totalAllocation\n  epochs {\n    id\n    epoch\n    allocation\n  }\n  token0 {\n    ...Token__fields\n  }\n  token1 {\n    ...Token__fields\n  }\n  poolAccounts(where: {account: $account}) {\n    id\n    account {\n      totalBalance\n      epochs {\n        id\n        epoch\n        balance\n      }\n    }\n    staked\n  }\n  v2PoolData {\n    totalStaked\n  }\n  v3PoolData {\n    fee\n    nfts: tokens(where: {account_ends_with: $account}) {\n      id\n      tokenId\n      isStaked\n    }\n  }\n}\n\nfragment Token__fields on Token {\n  id\n  name\n  symbol\n  decimals\n}',
          variables: {
            account,
            chainId,
            poolsVariables: {},
            staleTime: 162000,
          },
        }),
      }
    )
      .then((res) => {
        const pools = res.body?.data?.pools;

        if (!pools.length) {
          onLoad({ loading: false, ...initData });
          return;
        }
        const _pools = {};
        pools
          .filter((pool) => pool.type === "V3")
          .forEach((pool) => {
            const token0 = {
              ...pool.token0,
              icon: tokens[pool.token0.id.toLowerCase()]?.logoURI,
            };
            const token1 = {
              ...pool.token1,
              icon: tokens[pool.token1.id.toLowerCase()]?.logoURI,
            };
            _pools[pool.id] = {
              id: pool.id,
              name: pool.lpToken.symbol,
              token0,
              token1,
              fee: pool.v3PoolData?.fee,
              type: pool.type,
            };
          });
        getTvl(_pools);
        initData.pools = _pools;
      })
      .catch((err) => {
        onLoad({ loading: false, ...initData });
      });
  };
  const getTvl = (pools) => {
    const addresses = Object.keys(pools);
    asyncFetch("https://api.hyperlock.finance/v1/blast-mainnet/points/tvl", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ addresses }),
    })
      .then((res) => {
        const data = res.body;
        let prices = {};
        const _pools = Object.values(pools)
          .filter((pool) => data[pool.id])
          .map((pool) => {
            const { token0Amount, token1Amount, token0Price, token1Price } =
              data[pool.id];

            const _token0 = Big(token0Amount)
              .mul(token0Price)
              .div(Big(10).pow(pool.token0.decimals));
            const _token1 = Big(token1Amount)
              .mul(token1Price)
              .div(Big(10).pow(pool.token1.decimals));

            prices[pool.token0.id] = token0Price;
            prices[pool.token1.id] = token1Price;

            const defaultStackIcons = config.stack?.["default"] || [];
            const stackIcons = config.stack?.[pool.id] || [];

            return {
              ...pool,
              token0: { ...pool.token0, price: token0Price },
              token1: { ...pool.token1, price: token1Price },
              tvl: _token0.add(_token1).toString(),
              stackIcons: [...defaultStackIcons, ...stackIcons].map((address) =>
                address ? tokens[address.toLowerCase()].logoURI : ""
              ),
              points: config.points?.[pool.id],
            };
          })
          .filter((pool) => Big(pool.tvl).gt(0));

        onLoad({
          loading: false,
          ...initData,
          pools: _pools.reduce(
            (acc, pool) => ({ ...acc, [pool.id]: pool }),
            {}
          ),
        });
      })
      .catch((err) => {
        onLoad({ loading: false, ...initData });
      });
  };
  getConfig();
}, []);
