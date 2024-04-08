const {
  mutationId,
  mutationName,
  allApps,
  selectedApps,
  onClose,
  onMutationNameChange,
  onMutationAppsChange,
  onMutationReset,
  onMutationCreate,
  onMutationEdit,
  onMutationIdChange,
} = props;

// ToDo: check null props

const { accountId: loggedInAccountId } = context;

const [mutationOwnerId] = mutationId ? mutationId.split("/") : null;

const isUserOwner = mutationOwnerId === loggedInAccountId;

State.init({
  isSaveDropdownOpened: false,
});

const SelectedMutationEditorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  padding: 20px;
  gap: 20px;
  border-radius: 10px;
  font-family: sans-serif;
  border: 1px solid #02193a;
  background: #f8f9ff;
  width: 400px;
  max-height: 446px;
`;

const Close = styled.span`
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
`;

const HeaderEditor = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: rgba(2, 25, 58, 1);
  font-size: 18px;
  font-weight: 600;
  line-height: 21.09px;
  text-align: left;
  svg {
    margin-left: auto;
  }
`;

const AppsList = styled.div`
  overflow: hidden;
  overflow-y: auto;
  max-height: 400px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const ButtonsBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ButtonsRevert = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(226, 226, 229, 1);
  color: rgba(2, 25, 58, 1);
  width: 175px;
  height: 42px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 400;
  line-height: 20.86px;
  text-align: center;
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
`;

const ButtonsSave = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 175px;
  height: 42px;
  border-radius: 10px;
  background: ${loggedInAccountId
    ? "rgba(56, 75, 255, 1)"
    : "rgba(56, 75, 255, 0.5)"};
  color: #fff;
  font-size: 14px;
  font-weight: 400;
  line-height: 20.86px;
  text-align: center;
  position: relative;
  cursor: pointer;
`;

const TextSave = styled.div`
  display: inline-block;
  overflow: hidden;
  word-wrap: no-wrap;
  text-overflow: ellipsis;
  width: 100%;
  padding: 0 10px;
  text-align: center;
  &:hover {
    opacity: 0.5;
  }
`;

const ArrowWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 42px;
  height: 42px;
  margin-left: auto;
  transform: ${(props) =>
    props.$isOpened ? "rotate(180deg)" : "rotate(0deg)"};
`;

const SaveChanges = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  right: 0;
  top: 52px;
  width: 179px;
  max-height: 112px;
  padding: 10px;
  gap: 10px;
  border-radius: 10px;
  background: rgba(231, 236, 239, 1);
  font-size: 14px;
  font-weight: 400;
  line-height: 20.86px;
  text-align: center;
  color: rgba(34, 34, 34, 1);
`;

const SaveChangesItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 159px;
  height: 41px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: rgba(217, 222, 225, 1);
    color: rgba(56, 75, 255, 1);
  }
`;

const Input = styled.input`
  display: block;
  flex-grow: 1;
  border: none;
  background: none;
  margin: 0;
  max-width: 150px;
  height: 40px;
  line-height: 40px;
  padding: 0;
  color: var(--sand12);
  font: var(--text-base);
  outline: none !important;
  text-align: left;
  transition: color 200ms, opacity 200ms;

  [data-textarea="true"] & {
    line-height: 1.5;
    padding: 8px 12px;
    height: unset;
    min-height: 5.5rem;
  }

  &::placeholder {
    color: var(--sand10);
    font: var(--text-base);
    opacity: 1;
  }

  [data-disabled="true"] & {
    opacity: 1;
    color: var(--sand9);

    &::placeholder {
      color: var(--sand9);
    }
  }
`;

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    viewBox="0 0 30 30"
    fill="none"
  >
    <path
      d="M21 9L9 21"
      stroke="#02193A"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M9 9L21 21"
      stroke="#02193A"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const EditIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M12 18H19"
      stroke="#7A818B"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M15.2504 5.47176C15.5524 5.1697 15.9621 5 16.3893 5C16.6008 5 16.8103 5.04166 17.0057 5.12261C17.2011 5.20355 17.3787 5.32219 17.5282 5.47176C17.6778 5.62133 17.7964 5.79889 17.8774 5.99431C17.9583 6.18972 18 6.39917 18 6.61069C18 6.82221 17.9583 7.03166 17.8774 7.22708C17.7964 7.42249 17.6778 7.60006 17.5282 7.74962L8.03715 17.2407L5 18L5.75929 14.9629L15.2504 5.47176Z"
      stroke="#7A818B"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const ArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="8"
    viewBox="0 0 14 8"
    fill="none"
  >
    <path
      d="M1 1L7 7L13 1"
      stroke="white"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const handlePublishButtonClick = () => {
  State.update({ isSaveDropdownOpened: false });
  onMutationEdit();
};

const handleForkButtonClick = () => {
  State.update({ isSaveDropdownOpened: false });
  onMutationCreate();
};

const handleDropdownOpen = () => {
  if (!loggedInAccountId) return;

  State.update({
    isSaveDropdownOpened: !state.isSaveDropdownOpened,
  });
};

return (
  <SelectedMutationEditorWrapper>
    <HeaderEditor>
      <Input
        onChange={(e) => onMutationNameChange(e.target.value)}
        value={mutationName ? mutationName : ""}
      />
      <EditIcon />
      <Close onClick={onClose}>
        <CloseIcon />
      </Close>
    </HeaderEditor>
    {!isUserOwner ? (
      <>
        <Input
          onChange={(e) => onMutationIdChange(e.target.value)}
          placeholder={"Enter Mutation ID"}
          value={mutationId ? mutationId : ""}
        />
        <EditIcon />
      </>
    ) : null}
    <AppsList>
      {allApps && allApps.length
        ? allApps.map((app, i) => (
            <Widget
              key={i}
              src="bos.dapplets.near/widget/ApplicationCard"
              props={{
                src: app.id,
                metadata: app.metadata,
                hideButtons: !loggedInAccountId,
                selectedApps:
                  selectedApps && selectedApps.filter((x) => x === app.id)[0],
                handleEditMutationApps: onMutationAppsChange,
              }}
            />
          ))
        : null}
    </AppsList>
    <ButtonsBlock>
      <ButtonsRevert onClick={onMutationReset}>Revert changes</ButtonsRevert>
      <ButtonsSave>
        {isUserOwner ? (
          <TextSave onClick={onMutationEdit}>Publish</TextSave>
        ) : (
          <TextSave onClick={onMutationCreate}>Fork</TextSave>
        )}
        <ArrowWrapper
          $isOpened={state.isSaveDropdownOpened}
          onClick={handleDropdownOpen}
        >
          <ArrowIcon />
        </ArrowWrapper>
        {state.isSaveDropdownOpened ? (
          <SaveChanges>
            {isUserOwner ? (
              <SaveChangesItem onClick={handlePublishButtonClick}>
                Publish
              </SaveChangesItem>
            ) : (
              <SaveChangesItem onClick={handleForkButtonClick}>
                Fork
              </SaveChangesItem>
            )}
          </SaveChanges>
        ) : null}
      </ButtonsSave>
    </ButtonsBlock>
  </SelectedMutationEditorWrapper>
);
