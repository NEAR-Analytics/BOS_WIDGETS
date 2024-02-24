const character = props.character;

return (
  <div class="container">
    <div key={character.id}>
      <h2>{character.name}</h2>
      <img
        src={character.image}
        alt={character.alt}
        width="200"
        height="200"
      ></img>
      <div>
        <span>Species: {character.species} | </span>
        <span>Class: {character.class}</span>
      </div>
      <div>
        <span>Default Weapon: {character.defaultWeapon}</span>
      </div>
      <div>
        <span>Skills: {character.skills}</span>
      </div>
      <div>
        <span>Weakness: {character.weakness}</span>
      </div>
    </div>
  </div>
);
