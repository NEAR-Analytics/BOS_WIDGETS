const accountId = context.accountId;

const [background, setBackground] = useState(() => {
  const initialData = Social.getr(`${accountId}/frame/background`) ?? {
    metadata: {
      altText: "",
      image: {},
    },
  };
  return initialData;
});

const handleAltTextChange = (e) => {
  const newAltText = e.target.value;
  setBackground((prevBackground) => ({
    ...prevBackground,
    metadata: { ...prevBackground.metadata, altText: newAltText },
  }));
};

const handleImageChange = (newImage) => {
  setBackground((prevBackground) => ({
    ...prevBackground,
    metadata: { ...prevBackground.metadata, image: newImage },
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
    frame: { background },
    index: {
      createBackground: JSON.stringify({ key: "create", value: "background" }),
    },
  });
};

{
  /**const handleAltTextChange = (e) => {
  const newAltText = e.target.value;
  setBackground((prevBackground) => ({
    ...prevBackground,
    metadata: { ...prevBackground.metadata, altText: newAltText },
  }));
}; */
}

return (
  <div>
    <div className="m-2">
      <h4>Create Your Background</h4>
      <p>You will have a chance to preview your creation before saving</p>
      <div className="mb-3 p-1">
        <label for="alt">Alt Text:</label>
        <input
          id="alt"
          type="text"
          placeholder="Describe the image for screen reader accessibility"
          value={background.metadata.altText}
          onChange={handleAltTextChange}
        />
      </div>
      <h5 className="mb-2">Background Image</h5>
      <div className="p-1">
        <Widget
          src="mob.near/widget/ImageEditorTabs"
          props={{
            image: background.metadata.image,
            onChange: handleImageChange,
          }}
        />
      </div>
      <div className="m-3">
        <h5 className="mb-2">Preview</h5>
        <p>If you are happy with your creation, be sure to click 'Save'</p>
        <Widget
          src="dawnkelly.near/widget/deform.inline"
          props={{
            accountId,
            image,
          }}
        />
      </div>
      <hr />
      <div className="m-3">
        <button
          className="btn btn-outline-success"
          disabled={!context.accountId}
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  </div>
);
