const accountId = context.accountId;

const [player, setPlayer] = useState(() => {
  const initialData = Social.getr(`${accountId}/game/player`) ?? {
    metadata: {
      name: "",
      species: "",
      class: "",
      image: {},
      attack: 0,
      defense: 0,
      strength: 0,
      courage: 0,
      magic: 0,
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
  const newValue = e.target.value;
  setPlayer((prevPlayer) => ({
    ...prevPlayer,
    metadata: { ...prevPlayer.metadata, attack: newValue },
  }));

const handleDefenseChange = (e) => {
  const newValue = e.target.value;
  setPlayer((prevPlayer) => ({
    ...prevPlayer,
    metadata: { ...prevPlayer.metadata, defense: newValue },
  }));
};

const handleStrengthChange = (e) => {
  const newValue = e.target.value;
  setPlayer((prevPlayer) => ({
    ...prevPlayer,
    metadata: { ...prevPlayer.metadata, strength: newValue },
  }));
};

const handleCourageChange = (e) => {
  const newValue = e.target.value;
  setPlayer((prevPlayer) => ({
    ...prevPlayer,
    metadata: { ...prevPlayer.metadata, courage: newValue },
  }));
};

const handleMagicChange = (e) => {
  const newValue = e.target.value;
  setPlayer((prevPlayer) => ({
    ...prevPlayer,
    metadata: { ...prevPlayer.metadata, magic: newValue },
  }));
};

const startingStatPoints = 50;

const handlePointsChange = (category, newValue) => {
  const totalPoints = Object.values(player.metadata).reduce(
    (acc, curr) => acc + curr,
    0
  );
  const totalPointsExceptCategory = totalPoints - player.metadata[category];

  if (newValue >= 0 && newValue <= 20 && totalPointsExceptCategory + newValue <= startingStatPoints) {
      setPlayer((prevPlayer) => ({
        ...prevPlayer,
        metadata: {
          ...prevPlayer.metadata,
          [category]: newValue,
        },
      }));
}

const isButtonDisabled = !context.accountId || totalPoints > startingStatPoints;

const totalPoints = Object.values(player.metadata).reduce(
    (acc, curr) => acc + curr,
    0
  ); 
{
  /*let startingStatPoints = 50;
const usedStatPoints =
  JSON.parse(player.metadata.attack) +
  JSON.parse(player.metadata.defense) +
  JSON.parse(player.metadata.strength) +
  JSON.parse(player.metadata.courage) +
  JSON.parse(player.metadata.magic);
console.log(usedStatPoints);*/
}

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
          type="text"
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
          value={player.metadata.species}
          onChange={handleSpeciesChange}
        >
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
          value={player.metadata.class}
          onChange={handleClassChange}
        >
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
          id="skill"
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
        value={player.metadata.defaultweapon}
        onChange={handleDefaultWeaponChange}
      >
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
        You have up to 50 points to assign to your character stats. No more than
        20 points may be assigned to a single category.
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
          onChange={(e) => handlePointsChange('attack', parseInt(e.target.value))}
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
            onChange={(e) => handlePointsChange('defense', parseInt(e.target.value))}
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
            onChange={(e) => handlePointsChange('strength', parseInt(e.target.value))}
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
            onChange={(e) => handlePointsChange('courage', parseInt(e.target.value))}
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
            onChange={(e) => handlePointsChange('magic', parseInt(e.target.value))}
          />
        </div>
      </div>
      <div className="m-3">
        <button
          className="btn btn-outline-success"
          disabled={isButtonDisabled}
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
)};
