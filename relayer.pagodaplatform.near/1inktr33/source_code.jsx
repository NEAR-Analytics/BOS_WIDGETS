const css = fetch(
  "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
);

const Theme = styled.div`
  ${css.body}
`;

return (
  <Theme>
    <div className="container">
      <div className="section">
        <div class="row">
          <div class="col-12 header-photo mb-2">
            <img
              class="img-responsive w-100"
              src="https://pbs.twimg.com/profile_banners/1661553260476649473/1684980906/1500x500"
            />
          </div>
          <div class="col-12 text-center">
            <h4>Hello, I am J.</h4>
          </div>
          <div class="col col-lg-4 offset-4">
            <a href="https://twitter.com/jaeil_1st" target="_blank">
              <div class="card p-3">Go twitter</div>
            </a>
          </div>
          <div class="text-center p-3 text-secondary">
            this poor 1inktr33 is WIP 🔥
          </div>
        </div>
      </div>
    </div>
  </Theme>
);
