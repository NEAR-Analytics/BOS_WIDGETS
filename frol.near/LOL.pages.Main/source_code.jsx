// CSS Styled Components
// =====================

const Wrapper = styled.div`
  --section-gap: 42px;
  padding-top: 0px;

  @media (max-width: 1160px) {
    .line-rounded-corners {
      display: none !important;
    }
  }

  @media (max-width: 900px) {
    padding-top: 0;
  }
`;

const H1 = styled.h1`
  font-family: "FK Grotesk", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 90px;
  line-height: 1;
  text-align: center;
  letter-spacing: -0.03em;
  color: #000;
  margin: 0;
  max-width: 700px;

  span {
    display: inline-block;
    background: #00ec97;
    border-radius: 20px;
    position: relative;
    padding: 0.1em 0.2em 0;

    svg {
      position: absolute;
      bottom: -8px;
      right: -10px;
      width: 24px;
    }
  }

  @media (max-width: 900px) {
    font-size: 50px;

    span {
      border-radius: 12px;
      svg {
        position: absolute;
        bottom: -6px;
        right: -7px;
        width: 16px;
      }
    }
  }
`;

const Text = styled.p`
  font-family: "FK Grotesk", sans-serif;
  font-size: ${(p) => p.size ?? "18px"};
  line-height: ${(p) => p.lineHeight ?? "1.5"};
  font-weight: ${(p) => p.weight ?? "400"};
  color: ${(p) => p.color ?? "#000"};
  margin: 0;
`;

const Flex = styled.div`
  display: flex;
  gap: ${(p) => p.gap};
  align-items: ${(p) => p.alignItems};
  justify-content: ${(p) => p.justifyContent};
  flex-direction: ${(p) => p.direction ?? "row"};
  flex-wrap: ${(p) => p.wrap ?? "nowrap"};

  ${(p) =>
    p.mobileStack &&
    `
    @media (max-width: 900px) {
      flex-direction: column;
      gap: var(--section-gap);
    }
  `}
`;

const Grid = styled.div`
  display: grid;
  gap: ${(p) => p.gap};
  grid-template-columns: ${(p) => p.columns};
  align-items: ${(p) => p.alignItems};

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Section = styled.div`
  position: relative;
  background-color: ${(p) => p.backgroundColor};
  padding: 208px 24px ${(p) => p.paddingBottom ?? "var(--section-gap)"};
  overflow: hidden;

  @media (max-width: 900px) {
    padding-top: var(--section-gap);
    padding-bottom: ${(p) => p.paddingBottomMobile ?? "var(--section-gap)"};
  }
`;

const Container = styled.div`
  display: flex;
  max-width: 1060px;
  margin: 0 auto;
  gap: ${(p) => p.gap ?? "var(--section-gap)"};
  flex-direction: column;
  align-items: ${(p) => (p.center ? "center" : undefined)};
  justify-content: ${(p) => (p.center ? "center" : undefined)};
  text-align: ${(p) => (p.center ? "center" : undefined)};
  padding: var(--section-gap) 24px;
