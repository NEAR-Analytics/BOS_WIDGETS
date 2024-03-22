const storedModel = Storage.get("agent-model");
const storedLocalModel = Storage.get("agent-local-model");
const storedCredentialType = Storage.get("agent-credential-type");
const storedCredential = Storage.get("agent-credential");
const storedJsonOutputSetting = Storage.get("agent-json-output-setting");

const props_IsCollapsted = props.isCollapsed || true;
const tools = props.tools || [];
const props_model = props.model || "near-llama-7b";
const role = props.role || "Helpful Assistant";
const backstory =
  props.backstory ||
  "You are an experienced assistant. You have many years of experience helping people.";
const goal =
  props.goal ||
  "Your goal is to assist the best way possible user requests. You have the capability of making decisions";
const executionCallback = props.executionCallback || null;

const ACTION_PREFIX = "Action:";
const ACTION_INPUT_PREFIX = "Action Input:";
const OBSERVATION_PREFIX = "Observation:";
const FINAL_ANSWER_PREFIX = "Final Answer:";
const THOUGHT_PREFIX = "Thought:";
const MAX_ITERATIONS_DEFAULT = 100;

const [task, setTask] = useState("");
const [scratchPad, setScratchPad] = useState("");
const [messages, setMessages] = useState([]);
const [loading, setLoading] = useState(false);
const [isCollapsed, setIsCollapsed] = useState(props_IsCollapsted);
const [isLoop, setIsLoop] = useState(false);
const [settingsOpen, setSettingsOpen] = useState(false);

const [model, setModel] = useState(props_model ?? storedModel);
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

useEffect(() => {
  if (messages.length === 0 || messages[messages.length - 1].role !== "user") {
    return;
  }
  setLoading(true);
  routeApi(...messages.slice(-1))
    .then((answer) => {
      setMessages([...messages, { role: "system", content: answer }]);
    })
    .finally(() => {
      setLoading(false);
    });
}, [messages]);

const requiresCredentials = (model) => {
  return (
    model === "gpt-4" ||
    model === "gpt-3.5-turbo" ||
    model === "mixtral-8x7b-32768" ||
    model === "llama2-70b-4096"
  );
};

