const accountId = props.accountId ?? "hack.near";
const gameId = props.gameId ?? "evisceration";
const appId = props.appId ?? "lumina";

const { handleClose } = props;

const CardStyled = styled.div`
  width: 100%;
  height: 100%;
  background: #fff;
  gap: 10px;
  padding: 25px;
  margin: 0 auto;
  border-radius: 10px;
  overflow-y: scroll;
  height: 100%;
`;

const CardForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
`;

const H1 = styled.h1`
  margin-bottom: 10px;
  font-style: normal;
  font-weight: 555;
  font-size: 23px;
`;

const Modal = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
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

const Section = styled.div`
  margin: 12px 0;
`;

return (
  <Modal>
    <ComponentWrapper>
      <CardStyled>
        <div className="d-flex flex-column align-items-center">
          <img
            src="https://builders.mypinata.cloud/ipfs/QmPkdyvWhpTdEmjRbCf6tmR3NH67W2DX4bqbqy3Mz5PThY"
            style={{ width: "50%" }}
          />
          <CardForm>
            <Widget
              src="hack.near/widget/evisceration.button"
              props={{ accountId, gameId, appId }}
            />
            <button
              style={{ width: "222px" }}
              onClick={handleClose}
              className="btn btn-secondary m-2"
            >
              escape
            </button>
          </CardForm>
        </div>
      </CardStyled>
    </ComponentWrapper>
  </Modal>
);
