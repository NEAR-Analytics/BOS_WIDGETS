/* -------------------------------------------------------------------------- */
/*
 __        ___           __                               
 \ \      / (_)_ __ ___ / _|_ __ __ _ _ __ ___   ___  ___ 
  \ \ /\ / /| | '__/ _ \ |_| '__/ _` | '_ ` _ \ / _ \/ __|
   \ V  V / | | | |  __/  _| | | (_| | | | | | |  __/\__ \
    \_/\_/  |_|_|  \___|_| |_|  \__,_|_| |_| |_|\___||___/

  =========================================================
  * Wireframes - v1.0.0
  =========================================================
  * Product Page: https://wireframes.design
  =========================================================
  * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

                                                                                 */
/* -------------------------------------------------------------------------- */
const CardStyle = {
  height: "100%",
  width: "100vw",
};

State.init({
  show: false,
  showProp: false,
  script: null,
  scripts: [],
});

const openScript = (script) => {
  State.update({
    script: {
      ...script,
    },
  });
};

const StyleContainer = styled.div`
  margin-right: auto;
  margin-left: auto;
  padding-right: 15px;
  padding-left: 15px;

  /* Responsive container */
  @media (min-width: 576px) {
    max-width: 540px;
  }
  @media (min-width: 768px) {
    max-width: 720px;
  }
  @media (min-width: 992px) {
    max-width: 960px;
  }
  @media (min-width: 1200px) {
    max-width: 1140px;
  }
`;

const copyBtn = props.copyBtn || "Copy Button";
const component = props.component || "";
const componentType = props.componentType || "Button";
const text = props.text || "";
const explanation = props.explanation || "";
const propsExplanation = props.propsExplanation || "";
const displayLearningCard = props.displayLearningCard || "";

const TerminalProps = {
  text: text,
  script: script,
  openScript: openScript,
};

const StyledPre = styled.pre`
  page-break-inside: avoid;
  font-family: monospace;
  font-size: 12px;
  line-height: 1.6;
  margin-bottom: 0.6em;
  max-width: 100%;
  overflow: auto;

  display: flex;
  word-wrap: break-word;
  height: 50vh;
  max-width: 100vw;
  margin: auto;
  max-height: 100%;
  min-height: 20vh;
  position: relative;
`;

const TerminalCard = {
  position: "relative",
  width: "100%",
  maxHeight: "80vh",
  minHeight: "40vh",
  padding: "2px",
  backgroundColor: "rgb(30 30 30)",
  borderRadius: "0.375rem",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  color: "#abb2bf",
  borderTopLeftRadius: "0px",
  borderTopRightRadius: "0px",
};
const CopyButton = styled.button`
  position: absolute;
  top: 10px;
  right: 2%;
  padding: 4px;
  background-color: #f8f9fa;
  color: #313030;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  z-index: 3;
`;

const PreComponent = ({ children }) => {
  return <StyledPre>{children}</StyledPre>;
};

const StyledButton = styled.button`
  background-color: ${(props) => (props.show ? "#5cb85c" : "#007bff")};
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
`;
const cardStyles = {
  borderTopLeftRadius: "0px",
  borderTopRightRadius: "0px",
  borderBottomLeftRadius: state.show ? "0px" : "", // Set to 0px if state.show is true, otherwise 5px
  borderBottomRightRadius: state.show ? "0px" : "", // Set to 0px if state.show is true, otherwise 5px
};

return (
  <>
    {explanation != "" && explanation != " " && (
      <p
        style={{
          width: "80vw",
          overflow: "hidden",
          whiteSpace: "break-spaces",
          textOverflow: "clip",
        }}
      >
        {explanation}
      </p>
    )}
    <div className="">
      <div
        className="card"
        style={{
          borderBottomLeftRadius: "0px",
          borderBottomRightRadius: "0px",
          padding: "3%",
          textWrap: "wrap",
        }}
      >
        {displayLearningCard == "full" ? (
          <div style={{ textWrap: "wrap" }}>{component}</div>
        ) : (
          <div className="p-2 d-flex justify-content-center">{component}</div>
        )}
      </div>

      <div className="card p-2" style={cardStyles}>
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4"></div>
          <div
            className="col-md-4 d-flex"
            style={{ justifyContent: "flex-end" }}
          >
            <div className="p-2">
              <Widget
                src="v1.wireframes.near/widget/Components.Button.IconButton"
                props={{
                  label: "Code",
                  icon: "code",
                  iconColor: "#fff",
                  style: {
                    border: "1px solid #0d6efd",
                    borderRadius: "0",
                    fontColor: "white",
                    backgroundColor: "black",
                  },
                  iconSize: "15px",
                  onClick: () => {
                    State.update({ show: !state.show, showProp: false });
                  },
                  type: "button",
                }}
              />
            </div>
            <div className="p-2">
              <Widget
                src="v1.wireframes.near/widget/Components.Button.IconButton"
                props={{
                  label: "Code",
                  icon: "info-lg",
                  iconColor: "#fff",
                  style: {
                    border: "1px solid #0d6efd",
                    borderRadius: "0",
                    fontColor: "white",
                    backgroundColor: "black",
                  },
                  iconSize: "15px",
                  onClick: () => {
                    State.update({ showProp: !state.showProp, show: false });
                  },
                  type: "button",
                }}
              />
            </div>
          </div>
        </div>
      </div>
      {state.show && (
        <div className="card" style={TerminalCard}>
          <CopyButton
            placement="auto"
            overlay={
              <Tooltip>
                {state.copied ? "Copied!" : "Copy to clipboard"}
              </Tooltip>
            }
          >
            <div
              onClick={() => {
                clipboard.writeText(copyBtn).then(() => {
                  State.update({ copied: true });
                  if (props.onCopy) {
                    props.onCopy(copyBtn);
                  }
                });
              }}
            >
              {state.copied ? (
                <>
                  {props.copiedIcon ?? (
                    <Widget
                      src="v1.wireframes.near/widget/Components.Button.IconButton"
                      props={{
                        icon: "clipboard2-check-fill",
                        iconColor: "black",
                      }}
                    />
                  )}{" "}
                  {props.copiedLabel ?? props.label}
                </>
              ) : (
                <>
                  {props.clipboardIcon ?? (
                    <Widget
                      src="v1.wireframes.near/widget/Components.Button.IconButton"
                      props={{
                        icon: "clipboard",
                        iconColor: "black",
                      }}
                    />
                  )}{" "}
                  {props.label}
                </>
              )}
            </div>
          </CopyButton>
          <div className="m-2">
            <Widget
              src="v1.wireframes.near/widget/Components.Learning.TerminalCard"
              props={TerminalProps}
            />
          </div>
        </div>
      )}

      {state.showProp && (
        <Widget
          src="v1.wireframes.near/widget/Components.Learning.PropsDescriptionCard"
          props={propsExplanation}
        />
      )}
    </div>
  </>
);