const routeApi = async (messages) => {
  switch (model) {
    case "near-llama-7b":
      return nearLlama(messages);
    default:
      return openAICompatible(messages);
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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 24px;
`;

const ModalOverlay = styled.div`
  display: ${({ isCollapsed }) => (isCollapsed ? "none" : "block")};
  position: fixed;
  z-index: 1050;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalBody = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  z-index: 1055;
  background: white;
  border-radius: 5px;
  width: 90%;
  height: 90%;
  overflow-y: auto;
`;

const Settings = styled.div`
  margin-top: 1em;
  z-index: 1000;
`;

const CardControl = styled.div`
  cursor: pointer;
  color: var(--violet8);
  margin-bottom: 1em;
`;

const InputWrapper = styled.div`
  padding-bottom: 1em;
`;

const buildPrompt = (tools, role, goal, backstory) => `
  You are ${role}.
  ${backstory}
  
  Your personal goal is: ${goal}
  
  ${
    tools.length > 0 &&
    tools.map((tool) => {
      return `
    TOOLS:
    ------
    You have access to the following tools:
    ${tool.name} - ${tool.description} - for this tool input MUST be ${
        tool.inputDescription ?? "null"
      }\n`;
    })
  }
  
  Use the following format in your response:
  
  ${THOUGHT_PREFIX} Do I need to use a tool? Yes
  ${ACTION_PREFIX} the action to take, should be one of [${tools
  .map((tool) => tool.name)
  .join(",")}]
  ${ACTION_INPUT_PREFIX} the input to the action
  ${OBSERVATION_PREFIX} the result of the action
  
  ... (this Thought/Action/Action Input/Observation can repeat N times)
  
  When you have a response for your task, or if you DO NOT need to use a tool, you MUST use the format:
  
  ${THOUGHT_PREFIX} Do I need to use a tool? No
  ${FINAL_ANSWER_PREFIX} the final answer to the original input question
  
  Begin! Solve the following tasks as best you can. This is VERY important to you, your job depends on it!
  `;

const parseMessageToStructuredFormatWithRegex = (message) => {
  const result = { actions: [], observations: [], finalAnswer: "" };
  const lines = message.split("\n");

  // Updated regex to capture tool name and action separately
  const actionRegex = /^Action: (.+)/;
  const actionInputRegex = /^Action Input: (.+)/;
  const observationRegex = /^Observation: (.+)/;
  const finalAnswerRegex = /^Final Answer: (.+)/;

  lines.forEach((line) => {
    let match;
    if ((match = line.match(actionRegex))) {
      // Directly add action details to the actions array
      const tool = match[1];
      const content = match[2];
      result.actions.push({ tool, content }); // Assuming the next line is always the action input
    } else if ((match = line.match(actionInputRegex))) {
      // Attach input to the last action
      const lastAction = result.actions[result.actions.length - 1];
      if (lastAction) {
        lastAction.input = match[1];
      }
    } else if ((match = line.match(observationRegex))) {
      // Add observation
      result.observations.push({ content: match[1] });
    } else if ((match = line.match(finalAnswerRegex))) {
      // Set final answer
      result.finalAnswer = match[1];
    }
  });

  // Convert the result object to the expected array format
  const formattedResult = [];
  if (result.actions.length > 0) {
    formattedResult.push({ type: "actions", actions: result.actions });
  }
  result.observations.forEach((observation) => {
    formattedResult.push({ type: "observation", content: observation.content });
  });
  if (result.finalAnswer) {
    formattedResult.push({ type: "finalAnswer", content: result.finalAnswer });
  }

  return formattedResult;
};

const nearLlama = async (messages) => {
  return asyncFetch(`https://ai.near.social/api`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    responseType: "json",
    body: JSON.stringify(messages),
  }).then((response) => {
    return response.body.response;
  });
};

