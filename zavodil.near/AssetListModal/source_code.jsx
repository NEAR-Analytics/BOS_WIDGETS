const title = props.title ?? "Select a token";
const assets = props.assets;
const selectedAssets = props.selectedAssets ?? [];

const hidden = props.hidden;
const onClose = props.onClose;

State.init({
  searchBy: "",
});

const css = `
* {
    font-family: 'Inter custom',sans-serif;
    scrollbar-width: thin;
    scrollbar-color: #c5c5c5 #fff;
}

*::-webkit-scrollbar {
    width:10px;
    height: 10px;
}

*::-webkit-scrollbar-track {
    background: #fff;
}

*::-webkit-scrollbar-thumb {
    background-color: #c5c5c5;
    border-radius: 20px;
    border: 3px solid #fff;
}

.asset-list-scroll {
    background-color: rgb(255, 255, 255);
    width: 100%;
    overflow: hidden;
    flex: 1 1 0%;
    position: relative;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    -webkit-box-pack: start;
    justify-content: flex-start;
}

.asset-list-container{        
    max-height: 400px;
    position: relative;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    will-change: transform;
    direction: ltr;  
}
.asset-list-header {
    padding-left: 20px;
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    font-weight: 500;
    font-size: 16px;
}
.asset-search-container{
    width: 100%;
    display: flex;
    padding: 0px;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: start;
    justify-content: flex-start;
    box-sizing: border-box;
    min-width: 0px;
    margin-bottom: 16px;
}
.asset-search-container input{
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2399A1BD' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-search'%3E%3Ccircle cx='11' cy='11' r='8'/%3E%3Cline x1='21' y1='21' x2='16.65' y2='16.65'/%3E%3C/svg%3E") 12px center / 20px 20px no-repeat scroll rgb(245, 246, 252);
    position: relative;
    display: flex;
    padding: 16px 16px 16px 40px;
    height: 40px;
    -webkit-box-align: center;
    align-items: center;
    width: 100%;
    white-space: nowrap;
    outline: none;
    border-radius: 12px;
    color: rgb(13, 17, 28);
    border: 1px solid rgb(210, 217, 238);
    appearance: none;
    font-size: 16px;
    transition: border 100ms ease 0s;
}
`;

if (!css) return "";

if (!state.theme) {
  State.update({
    theme: styled.div`
    ${css}`,
  });
}

const Theme = state.theme;

const Modal = styled.div`
  display: ${({ hidden }) => (hidden ? "none" : "flex")};
  position: fixed;
  inset: 0;
  justify-content: center;
  align-items: center;
  opacity: 1;
  z-index: 1;
`;

const ModalBackdrop = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0.4;
`;

const ModalDialog = styled.div`
  padding: 20px;
  z-index: 3;
  background-color: white;
  border-radius: 20px;
  width: 40%;
`;

const ModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

const CloseButton = styled.button`
  background-color: white;
  border: 0;
  color: #344054;
`;

const cache = [];

const assetList = assets.map((tokenId) => {
  return (
    <Widget
      src="zavodil.near/widget/AssetListItem"
      props={{
        tokenId: tokenId,
        selected: selectedAssets.includes(tokenId),
        searchBy: state.searchBy,
        saveAssetData: (assetData) => {
          cache[tokenId] = assetData;
        },
        assetData: cache[tokenId],
        onClick: () => {
          console.log(`${tokenId} selected`);
          if (props.onClick) {
            props.onClick(tokenId);
          }
        },
      }}
    />
  );
});
const body = (
  <div class="asset-search-container">
    <input
      class="asset-search-input"
      placeholder="Search name or paste address"
      onChange={(e) => {
        State.update({
          searchBy: e.target.value,
        });
      }}
      value={state.searchBy}
    />
  </div>
);

return (
  <>
    <Theme>
      <Modal hidden={hidden}>
        <ModalBackdrop />
        <ModalDialog>
          <ModalHeader>
            <div class="asset-list-header">{title}</div>
            <CloseButton onClick={onClose}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.5 5L5.5 15M5.5 5L15.5 15"
                  stroke="currentColor"
                  stroke-width="1.66667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </CloseButton>
          </ModalHeader>
          <div>
            {body}
            <div class="asset-list-scroll">
              <div class="asset-list-container">{assetList}</div>
            </div>
          </div>
        </ModalDialog>
      </Modal>
    </Theme>
  </>
);
