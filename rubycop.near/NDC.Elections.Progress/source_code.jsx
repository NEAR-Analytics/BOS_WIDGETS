const { houses, votesLeft } = props;

const Stepper = styled.div`
  background: #FDFEFF;
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 16px;

  h3, h4 {
    margin: 0 3px;
  }
`;

const ProgressBar = styled.div`
  margin-top: 8px;
  border-radius: 100px;
  background: #F5F5F5;
  padding: 3px;
  height: 21px;

`;

const DoneBar = styled.div`
  border-radius: 100px;
  background: #239F28;
  height: 100%;
`;

const CompleteText = styled.span`
  color: #239F28;
  margin-bottom: 0px;
  font-weight: 900;
  font-size: 22px;
`;

State.init({ step: 0 });

const step = 0;
houses.map((house) => {
  step += votesLeft(house) === house.seats ? 0 : 1;
});
State.update({ step });

return (
  <Stepper>
    <div className="d-flex justify-content-between align-items-center">
      <div>Your voting progress</div>
      <div>
        <CompleteText> {state.step}</CompleteText>/<span>{houses.length}</span>
        <span className="text-secondary">Houses</span>
      </div>
    </div>
    <ProgressBar className="position-relative">
      {state.step > 0 && <DoneBar className={`col-${state.step * 4}`} />}
      <div className="position-absolute top-0 start-50">
        <small>
          <b className={`${state.step > 1 ? "text-light" : "inherit"}`}>
            {state.step === 3 ? 100 : state.step * 33} %
          </b>
        </small>
      </div>
    </ProgressBar>
  </Stepper>
);
