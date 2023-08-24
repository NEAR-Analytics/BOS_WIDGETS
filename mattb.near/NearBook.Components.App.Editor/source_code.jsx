const TEXT_FORMATS = {
  bold: "**",
};

const getRichText = () => {
  let text = state.document.rawText;

  if (state.format) {
    let positions = 0;

    state.format.map((val) => {
      if (val.end) {
        text =
          text.substring(0, val.start + positions) +
          TEXT_FORMATS[val.type] +
          text.substring(val.start + positions, val.end + positions) +
          TEXT_FORMATS[val.type] +
          text.substring(val.end + positions, text.length);

        positions += TEXT_FORMATS[val.type].length * 2;
      }
    });

    return text;
  }

  return text;
};

State.init({
  format: [],
  bold: false,
  document: {
    richText: getRichText(),
    rawText: "",
  },
});

const Editor = styled.div`
    display:flex;
    flex-direction:column;
    width:100%;
    height:calc(100vh - 50px - 4rem);
`;

const Toolbar = styled.div`
    display:flex;
    align-items:center;
    width:100%;
    height:50px;
    background-color:#fff;
    border-bottom: 1px solid rgba(0,0,0,.05);
`;

const Logo = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    width:50px;
    height:100%;
    border-right:1px solid rgba(0,0,0,.05);
    font-weight:bold;
    font-size:1.7rem;
`;

const Document = styled.div`
    flex-grow:1;
    background-color:rgba(0,0,0,.02);
    padding: 2rem;
    box-sizing:border-box;
`;

const Wrapper = styled.div`
    display:flex;
    flex-direction:column;
    width:100%;
    height:100%;
    max-width:1080px;
    margin: 0 auto;
`;

const TitleInput = styled.input`
    border:0;
    color:rgba(0,0,0,.9);
    font-weight:bold;
    background-color:transparent;
    outline-style:none;
    font-size:2rem;
    margin-bottom:1rem;

    ::placeholder {
        color:rgba(0,0,0,.6)!important;
        font-weight:bold!important;
        font-size:2rem;
    }
`;

const DocumentBody = styled.div`
    position:relative;
    display:flex;
    flex-direction:column;
    font-size:1rem;
    height:100%;
`;

const BodyArea = styled.textarea`
    border:0;
    width:100%;
    flex-grow:1;
    background-color:transparent;
    outline-style:none;
    font-size:1rem;
    color:transparent;
    caret-color:black;

    ::placeholder {
        color:rgba(0,0,0,.4)!important;
        font-size:1rem;
    }
`;

const Options = styled.ul`  
    display:flex;
    list-style:none;
    padding:0;
    margin:0;
    padding:1rem;

    li {
        display:flex;
        align-items:center;
        justify-content:center;
        width:30px;
        height:30px;
        border-radius:7px;
        border:2px solid rgba(0,0,0,.05);
        font-size:.8rem;
        font-weight:bold;
        cursor:pointer;
        transition:all .2s;

        :not(:last-of-type) {
            margin-right:5px;
        }

        :hover {
            transition:all .2s;
            box-shadow: 0 0 0 2px rgba(0,0,0,.05);
        }
    }
`;

const TextVisualizer = styled.div`
    position:absolute;
    top:0;
    left:0;
`;

return (
  <Editor>
    <Toolbar>
      <Logo>n</Logo>
      <Options>
        <li
           onMouseDown={(e) => {
                e.preventDefault();
           }}
          onClick={(e) => {
            State.update({ bold: !state.bold });

            if (state.bold) {
              State.update({
                format: [
                  ...state.format,
                  {
                    type: "bold",
                    start: state.document.rawText.length,
                    end: null,
                  },
                ],
              });
            } else {
              let newFormat = state.format.map((val, idx) => {
                if (val.type === "bold" && !val.end) {
                  val.end = state.document.rawText.length;
                }

                return val;
              });
              State.update({
                format: newFormat,
                document: {
                    ...state.document,
                    richText: getRichText()
                }
              });
            }
          }}
        >
          B
        </li>
        <li>
        I
        </li>
        <li>
        U
        </li>
      </Options>
    </Toolbar>
    <Document>
      <Wrapper>
        <TitleInput type="text" placeholder="This is the title." />
        <DocumentBody>
          <TextVisualizer>
            <Markdown text={state.document.richText} />
          </TextVisualizer>
          <BodyArea
            value={state.document.rawText}
            onChange={(event) => {
              State.update({
                document: {
                  ...state.document,
                  rawText: event.target.value,
                },
              });

              State.update({
                document: {
                  ...state.document,
                  richText: getRichText(),
                },
              });

              console.log(state);
            }}
            placeholder="This is the body of your document. Type something."
          />
        </DocumentBody>
      </Wrapper>
    </Document>
  </Editor>
);
