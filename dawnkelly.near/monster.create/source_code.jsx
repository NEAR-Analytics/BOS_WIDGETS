const accountId = context.accountId;

const [monster, setMonster] = useState(() => {
  const initialData = Social.getr(`${accountId}/game/monster`) ?? {
    metadata: {
      name: "",
      alignment: "",
      type: "",
      image: {},
    },
  };
  return initialData;
});

const handleNameChange = (e) => {
  const newName = e.target.value;
  setMonster((prevMonster) => ({
    ...prevMonster,
    metadata: { ...prevMonster.metadata, name: newName },
  }));
};

const maxPoints = 50;
const attack = parseInt(monster.metadata.attack) || 0;
const defense = parseInt(monster.metadata.defense) || 0;
const strength = parseInt(monster.metadata.strength) || 0;
const courage = parseInt(monster.metadata.courage) || 0;
const magic = parseInt(monster.metadata.magic) || 0;

const totalPoints = attack + defense + strength + courage + magic;

const handleImageChange = (newImage) => {
  setMonster((prevMonster) => ({
    ...prevMonster,
    metadata: { ...prevMonster.metadata, image: newImage },
  }));
};

const handleDescriptionChange = (e) => {
  const newDescription = e.target.value;
  setMonster((prevMonster) => ({
    ...prevMonster,
    metadata: { ...prevMonster.metadata, description: newDescription },
  }));
};

const handleAlignmentChange = (e) => {
  const newAlignment = e.target.value;
  setMonster((prevMonster) => ({
    ...prevMonster,
    metadata: { ...prevMonster.metadata, alignment: newAlignment },
  }));
};

const handleTypeChange = (e) => {
  const newType = e.target.value;
  setMonster((prevMonster) => ({
    ...prevMonster,
    metadata: { ...prevMonster.metadata, type: newType },
  }));
};

const handleSizeChange = (e) => {
  const newSize = e.target.value;
  setMonster((prevMonster) => ({
    ...prevMonster,
    metadata: { ...prevMonster.metadata, size: newSize },
  }));
};

const handleChallengeChange = (e) => {
  const newChallenge = e.target.value;
  setMonster((prevMonster) => ({
    ...prevMonster,
    metadata: { ...prevMonster.metadata, challenge: newChallenge },
  }));
};

const handleWeaknessChange = (e) => {
  const newWeakness = e.target.value;
  setMonster((prevMonster) => ({
    ...prevMonster,
    metadata: { ...prevMonster.metadata, weakness: newWeakness },
  }));
};

const handleDefaultWeaponChange = (e) => {
  const newDefaultWeapon = e.target.value;
  setMonster((prevMonster) => ({
    ...prevMonster,
    metadata: { ...prevMonster.metadata, defaultWeapon: newDefaultWeapon },
  }));
};

const handleAttackChange = (e) => {
  const newAttack = e.target.value;
  setMonster((prevMonster) => ({
    ...prevMonster,
    metadata: { ...prevMonster.metadata, attack: newAttack },
  }));
};

const handleDefenseChange = (e) => {
  const newDefense = e.target.value;
  setMonster((prevMonster) => ({
    ...prevMonster,
    metadata: { ...prevMonster.metadata, defense: newDefense },
  }));
};

const handleStrengthChange = (e) => {
  const newStrength = e.target.value;
  setMonster((prevMonster) => ({
    ...prevMonster,
    metadata: { ...prevMonster.metadata, strength: newStrength },
  }));
};

const handleCourageChange = (e) => {
  const newCourage = e.target.value;
  setMonster((prevMonster) => ({
    ...prevMonster,
    metadata: { ...prevMonster.metadata, courage: newCourage },
  }));
};

const handleMagicChange = (e) => {
  const newMagic = e.target.value;
  setMonster((prevMonster) => ({
    ...prevMonster,
    metadata: { ...prevMonster.metadata, magic: newMagic },
  }));
};

const isValidPoints = totalPoints <= maxPoints;

