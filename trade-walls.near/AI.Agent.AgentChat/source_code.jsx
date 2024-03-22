const [response, setResponse] = useState({});
const [error, setError] = useState(true);
const [walls, setWalls] = useState([]);
const [answer, setAnswer] = useState("");
const WallsList = () => {
  if (error) {
    return;
  }
  if (walls.length == 0) {
    return <>Add a wall to begin</>;
  }

  return (
    <>
      <h5>My walls</h5>
      <table>
        <thead>
          <tr>
            <TC as="th">Pair</TC>
            <TC as="th">Buy Price</TC>
            <TC as="th">Sell Price</TC>
            <TC as="th">Quantity</TC>
            <TC as="th">Keep</TC>
            <TC as="th">Status</TC>
            <TC as="th">Actions</TC>
          </tr>
        </thead>
        <tbody>
          {walls.map(
            ({ id, pair, bid_price, ask_price, quantity, keep, status }) => {
              const [base, quote] = pair.split("/");
              return (
                <tr key={id}>
                  <TC>{pair}</TC>
                  <TC>
                    {bid_price} {quote}
                  </TC>
                  <TC>
                    {ask_price} {quote}
                  </TC>
                  <TC>
                    {quantity} {base}
                  </TC>
                  <TC>
                    {keep} {base}
                  </TC>
                  <TC>{status}</TC>
                  <TC>
                    <button onClick={deleteWall(id)}>Delete</button>
                  </TC>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </>
  );
};

const deleteWall = (wallId) => {
  return () => {
    asyncFetch(`${wallsApiEndpoint}/${wallId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      responseType: "json",
    }).then((res) => {
      setResponse(res.body);
      listWalls();
    });
    return false;
  };
};
const [suggestedWalls, setSuggestedWalls] = useState([]);

const extractWalls = (content) => {
  const wallRegex = /```wall\s*([\s\S]*?)\s*```/;
  const match = content.match(wallRegex);
  if (match) {
    const wallsJson = match[1].trim();
    try {
      return JSON.parse(wallsJson);
    } catch (error) {
      console.error("Error parsing suggested walls:", error);
      return null;
    }
  }
  return null;
};

const ActionParser = () => {
  return (
    <div>
      {suggestedWalls.length > 0 && (
        <LLMWallSuggestion walls={suggestedWalls} onAddWall={addWall} />
      )}
    </div>
  );
};

useEffect(() => {
  //console.log(answer);
  setSuggestedWalls(extractWalls(answer) || []);
}, [answer]);

const LLMWallSuggestion = ({ walls, onAddWall }) => {
  const [addingWall, setAddingWall] = useState(null);

  const handleAddWall = (wall, index) => {
    onAddWall(wall, index);
    setAddingWall(wall);
  };

  return (
    <div>
      <h4>Suggested Walls from LLM</h4>
      {walls.length === 0 ? (
        <p>No walls suggested by the LLM.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <TC as="th">Pair</TC>
              <TC as="th">Buy Price</TC>
              <TC as="th">Sell Price</TC>
              <TC as="th">Quantity</TC>
              <TC as="th">Keep</TC>
              <TC as="th">Action</TC>
            </tr>
          </thead>
          <tbody>
            {walls.map((wall, index) => {
              const [lhs, rhs] = wall.pair.split("/");
              return (
                <tr key={index}>
                  <TC>{wall.pair}</TC>
                  <TC>
                    {wall.bid_price} {rhs}
                  </TC>
                  <TC>
                    {wall.ask_price} {rhs}
                  </TC>
                  <TC>
                    {wall.quantity} {lhs}
                  </TC>
                  <TC>
                    {wall.keep} {lhs}
                  </TC>
                  <TC>
                    <button
                      onClick={() => handleAddWall(wall, index)}
                      disabled={addingWall === wall}
                    >
                      {addingWall === wall ? "Adding..." : "Add Wall"}
                    </button>
                  </TC>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

const addWall = (wall, index) => {
  asyncFetch(wallsApiEndpoint, {
    method: "POST",
    body: JSON.stringify(wall),
    headers: {
      "Content-Type": "application/json",
    },
    responseType: "json",
  }).then((res) => {
    setResponse(res.body);
    setSuggestedWalls((prevSuggestedWalls) => {
      const updatedWalls = [...prevSuggestedWalls];
      updatedWalls.splice(index, 1);
      return updatedWalls;
    });
    listWalls();
  });
  return false;
};
const [wallsApiEndpoint, setWallsApiEndpoint] = useState(
  "http://localhost:5000/api/walls"
);
const [connecting, setConnecting] = useState(false);

const listWalls = async () => {
  asyncFetch(wallsApiEndpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    responseType: "json",
  }).then((res) => {
    setWalls(res.body);
    if (res.status == 200) {
      setError(false);
    }
  });
};

const connectBackend = async () => {
  setConnecting(true);
  const url = `${wallsApiEndpoint.replace("/walls", "")}/greet`;
  asyncFetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    responseType: "json",
  }).then((res) => {
    setResponse(res.body);
    listWalls();
    if (res.status == 200) {
      setError(false);
    }
    setConnecting(false);
  });
};

useEffect(() => {
  connectBackend();
}, []);

// original code
const { href } = VM.require("devhub.near/widget/core.lib.url");
const storedModel = Storage.get("agent-model");
const storedLocalModel = Storage.get("agent-local-model");
const storedCredentialType = Storage.get("agent-credential-type");
const storedCredential = Storage.get("agent-credential");
const storedJsonOutputSetting = Storage.get("agent-json-output-setting");
if (
  !href ||
  storedCredential === null ||
  storedModel === null ||
  storedLocalModel === null ||
  storedCredentialType === null
) {
  return "Loading config...";
}

const { src, embedded } = props;

if (!src) {
  src = "trade-walls.near/agent/trade-walls";
}
const [accountId, agentType, agentName] = src.split("/") ?? [null, null, null];
const blockHeight = blockHeight ?? "final";

const data = Social.getr(`${accountId}/agent/${agentName}`, blockHeight);
const agent = { accountId, name: agentName, ...data };

if (!data) return "Loading...";

data.prompt =
  data.prompt +
  `
You want to suggest buy and sell walls to the user. To suggest a wall return json:
\`\`\`wall
[
  {
    "pair": "nano/near",
    "bid_price": 1,
    "ask_price": 2,
    "quantity": 20,
    "keep": 10
  },
  {
    "pair": "nano/near",
    "bid_price": 0.5,
    "ask_price": 4.0,
    "quantity": 40,
    "keep": 20
  }
]
\`\`\`
bid_price and ask_price are in the pair denominator (near) and quantity is in the numerator (nano). quantity includes keep.
Do:
1. Suggest log-scale walls that lets the user benefit from price fluctuations.
2. Stick within the user's requested parameters.
3. Suggest walls when responding even if the parameters aren't clear - the user can ignore your options.
4. Use the trade pair the user requests. Remind them to look at a graph of the pair on tradingview.

Don't:
1. Deviate from the wall json format - it's strict.
2. Hesitate to suggest walls.
3. Suggest only one wall. We want the user to benefit from volatility.
`;
const listLink = href({
  widgetSrc: `near/widget/AI.Nexus`,
});

const [settingsOpen, setSettingsOpen] = useState(false);
const [question, setQuestion] = useState("");
const [loading, setLoading] = useState(false);
const [messages, setMessages] = useState([]);

const [model, setModel] = useState(storedModel ?? "near-llama-7b");
const [localModel, setLocalModel] = useState(
  storedLocalModel ?? "http://localhost:1234/v1/chat/completions"
);
const [credentialType, setCredentialType] = useState(
  storedCredentialType ?? "bearer"
);
const [credential, setCredential] = useState(storedCredential ?? "");
const [jsonOutputSetting, setJsonOutputSetting] = useState(
  storedJsonOutputSetting ?? false
);

useEffect(() => {
  Storage.set("agent-model", model);
}, [model]);
useEffect(() => {
  Storage.set("agent-local-model", localModel);
}, [localModel]);
useEffect(() => {
  Storage.set("agent-credential-type", credentialType);
}, [credentialType]);
useEffect(() => {
  Storage.set("agent-credential", credential);
}, [credential]);
useEffect(() => {
  Storage.set("agent-json-output-setting", jsonOutputSetting);
}, [jsonOutputSetting]);

const toggleSettings = () => {
  setSettingsOpen(!settingsOpen);
};

const routeApi = async (question) => {
  switch (model) {
    case "near-llama-7b":
      return nearLlama(question);
    default:
      return openAICompatible(question);
  }
};
const urlForModel = (model) => {
  switch (model) {
    case "near-llama-7b":
      return `https://ai.near.social/api`;
    case "local":
      return localModel;
    case "gpt-4":
    case "gpt-3.5-turbo":
      return `https://api.openai.com/v1/chat/completions`;
    case "mixtral-8x7b-32768":
    case "llama2-70b-4096":
      return "https://api.groq.com/openai/v1/chat/completions";
    default:
      return `https://api.openai.com/v1/chat/completions`;
  }
};
const nearLlama = async (question) => {
  return asyncFetch(`https://ai.near.social/api`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    responseType: "json",
    body: JSON.stringify([{ role: "system", content: data.prompt }, question]),
  }).then((response) => {
    return response.body.response;
  });
};
const openAICompatible = async (question) => {
  let finalQuestion = question.content;
  let options = {
    model,
  };
  if (jsonOutputSetting) {
    options.response_format = { type: "json_object" };
    if (!finalQuestion.includes("json")) {
      finalQuestion = `${finalQuestion} respond in json`;
    }
  }

  return asyncFetch(urlForModel(model), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${credential}`,
    },
    responseType: "json",
    body: JSON.stringify({
      ...options,
      messages: [
        { role: "system", content: data.prompt },
        {
          role: "user",
          content: finalQuestion,
        },
      ],
    }),
  }).then((response) => {
    const answer = response.body.choices[0].message.content;
    return answer;
  });
};

useEffect(() => {
  if (messages.length === 0 || messages[messages.length - 1].role !== "user") {
    return;
  }
  setLoading(true);
  routeApi(...messages.slice(-1))
    .then((answer) => {
      const wallRegex = /```wall\s*([\s\S]*?)\s*```/;
      const answerNoWalls = answer.replace(wallRegex, "");

      setMessages([...messages, { role: "system", content: answerNoWalls }]);
      setAnswer(answer);
    })
    .finally(() => {
      setLoading(false);
    });
}, [messages]);

const submitQuestion = () => {
  setMessages([...messages, { role: "user", content: question }]);
  setAnswer("");
  setQuestion("");
};
const requiresCredentials = (model) => {
  return (
    model === "gpt-4" ||
    model === "gpt-3.5-turbo" ||
    model === "mixtral-8x7b-32768" ||
    model === "llama2-70b-4096"
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  padding: 48px;
`;

const Overview = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 1em;
`;

const Header = styled.h1`
  font-size: 24px;
  line-height: 39px;
  color: #11181c;
  margin-bottom: 20px;
  font-weight: 600;
`;
const Text = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 20px;
  color: ${(p) => (p.bold ? "#11181C" : "#687076")};
  font-weight: ${(p) => (p.bold ? "600" : "400")};
  font-size: ${(p) => (p.small ? "12px" : "14px")};

  i {
    margin-right: 4px;
  }
`;
const Prompt = styled.p`
  font-family: monospace;
  font-size: 14px;
  overflow-y: auto;
  height: 100px;
`;
const Label = styled.span`
  font-weight: 600;
`;
const Settings = styled.div`
  margin-bottom: 1em;
  z-index: 1000;
`;
const Controls = styled.div`
  margin-bottom: 1em;
`;
const CardControl = styled.div`
  cursor: pointer;
  color: var(--violet8);
  margin-bottom: 1em;
`;
const AllSettings = styled.div``;
const InputWrapper = styled.div`
  padding-bottom: 1em;
`;
const Question = styled.input`
  border-top-left-radius: 2rem;
  border-bottom-left-radius: 2rem;
`;
const UserMessage = styled.div``;
const AgentMessage = styled.div`
  background-color: #f9f9f9;
`;
const TC = styled.td`
  padding: 12px;
`;

const renderSettings = () => {
  return (
    <Settings>
      <CardControl bold onClick={toggleSettings}>
        <i className={settingsOpen ? "ph ph-caret-up" : "ph ph-caret-down"} />{" "}
        Settings
      </CardControl>
      {settingsOpen && (
        <AllSettings>
          <InputWrapper>
            <Widget
              src="near/widget/DIG.Input"
              props={{
                label: "Walls API Endpoint",
                assistiveText: "Enter the API endpoint for managing walls",
                iconLeft: "ph-bold ph-link",
                onInput: (e) => setWallsApiEndpoint(e.target.value),
                value: wallsApiEndpoint,
                onKeyPress: (e) => {
                  if (e.key === "Enter") {
                    connectBackend();
                  }
                },
                inputProps: {
                  endAdornment: (
                    <Widget
                      src="near/widget/DIG.Button"
                      props={{
                        onClick: connectBackend,
                        variant: "affirmative",
                        size: "small",
                        disabled: connecting,
                        icon: connecting ? (
                          <span
                            className="spinner-grow spinner-grow-sm"
                            role="status"
                            aria-hidden="true"
                          />
                        ) : (
                          <i className="ph-bold ph-check" />
                        ),
                      }}
                    />
                  ),
                },
              }}
            />
          </InputWrapper>

          <InputWrapper>
            <Widget
              src="near/widget/DIG.InputSelect"
              props={{
                groups: [
                  {
                    label: "NEAR",
                    items: [
                      {
                        label: "NEAR Llama 7b",
                        value: "near-llama-7b",
                      }
                    ],
                  },
                  {
                    label: "Groq",
                    items: [
                      {
                        label: "Mixtral 8x7b 32768",
                        value: "mixtral-8x7b-32768",
                      },
                      {
                        label: "Llama2 70b 4096",
                        value: "llama2-70b-4096",
                      },
                    ],
                  },
                  {
                    label: "OpenAI",
                    items: [
                      {
                        label: "GPT-4",
                        value: "gpt-4",
                      },
                      {
                        label: "GPT-3.5 turbo",
                        value: "gpt-3.5-turbo",
                      },
                    ],
                  },
                  {
                    label: "Local",
                    items: [
                      {
                        label: "Local",
                        value: "local",
                      },
                    ],
                  },
                ],
                label: "Choose Model",
                placeholder: "OpenAI GPT-3",
                rootProps: {
                  value: model,
                  onValueChange: setModel,
                },
              }}
            />
          </InputWrapper>
          {model === "local" && (
            <InputWrapper>
              <Widget
                src="near/widget/DIG.Input"
                props={{
                  label: "Local Model URL",
                  assistiveText:
                    "OpenAI format",
                  iconLeft: "ph-bold ph-horse",
                  onInput: (e) => setLocalModel(e.target.value),
                  value: localModel,
                }}
              />
            </InputWrapper>
          )}
          <InputWrapper>
            <div className="row">
              <div className="col-3">
                <Widget
                  src="near/widget/DIG.InputSelect"
                  props={{
                    groups: [
                      {
                        label: "OpenAI, Groq, or other API Key",
                        items: [
                          {
                            label: "Bearer Token",
                            value: "bearer",
                          },
                        ],
                      },
                    ],
                    label: "Credential Type",
                    rootProps: {
                      value: credentialType,
                      onValueChange: setCredentialType,
                    },
                  }}
                />
              </div>
              <div className="col">
                <Widget
                  src="near/widget/DIG.Input"
                  props={{
                    label: "Credentials",
                    assistiveText:
                      "credentials stored in browser",
                    iconLeft: "ph-bold ph-identification-card",
                    onInput: (e) => setCredential(e.target.value),
                    value: credential,
                    type: "password",
                  }}
                />
              </div>
            </div>
          </InputWrapper>
        </AllSettings>
      )}
    </Settings>
  );
};

return (
  <Wrapper>
    <div>
      {!embedded && (
        <div>          
          <Overview>
            <div className="row">
              <div className="col-5">
                <Widget
                  src="near/widget/AI.Agent.AgentSummary"
                  props={{
                    size: "small",
                    showTags: true,
                    agent: agent,
                  }}
                />
              </div>
              <div className="col-7">
                {error && (
                  <div key="error">
                    Please make sure your server is running and adblock is
                    disabled.
                    <a
                      href="https://github.com/255BITS/trade-walls"
                      target="_blank"
                    >
                      Download trade-walls
                    </a>
                    <Widget
                      src="near/widget/DIG.Button"
                      props={{
                        onClick: connectBackend,
                        iconLeft: editIcon,
                        variant: "affirmative",
                        fill: "solid",
                        size: "large",
                        label: "Reconnect",
                        style: {
                          borderTopLeftRadius: "0rem",
                          borderBottomLeftRadius: "0rem",
                        },
                      }}
                    ></Widget>
                  </div>
                )}
                {!error && (
                  <div>You are connected to the trade-walls server.</div>
                )}

                <div key="response">{JSON.stringify(response)}</div>
              </div>
            </div>
          </Overview>
        </div>
      )}
      <WallsList></WallsList>
      <Controls>
        {renderSettings()}
        {requiresCredentials(model) && credential === "" && (
          <div className="alert alert-danger mx-3" role="alert">
            <i className="ph ph-alert-circle" /> Requires key
          </div>
        )}
        <div className="input-group">
          <Question
            type="text"
            className="form-control"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                submitQuestion();
              }
            }}
            placeholder="Name your bid, ask, quantity and tradepair. Example: 4 nano for 1 near with 100 nano"
          />
          <Widget
            src="near/widget/DIG.Button"
            props={{
              onClick: submitQuestion,
              iconLeft: editIcon,
              variant: "affirmative",
              fill: "solid",
              size: "large",
              label: "Submit",
              disabled:
                (requiresCredentials(model) && credential === "") ||
                question === "",
              style: {
                borderTopLeftRadius: "0rem",
                borderBottomLeftRadius: "0rem",
              },
            }}
          />
        </div>
      </Controls>

      <div className="d-flex flex-column-reverse">
        {messages.map(({ role, content }, i) => {
          return (
            <div key={i} className={`message ${role}`}>
              {role === "user" && (
                <UserMessage>
                  <Widget
                    src="mob.near/widget/N.ProfileLine"
                    props={{ accountId: context.accountId }}
                  />
                  <Markdown text={content} />
                </UserMessage>
              )}
              {role !== "user" && (
                <AgentMessage>
                  <ActionParser></ActionParser>
                  <Markdown text={content} />
                </AgentMessage>
              )}
            </div>
          );
        })}
        {loading && (
          <div key="loading" className={`message system`}>
            <div>
              <span
                className="spinner-grow spinner-grow-sm me-1"
                role="status"
                aria-hidden="true"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  </Wrapper>
);
