const props_IsCollapsted = props.isCollapsed || true;
const tools = props.tools || [];
const role = props.role || "Helpful Assistant";
const backstory =
  props.backstory ||
  "You are an experienced assistant. You have many years of experience helping people.";
const goal =
  props.goal ||
  "Your goal is to assist the best way possible user requests. You have the capability of making decisions";

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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 48px;
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

  nearLlama(_messages)
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

      setLoading(false);
    })
    .catch((error) => {
      console.error("Error:", error);
      setLoading(false); // Ensure loading is stopped in case of error
    });
};

useEffect(() => {
  setMessages([]);
}, [task]);

return (
  <>
    <button
      className="btn btn-dark w-100"
      onClick={() => setIsCollapsed(!isCollapsed)}
    >
      {isCollapsed ? role : ""}
    </button>
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
            <h1>{role}</h1>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    run();
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

              {messages.length > 0 && !loading && (
                <button
                  onClick={() => run()}
                  className="btn btn-dark w-100 mt-2"
                >
                  Continue
                </button>
              )}
            </div>
          </div>
        </Wrapper>
      </ModalBody>
    </ModalOverlay>
  </>
);
