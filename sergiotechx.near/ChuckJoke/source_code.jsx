State.init({
  joke: "No joke",
});
let flag = false;
const getJoke = () => {
  asyncFetch(`https://api.chucknorris.io/jokes/random`)
    .catch((err) => {
      console.log(err);
    })
    .then((res) => {
      let data = res.body;

      State.update({ joke: data.value });
      console.log(data.value);
      return;
    });
};

return (
  <table className="table table-bordered border-primary mt-4 mb-4 text-center">
    <tr>
      <td className="text-center fs-5 primary">Chuck Bad Jokes</td>
    </tr>
    <tr>
      <td>
        <img src="https://raw.githubusercontent.com/sergiotechx/chuckbadjokes/main/chucknorris.png" />
      </td>
    </tr>
    <tr>
      <td> {state.joke}</td>
    </tr>

    <tr>
      <td>
        <div class="mt-4">
          <button onClick={() => getJoke()}>Get bad Joke XD</button>
        </div>
      </td>
    </tr>
  </table>
);
