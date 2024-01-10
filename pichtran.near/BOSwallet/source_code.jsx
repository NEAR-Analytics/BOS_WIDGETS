const contract = "transfer-near.near";
const method = "transfer_near";
const oneTeraGas = 1000000000000;
const oneNEARInYoctoNEAR = 1000000000000000000000000;
State.init({ accountId: "pichtran.near", amount: 0.5 });
const AccountId_profile = props.accountId ?? context.accountId;
const onClick = () => {
  Near.call(
    contract,
    method,
    state.accountId,
    oneTeraGas,
    state.amount * oneNEARInYoctoNEAR
  );
};

State.init({
  selectedTab: props.tab || "home",
});

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 15px 30px;
  border: 0;
  position: relative;
  overflow: hidden;
  border-radius: 10rem;
  transition: all 0.02s;
  font-weight: bold;
  color: rgb(37, 37, 37);
  z-index: 0;
  box-shadow: 0 0px 7px -5px rgba(0, 0, 0, 0.5);
  cursor: pointer;

  &:hover {
    background: rgb(193, 228, 248);
    color: rgb(33, 0, 85);
  }

  &:active {
    transform: scale(0.97);
  }

  .hoverEffect {
    position: absolute;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;

    div {
      background: linear-gradient(90deg, rgba(222,0,75,1) 0%, rgba(191,70,255,1) 49%, rgba(0,212,255,1) 100%);
      border-radius: 40rem;
      width: 10rem;
      height: 10rem;
      transition: 0.4s;
      filter: blur(20px);
      opacity: 0.5;
      animation: effect 3s linear infinite;
      @keyframes effect {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    }
  }

  &:hover .hoverEffect div {
    width: 8rem;
    height: 8rem;
  }
`;

const Wrapper = styled.div`
  padding-bottom: 48px;
`;

const Title = styled.p`
  font-weight: 300;
  font-size: ${(p) => p.size || "17px"};
  line-height: 1em;
  color: #11181c;
  margin: ${(p) => (p.margin ? "0 0 24px" : "0")};
  overflow-wrap: anywhere;
  &:hover{
      color:purple;
  }
`;

const Tabs = styled.div`
  display: flex;
  flex-direction: row; // Changed from column to row
  width: auto; // Adjusted from height to width
  border-bottom: 1px solid #eceef0; // Changed from border-right to border-bottom
  padding-bottom: 24px; // Changed from padding-right to padding-bottom
  overflow-x: auto; // Changed from overflow-y to overflow-x
  max-width: 700px; // Adjusted from max-height to max-width
  position: sticky;
  top: 0;
  @media (max-width: 1200px) {
    background: #000;
    border: none;
    margin: 0;
    padding: 0;

    > * {
      flex: none;
      margin-right: 12px; // Changed from margin-bottom to margin-right
    }
  }
`;

const TabsButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  font-weight: 600;
  font-size: 23px;
  padding: 12px 0;
  position: relative;
  color: #9753c6;
  background: none;
  border: none !important;
  outline: none;
  text-align: center;
  text-decoration: none !important;
  &:hover {
    color:#e09dff;
    background: #e3e3e3;
    cursor: pointer;
    border-radius: 14px;
  }

  background: ${(props) => (props.isActive ? "#e09dff" : "none")};
  color: ${(props) => (props.isActive ? "#ffffff" : "#ffffff")};
  border-radius: ${(props) => (props.isActive ? "14px" : "14px")};

`;
//Card
const FormContainer = styled.div`
  width: 100%;
  background: linear-gradient(#212121, #212121) padding-box,
              linear-gradient(145deg, transparent 35%, #e81cff, #40c9ff) border-box;
  border: 2px solid transparent;
  padding: 32px 24px;
  font-size: 14px;
  font-family: inherit;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-sizing: border-box;
  border-radius: 16px;
  background-size: 200% 100%;
  animation: gradient 5s ease infinite;

  button:active {
    transform: scale(0.95);
  }
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;

  label {
    display: block;
    margin-bottom: 5px;
    color: #717171;
    font-weight: 600;
    font-size: 12px;
  }

  input, textarea {
    width: 100%;
    padding: 12px 16px;
    border-radius: 8px;
    color: white;
    background-color: transparent;
    border: 1px solid #414141;
    font-family: inherit;

    &:focus {
      outline: none;
      border-color: #e81cff;
    }

    &::placeholder {
      opacity: 0.5;
    }
  }

  textarea {
    resize: none;
    height: 96px;
  }
`;

const SubmitButton = styled.button`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  align-self: flex-start;
  font-family: inherit;
  color: #717171;
  font-weight: 600;
  width: 25%;
  background: #313131;
  border: 1px solid #414141;
  padding: 12px 16px;
  font-size: inherit;
  gap: 8px;
  margin-top: 8px;
  cursor: pointer;
  border-radius: 6px;

  &:hover {
    background-color: #fff;
    border-color: #fff;
  }
`;
const handleTabClick = (tab) => {
  State.update({
    selectedTab: tab,
  });
};

//Croller

const ScrollableContainer = styled.div`
  height: 500px; 
  overflow-y: auto;
  padding: 1rem;
`;

const BoxInput = styled.div`
  position: relative;

  &::after,
  &::before {
    content: "";
    width: 130px;
    height: 30px;
    position: absolute;
    z-index: -1;
  }

  &::after {
    bottom: 0;
    right: 0;
  }

  &::before {
    top: 0;
    left: 0;
  }
`;

const Border = styled.div`
  background-image: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);
  box-shadow: -25px -10px 30px -5px rgba(225, 0, 255, 0.5),
              25px -10px 30px -5px rgba(255, 0, 212, 0.5),
              25px 10px 30px -5px rgba(255, 174, 0, 0.5),
              -25px 10px 30px -5px rgba(255, 230, 0, 0.5);
  padding: 4px;
`;

const Input = styled.input`
  background-color: #212121;
  max-width: 250px;
  height: 40px;
  padding: 0 19px 0 10px;
  font-size: 1.1em;
  position: relative;
  border: none;
  color: white;
  outline: 0;
  overflow: hidden;

  &::placeholder {
    transition: all 0.5s ease-in, transform 0.2s ease-in 0.6s;
  }

  &:focus::placeholder {
    padding-left: 165px;
    transform: translateY(-50px);
  }`;

const card = (
  <>
    <FormContainer>
      <Form>
        <FormGroup>
          <label>AccountID:</label>
          <input
            type="text"
            placeholder={state.accountId}
            onChange={(e) => State.update({ accountId: e.target.value })}
          />
        </FormGroup>
        <FormGroup>
          <label>Amount:</label>
          <input
            type="number"
            placeholder={state.amount}
            min="0.1"
            step="0.5"
            max="18446744073709551615"
            placeholder={state.amount}
            onChange={(e) => State.update({ amount: e.target.value })}
          />
        </FormGroup>
        <SubmitButton onClick={onClick}>Send</SubmitButton>
      </Form>
    </FormContainer>

    <br />
  </>
);

const operationsDoc = `
  query MyQuery {
    mb_views_nft_tokens(
      order_by: {last_transfer_timestamp: desc}
      where: {owner: {_eq: "${
        props.wallet_id || context.accountId
      }"}, _and: {burned_timestamp: {_is_null: true}, last_transfer_timestamp: {}}}
    ) {
      nft_contract_id
      title
      description
      media
      last_transfer_receipt_id
      metadata_id
      token_id
      nft_contract_name
      nft_contract_icon
    }
  }
`;

function fetchGraphQL() {
  const result = fetch("https://graph.mintbase.xyz/mainnet", {
    method: "POST",
    headers: {
      "mb-api-key": "anon",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      query: operationsDoc,
      variables: {},
      operationName: "MyQuery",
    }),
  });
  return result;
}

