const WalleyNavbar = styled.div`
      padding: 15px;
      display: flex;
      flex-direction: column;
      position: relative;
      left: 0px;
      height: 100%;
      text-align: left;
      &>svg {
        text-align: left; 
        padding: 0;
        width: 24px;
        display: none;
      }
      @media screen and (max-width: 600px) {
          flex-direction: row;
          justify-content: space-evenly;
          align-items: center;
          text-align: center;
          font-size: 12px;
      }
  `;

const WalleyNavbarButton = styled.button`
      border: none;
      text-align: left;
      background: none;
      color: #fff;
      padding:0px;
      font-weight: 500;
  `;

const NavLine = styled.span`
    width: 1px;
    height: 70px;
    background: white;
    margin: 4px 0 4px 0;
    @media screen and (max-width: 600px) {
      display: none;
    }
  `;
const NavLineLast = styled.span`
    width: 1px;
    height: 100%;
    background: white;
    margin: 4px 0 4px 0;
    @media screen and (max-width: 600px) {
      display: none;
    }
  `;
const WalleyButton = styled.button`
    background-color: ${(props) => props.bg};
    color: ${(props) => props.color};
    display: block;
    width: 100%;
    border-radius: 20px;
    padding: 7px;
    border: 0px;
    font-weight: 500;
    box-shadow: rgb(0, 0, 0, 0.19) 0px 10px 20px, rgb(0, 0, 0, 0.23) 0px 6px 6px;
  
  `;

const WalleyStoreImage = styled.img`
    maring: 0 auto;
    width: 200px;
    text-align: center;
  `;

const WalleyInput = styled.input`
    display: block;
    width: 100%;
    padding: 6px;
    border-radius: 20px;
    background: none;
    border: 2px solid rgb(66, 66, 66);
    color: white;
  `;

const WalleyLabel = styled.p`
    width: 100%;
  `;
const WalleyTransactions = styled.div`
    height: auto;
    margin-bottom: 20px;
    overflow-y: scroll;
    padding: 0px 15px 15px 15px;
    display: grid;
    grid-gap: 20px;
    grid-template-columns: repeat(2, 1fr);
    justiy-content: space-evenly;
    @media screen and (max-width: 750px) {
      grid-template-columns: repeat(1, 1fr);
    }
    &::-webkit-scrollbar {
      width: 7px;
    }
  
    &::-webkit-scrollbar-track {
      background: rgb(66,66,66,0.6); 
    }
    
    &::-webkit-scrollbar-thumb {
      background: #424242; 
    }
  `;

const WalleySearch = styled.div`
    display: flex;
    padding: 0px 10px;
    flex-direction: row;
    @media screen and (max-width: 600px) {
      flex-direction: column-reverse;
    }
    &>button {
      width: 150px;
      margin-right: 20px;
      font-size: 16px;
      @media screen and (max-width: 600px) {
        width: 100%;
        margin-right: 0px;
        font-size: 13px;
        margin-top: 5px;
      }
    }
    &>input {
      font-size: 16px;
      @media screen and (max-width: 400px) {
        width: 100%;
        font-size: 13px;
      }
    }
  `;

const TransactionCard = styled.div`
    background: rgb(66, 66, 66, 0.6);
    box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
    border: 1px solid #424242;
    border-radius: 20px;
    padding: 30px;
    display: flex;
    flex-direction: row;
    gap: 20px;
    @media screen and (max-width: 600px) {
      flex-direction: column;
    }
  `;

const TransactionCardMain = styled.div`
  `;

const WalleyStoreBody = styled.div`
  `;

