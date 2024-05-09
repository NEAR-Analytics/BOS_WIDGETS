const accountId = context.accountId;

const [player, setPlayer] = useState(() => {
  const initialData = Social.getr(`${accountId}/game/player`) ?? {
    metadata: {
      name: "",
      image: {},
    },
  };
  return initialData;
});

const handleNameChange = (e) => {
  const newName = e.target.value;
  setPlayer((prevPlayer) => ({
    ...prevPlayer,
    metadata: { ...prevPlayer.metadata, name: newName },
  }));
};

const handleImageChange = (newImage) => {
  setPlayer((prevPlayer) => ({
    ...prevPlayer,
    metadata: { ...prevPlayer.metadata, image: newImage },
  }));
};

const handleSave = () => {
  Social.set({
    game: { player },
  });
};

return (
  <>
    <div className="m-2">
      <h4>Create Your Own Avatar</h4>
      <div className="mb-3 p-1">
        <input
          type="text"
          placeholder="What is your character's name?"
          value={player.metadata.name}
          onChange={handleNameChange}
        />
      </div>
      <h5 className="mb-2">Picture</h5>
      <div className="p-1">
        <Widget
          src="mob.near/widget/ImageEditorTabs"
          props={{
            image: player.metadata.image,
            onChange: handleImageChange,
          }}
        />
      </div>
    </div>
    <div className="m-3">
      <button
        className="btn btn-outline-success"
        disabled={!context.accountId}
        onClick={handleSave}
      >
        Save
      </button>
    </div>
    <hr />
    <div className="m-3">
      <h5 className="mb-2">Preview</h5>
      <Widget
        src="james.near/widget/player.inline"
        props={{
          accountId,
          player,
        }}
      />
    </div>
  </>
);
