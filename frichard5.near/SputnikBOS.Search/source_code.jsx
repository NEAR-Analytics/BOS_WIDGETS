const { onSearch, selectedDao, widgetProvider } = props;


State.init({
    selectedDao: selectedDao
})
if(selectedDao!=state.selectedDao) State.update({selectedDao});

const SearchWrapper = styled.div `
  display: flex;
  flex-direction: column;
  width: 220px;
  position: absolute;
  top: 275px;
  margin-bottom: 25px;
  z-index: 100;
  button {
    margin: 0;
  };
  @media screen and (max-width: 1150px) {
    left: 100px;
    top: 165px;
  }
`

let ClipboardButton = styled.button`
  position: relative;
  top: 10px;
  display: flex;
  align-items: center;
  border-radius: 4px;
  font-size: 12px;
  color: grey !important;
  background: transparent !important;
  svg {
    margin-left: 10px;
    width: 20px;
    fill: grey;
  }
  margin-bottom: 10px;
`;

const searchSvg = <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiBox-root css-1om0hkc" focusable="false"
                       aria-hidden="true" viewBox="0 0 24 24" data-testid="SearchIcon">
    <path
        d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
</svg>

const clipboardSvg = (
    <svg
        class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium copy-icon css-vubbuv"
        focusable="false"
        aria-hidden="true"
        viewBox="0 0 24 24"
        data-testid="ContentCopyIcon"
        aria-label="Copied to clipboard!"
        width={20}
    >
        <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path>
    </svg>
);

const SearchIcon = styled.button`
  background: transparent !important;
  svg {
    width: 20px;
  }
`

const SearchField = styled.div`
  display: flex;
  border: 1px solid #ced4da;
  border-radius: 0.375rem;
  input {
    border:none;
    &:focus {
      box-shadow: none
    }
  }
`

const search = () => {
    State.update({displayShare:true})
    onSearch(state.dao);
}


function copy() {
    const link = `https://near.org/#/${widgetProvider}/widget/SputnikBOS.Home?selected_dao=${selectedDao}`;

    return () => {
        State.update({ showClipboardTooltip: true });
        setTimeout(() => {
            State.update({ showClipboardTooltip: false });
        }, 1000);
        clipboard.writeText(link);
    };
}

return <SearchWrapper selectedDao={selectedDao}>
    <SearchField>
        <input
            type={'text'}
            placeholder={'marketing.sputnik-dao.near'}
            onChange={(e) => State.update({dao:e.target.value})}
        />
        <SearchIcon onClick={search}>{searchSvg}</SearchIcon>
    </SearchField>

    {state.selectedDao&&<OverlayTrigger
        key={"right"}
        placement={"right"}
        overlay={
            <Tooltip id={`tooltip`}>
                Dashboard link added to clipboard.
            </Tooltip>
        }
        show={state.showClipboardTooltip}
    >
        <ClipboardButton onClick={copy()}>
            <span>Get your dashboard link </span>
            {clipboardSvg}
        </ClipboardButton>
    </OverlayTrigger>}
</SearchWrapper>