return (
  <>
    <WalleyNavbar>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none">
        <path
          d="M42.3795 1.00041H3.49873C-0.658836 0.841665 -0.658836 7.16116 3.49873 7.00242H42.2245C46.3065 7.16116 46.4652 1.00041 42.3833 1.00041H42.3795ZM3.49873 25.0009C-0.500093 25.0009 -0.500093 30.9991 3.49873 30.9991H25.4204C29.5024 30.9991 29.5024 25.0009 25.4204 25.0009H3.49873ZM3.49873 49.0014C-0.500093 49.0014 -0.500093 54.9996 3.49873 54.9996H52.6222C56.621 54.9996 56.621 49.0014 52.6222 49.0014H3.49873Z"
          fill="white"
        />
      </svg>
      <NavLine></NavLine>
      <WalleyNavbarButton onClick={() => props.update({ view: "home" })}>
        <span>Home</span>
      </WalleyNavbarButton>
      <NavLine></NavLine>
      <WalleyNavbarButton onClick={() => props.update({ view: "txPast" })}>
        <span>Receipts</span>
      </WalleyNavbarButton>
      <NavLineLast></NavLineLast>
    </WalleyNavbar>
    <WalleyStoreBody>
      <WalleyTransactions>
        {props.view === "home"
          ? props.store.storePendingTransactions.length !== 0
            ? props.store.storePendingTransactions.map((tx) => (
                <TransactionCard>
                  <WalleyImageContainer>
                    <WalleyStoreImage
                      src={`https://ipfs.near.social/ipfs/${
                        props.store.storeImages[tx[6]]
                      }`}
                      alt={tx[6]}
                    />
                  </WalleyImageContainer>
                  <TransactionCardMain>
                    <p>Name - {tx[2]}</p>
                    <p>Store name - {tx[6]} </p>
                    <p>Max amount - {Big(tx[5]).toFixed(5)}</p>

                    <p>Time - {props.unixToDate(parseInt(tx[10], 16))}</p>
                    <WalleyButton
                      color="white"
                      bg="blue"
                      onClick={() =>
                        props.update({
                          store: {
                            ...props.store,
                            approvePassword: "",
                            bill: { uploading: false, amount: null },
                            totalAmount: null,
                            viewTxn: [...tx, "approve"],
                          },
                        })
                      }
                    >
                      Approve
                    </WalleyButton>
                  </TransactionCardMain>
                </TransactionCard>
              ))
            : "No pending transactions"
          : props.store.storePastTransactions.length !== 0
          ? props.store.storePastTransactions.map((tx) => (
              <TransactionCard>
                <WalleyImageContainer>
                  <WalleyStoreImage
                    src={`https://ipfs.near.social/ipfs/${
                      props.store.storeImages[tx[6]]
                    }`}
                    alt={tx[6]}
                  />
                </WalleyImageContainer>
                <TransactionCardMain>
                  <p>Name - {tx[2]}</p>
                  <p>Store name - {tx[6]} </p>
                  <p>Max Amount - {Big(tx[5]).toFixed(5)}</p>

                  <p>Total Bill Amount - {Big(tx[9]).toFixed(5)}</p>

                  <p>Time - {unixToDate(parseInt(tx[10], 16))}</p>
                  {props.user.openReceipt === Big(tx[1]).toFixed(0) ? (
                    <>
                      <WalleyStoreImage
                        src={`https://ipfs.near.social/ipfs/${tx[7]}`}
                        alt={tx[7]}
                      />
                      <WalleyButton
                        color="#fff"
                        bg="#FA9703"
                        onClick={() =>
                          props.update({
                            user: {
                              ...props.user,
                              openReceipt: 0,
                            },
                          })
                        }
                      >
                        Close Receipt
                      </WalleyButton>
                    </>
                  ) : (
                    <WalleyButton
                      color="#fff"
                      bg="#FA9703"
                      onClick={() =>
                        props.update({
                          user: {
                            ...props.user,
                            openReceipt: Big(tx[1]).toFixed(0),
                          },
                        })
                      }
                    >
                      Show Receipt
                    </WalleyButton>
                  )}
                </TransactionCardMain>
              </TransactionCard>
            ))
          : "No past transactions found"}
      </WalleyTransactions>
    </WalleyStoreBody>
  </>
);
