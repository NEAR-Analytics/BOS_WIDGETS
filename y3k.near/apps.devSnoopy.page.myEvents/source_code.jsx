return (
  <div>
    <Widget src="y3k.near/widget/apps.devSnoopy.menu" props={{}} />

    <div className="container my-5">
      <div className="row">
        <div className="col-md-12">
          <h2 className="text-center mb-4">
            How To Deploy Your Own Dev Snoopy 🐾 🦴
          </h2>
          <p className="text-center">
            Dive into the pulse of current events monitored through ShardDog
            NFTs and the DevSnoopy proxy contract. The table below provides a
            real-time snapshot of ongoing projects within our vibrant community.
          </p>
        </div>
      </div>
      <div className="row text-center">
        {/* Existing columns */}
        {/* ... your existing columns ... */}

        {/* New column for Frontend Code Reference */}
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h3 className="card-title">🌐 Frontend (BOS)</h3>
              <p className="card-text">
                Explore the frontend repository for a closer look at our user
                interface and experience.
                <a
                  href="https://github.com/NEAR-Analytics/devSnoopyBOS"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on GitHub
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* New column for Backend Code Reference */}
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h3 className="card-title">⚙️ Backend (Contract)</h3>
              <p className="card-text">
                Dive into the backend repository to understand the contract
                logic and data handling.
                <a
                  href="https://github.com/NEAR-Analytics/devSnoopy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on GitHub
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
