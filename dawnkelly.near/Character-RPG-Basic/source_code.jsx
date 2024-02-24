const character = props.character;

return (
  <div>
    <div key={character.id}>
      <img
        src={character.image}
        alt={character.alt}
        width="200"
        height="200"
      ></img>
      <h2>{character.name}</h2>
      <p>{character.species}</p>
      <h3>{character.class}</h3>
      <span>{character.weapon}</span>
    </div>
  </div>
);