`;

// Data loading
// ============

State.init({ lolNames: null });

const tokensOnSale = Near.view("lolmarket.qbit.near", "nft_tokens_on_sale", {});

const myBalance = context.accountId
  ? Near.view("lolcoin.qbit.near", "ft_balance_of", {
      account_id: context.accountId,
    })
  : null;

const myTokens = context.accountId
  ? Near.view("lolmarket.qbit.near", "nft_tokens_for_owner", {
      account_id: context.accountId,
    }).filter(({ token_id }) => !(token_id in tokensOnSale))
  : null;

// TODO: add pagination
const allBalances = Near.view("lolcoin.qbit.near", "ft_balances", {});

// TODO: add pagination
const allTokens = Near.view("lolmarket.qbit.near", "nft_tokens", {});

if (state.lolNames === null) {
  State.update({ lolNames: new Map() });
  asyncFetch("https://coins.summerschool.lol/users.json").then((data) => {
    const lolUsers = data.body;
    console.log(lolUsers);
    const lolNames = new Map();
    for (const user of lolUsers) {
      lolNames.set(user.account_id, user.full_name);
    }
    console.log(lolNames);
    State.update({ lolNames });
  });
}

const isLoading =
  (context.accountId && (myBalance === null || myTokens === null)) ||
  allBalances === null ||
  allTokens === null;

// Event handlers
// ==============

const buy = (tokenId, price) => {
  Near.call(
    "lolcoin.qbit.near",
    "ft_transfer_call",
    {
      receiver_id: "lolmarket.qbit.near",
      amount: price,
      msg: JSON.stringify({ Buy: tokenId }),
    },
    150000000000000,
    1000000000000000000000
  );
};

const sellForOne = (tokenId) => {
  Near.call(
    "lolmarket.qbit.near",
    "nft_put_on_sale",
    {
      token_id: tokenId,
      price: "100",
    },
    75000000000000,
    1
  );
};

const transferOneLol = (accountId) => {
  Near.call(
    "lolcoin.qbit.near",
    "ft_transfer",
    {
      receiver_id: accountId,
      amount: "100",
    },
    150000000000000,
    1
  );
};

const displayName = (accountId) => {
  if (props.useNearNames || !state.lolNames) {
    return (
      <Widget
        src="calebjacob.near/widget/AccountProfileInline"
        props={{
          accountId,
        }}
      />
    );
  }
  const lolName = state.lolNames.get(accountId);
  if (!lolName) {
    return (
      <Widget
        src="calebjacob.near/widget/AccountProfileInline"
        props={{
          accountId,
        }}
      />
    );
  }
  return (
    <>
      <Widget
        src="calebjacob.near/widget/AccountProfileInline"
        props={{
          accountId,
        }}
      />{" "}
      {lolName}
    </>
  );
};

// Custom reusable components
// ==========================

const Tokens = ({ tokens }) => (
  <Grid gap="32px" columns="1fr 1fr" alignItems="end" style={{ width: "100%" }}>
    {tokens.map((token) => {
      let actionButton;
      if (!context.accountId) {
        if (token.token_id in tokensOnSale) {
          actionButton = (
            <button disabled>
              Вже виставлено на продаж за{" "}
              {parseFloat(tokensOnSale[token.token_id]) / 100} ЛОЛ
            </button>
          );
        } else {
          actionButton = <button disabled>Не продається</button>;
        }
      } else if (token.owner_id === context.accountId) {
        if (token.token_id in tokensOnSale) {
          actionButton = (
            <button disabled>
              Вже виставлено на продаж за{" "}
              {parseFloat(tokensOnSale[token.token_id]) / 100} ЛОЛ
            </button>
          );
        } else {
          actionButton = (
            <button onClick={() => sellForOne(token.token_id)}>
              Виставити на продаж за ціною 1 ЛОЛ
            </button>
          );
        }
      } else if (token.token_id in tokensOnSale) {
        actionButton = (
          <button
            disabled={!context.accountId}
            onClick={() => buy(token.token_id, tokensOnSale[token.token_id])}
          >
            Придбати за {parseFloat(tokensOnSale[token.token_id]) / 100} ЛОЛ
          </button>
        );
      } else {
        actionButton = <button disabled>Не продається</button>;
      }

      return (
        <Flex direction="column" alignItems="end">
          <Widget
            src="mob.near/widget/NftImage"
            props={{
              nft: {
                contractId: "lolmarket.qbit.near",
                tokenMetadata: { media: token.metadata.media },
              },
            }}
          />

          <div>
            Створив:
            {displayName(token.metadata.extra)}
          </div>
          <div>
            Поточний власник:
            {displayName(token.owner_id)}
          </div>
          <b>{token.metadata.title}</b>
          <div style={{ textAlign: "right" }}>
            Опис: {token.metadata.description}
          </div>
          {actionButton}
        </Flex>
      );
    })}
  </Grid>
);

// Component renderer
// ==================

return (
  <Wrapper>
    <Container center>
      <Flex gap="32px" direction="column" alignItems="center">
        <H1>
          The{" "}
          <span>
            ЛОЛ{" "}
            <svg viewBox="0 0 26 24" fill="none" aria-hidden="true">
              <path
                d="M24.3767 8.06326L1.51965 0.0649912C1.10402 -0.0830767 0.639031 0.026026 0.327308 0.340346C0.0181841 0.657263 -0.0831256 1.12225 0.0701378 1.53788L8.071 23.2519C8.23726 23.7013 8.66587 24 9.14385 24H9.14644C9.62702 24 10.0556 23.6961 10.2167 23.2441L13.734 13.495L24.3325 10.2349C24.8053 10.0895 25.13 9.65824 25.1378 9.16468C25.1482 8.67112 24.8391 8.22691 24.3715 8.06326H24.3767Z"
                fill="#7269E1"
              />
            </svg>
          </span>{" "}
        </H1>

        <Text style={{ maxWidth: "670px" }}>
          А все почалось з табору, де навіть не було доступу у глобальну мережу
          Інтернет...
        </Text>

        {isLoading ? null : myBalance === "0" ? (
          <Widget src="frol.near/widget/LOL.components.Auth" />
        ) : (
          <>
            <h2>Мій ЛОЛ</h2>
            Баланс: {parseFloat(myBalance) / 100} ЛОЛ
            {myTokens !== null ? <Tokens tokens={myTokens} /> : null}
          </>
        )}

        {allTokens !== null && tokensOnSale !== null ? (
          <>
            <h2>ЛОЛ-NFT Базар</h2>
            <Tokens
              tokens={allTokens.filter(
                ({ token_id }) => token_id in tokensOnSale
              )}
            />
          </>
        ) : null}

        {allTokens !== null ? (
          <>
            <h2>Всі ЛОЛ-NFT</h2>
            <Tokens tokens={allTokens} />
          </>
        ) : null}

        {allBalances !== null ? (
          <>
            <h2>ЛОЛкоїни</h2>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Акаунт</th>
                  <th scope="col">Баланс</th>
                  <th scope="col">Дія</th>
                </tr>
              </thead>
              <tbody>
                {allBalances.map(([accountId, balance]) => (
                  <tr>
                    <td scope="row">{displayName(accountId)}</td>
                    <td>{parseFloat(balance) / 100} ЛОЛ</td>
                    <td>
                      <button onClick={() => transferOneLol(accountId)}>
                        Перевести 1 ЛОЛ
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : null}
      </Flex>
    </Container>
  </Wrapper>
);