const handleSave = () => {
  Social.set({
    game: { monster },
  });
};

return (
  <div>
    <div className="m-2">
      <h4>Create A Monster</h4>
      <div className="mb-3 p-1">
        <label for="name">Name:</label>
        <input
          id="name"
          type="text"
          placeholder="What is the monster's name?"
          value={monster.metadata.name}
          onChange={handleNameChange}
        />
      </div>
      <h5 className="mb-2">Monster Image</h5>
      <div className="p-1">
        <Widget
          src="mob.near/widget/ImageEditorTabs"
          props={{
            image: monster.metadata.image,
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
          placeholder="What is the monster's description?"
          value={monster.metadata.description}
          onChange={handleDescriptionChange}
        />
      </div>
      <div className="mb-3 p-1">
        <span>Hold Control or Command to select more than one:</span>
        <br></br>
        <label for="alignment">Alignment:</label>
        <select
          name="alignment"
          id="alignment"
          multiple
          value={monster.metadata.alignment}
          onChange={handleAlignmentChange}
        >
          <option value="good">Good</option>
          <option value="neutral">Neutral</option>
          <option value="evil">Evil</option>
          <option value="lawful">Lawful</option>
          <option value="chaotic">Chaotic</option>
          <option value="any">Any</option>
          <option value="unaligned">Unaligned</option>
        </select>
      </div>
      <div className="mb-3 p-1">
        <span>Hold Control or Command to select more than one:</span>
        <br></br>
        <label for="type">Type:</label>
        <select
          name="type"
          id="type"
          multiple
          value={monster.metadata.type}
          onChange={handleTypeChange}
        >
          <option value="abberation">Abberation</option>

          <option value="beast">Beast</option>
          <option value="celestial">Celestial</option>
          <option value="dragon">Dragon</option>
          <option vlaue="elemental">Elemental</option>
          <option value="fey">Fey</option>
          <option value="fiend">Fiend</option>
          <option value="giant">Giant</option>
          <option value="humanoid">Humanoid</option>
          <option value="monstrosity">Monstrosity</option>
          <option value="ooze">Ooze</option>
          <option value="plant">Plant</option>
          <option value="undead">Undead</option>
        </select>
      </div>
      <div className="mb-3 p-1">
        <label for="size">Size:</label>
        <select
          name="size"
          id="size"
          value={monster.metadata.size}
          onChange={handleSizeChange}
        >
          <option value="tiny">Tiny</option>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
          <option value="huge">Huge</option>
          <option value="gargantuan">Gargantuan</option>
        </select>
      </div>
      <div className="mb-3 p-1">
        <label for="challenge">Challenge:</label>
        <input
          id="challenge"
          type="number"
          min="0"
          max="30"
          placeholder="What is the monster's challenge level?"
          value={monster.metadata.challenge}
          onChange={handleChallengeChange}
        />
      </div>
      <div className="mb-3 p-1">
        <label for="armorClass">Armor Class:</label>
        <input
          id="armorClass"
          type="number"
          min="0"
          max="25"
          placeholder="What is the monster's armor class?"
          value={monster.metadata.armorClass}
          onChange={handlearmorClassChange}
        />
      </div>
    </div>
    <div className="mb-3 p-1">
      <label for="hitPoints">HP:</label>
      <input
        name="hitPoints"
        id="hitPoints"
        type="number"
        min="0"
        placeholder="What is the monster's HP?"
        value={monster.metadata.hitPoints}
        onChange={handlehitPointsChange}
      />
    </div>
    <div className="m-2">
      <div className="m-3">
        <button
          className="btn btn-outline-success"
          disabled={!context.accountId || !isValidPoints}
          onClick={handleSave}
        >
          Save
        </button>
      </div>
      <hr />
      <div className="m-3">
        <h5 className="mb-2">Preview</h5>
        <Widget
          src="dawnkelly.near/widget/monster.inline"
          props={{
            accountId,
            monster,
          }}
        />
      </div>
    </div>
  </div>
);
