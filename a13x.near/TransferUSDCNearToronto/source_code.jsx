return (
  <button
    onClick={() => {
      Near.call([
        {
          contractName: "near-toronto.sputnik-dao.near",
          methodName: "add_proposal",
          args: {
            proposal: {
              description: "Convert to NEAR$$$$",
              kind: {
                Transfer: {
                  token_id:
                    "17208628f84f5d6ad33f0da3bbbeb27ffcb398eac501a31bd6ad2011e36133a1",
                  receiver_id: "near-toronto.near",
                  amount: "500000000",
                },
              },
            },
          },
          // deposit: 1, yocto N = 0.000000000000000000000001 N
          deposit: Big(10).pow(24).mul(0.1), // 0.1 NEAR
          gas: Big(10).pow(12).mul(150),
        },
      ]);
    }}
  >
    Add proposal {Big(10).pow(24).mul(0.1)}
  </button>
);
