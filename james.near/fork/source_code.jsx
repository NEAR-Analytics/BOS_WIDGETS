const src = props.src ?? "devs.near/widget/community";
const [creatorId, type, name] = src.split("/");

const { handleClose } = props;

State.init({
  name,
});

const source = Social.get(`${src}`);

const forkClick = () => {
  if (state.loading) {
    return;
  }

  State.update({
    loading: true,
  });

  const data = {
    index: {
      fork: JSON.stringify({
        key: {
          type: "social",
          path: src,
        },
        value: {
          update: `${context.accountId}/${type}/${state.name}`,
        },
      }),
    },
    [`${type}`]: {
      [`${state.name}`]: {
        "": `${source}`,
        metadata: {
          upstream: src,
          downstream:
            name !== state.name
              ? `${context.accountId}/${type}/${state.name}`
              : undefined,
        },
      },
    },
  };

  data.index.notify = JSON.stringify({
    key: creatorId,
    value: {
      type: "fork",
      src,
      update: `${context.accountId}/${type}/${state.name}`,
    },
  });

  Social.set(data, {
    onCommit: () => State.update({ loading: false }),
    onCancel: () =>
      State.update({
        loading: false,
      }),
  });
};

const Modal = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.7);
`;

const ComponentWrapper = styled.div`
  display: flex;
  width: 80%;
  height: 80%;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 10px;
  background: #fff;
  border: 1px solid transparent;
  margin: 140px auto auto auto;
  @media only screen and (max-width: 480px) {
    width: 90%;
  }
`;

const CardStyled = styled.div`
  width: 100%;
  height: 100%;
  background: #f8f8f9;
  gap: 10px;
  padding: 25px;
  margin: 0 auto;
  border-radius: 10px;
  overflow-y: scroll;
`;

const CardForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
`;

return (
  <Modal>
    <ComponentWrapper>
      <CardStyled>
        <CardForm>
          <div className="d-flex flex-wrap justify-content-between mb-3">
            <div className="m-1">
              <h1>Fork</h1>
            </div>
            <div className="ms-auto me-0 me-md-2 d-flex align-items-center">
              <div className="top-right">
                <Widget
                  src="james.near/widget/styling"
                  props={{
                    Button: {
                      style: "danger",
                      text: "Close",
                      onClick: handleClose,
                    },
                  }}
                />
              </div>
            </div>
          </div>
          <div className="input-group m-1 mb-2">
            <input
              className="form-control mt-2"
              defaultValue={state.name}
              onChange={(e) => {
                State.update({
                  name: e.target.value,
                });
              }}
            />
          </div>
          <button
            className="btn btn-outline-secondary m-1 mt-3"
            onClick={forkClick}
          >
            <i className="bi bi-feather"></i>
            Submit
          </button>
        </CardForm>
      </CardStyled>
    </ComponentWrapper>
  </Modal>
);
