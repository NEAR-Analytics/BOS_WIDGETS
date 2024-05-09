const accountId = context.accountId;

const [player, setPlayer] = useState(() => {
  const initialData = Social.getr(`${accountId}/game/player`) ?? {
    metadata: {
      name: "",
      description: "",
      species: "",
      class: "",
      skill: "",
      ability: "",
      weakness: "",
      defaultWeapon: "",
      attack: "",
      defense: "",
      strength: "",
      courage: "",
      magic: "",
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
const maxPoints = 50;
const attack = parseInt(player.metadata.attack) || 0;
const defense = parseInt(player.metadata.defense) || 0;
const strength = parseInt(player.metadata.strength) || 0;
const courage = parseInt(player.metadata.courage) || 0;
const magic = parseInt(player.metadata.magic) || 0;

const totalPoints = attack + defense + strength + courage + magic;

const handleImageChange = (newImage) => {
  setPlayer((prevPlayer) => ({
    ...prevPlayer,
    metadata: { ...prevPlayer.metadata, image: newImage },
  }));
};

const handleDescriptionChange = (e) => {
  const newDescription = e.target.value;
  setPlayer((prevPlayer) => ({
    ...prevPlayer,
    metadata: { ...prevPlayer.metadata, description: newDescription },
  }));
};

const handleSpeciesChange = (e) => {
  const newSpecies = e.target.value;
  setPlayer((prevPlayer) => ({
    ...prevPlayer,
    metadata: { ...prevPlayer.metadata, species: newSpecies },
  }));
};

const handleClassChange = (e) => {
  const newClass = e.target.value;
  setPlayer((prevPlayer) => ({
    ...prevPlayer,
    metadata: { ...prevPlayer.metadata, class: newClass },
  }));
};

const handleSkillChange = (e) => {
  const newSkill = e.target.value;
  setPlayer((prevPlayer) => ({
    ...prevPlayer,
    metadata: { ...prevPlayer.metadata, skill: newSkill },
  }));
};

const handleAbilityChange = (e) => {
  const newAbility = e.target.value;
  setPlayer((prevPlayer) => ({
    ...prevPlayer,
    metadata: { ...prevPlayer.metadata, ability: newAbility },
  }));
};

const handleWeaknessChange = (e) => {
  const newWeakness = e.target.value;
  setPlayer((prevPlayer) => ({
    ...prevPlayer,
    metadata: { ...prevPlayer.metadata, weakness: newWeakness },
  }));
};

const handleDefaultWeaponChange = (e) => {
  const newDefaultWeapon = e.target.value;
  setPlayer((prevPlayer) => ({
    ...prevPlayer,
    metadata: { ...prevPlayer.metadata, defaultWeapon: newDefaultWeapon },
  }));
};

const handleAttackChange = (e) => {
  const newAttack = e.target.value;
  setPlayer((prevPlayer) => ({
    ...prevPlayer,
    metadata: { ...prevPlayer.metadata, attack: newAttack },
  }));
};

const handleDefenseChange = (e) => {
  const newDefense = e.target.value;
  setPlayer((prevPlayer) => ({
    ...prevPlayer,
    metadata: { ...prevPlayer.metadata, defense: newDefense },
  }));
};

const handleStrengthChange = (e) => {
  const newStrength = e.target.value;
  setPlayer((prevPlayer) => ({
    ...prevPlayer,
    metadata: { ...prevPlayer.metadata, strength: newStrength },
  }));
};

const handleCourageChange = (e) => {
  const newCourage = e.target.value;
  setPlayer((prevPlayer) => ({
    ...prevPlayer,
    metadata: { ...prevPlayer.metadata, courage: newCourage },
  }));
};

const handleMagicChange = (e) => {
  const newMagic = e.target.value;
  setPlayer((prevPlayer) => ({
    ...prevPlayer,
    metadata: { ...prevPlayer.metadata, magic: newMagic },
  }));
};

const isValidPoints = totalPoints <= maxPoints;

const handleSave = () => {
  Social.set({
    game: { player },
    index: {
      createPlayer: JSON.stringify({ key: "create", value: "player" }),
    },
  });
};

return (
  <div>
    <div className="m-2">
      <h4>Create Your Character</h4>
      <p>You will have a chance to preview your creation before saving</p>
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
          value={player.metadata.description}
          onChange={handleDescriptionChange}
        />
      </div>
      <div className="mb-3 p-1">
        <label for="species">Species:</label>
        <select
          name="species"
          id="species"
          className="form-select"
          value={player.metadata.species}
          onChange={handleSpeciesChange}
        >
          <option value="null">---</option>
          <option value="dwarf">Dwarf</option>
          <option value="orc">Orc</option>
          <option value="human">Human</option>
          <option value="elf">Elf</option>
          <option value="halfling">Halfling</option>
          <option value="human">Human</option>
          <option value="dragonborn">Dragonborn</option>
          <option value="gnome">Gnome</option>
          <option value="tiefling">Tiefling</option>
        </select>
      </div>
      <div className="mb-3 p-1">
        <label for="class">Class:</label>
        <select
          name="class"
          id="class"
          className="form-select"
          value={player.metadata.class}
          onChange={handleClassChange}
        >
          <option value="null">---</option>
          <option value="barbarian">Barbarian</option>
          <option value="bard">Bard</option>
          <option value="cleric">Cleric</option>
          <option value="druid">Druid</option>
          <option value="fighter">Fighter</option>
          <option value="archer">Archer</option>
          <option vlaue="knight">Knight</option>
          <option value="monk">Monk</option>
          <option value="paladin">Paladin</option>
          <option value="ranger">Ranger</option>
          <option value="sorcerer">Sorceror</option>
          <option value="wizard">Wizard</option>
        </select>
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
      <select
        name="defaultweapon"
        id="defaultweapon"
        className="form-select"
        value={player.metadata.defaultweapon}
        onChange={handleDefaultWeaponChange}
      >
        <option value="null">---</option>
        <option value="bladeRadiance">Blade of Radiance</option>
        <option value="moonShadowBow">Moon Shadow Bow</option>
        <option value="thunderForgeHammer">Thunderforge War Hammer</option>
        <option value="celestialStaff">Celestial Staff</option>
        <option value="shadowScepter">Shadow Scepter</option>
        <option value="obsidianCleaver">Obsidian Cleaver</option>
        <option vlaue="graspingGauntlets">Grasping Gauntlents</option>
        <option value="voidDagger">Void Dagger</option>
      </select>
    </div>
    <div className="m-2">
      <h4>Create Character Stats</h4>
      <h6>
        You have up to 50 points to assign to your character stats. For optimal
        playing experience, we suggest no more than 20 points be assigned to a
        single category.
      </h6>
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
            min="0"
            max="20"
            placeholder="What is your character's magic level? (0-20)"
            value={player.metadata.magic}
            onChange={handleMagicChange}
          />
        </div>
      </div>
      <div className="m-3">
        <h5 className="mb-2">Preview</h5>
        <p>If you are happy with your creation, be sure to click 'Save'</p>
        <Widget
          src="dawnkelly.near/widget/player.inline"
          props={{
            accountId,
            player,
          }}
        />
      </div>
      <hr />
      <div className="m-3">
        <button
          className="btn btn-outline-success"
          disabled={!context.accountId || !isValidPoints}
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  </div>
);
