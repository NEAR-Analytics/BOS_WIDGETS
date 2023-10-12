const autocompleteEnabled = props.autocompleteEnabled ?? true;

State.init({
  isChecked: false,
  chain: "Near",
});
if (state.image === undefined) {
  State.init({
    image: {},
    text: props.initialText || "",
  });

  if (props?.onHelper) {
    const extractMentions = (text) => {
      const mentionRegex =
        /@((?:(?:[a-z\d]+[-_])*[a-z\d]+\.)*(?:[a-z\d]+[-_])*[a-z\d]+)/gi;
      mentionRegex.lastIndex = 0;
      const accountIds = new Set();
      for (const match of text.matchAll(mentionRegex)) {
        if (
          !/[\w`]/.test(match.input.charAt(match.index - 1)) &&
          !/[/\w`]/.test(match.input.charAt(match.index + match[0].length)) &&
          match[1].length >= 2 &&
          match[1].length <= 64
        ) {
          accountIds.add(match[1].toLowerCase());
        }
      }
      return [...accountIds];
    };

    const extractHashtags = (text) => {
      const hashtagRegex = /#(\w+)/gi;
      hashtagRegex.lastIndex = 0;
      const hashtags = new Set();
      for (const match of text.matchAll(hashtagRegex)) {
        if (
          !/[\w`]/.test(match.input.charAt(match.index - 1)) &&
          !/[/\w`]/.test(match.input.charAt(match.index + match[0].length))
        ) {
          hashtags.add(match[1].toLowerCase());
        }
      }
      return [...hashtags];
    };

    const extractMentionNotifications = (text, item) =>
      extractMentions(text || "")
        .filter((accountId) => accountId !== context.accountId)
        .map((accountId) => ({
          key: accountId,
          value: {
            type: "mention",
            item,
          },
        }));

    props?.onHelper({
      extractHashtags,
      extractMentions,
      extractTagNotifications: extractMentionNotifications,
      extractMentionNotifications,
    });
  }
}