const res = fetchGraphQL();

if (!(res && res.body)) return "...";

const nfts = res.body.data.mb_views_nft_tokens;

const notLoggedInWarning = <p class="text-center py-2"> Login to send NEAR</p>;
const StyledH6 = styled.h6`
  text-align: right;
  top: 0;
  right:0;
`;

const StyledContainer = styled.div`
  border: 2px solid black; 
  padding: 3px; 
  border-radius:10px;
`;

//Restyle
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  padding: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
`;

const NftImage = styled.img`
  margin-bottom: 1rem;
  height: 180px;
  width: 180px;
`;

const NftTitle = styled.div`
  font-weight: 500;
  font-size: 1.125rem;
  text-align: center;
`;

const NftTokenId = styled.div`
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
`;
//Searching
const [searchTerm, setSearchTerm] = useState("");

const handleSearchChange = (event) => {
  setSearchTerm(event.target.value);
};

//Middle
const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

// Render

return (
  <>
    <StyledContainer>
      <h5 class="text-center">
        👋 Hello {AccountId_profile}! 🌟 It's a pleasure to welcome you to BOS
        Wallet!
      </h5>
    </StyledContainer>

    <div class="container">
      <></>
      <div class="row">
        <div class="col-md-12">
          <Wrapper>
            <Tabs>
              <TabsButton
                onClick={() => handleTabClick("home")}
                isActive={state.selectedTab === "home"}
              >
                <Title>Balance💰</Title>
              </TabsButton>
              <TabsButton
                onClick={() => handleTabClick("sends")}
                isActive={state.selectedTab === "sends"}
              >
                <Title>Send💸</Title>
              </TabsButton>
              <TabsButton
                onClick={() => handleTabClick("nfts")}
                isActive={state.selectedTab === "nfts"}
              >
                <Title>NFTs🧩</Title>
              </TabsButton>
              <TabsButton
                onClick={() => handleTabClick("coin")}
                isActive={state.selectedTab === "coin"}
              >
                <Title>Price📈</Title>
              </TabsButton>
              <TabsButton
                onClick={() => handleTabClick("swap")}
                isActive={state.selectedTab === "swap"}
              >
                <Title>Swap💱</Title>
              </TabsButton>
            </Tabs>
          </Wrapper>
        </div>
        <CenteredContainer class="col-md-9">
          {state.selectedTab === "home" && (
            <>
              <Widget src="marketplacebos.near/widget/ChartBalance" />
              <br />
              <br />
            </>
          )}
          {state.selectedTab === "sends" && (
            <>
              <p class="text-center py-2">
                Enter AccountID and amount of NEAR to send
              </p>
              {context.accountId ? card : notLoggedInWarning}
              <br />
              <br />
            </>
          )}
          {state.selectedTab === "nfts" && (
            <>
              <input
                type="text"
                placeholder="Search NFTs 🔍"
                value={searchTerm}
                onChange={handleSearchChange}
                style={{
                  padding: "10px",
                  margin: "20px 0",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
              {nfts
                .filter((nft) =>
                  nft.title.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((nft) => (
                  <Container
                    key={nft.contract_id + nft.token_id}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      backgroundColor: "#fffff",
                      padding: "1rem",
                      marginBottom: "1rem",
                      cursor: "pointer",
                    }}
                  >
                    <NftImage
                      style={{ marginBottom: "1rem" }}
                      height={180}
                      width={180}
                      layout="intrinsic"
                      src={
                        nft.media ??
                        "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                      }
                    />
                    <div
                      style={{
                        fontWeight: 500,
                        fontSize: "1.125rem",
                        textAlign: "center",
                      }}
                    >
                      <NftTitle>{nft.title}</NftTitle>
                      <NftTokenId
                        style={{
                          overflowWrap: "break-word",
                          wordWrap: "break-word",
                          wordBreak: "break-word",
                        }}
                      >
                        [{nft.token_id}]
                      </NftTokenId>
                    </div>
                  </Container>
                ))}
            </>
          )}
          {state.selectedTab === "coin" && (
            <>
              <Widget src="pichtran.near/widget/CoinPrice" />
              <br />
              <br />
            </>
          )}
          {state.selectedTab === "swap" && (
            <>
              <h1>Updating accountabstration swap</h1>
              <br />
              <br />
            </>
          )}
        </CenteredContainer>
      </div>
    </div>
  </>
);
