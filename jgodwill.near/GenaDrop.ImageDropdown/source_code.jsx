State.init({
  selectIsOpen: false,
  selectedChain: "0",
});
const handleSelectClick = () => {
  State.update({
    selectIsOpen: !state.selectIsOpen,
  });
};

const CHAINS = [
  {
    id: "137",
    name: "Polygon",
    url: "https://ipfs.near.social/ipfs/bafkreie5h5oq6suoingcwuzj32m3apv56rl56wpwpaxmevlk5vndlypxze",
  },
  {
    id: "1313161554",
    name: "Aurora",
    url: "https://ipfs.near.social/ipfs/bafkreiajqik4gjbmkh7z2gylpjzrsuht7simjecpxuoqn6icqfbioswzuy",
  },
  {
    id: "42220",
    name: "Celo",
    url: "https://ipfs.near.social/ipfs/bafkreifu6ufsdf2ivrs5febt7l25wdys6odzfelgjauzod7owrfug56cxe",
  },
  {
    id: "43114",
    name: "Avax",
    url: "https://ipfs.near.social/ipfs/bafkreifhu5fytsjcmjluarfnu6kcdhaqz4rgdrbbzf6dlsmggqb7oi3w4e",
  },
  {
    id: "42161",
    name: "Arbitrum",
    url: "https://ipfs.near.social/ipfs/bafkreiffax4lnya337rz5ph75faondeqmpy6xj37yprwvxbru4qc5emsiq",
  },
  {
    id: "0",
    name: "Near",
    url: "https://ipfs.near.social/ipfs/bafkreigv55ubnx3tfhbf56toihekuxvgzfqn5c3ndbfjcg3e4uvaeuy5cm",
  },
];

const handleOutsideClick = (e) => {
  e.preventDefault();
  if (!!state.selectIsOpen) {
    State.update({
      selectIsOpen: false,
    });
  }
};

const SelectTag = styled.select`
  height: fit-content;
  width: 300px;
`;

const ChainIcon = styled.option`
  display: flex;
  height: 130px;
  padding: 1rem auto;
  &>img{
    height:100px;
    width: 100px;
    object-fit: contain;
  }
`;

const SelectReplicaContainer = styled.div`
  position: relative;
  display: inline-block;
  z-index: 1;
  user-select:none;

  & .select-replica__select {
    position: relative;
  }

  & .select-replica__selected {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 4px solid rgba(0,0,0,.05);
    gap: 10px;
    border-radius: 10px;
    background-color: #fff;
    width: 350px;
    padding:0 15px 0 10px;
    min-height:70px;


    & > img {
      height: 100%;
      width: 80px;
      object-fit: contain;
    }

    & > span {
        opacity:.6;
    }

  }

  & .select-replica__options {
    position: absolute;
    opacity:0;
    top: 110%;
    left: 0;
    width: 100%;
    left:0;
    right:0;
    margin:auto;
    overflow-y: auto;
    border-radius: 10px;
    background-color: #fff;
    max-height: 300px;
    box-shadow: 0 10px 20px 10px rgba(0,0,0,.05);
    pointer-events:none;
    transform:translateY(100px);
    transition: all .2s;
  }

  & .select-replica__options.open {
    transition: all .2s;
    transform:translateY(0);
    opacity:1;
    pointer-events:all;
  }

  & .select-replica__option {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: #fff;
    padding: 0;
    border-bottom: 1px solid rgba(0,0,0,.05);
  }

  & .select-replica__option.selected {
    background-color: #f0f0f0;
  }

  & .select-replica__option img {
    height: 80px;
    width: 100px;
    object-fit: contain;
  }
`;

const SelectGroup = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem auto;
  align-items:center;
`;
State.update({ chains: CHAINS });
const handleChainChange = (chain_id) => {
  try {
    Ethers.send("wallet_switchEthereumChain", [
      { chainId: `0x${Number(chain_id).toString(16)}` },
    ]);

    State.update({
      selectedChain: chain_id,
    });
console.log(state.selectedChain);
  } catch (err) {
    console.log(err);
  }
};

return (
  <>
    <SelectGroup className="form-group">
      <SelectReplicaContainer>
        <div
          className={`select-replica__select ${
            state.selectIsOpen ? "open" : ""
          }`}
          onClick={handleSelectClick}
        >
          <div className="select-replica__selected">
            {state.chains.filter(
              (chain) => chain.id === state.selectedChain.toString()
            ) ? (
              <img
                src={state.chains
                  .filter(
                    (chain) => chain.id === state.selectedChain.toString()
                  )
                  .map((c) => c.url)}
                alt={state.chains
                  .filter(
                    (chain) => chain.id === state.selectedChain.toString()
                  )
                  .map((c) => c.name)}
              />
            ) : (
              "Select an option"
            )}
            <span>▼</span>
          </div>
          <div
            className={`select-replica__options ${
              state.selectIsOpen ? "open" : ""
            }`}
          >
            {state.chains.map((chain) =>
              chain.id !== state.selectedChain.toString() ? (
                <div
                  key={chain.id}
                  className={`select-replica__option ${
                    selectedOption === chain.name ? "selected" : ""
                  }`}
                  onClick={() => handleChainChange(chain.id)}
                >
                  <img src={chain.url} alt={chain.name} />
                </div>
              ) : (
                ""
              )
            )}
          </div>
        </div>
      </SelectReplicaContainer>
      {state.lastMintlink && (
        <a href={`${state.lastMintLink}`} target="_blank">
          View Transaction
        </a>
      )}
    </SelectGroup>
  </>
);