const chains = [
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

const updateChain = (chain) => {
  State.update({ chain });
};

const content = (state.text || state.image.cid) && {
  type: "md",
  text: state.text,
  image: state.image.cid ? { ipfs_cid: state.image.cid } : undefined,
  embedNFT: {
    contractId: state.nftContractId,
    tokenId: state.nftTokenId,
    chain: state.nftChainState,
  },
};

if (content && props.extraContent) {
  Object.assign(content, props.extraContent);
}

function autoCompleteAccountId(id) {
  let text = state.text.replace(/[\s]{0,1}@[^\s]*$/, "");
  text = `${text} @${id}`.trim() + " ";
  State.update({ text, showAccountAutocomplete: false });
}

const onChange = (text) => {
  const showAccountAutocomplete = /@[\w][^\s]*$/.test(text);
  State.update({ text, showAccountAutocomplete });
};

const jContent = JSON.stringify(content);
if (props.onChange && jContent !== state.jContent) {
  State.update({
    jContent,
  });
  props.onChange({ content });
}

const onCompose = () => {
  State.update({
    image: {},
    text: "",
  });
};

const TextareaWrapper = styled.div`
  display: grid;
  vertical-align: top;
  align-items: center;
  position: relative;
  align-items: stretch;

  &::after,
  textarea {
    width: 100%;
    min-width: 1em;
    height: unset;
    min-height: 5em;
    font: inherit;
    padding: var(--padding) var(--padding) calc(40px + (var(--padding) * 2)) calc(40px + (var(--padding) * 2));
    margin: 0;
    resize: none;
    background: none;
    appearance: none;
    border: none;
    grid-area: 1 / 1;
    overflow: hidden;
    outline: none;
  }

  &::after {
    content: attr(data-value) ' ';
    visibility: hidden;
    white-space: pre-wrap;
  }
`;
const EmbedNFT = styled.div`
  margin: 10px;
`;

//

// const Overlay = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   background-color: rgba(0, 0, 0, 0.5);
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   z-index: 10;
//   height: 100vh;
//   width: 100vw;
// `;

const Content = styled.div`
  // background-color: white;
  padding: 20px;
  border-radius: .5rem;
  margin-top: 2rem;
  // border: 4px solid rgba(13, 154, 255, 0.317);
`;

const Title = styled.h3`
  margin-bottom: 10px;
`;

const Button = styled.div`
background: transparent;
font-weight: 600;
cursor: pointer;
`;

const Input = styled.input`
  display: block;
  padding:.5em;
  width:100%;
  border: 1px solid #e5e8eb;
  border-radius: 10px;
  outline: none;
  background: #f4f5f6;
  color: #525c76;
  :focus{
    border:1px solid #0d99ff;
  }
  ::placeholder {
    color: palevioletred;
  }
`;

const Card = styled.div`
padding: 1em;
border: 1px solid #e5e8eb;
gap: 2em;
margin: 10px auto;
border-radius: .7em;
`;

const handleCheckboxChange = () => {
  State.update({ isChecked: !state.isChecked, isOpen: true });
};

const onClose = () => {
  State.update({
    isOpen: false,
    isChecked: false,
    chain: "Near",
  });
};

const onChangeContractID = (contractId) => {
  State.update({
    contractId,
  });
};

const onChangeTokenID = (tokenId) => {
  State.update({
    tokenId,
  });
};
// const onOpen = () =>{
//   State.update({
//     isOpen: true
//   })
// }
// console.log(state.isChecked);
console.log(state.chain);
return (
  <div className="text-bg-light rounded-4">
    <TextareaWrapper className="p-3" data-value={state.text || ""}>
      <textarea
        value={state.text || ""}
        onInput={(event) => onChange(event.target.value)}
        onKeyUp={(event) => {
          if (event.key === "Escape") {
            State.update({ showAccountAutocomplete: false });
          }
        }}
        placeholder={props.placeholder ?? "What's happening?"}
      />

      {autocompleteEnabled && state?.showAccountAutocomplete && (
        <div className="pt-1 w-100 overflow-hidden">
          <Widget
            src="mob.near/widget/AccountAutocomplete"
            props={{
              term: state.text.split("@").pop(),
              onSelect: autoCompleteAccountId,
              onClose: () => State.update({ showAccountAutocomplete: false }),
            }}
          />
        </div>
      )}
    </TextareaWrapper>
    <div className="d-flex flex-row p-2 border-top">
      <div className="flex-grow-1">
        <IpfsImageUpload
          image={state.image}
          className="btn btn-outline-secondary border-0 rounded-3"
        />
        {!state.image.cid && (
          <EmbedNFT>
            <div className="form-check form-switch embed">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="embed"
                checked={state.isChecked}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="embed">Embed an NFT</label>
            </div>
            {state.isChecked && (
              <div>
                <Card>
                  {/*<Title>Embed NFT</Title>*/}
                  <div className="d-flex align-center text-center gap-2">
                    <Widget
                      src="jgodwill.near/widget/GenaDrop.ChainsDropdown"
                      props={{ chains: chains, updateChain }}
                    />
                    {state.sender ? (
                      <div>
                        <MyAcc>{state.sender ? getSender() : "0x00..."}</MyAcc>
                      </div>
                    ) : (
                      state.chain !== "Near" && (
                        <Web3Connect
                          connectLabel={`Connect ${state.chain} Wallet`}
                          className="w-50"
                        />
                      )
                    )}
                  </div>
                  <Card>
                    <h4>Enter the NFT details</h4>
                    <Card>
                      NFT Contract ID:
                      <Input
                        type="text"
                        onChange={(e) => onChangeContractID(e.target.value)}
                      />
                    </Card>
                    <Card>
                      NFT Token Id:
                      <Input
                        type="text"
                        onChange={(e) => onChangeTokenID(e.target.value)}
                      />
                    </Card>
                    {state.contractId && state.tokenId && (
                      <Widget
                        src="jgodwill.near/widget/GenaDrop.NFTEmbedPreview"
                        props={{
                          contractId: state.contractId,
                          tokenId: state.tokenId,
                          chainState: state.chain.toLowerCase(),
                        }}
                      />
                    )}
                  </Card>
                </Card>
              </div>
            )}
          </EmbedNFT>
        )}
      </div>
      <div>{props.composeButton && props.composeButton(onCompose)}</div>
    </div>
  </div>
);