const openAICompatible = async (messages) => {
  let options = {
    model,
  };
  //  if (jsonOutputSetting) {
  //    options.response_format = { type: "json_object" };
  //    if (!finalQuestion.includes("json")) {
  //      finalQuestion = `${finalQuestion} respond in json`;
  //    }
  //  }
  // frequency_penalty: 0.0,
  // logit_bias: {},
  // log_props: true,
  // top_logprobs: 5,
  // max_tokens: 2048,
  // n: 1,
  // presence_penalty: 0.0,
  // seed: 0,
  // stop: ["\n"],
  // stream: false,
  // temperature: 0.7,
  // top_p: 1,
  // tools: agent.tools,
  // tool_choice: 'auto',
  // user: anonymize(context.accountId),

  return asyncFetch(urlForModel(model), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${credential}`,
    },
    responseType: "json",
    body: JSON.stringify({
      ...options,
      messages: messages,
    }),
  }).then((response) => {
    const answer = response.body.choices[0].message.content;
    return answer;
  });
};

const toolToUse = (tool) => {
  return tools.find((tool) => tool.name === action.tool);
};

const run = () => {
  let iteration = Math.ceil(messages.length / 2);
  let _scratchPad = scratchPad || "";

  if (iteration >= MAX_ITERATIONS_DEFAULT) {
    setLoading(false);
    console.log("Max iterations reached or stopping condition met");
    return; // Stop the iteration loop
  }

  setLoading(true);

  const systemPrompt = `
    ${buildPrompt(tools, role, goal, backstory)}
    Current task: ${task}\n
  `;

  const userPrompt = `The SCRATCHPAD contains the context you're working with! I only see what you return as "${FINAL_ANSWER_PREFIX}"\nYou have ${
    MAX_ITERATIONS_DEFAULT - iteration
  } iterations left to provide a final answer.\n Here is the SCRATCHPAD:\n----
    """
    ${_scratchPad}
    """
  `;

  const _messages = [
    { role: "system", content: systemPrompt },
    { role: "user", content: userPrompt },
  ];

  routeApi(_messages)
    .then((response) => {
      let _scratchPad = "";
      const parsedResponse = parseMessageToStructuredFormatWithRegex(response);

      for (const activity of parsedResponse) {
        if (activity.type === "observation") {
          _scratchPad += `${OBSERVATION_PREFIX} ${activity.content}\n`;
        }

        if (activity.type === "finalAnswer") {
          _scratchPad += `${OBSERVATION_PREFIX} ${activity.content}\n`;
        }

        if (activity.type === "actions") {
          for (const action of activity.actions) {
            const tool = toolToUse(action.tool);

            if (tool) {
              /** TODO: Implement tool execution */
              // The execution of tools can only be synchronous for now

              const toolResult = tool.callback(action?.input);

              if (toolResult) {
                _scratchPad += `${OBSERVATION_PREFIX} tool used "${action.tool}"\n${OBSERVATION_PREFIX} ${toolResult}\n`;
              } else {
                /** DO NOTHING FOR NOW */
              }
            } else {
              _scratchPad += `${OBSERVATION_PREFIX} ${action.tool} does not exist\n`;
            }
          }
        }
      }

      setScratchPad(_scratchPad);

      const newMessages = [
        ...messages,
        { role: "assistant", content: _scratchPad, activity: parsedResponse },
      ];

      setMessages(newMessages);

      if (executionCallback) {
        executionCallback({
          messages: newMessages,
          scratchPad: _scratchPad,
          activity: parsedResponse,
          state: {
            messages,
          },
        });
      }

      setLoading(false);
    })
    .catch((error) => {
      console.error("Error:", error);
      setLoading(false); // Ensure loading is stopped in case of error
    });
};

const toggleSettings = () => {
  setSettingsOpen(!settingsOpen);
};

const renderSettings = () => {
  return (
    <div>
      <Settings>
        <CardControl bold onClick={toggleSettings}>
          Settings
        </CardControl>
      </Settings>
      <ModalOverlay isCollapsed={!settingsOpen} onClick={toggleSettings}>
        <ModalBody onClick={(e) => e.stopPropagation()}>
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
                      },
                      // Hi hackathon teams, implementing calls to gpt4.near? Add it here. - the black dragon
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
                    "Any url that accepts messages in OpenAI format",
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
                      "Your OpenAI API Key or other credentials, will be stored in your browser.",
                    iconLeft: "ph-bold ph-identification-card",
                    onInput: (e) => setCredential(e.target.value),
                    value: credential,
                    type: "password",
                  }}
                />
              </div>
            </div>
          </InputWrapper>
          <InputWrapper>
            <Widget
              src="near/widget/DIG.Checkbox"
              props={{
                id: "json-output",
                label: "JSON Output mode",
                checked: jsonOutputSetting,
                onCheckedChange: setJsonOutputSetting,
              }}
            />{" "}
            not supported by all providers.
          </InputWrapper>
          <InputWrapper>
            <Widget
              src="near/widget/DIG.Checkbox"
              props={{
                id: "loop",
                label: "Run in a loop",
                checked: isLoop,
                onCheckedChange: setIsLoop,
              }}
            />
          </InputWrapper>
        </ModalBody>
      </ModalOverlay>
    </div>
  );
};

const clear = () => {
  setMessages([]);
  setLoading(false);
  setScratchPad("");
};

useEffect(() => {
  setMessages([]);
}, [task]);

useEffect(() => {
  if (messages.length > 0 && isLoop) {
    run();
  }
}, [messages]);

return (
  <div className="card">
    <div class="card-body">
      <div class="d-flex gap-2">
        <h5 class="card-title">{role}</h5>
        {messages.length > 0 && (
          <h5 class="badge rounded-pill bg-secondary">
            messages: {messages.length}
          </h5>
        )}
      </div>
      <p class="card-text">{goal}</p>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              run();
              setIsCollapsed(false);
            }
          }}
          placeholder="What's your goal?"
          autoFocus
        />
        <Widget
          src="near/widget/DIG.Button"
          className="btn btn-dark w-100"
          props={{
            onClick: () => run(),
            variant: "affirmative",
            fill: "solid",
            size: "large",
            label: "Submit",
            style: {
              borderTopLeftRadius: "0rem",
              borderBottomLeftRadius: "0rem",
            },
          }}
        />
      </div>
      <div className="d-flex gap-2">
        <button
          className="flex-grow-3 btn w-100"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? "Open run" : "Hide run"}
        </button>
        {isLoop && loading && (
          <button onClick={() => setIsLoop(false)} className="btn w-100">
            Stop
          </button>
        )}
        {messages.length > 0 && !loading && (
          <button onClick={() => clear()} className="btn w-100">
            Clear
          </button>
        )}
      </div>
      {renderSettings()}
    </div>
    <div class="card-footer d-flex gap-2 justify-content-between">
      <div class="d-flex gap-2">
        <small class="text-muted">µnstoppable agent</small>
        {loading && (
          <div key="loading" className={`d-flex align-items-center`}>
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
      <div>
        <small class="badge rounded-pill bg-secondary">{model}</small>
        <small class="badge rounded-pill bg-secondary">
          {isLoop ? "continuous mode" : "non-continuous mode"}
        </small>
        <small class="text-muted">
          {tools.map((tool) => tool.name).join(", ")}
        </small>
      </div>
    </div>

    <ModalOverlay
      isCollapsed={isCollapsed}
      onClick={() => setIsCollapsed(true)}
    >
      <ModalBody onClick={(e) => e.stopPropagation()}>
        <Widget
          src="near/widget/DIG.Button"
          className="btn btn-dark"
          props={{
            onClick: () => setIsCollapsed(true),
            fill: "solid",
            size: "small",
            label: "Close",
            style: {
              position: "absolute",
              top: "10px",
              right: "10px",
              borderRadius: "100000px",
            },
          }}
        />
        <Wrapper>
          <div className={isCollapsed ? "collapse" : ""}>
            <h3>{role}</h3>

            <div className="flex-fill overflow-auto px-4 py-2 space-y-2">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className="p-2 bg-light rounded shadow-sm d-flex flex-column mb-2"
                >
                  <div>
                    {message.role === "assistant" &&
                      message.activity.map((result, index) => {
                        if (result.type === "actions") {
                          return result.actions.map((action, index) => (
                            <div
                              key={index}
                              className="text-sm d-flex flex-column mb-4"
                            >
                              <div className="fw-bold">Action</div>
                              <div className="text-sm">Tool: {action.tool}</div>
                              <div className="text-sm">
                                Input: {action.input}
                              </div>
                              {toolToUse(action.tool) && (
                                <button>Execute</button>
                              )}
                            </div>
                          ));
                        }
                        if (result.type === "observation") {
                          return (
                            <div
                              key={index}
                              className="text-sm mb-4 d-flex flex-column"
                            >
                              <div className="fw-bold">Observation </div>
                              {result.content}
                            </div>
                          );
                        }
                        if (result.type === "finalAnswer") {
                          return (
                            <div
                              key={index}
                              className="text-sm mb-4 d-flex flex-column"
                            >
                              <div className="fw-bold">Final Answer </div>
                              {result.content}
                            </div>
                          );
                        }
                      })}
                  </div>
                </div>
              ))}
              {messages.length > 0 && !loading && (
                <button
                  onClick={() => run()}
                  className="btn btn-dark w-100 mt-2"
                >
                  Continue
                </button>
              )}
              {messages.length > 0 && isLoop && loading && (
                <button
                  onClick={() => setIsLoop(false)}
                  className="btn btn-dark w-100 mt-2"
                >
                  Stop
                </button>
              )}
            </div>
          </div>
        </Wrapper>
      </ModalBody>
    </ModalOverlay>
  </div>
);
