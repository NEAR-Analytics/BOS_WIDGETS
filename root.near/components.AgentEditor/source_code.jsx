const [accountId, unused, agentName] = props.src ? props.src.split("/") : [null, null, null];

const initialData = {};

if (agentName) {
    initialData =
        props.data ??
        Social.getr(`${accountId}/agent/${agentName}`, "final") ??
        {};
}

State.init({
    initialData,
    data: initialData,
});

const debounce = (func, wait) => {
    const pause = wait || 350;
    let timeout;

    return (args) => {
        const later = () => {
            clearTimeout(timeout);
            func(args);
        };

        clearTimeout(timeout);
        timeout = setTimeout(later, pause);
    };
};

const onNameChange = debounce((e) => {
    State.update({
        data: {
            ...state.data,
            name: e.target.value,
        },
    });
});
const onDescriptionChange = debounce((e) => {
    State.update({
        data: {
            ...state.data,
            description: e.target.value,
        },
    });
});
const onPromptChange = debounce((e) => {
    State.update({
        data: {
            ...state.data,
            prompt: e.target.value,
        },
    });
});
function agentData() {
    const saveData = { agent: {} };
    saveData.agent[state.data.name] = state.data;
    return saveData;
}

const Wrapper = styled.div`
.message {
  border-radius: 2rem;  
  border: 1px solid rgb(222, 226, 230);
  padding: 1em;
  margin-bottom: 1em;

  &.system {
    margin-right: 5em;
  }

  &.system:before {
    content: "AI";
    color: #999;
  }

  &.user {
    margin-left: 5em;
  }


  p:last-child {
    margin-bottom: 0;
  }
}
`;

return (<Wrapper>
    <div className="mb-2">
        Name
        <input
            type="text"
            defaultValue={state.data.name}
            onChange={onNameChange}
        />
    </div>
    <div className="mb-2">
        Description
        <input
            type="text"
            defaultValue={state.data.description}
            onChange={onDescriptionChange}
        />
    </div>
    <div className="mb-2">
        Prompt
        <input
            type="text"
            defaultValue={state.data.prompt}
            onChange={onPromptChange}
        />
    </div>
    <div className="mb-2">
        <CommitButton data={agentData}>
            Save agent
        </CommitButton>
    </div>
</Wrapper>);