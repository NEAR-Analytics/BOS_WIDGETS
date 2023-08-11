const contract = "slides.scottie.near";

State.init({
  settings: false,
  files: [],
  tempCIDs: [],
  deck: false,
  slides: null,
  currentIndex: 0,
  account: context.accountId,
  decks: null,
  deckName: props.deck || context.accountId,
  deckOptions: [{ value: null, label: null }],
  selectedUser: props.user || context.accountId,
  viewing: true,
});

const textStyle = {
  display: "flex",
  justifyContent: "center",
  marginTop: "10px",
};

const inputStyle = { width: "225px", marginRight: "10px" };

const PrimaryButton = styled.button`
  border-radius: 20px;
  width: 165px;
`;

const ToggleButton = styled.button`
  border-radius: 20px;
  width: 110px;
`;

const TutorialButton = styled.button`
  border-radius: 24px;
  border: 0px;
  width: 145px;
  height: 42px;
  font-size: 18px;
  background: #4dc78a;
`;

const Label = styled.label`
  margin-top: auto;
  margin-bottom: auto;
  margin-right: auto;
`;

const Columns = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  row-gap: 12px;
`;

const Labels = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  row-gap: 12px;
  width: 110px;
`;

const ButtonRow = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 32px;
  justify-content: center;
  align-items: center;
`;

const SettingsView = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ViewContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  width: 550px;
`;

const update = (file) => {
  const files = state.files;
  files.push(file);
  State.update({
    files: files,
  });
  sortAndCIDs();
};

const viewing = (value) => {
  State.update({
    viewing: value,
  });
};

const sortAndCIDs = () => {
  const files = state.files;
  files.sort((a, b) => a.index - b.index);
  const cids = files.map((file) => file.cid);
  State.update({
    tempCIDs: cids,
  });
};

const createNewDeck = () => {
  Near.call(contract, "create_new_deck", {
    key: state.account,
    deck_name: state.deckName,
  });
};

const pushSlides = () => {
  const files = state.files;
  if (files) {
    if (files.length > 1) {
      files.sort((a, b) => a.index - b.index);
      let cids = files.map((file) => file.cid);
      Near.call(contract, "insert_slides", {
        key: state.account,
        deck_name: state.deckName,
        slide_cids: cids,
      });
    } else {
      Near.call(contract, "insert_slide", {
        key: state.account,
        deck_name: state.deckName,
        slide_cid: files[0].cid,
      });
    }
  }
};

const deleteDeck = () => {
  Near.call(contract, "delete_deck", {
    key: state.account,
    deck_name: state.deckName,
  });
  State.update({
    deckName: "",
  });
};

const getAllSlides = () => {
  const slides = Near.view(contract, "get_slides", {
    key: state.selectedUser,
    deck_name: state.deckName,
  });

  const slidesParsed = JSON.parse(slides);

  if (slidesParsed !== "None") {
    State.update({
      slides: slidesParsed,
      viewing: true,
      currentIndex: 0,
    });
  }
};

const getAllDecks = () => {
  const decks = Near.view(contract, "get_deck_names", {
    key: state.selectedUser,
  });

  const decksParsed = JSON.parse(decks);

  const options = decksParsed.map((deckName, index) => ({
    value: `deck${index + 1}`,
    label: deckName,
  }));

  options.sort((a, b) => {
    if (a.label < b.label) {
      return -1;
    }
    if (a.label > b.label) {
      return 1;
    }
    return 0;
  });

  State.update({
    decks: decksParsed,
    deckOptions: options,
    deckName: options[0].label,
  });
};

const nextSlide = () => {
  if (state.currentIndex === Object.keys(state.slides).length - 1) {
    return;
  }
  State.update({
    currentIndex: state.currentIndex + 1,
  });
};

const prevSlide = () => {
  if (state.currentIndex === 0) {
    return;
  }
  State.update({
    currentIndex: state.currentIndex - 1,
  });
};

const onClickSettings = () => {
  State.update({ settings: !state.settings });
};

const onClickDelete = (index) => {
  const files = state.files;
  files.splice(index, 1);
  State.update({ files: files });
  sortAndCIDs();
};

const onClickSelectSlide = (index) => {
  State.update({
    currentIndex: parseInt(index),
  });
};

const handleDeckChange = (event) => {
  State.update({
    deckName: event.target.value,
  });
};

const handleFileInputChange = (event) => {
  const file = event.target.value.trim();
  State.update({
    deckName: file,
  });
};

const handleUserInputChange = (event) => {
  const user = event.target.value.trim();
  State.update({
    selectedUser: user,
  });
};

const getAccount = () => {
  State.update({
    selectedUser: state.account,
  });
};

const viewTutorial = () => {
  State.update({
    viewing: true,
    selectedUser: "scottie.near",
    deckName: "Slides",
  });
  getAllSlides();
};

