const accountId = context.accountId;

const [player, setPlayer] = useState(() => {
  const initialData = Social.getr(`${accountId}/game/player`) ?? {
    metadata: {
      name: "",
      species: "",
      class: "",
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
  <div>
    <div className="m-2">
      <h4>Create Your Character</h4>
      <div className="mb-3 p-1">
        <label for="name">Name:</label>
        <input
          id="name"
          type="text"
          placeholder="What is your character's name?"
          value={player.metadata.name}
          onChange={handleNameChange}
        />
      </div>
      <h5 className="mb-2">Avatar</h5>
      <div className="p-1">
        <Widget
          src="mob.near/widget/ImageEditorTabs"
          props={{
            image: player.metadata.image,
            onChange: handleImageChange,
          }}
        />
      </div>
      <div className="mb-3 p-1">
        <label for="description">Description:</label>
        <input
          id="description"
          type="textarea"
          rows="4"
          cols="80"
          max-length="1200"
          placeholder="What is your character's description?"
          value={player.metadata.name}
          onChange={handleNameChange}
        />
      </div>
      <div className="mb-3 p-1">
        <label for="species">Species:</label>
        <input
          id="species"
          type="text"
          placeholder="What is your character's species?"
          value={player.metadata.species}
          onChange={handleSpeciesChange}
        />
      </div>
      <div className="mb-3 p-1">
        <label for="class">Class:</label>
        <input
          id="class"
          type="text"
          placeholder="What is your character's class?"
          value={player.metadata.class}
          onChange={handleClassChange}
        />
      </div>
      <div className="mb-3 p-1">
        <label for="skill">Skill:</label>
        <input
          id="skills"
          type="text"
          placeholder="What is your character's skill?"
          value={player.metadata.skill}
          onChange={handleSkillChange}
        />
      </div>
      <div className="mb-3 p-1">
        <label for="ability">Ability:</label>
        <input
          id="ability"
          type="text"
          placeholder="What is your character's ability?"
          value={player.metadata.abililty}
          onChange={handleAbilityChange}
        />
      </div>
      <div className="mb-3 p-1">
        <label for="weakness">Weakness:</label>
        <input
          id="weakness"
          type="text"
          placeholder="What is your character's weakness?"
          value={player.metadata.weakness}
          onChange={handleWeaknessChange}
        />
      </div>
    </div>
    <div className="mb-3 p-1">
      <label for="defaultweapon">Default Weapon:</label>
      <input
        id="defaultweapon"
        type="text"
        placeholder="What is your character's default weapon?"
        value={player.metadata.defaultweapon}
        onChange={handleDefaultWeaponChange}
      />
    </div>
    <div className="m-2">
      <h4>Create Character Stats</h4>
      <div className="mb-3 p-1">
        <label for="attack">Attack:</label>
        <input
          id="attack"
          type="number"
          name="attack"
          min="0"
          max="20"
          placeholder="What is your character's attack level? (0-20)"
          value={player.metadata.attack}
          onChange={handleAttackChange}
        />
        <div className="mb-3 p-1">
          <label for="defense">Defense:</label>
          <input
            id="defense"
            type="number"
            name="defense"
            min="0"
            max="20"
            placeholder="What is your character's defense level? (0-20)"
            value={player.metadata.defense}
            onChange={handleDefenseChange}
          />
        </div>
        <div className="mb-3 p-1">
          <label for="strength">Strength:</label>
          <input
            id="strength"
            type="number"
            name="strength"
            min="0"
            max="20"
            placeholder="What is your character's strength level? (0-20)"
            value={player.metadata.strength}
            onChange={handleStrengthChange}
          />
        </div>
        <div className="mb-3 p-1">
          <label for="courage">Courage:</label>
          <input
            id="courage"
            type="number"
            name="courage"
            min="0"
            max="20"
            placeholder="What is your character's courage level? (0-20)"
            value={player.metadata.courage}
            onChange={handleCourageChange}
          />
        </div>
        <div className="mb-3 p-1">
          <label for="magic">Magic:</label>
          <input
            id="magic"
            type="number"
            name="magic"
            placeholder="What is your character's magic level? (0-20)"
            value={player.metadata.magic}
            onChange={handleMagicChange}
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
    </div>
  </div>
);
