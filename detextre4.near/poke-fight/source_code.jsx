// * STYLES
const Wrapper = styled.div`
  --size: 220px;
  
  min-height: 100vh;
  background-image: linear-gradient(#ffffff 1.1rem, #ccc 1.2rem);
  background-size: 100% 1.2rem;

  &.finished {
    display: grid;
    place-content: center;
  }

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: Fantasy;
  }

  h2 {
    text-align: center;
    margin-bottom: 14px;
  }
`,
  Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, var(--size)), 1fr));
  place-items: center;
  gap: 40px;`,
  Pokeball = styled.div`
--primary: #f71b1b;
--accent: #000;
--bg: #f7f7f7;
--br: 50%;

  position: relative;
  width: var(--size);
  height: var(--size);
  background: var(--bg);
  box-shadow: 2px 2px 6px 2px rgba(0, 0, 0, .4);
  display: grid;
  place-items: center;
  font-size: 25px;
  font-weight: bold;
  border-radius: var(--br);
  isolation: isolate;
  transition: all var(--animationDuration) ease;

  &.deleted {
    translate: 0 -100px;
    opacity: 0;
  }

  &:before, &:after { pointer-events: none }

  &:before {
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 25px;
    font-weight: bold;
    border: 4px solid var(--accent);

    background: linear-gradient(to bottom left, var(--primary), var(--primary) 49%, var(--accent) 49%, var(--accent) 50.5%, var(--bg) 50.5%);
    top: 0;
    right: 0;
    border-radius: var(--br);
    transition: all 0.5s;
  }

  &:hover:before, &.opened:before {
    width: 20%;
    height: 20%;
    border-radius: 0 var(--br) 0 100%;

    background: linear-gradient(to bottom left, var(--primary), var(--primary) 72%, var(--accent) 72%, var(--accent) 70%, var(--bg) 70%);
    transition: all 0.5s;
  }

  &:after {
    content: "";
    position: absolute;
    inset: 0;
    margin: auto;
    width: 40px;
    height: 40px;
    background: var(--bg);
    border: 4px solid var(--accent);
    border-radius: 50%;
    z-index: 1;
    transition: all var(--animationDuration);
  }
  &:hover:after, &.opened:after {
    opacity: 0;
    translate: -70px 70px;
    scale: .5;
  }

  * {
    z-index: -1;
    pointer-events: none;
    user-select: none;
  }
  &:hover * { pointer-events: all }

  img {
    width: 60%;
    object-fit: cover;
    cursor: grab;
  }

  h5 {
    position: absolute;
    bottom: 10%;
    pointer-events: none;
  }

  .health-bar {
    position: absolute;
    right: 10%;
    width: 20px;
    height: 50%;
    background: var(--accent);
    border-radius: 5px;
  }

  .health-bar div {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    border: 2px solid var(--accent);
    border-radius: 5px;
    transition: all .2s ease;
    &.hide { height: 0% }

    &.bar-1 {
      height: 100%;
      background: green;
    }
    &.bar-2 {
      height: 65%;
      background: blue;
    }
    &.bar-3 {
      height: 45%;
      background: yellow;
    }
    &.bar-4 {
      height: 25%;
      background: red;
    }
  }
`;

// * SCRIPT
State.init({ pokemons: [], started: false, currentDrag: null });

const API = "https://pokeapi.co/api/v2",
  LIMIT = props.limit,
  OFFSET = props.offset,
  animationDuration = 200;

function getPokemons() {
  if (state.started) return;

  asyncFetch(`${API}/pokemon?limit=${LIMIT}&offset=${OFFSET}`)
    .then(({ body }) => {
      let pokemons = [];

      for (const item of body.results) {
        const { body } = fetch(item.url);

        pokemons.push({
          name: body.name,
          image: body.sprites.other["official-artwork"].front_default,
          moves: body.moves?.map((item) => item.move.name),
          health: [1, 2, 3, 4],
        });
      }

      State.update({ pokemons, started: true });
    })
    .catch((error) => console.error(error));
}
getPokemons();

function getRandomInt(max) {
  const min = 0;
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1) + min);
}

function onDragStart(pokemonIndex) {
  const pokemons = state.pokemons;
  if (pokemons[state.currentDrag]) {
    pokemons[state.currentDrag].opened = false;
    pokemons[state.currentDrag].attack = null;
  }

  State.update({ pokemons, currentDrag: pokemonIndex });
}

function openPokeball(event, pokemonIndex) {
  event.preventDefault();

  const pokemons = state.pokemons;
  if (pokemons[pokemonIndex].opened) return;

  pokemons[pokemonIndex].opened = true;
  State.update({ pokemons });
}

function closePokeball(pokemonIndex) {
  if (state.currentDrag == pokemonIndex) return;

  const pokemons = state.pokemons;
  pokemons[pokemonIndex].opened = false;
  pokemons[state.currentDrag].attack = null;
  State.update({ pokemons });
}

function attack(pokemonIndex) {
  if (state.currentDrag == pokemonIndex) return;
  const pokemons = state.pokemons;

  // show attack dialog
  if (pokemons[state.currentDrag])
    pokemons[state.currentDrag].attack =
      pokemons[state.currentDrag].moves[
        getRandomInt(pokemons[state.currentDrag].moves.length)
      ];

  // animation decrease helath
  pokemons[pokemonIndex].health[0] = 0;
  State.update({ pokemons });

  // decrease helath
  setTimeout(() => decreaseHealth(pokemons, pokemonIndex), animationDuration);
}

function decreaseHealth(pokemons, pokemonIndex) {
  if (pokemons[pokemonIndex].health.length <= 1)
    return deletePokemon(pokemons, pokemonIndex);

  pokemons[pokemonIndex].health.shift();
  State.update({ pokemons });
}

function deletePokemon(pokemons, pokemonIndex) {
  pokemons[state.currentDrag].attack = null;

  // animation delete pokemon
  pokemons[pokemonIndex].deleted = true;
  State.update({ pokemons });

  // delete pokemon
  setTimeout(() => {
    pokemons.splice(pokemonIndex, 1);
    State.update({ pokemons });
  }, animationDuration);
}

// * TEMPLATE RENDER
return (
  <Wrapper className={state.pokemons.length > 1 ? "" : "finished"}>
    <h2>
      {state.pokemons.length > 1
        ? "Drag pokemons to attack"
        : `${state.pokemons[0].name} won !!`}
    </h2>
    <Grid>
      {state.pokemons.map((pokemon, index) => (
        <Pokeball
          className={`${pokemon.deleted ? "deleted" : ""} ${
            pokemon.opened ? "opened" : ""
          }`}
          style={{ "--animationDuration": `${animationDuration}ms` }}
          onDrop={(_) => attack(index)}
          onDragOver={(event) => openPokeball(event, index)}
          onDragLeave={(_) => closePokeball(index)}
          onMouseLeave={(_) => closePokeball(index)}
        >
          <div className="health-bar">
            {pokemon.health.map((health, i) => (
              <div
                className={`bar-${health} ${health != i + 1 ? "hide" : ""}`}
                style={{ "--n": health }}
              ></div>
            ))}
          </div>

          <OverlayTrigger
            placement="top"
            show={!!pokemon.attack}
            overlay={<Tooltip>{pokemon.attack}</Tooltip>}
          >
            <img
              src={pokemon.image}
              alt={`${pokemon.name}'s image`}
              onDragStart={(_) => onDragStart(index)}
            />
          </OverlayTrigger>
          <h5>{pokemon.name}</h5>
        </Pokeball>
      ))}
    </Grid>
  </Wrapper>
);