return (
  <div>
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <button
        onClick={onClickSettings}
        class={state.settings ? "btn btn-outline-dark" : "btn btn-dark"}
      >
        ⚙️
      </button>
    </div>
    <div style={{ height: "10px" }} />
    <div hidden={state.settings ? "" : "hidden"}>
      <ButtonRow>
        <PrimaryButton onClick={createNewDeck} className="btn btn-outline-dark">
          Create New Deck
        </PrimaryButton>
        <Widget
          src={`scottie.near/widget/IPFSMultiUpload`}
          props={{ update, viewing }}
        />
        <PrimaryButton onClick={pushSlides} className="btn btn-outline-dark">
          Save Slide(s)
        </PrimaryButton>
        <PrimaryButton onClick={deleteDeck} className="btn btn-outline-dark">
          Delete Deck
        </PrimaryButton>
      </ButtonRow>
      <div style={{ height: "12px" }} />
      <SettingsView>
        <ViewContainer>
          <Labels>
            <Label>Saved Decks:</Label>
            <Label>File Name:</Label>
            <Label>User Name:</Label>
          </Labels>
          <Columns>
            <select
              class="form-select"
              onChange={handleDeckChange}
              value={state.deckName}
              style={inputStyle}
            >
              {state.deckOptions.map((option) => (
                <option key={option.value} value={option.label}>
                  {option.label}
                </option>
              ))}
            </select>
            <input
              type="text"
              style={inputStyle}
              onChange={handleFileInputChange}
              value={state.deckName}
            />
            <input
              type="text"
              style={inputStyle}
              onChange={handleUserInputChange}
              value={state.selectedUser}
            />
          </Columns>
          <Columns>
            <PrimaryButton
              onClick={() => getAllDecks()}
              className="btn btn-outline-primary"
            >
              View Saved Decks
            </PrimaryButton>

            <PrimaryButton
              onClick={() => getAllSlides()}
              className="btn btn-outline-primary"
            >
              View Slides
            </PrimaryButton>
            <PrimaryButton
              onClick={getAccount}
              className="btn btn-outline-primary"
            >
              <span class="glyphicon glyphicon-refresh"></span>↺ My Name
            </PrimaryButton>
          </Columns>
        </ViewContainer>
      </SettingsView>
    </div>
    <div>
      <div style={state.settings ? { height: "12px" } : {}} />
      <ButtonRow>
        <ToggleButton onClick={prevSlide} className="btn btn-dark">
          {"<"} Previous
        </ToggleButton>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "10px",
          }}
        >
          {" "}
          {state.slides && state.viewing ? state.currentIndex + 1 : ""}
        </div>
        <ToggleButton onClick={nextSlide} className="btn btn-dark">
          Next {">"}
        </ToggleButton>
      </ButtonRow>
      <div style={{ height: "12px" }} />
      {state.slides && state.viewing ? (
        <div>
          <div id="slide">
            <img
              class="w-100 h-100"
              style={{
                objectFit: "contain",
                border: "2px solid #555",
              }}
              src={`https://ipfs.io/ipfs/${
                Object.values(state.slides)[state.currentIndex]
              }`}
              alt=""
            />
          </div>
        </div>
      ) : state.tempCIDs.length > 0 ? (
        <div>
          <div style={textStyle}>Click Save Slides to Store on Near</div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(6, 1fr)",
              gridTemplateRows: "repeat(6, 1fr)",
              gap: "10px",
              maxHeight: "400px",
              overflowY: "auto",
            }}
          >
            {Object.entries(state.tempCIDs).map(([key, value]) => {
              return (
                <Widget
                  src={`scottie.near/widget/DeletableCard`}
                  props={{
                    key,
                    value,
                    onClickDelete,
                  }}
                />
              );
            })}
          </div>
        </div>
      ) : state.settings ? (
        <div>
          <div style={textStyle}>
            Click View Saved Decks to Load Saved Decks
          </div>
        </div>
      ) : (
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            <p style={{ marginBottom: "24px" }}>
              <span
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  fontFamily: "menlo",
                }}
              >
                Welcome to Slides
              </span>
              <br />
              <span style={{ fontSize: "18px", fontFamily: "menlo" }}>
                Create Unstoppable Presentations{" "}
              </span>
            </p>
            <div style={{ marginBottom: "12px" }}>
              <TutorialButton
                onClick={viewTutorial}
                className="btn btn-outline-dark"
              >
                View Tutorial
              </TutorialButton>
            </div>
            <p
              style={{
                position: "relative",
                lineHeight: "2",
              }}
            >
              or
              <br />
              Click ⚙ to View Decks, Slides, or Create a New Deck
            </p>
          </div>
        </div>
      )}
    </div>
    <div
      style={
        state.slides
          ? {
              display: "flex",
              flexDirection: "row",
              height: "75px",
              marginTop: "10px",
              marginBottom: "10px",
              justifyContent: "center",
              overflowX: "auto",
            }
          : { marginTop: "10px", marginBottom: "10px" }
      }
    >
      <div style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
        {state.slides && state.viewing
          ? Object.entries(state.slides).map(([key, value]) => {
              return (
                <div
                  key={key}
                  value={value}
                  style={{
                    display: "inline-block",
                    width: "100px",
                    marginRight: "1px",
                  }}
                  onClick={() => onClickSelectSlide(key)}
                >
                  <img
                    class="rounded"
                    style={
                      parseInt(key) === state.currentIndex
                        ? {
                            width: "100%",
                            height: "auto",
                            border: "2px solid #555",
                          }
                        : {
                            width: "100%",
                            height: "auto",
                            filter: "grayscale(90%)",
                          }
                    }
                    src={`https://ipfs.io/ipfs/${value}`}
                    alt="upload preview"
                  />
                </div>
              );
            })
          : ""}
      </div>
    </div>
  </div>
);
