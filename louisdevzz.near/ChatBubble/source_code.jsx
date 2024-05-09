State.init({
  value: "",
});
const onChange = (e) => {
  State.update({
    value: e.target.value,
  });
};
const Container = styled.div`
    #chat1 .form-outline .form-control~.form-notch div {
    pointer-events: none;
    border: 1px solid;
    border-color: #eee;
    box-sizing: border-box;
    background: transparent;
    }

    #chat1 .form-outline .form-control~.form-notch .form-notch-leading {
    left: 0;
    top: 0;
    height: 100%;
    border-right: none;
    border-radius: .65rem 0 0 .65rem;
    }

    #chat1 .form-outline .form-control~.form-notch .form-notch-middle {
    flex: 0 0 auto;
    max-width: calc(100% - 1rem);
    height: 100%;
    border-right: none;
    border-left: none;
    }

    #chat1 .form-outline .form-control~.form-notch .form-notch-trailing {
    flex-grow: 1;
    height: 100%;
    border-left: none;
    border-radius: 0 .65rem .65rem 0;
    }

    #chat1 .form-outline .form-control:focus~.form-notch .form-notch-leading {
    border-top: 0.125rem solid #39c0ed;
    border-bottom: 0.125rem solid #39c0ed;
    border-left: 0.125rem solid #39c0ed;
    }

    #chat1 .form-outline .form-control:focus~.form-notch .form-notch-leading,
    #chat1 .form-outline .form-control.active~.form-notch .form-notch-leading {
    border-right: none;
    transition: all 0.2s linear;
    }

    #chat1 .form-outline .form-control:focus~.form-notch .form-notch-middle {
    border-bottom: 0.125rem solid;
    border-color: #39c0ed;
    }

    #chat1 .form-outline .form-control:focus~.form-notch .form-notch-middle,
    #chat1 .form-outline .form-control.active~.form-notch .form-notch-middle {
    border-top: none;
    border-right: none;
    border-left: none;
    transition: all 0.2s linear;
    }

    #chat1 .form-outline .form-control:focus~.form-notch .form-notch-trailing {
    border-top: 0.125rem solid #39c0ed;
    border-bottom: 0.125rem solid #39c0ed;
    border-right: 0.125rem solid #39c0ed;
    }

    #chat1 .form-outline .form-control:focus~.form-notch .form-notch-trailing,
    #chat1 .form-outline .form-control.active~.form-notch .form-notch-trailing {
    border-left: none;
    transition: all 0.2s linear;
    }

    #chat1 .form-outline .form-control:focus~.form-label {
    color: #39c0ed;
    }

    #chat1 .form-outline .form-control~.form-label {
    color: #bfbfbf;
    }
    `;
return (
  <Container style={{ background: "#eee" }}>
    <div class="container py-2">
      <div class="row d-flex justify-content-center">
        <div class="col-md-8 col-lg-6 col-xl-4">
          <div class="card" id="chat1" style={{ borderRadius: "15px" }}>
            <div
              class="card-header d-flex justify-content-between align-items-center p-3 bg-info text-white border-bottom-0"
              styled={{
                borderTopLeftRadius: "15px",
                borderTopRighRadius: "15px",
              }}
            >
              <i class="fas fa-angle-left"></i>
              <p class="mb-0 fw-bold">Live chat</p>
              <i class="fas fa-times"></i>
            </div>
            <div class="card-body">
              <div class="d-flex flex-row justify-content-start mb-4">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                  alt="avatar 1"
                  style={{ width: "45px", height: "100%" }}
                />
                <div
                  class="p-3 ms-3"
                  style={{
                    borderRadius: "15px",
                    background: "rgba(57, 192, 237,.2)",
                  }}
                >
                  <p class="small mb-0">
                    Hello and thank you for visiting MDBootstrap. Please click
                    the video below.
                  </p>
                </div>
              </div>

              <div class="d-flex flex-row justify-content-end mb-4">
                <div
                  class="p-3 me-3 border"
                  style={{ borderRadius: "15px", background: "#fbfbfb" }}
                >
                  <p class="small mb-0">
                    Thank you, I really like your product.
                  </p>
                </div>
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                  alt="avatar 1"
                  style={{ width: "45px", height: "100%" }}
                />
              </div>

              <div class="d-flex flex-row justify-content-start mb-4">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                  alt="avatar 1"
                  style={{ width: "45px", height: "100%" }}
                />
                <div class="ms-3" style={{ borderRadius: "15px" }}>
                  <div class="bg-image">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/screenshot1.webp"
                      style={{ borderRadius: "15px" }}
                      alt="video"
                    />
                    <a href="#!">
                      <div class="mask"></div>
                    </a>
                  </div>
                </div>
              </div>

              <div class="d-flex flex-row justify-content-start mb-4">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                  alt="avatar 1"
                  style={{ width: "45px", height: "100%" }}
                />
                <div
                  class="p-3 ms-3"
                  style={{
                    borderRadius: "15px",
                    background: "rgba(57, 192, 237,.2)",
                  }}
                >
                  <p class="small mb-0">...</p>
                </div>
              </div>

              <div data-mdb-input-init class="form-outline">
                <textarea
                  class="form-control"
                  id="textAreaExample"
                  rows="4"
                  onChange={onChange}
                  value={state.value}
                ></textarea>
                <label class="form-label" for="textAreaExample">
                  Type your message
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Container>
);
