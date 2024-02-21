//Declaracion de los state iniciales
const [pokemonId, setPokemonId] = useState(1);
// const [pokemonList, setPokemonList] = useState(null);
const [pokemonData, setPokemonData] = useState(null);

//Obtencion de datos de la API guardando la info en cache
const pokemonList = fetch(
  "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=50"
).body.results;

//Obtencion de datos de la API guardandolo solo en el state
// useEffect(() => {
//   console.log("carga data");
//   asyncFetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=50").then(
//     (res) => {
//       setPokemonList(res.body.results);
//     }
//   );
// }, []);

//Obtencion de datos de API cargando informacion nueva mediante trigger
useEffect(() => {
  asyncFetch("https://pokeapi.co/api/v2/pokemon/" + pokemonId + "/").then(
    (res) => {
      setPokemonData({
        name: res.body.name,
        img: res.body.sprites.front_default,
      });
    }
  );
}, [pokemonId]);

return (
  <>
    <div class="text-center">
      <h2 class="my-3">Ejemplo obtener informacion API</h2>
      <div class="border border-3 rounded my-4">
        <h3>Informacion de pokemon</h3>
        {pokemonData != null && (
          <div class="my-3">
            <h4 class="text-capitalize">{pokemonData.name}</h4>
            <img style={{ width: 200, height: 200 }} src={pokemonData.img} />
          </div>
        )}
      </div>
      <div>
        <h3>Listado pokemon</h3>
        <div>
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">No. pokemon</th>
                <th scope="col">Nombre</th>
              </tr>
            </thead>
            <tbody>
              {pokemonList != null &&
                pokemonList.map((data, key) => {
                  return (
                    <tr
                      onClick={() => {
                        setPokemonId(key + 1);
                      }}
                      class={key + 1 == pokemonId && "table-active"}
                    >
                      <th scope="row">{key + 1}</th>
                      <td class="text-capitalize">{data.name}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </>
);
