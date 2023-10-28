const BG = styled.div`
	background-color: #fff;
	background-image: linear-gradient(180deg, #fafcfd 0%, #b6dbfc 100%);
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: -2;
`;

const Circle1 = styled.div`
	width: 500px;
	height: 500px;
	border-radius: 50%;
	background: linear-gradient(90deg, #9333ea 0%, #f29bc0 100%), #03d69d;
	position: fixed;
	top: -100px;
	right: -100px;
	z-index: 0;
	opacity: 0.2;
	filter: blur(50px);
`;
const Circle2 = styled.div`
	width: 400px;
	height: 400px;
	border-radius: 50%;
	border: 1px solid #cbcbcb;
	background: linear-gradient(90deg, #f9d74a 0%, #ffd50d 100%);
	position: fixed;
	bottom: 0;
	left: -100px;
	z-index: 0;
	opacity: 0.3;
	filter: blur(100px);

	animation: move 3s ease infinite;

	@keyframes move {
		0% {
			transform: translate(0, 0);
		}
		50% {
			transform: translate(60px, 40px) scale(2);
		}
		100% {
			transform: translate(0, 0);
		}
	}
`;

const Wrapper = styled.div`
.nav-pills .nav-link.active, .nav-pills .show>.nav-link {
  color: #fff;
    background-color: #000000;
}
.nav-link {
  color: #000000;
}
margin-top: 5rem;
`;

const Footer = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3rem;
    color: black;
    text-align: center;
    line-height: 3rem;
    font-size: 1rem;
    z-index: 1;
`;
return (
  <div>
    <BG />
    <Wrapper>
      <div class="container">
        <div class="">
          <div class="">
            <div class="side-bar" data-bs-scroll="true" tabindex="-1">
              <div class="p-0">
                <div>
                  <ul
                    class="nav nav-pills navbar-dark row"
                    id="pills-tab"
                    role="tablist"
                  >
                    <li class="nav-item col" role="presentation">
                      <span
                        class="nav-link px-3 active"
                        id="pills-tab-home"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-home"
                        type="button"
                        role="tab"
                        aria-controls="pills-home"
                        aria-selected="true"
                      >
                        <span class="fw-bold">Home</span>
                      </span>
                    </li>
                    <li class="nav-item col" role="presentation">
                      <span
                        class="nav-link active"
                        id="pills-tab-builder"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-builder"
                        type="button"
                        role="tab"
                        aria-controls="pills-builder"
                        aria-selected="true"
                        class="nav-link px-3 "
                      >
                        <label class="custom-control-label" for="darkSwitch">
                          <span class="fw-bold">Quiz</span>
                        </label>
                      </span>
                    </li>
                    <li class="nav-item col" role="presentation">
                      <span
                        class="nav-link active"
                        type="button"
                        role="tab"
                        aria-selected="true"
                        class="nav-link px-3 "
                      >
                        <label class="custom-control-label" for="darkSwitch">
                          <span class="fw-bold">Test</span>
                        </label>
                      </span>
                    </li>
                    <li class="nav-item col" role="presentation">
                      <span
                        class="nav-link active"
                        type="button"
                        role="tab"
                        aria-selected="true"
                        class="nav-link px-3 "
                      >
                        <label class="custom-control-label" for="darkSwitch">
                          <span class="fw-bold">Research</span>
                        </label>
                      </span>
                    </li>
                    <li>
                      <hr />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="">
            <div class="tab-content" id="pills-tabContent">
              <div
                class="tab-pane fade show"
                id={`pills-builder`}
                role="tabpanel"
                aria-labelledby={`pills-tab-builder`}
                tabindex="0"
              >
                <Widget src={"ranjan-026.near/widget/probchain.builder"} />
              </div>
              <div
                class="tab-pane fade show active"
                id={`pills-home`}
                role="tabpanel"
                aria-labelledby={`pills-tab-home`}
                tabindex="0"
              >
                <div class="px-4 py-5 my-5 text-center">
                  <h1 class="display-4 fw-bold text-body-emphasis">
                    Welcome to ProbChain
                  </h1>
                  <h2 class="display-5 text-body-emphasis">
                    Unlocking the Future of Education
                  </h2>
                  <div class="col-lg-10 mx-auto">
                    <p class="lead mb-4">
                      we believe that education should be a journey of
                      discovery, tailored to your unique needs and preferences.
                      We're here to revolutionize the way you learn, empowering
                      both students and educators with cutting-edge technology.
                    </p>
                    <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
                      <a
                        href="https://somyaranjan.hashnode.dev/hack-o-ween"
                        type="button"
                        class="btn btn-dark btn-lg px-4"
                      >
                        Read More
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div
                class="tab-pane fade"
                id={`pills-help`}
                role="tabpanel"
                aria-labelledby={`pills-tab-help`}
                tabindex="0"
              ></div>
              {state.clientList &&
                state.clientList.map((client, index) => (
                  <div
                    class="tab-pane fade "
                    id={`pills-${client.clientId}`}
                    role="tabpanel"
                    aria-labelledby={`pills-tab-${client.clientId}`}
                    tabindex="0"
                  >
                    <Widget
                      src={"magicbuild.near/widget/builder"}
                      props={client}
                    />
                  </div>
                ))}

              {state.widgetList &&
                state.widgetList.map((widget, index) => (
                  <div
                    class="tab-pane fade "
                    id={`pills-${widget.widgetName}`}
                    role="tabpanel"
                    aria-labelledby={`pills-tab-${widget.widgetName}`}
                    tabindex="0"
                  >
                    <Widget
                      src={`${context.accountId}/widget/${widget.widgetName}`}
                      props={widget}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </Wrapper>

    <Circle1 />
    <Circle2 />
    <Footer class="position-relative bottom-0">
      <a
        href="https://github.com/somyaranjan26"
        class="px-3 text-decoration-none text-dark"
      >
        Built with ❤️ by
        <span class="fw-bold">Somyaranjan (Ranjan) Rout</span>
      </a>
    </Footer>
  </div>
);
