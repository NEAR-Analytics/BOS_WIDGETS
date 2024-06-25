const App = () => {
  const Padding = styled.div`
  background-color: white;
  color: white;
  padding: 20px 0;
  text-align: center;
`;

  State.init({ quote: [{}] });

  function getQuote() {
    asyncFetch("https://api.adviceslip.com/advice").then((res) => {
      let jsonObject = JSON.parse(res.body);
      State.update({ quote: jsonObject });
    });
  }

  function init() {
    if (state.quote.slip === undefined) {
      getQuote();
    }
  }

  init();
  return (
    <>
      <div class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            <img
              src="https://res.cloudinary.com/dglhc1pfj/image/upload/f_auto,q_auto/v1/samples/lhoetmcicrxlihdcdpou"
              alt=""
              width="50px"
              height="50px"
            />
            Near India
          </a>
        </div>
      </div>

      <h1 align="center">Quote Of The Day</h1>
      <div class="card">
        <div class="card-header">Quote</div>
        <div class="card-body">
          <div class="blockquote mb-0">
            <p>{state.quote.slip.advice}</p>
            <div class="blockquote-footer">
              <i>anonymous</i>
            </div>
          </div>
        </div>
      </div>
      <Padding>
        <button
          type="button"
          align="center"
          class="btn btn-primary"
          onClick={getQuote}
        >
          Get New Quote
        </button>
      </Padding>
    </>
  );
};
return <App />;
