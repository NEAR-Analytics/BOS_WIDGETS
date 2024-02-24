const character = props.character;

return (
  <div class="card">
    <div key={character.id}>
      <div class="card-header">
        <h2>Character</h2>
      </div>
      <div class="card-body">
        <h2 class="card-title">{character.name}</h2>
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
          <span>Skill: {character.skills}</span>
        </div>
        <div>
          <span>Weakness: {character.weakness}</span>
        </div>
      </div>
    </div>
  </div>
);
