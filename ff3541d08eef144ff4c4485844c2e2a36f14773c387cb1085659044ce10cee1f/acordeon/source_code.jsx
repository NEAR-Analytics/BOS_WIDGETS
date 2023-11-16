return (
  <>
    <div class="accordion" id="accordionExample">
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button
            class="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne"
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            Sergio Tech
          </button>
        </h2>
        <div
          id="collapseOne"
          class="accordion-collapse collapse show"
          data-bs-parent="#accordionExample"
        >
          <div class="accordion-body">
            <div class="card mb-3">
              <div class="row g-0">
                <div class="col-md-4">
                  <img
                    src="https://raw.githubusercontent.com/Noisk8/Componente-BOS/main/img/tipeme.png"
                    alt="Gif"
                    width="200px"
                    className="mb-4"
                  />
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">Sergio Tech</h5>
                    <p class="card-text">
                      This is a wider card with supporting text below as a
                      natural lead-in to additional content. This content is a
                      little bit longer.
                    </p>
                    <p class="card-text">
                      <small class="text-body-secondary">
                        Last updated 3 mins ago
                      </small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseTwo"
            aria-expanded="false"
            aria-controls="collapseTwo"
          >
            Juan Jaramillo
          </button>
        </h2>
        <div
          id="collapseTwo"
          class="accordion-collapse collapse"
          data-bs-parent="#accordionExample"
        >
          {" "}
          <div class="card mb-3">
            <div class="row g-0">
              <div class="col-md-4">
                <img
                  src="https://raw.githubusercontent.com/Noisk8/Componente-BOS/main/tipeme.png"
                  alt="Gif"
                  width="200px"
                  className="mb-4"
                />
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">Juan Jaramillo</h5>
                  <p class="card-text">
                    This is a wider card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit
                    longer.
                  </p>
                  <p class="card-text">
                    <small class="text-body-secondary">
                      Last updated 3 mins ago
                    </small>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="accordion-body"></div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseThree"
            aria-expanded="false"
            aria-controls="collapseThree"
          >
            Alex Rubeola
          </button>
        </h2>
        <div
          id="collapseThree"
          class="accordion-collapse collapse"
          data-bs-parent="#accordionExample"
        >
          <div class="card mb-3">
            <div class="row g-0">
              <div class="col-md-4">
                <img
                  src="https://raw.githubusercontent.com/Noisk8/Componente-BOS/main/tipeme.png"
                  alt="Gif"
                  width="200px"
                  className="mb-4"
                />
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">Alex Rubeola</h5>
                  <p class="card-text">
                    This is a wider card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit
                    longer.
                  </p>
                  <p class="card-text">
                    <small class="text-body-secondary">
                      Last updated 3 mins ago
                    </small>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="accordion-body"></div>
        </div>
      </div>
    </div>
  </>
);
