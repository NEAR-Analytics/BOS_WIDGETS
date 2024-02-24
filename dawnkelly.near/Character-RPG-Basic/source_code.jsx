const character = props.character;


return (
  <div class="container">
    <div key={character.id}>
      <img
        src={character.image}
        alt={character.alt}
        width="200"
        height="200"
      ></img>
      <h2>{character.name}</h2>
      <div class="row">
        <div class="col-1">
          <span>{character.species}</span>
        </div>
        <div class="col-2">
          <span>{character.class}</span>
        </div>
         
      </div>
      
      <h3>{character.class}</h3>
      <span>{character.weapon}</span>
    </div>
  </div>
);
