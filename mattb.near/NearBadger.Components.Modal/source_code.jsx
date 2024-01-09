const { onClose } = props;

State.init({
  step: 0
});

const DarkOverlay = styled.div`
    z-index:9999;
    display:flex;
    align-items:flex-start;
    justify-content:center;
    width:100%;
    height:100vh;
    background-color:rgba(0,0,0,.6);
    backdrop-filter:blur(5px);
    overflow-y:scroll;
    box-sizing:border-box;
    padding-top:5rem;
`;

const Box = styled.div`
    position:relative;
    width:100%;
    max-width:500px;
    border-radius:20px;
    background-color:#fff;
    box-shadow: 0 0 10px 10px rgba(0,0,0,.1);
    padding:1.5rem;
`;

const Title = styled.h1`
    font-size:1.6rem;
    font-weight:bold;
    margin-bottom:1.5rem;
`;

const Text = styled.p`

`;

const Controls = styled.div`
    width:100%;
    margin-top:2.5rem;
`;

const StepButton = styled.button`
    display:flex;
    justify-content:center;
    align-items:center;
    width:100%;
    height:50px;
    background-color:#87B697;
    border:0;
    font-weight:bold;
    color:#000;
    margin-top:.5rem;
    border-radius:30px;
    font-size:.9rem;

    :disabled {
      background-color: #F2F2F2;
      color:rgba(0,0,0,.3);
    }
`;

const Requirements = styled.ul`
    position:relative;
    padding:0;
    margin:0;
    list-style:none;
    padding: 20px 0 20px 30px;
    border-radius:10px;
    background-color:#F2F2F2;
    overflow:hidden;

    ::after {
        content:'';
        position:absolute;
        top:0;
        left:20px;
        width:2px;
        height:100%;
        background-color:rgba(0,0,0,.1);
        border-radius:10px;
    }

    .retry {
        display:block;
        z-index:99999;
        position:absolute;
        cursor:pointer;
        right:13px;
        bottom:13px;
        font-size:.8rem;
        font-weight:bold;
        opacity:.5;
        background-color:rgba(0,0,0,.1);
        padding: 3px 10px;
        border-radius:20px;
        border:0;
        transition: all .2s;
        border:1px solid rgba(0,0,0,.05);

        :hover {
            opacity:.7;
            transition: all .2s;
        }
    }
`;

const Requirement = styled.li`
    font-size:.8rem;
    position:relative;
    padding-left:5px;
    color:rgba(0,0,0,.3);
    
    :not(:last-of-type) {
        margin-bottom:10px;
    }

    &.selected {
        color:#000;
        font-size:.95rem;
        font-weight:bold;

        ::after {
            width:20px;
            height:20px;
            left:-19px;
        }

        ::before {
            width:12px;
            height:12px;
            left:-15px;
        }
    }

    &.pending {
        ::before {
            background-color:#FDD835;
        }
    }

    &.verified {
        ::before {
            background-color:#00C753;
        }
    }

    &.failed {
        ::before {
            background-color:#FF1744;
        }
    }

    ::after {
        content:'';
        position:absolute;
        width:15px;
        height:15px;
        background-color:#F2F2F2;
        border-radius:100%;
        margin:auto;
        top:0;
        bottom:0;
        left:-17px;
        z-index:999;
    }

    ::before {
        content:'';
        position:absolute;
        width:8px;
        height:8px;
        background-color:rgba(0,0,0,.2);
        border-radius:100%;
        margin:auto;
        top:0;
        bottom:0;
        left:-13px;
        z-index:1000;
    }
`;

let steps = [
  <>
    <Title>Verify handle</Title>
    <Text>
      To become part of the family, first you need to meet the following
      requirements:
    </Text>
    <Requirements>
      <button className="retry">Retry</button>
      <Requirement className="verified">
        Ethereum wallet connected
      </Requirement>
      <Requirement className="selected failed">Polygon Mainnet enabled</Requirement>
      <Requirement>Lens handle available</Requirement>
      <Requirement>NEAR account connected</Requirement>
    </Requirements>
  </>
];

return (
  <DarkOverlay
    onClick={() => {
      if (state.boxClicked) {
        State.update({ boxClicked: false });
      } else {
        onClose();
      }
    }}
  >
    <Box
      onClick={() => {
        State.update({ boxClicked: true });
      }}
    >
      {steps[state.step] ?? ""}
      <Controls>
        {steps[state.step + 1] && (
          <StepButton
            onClick={() => State.update({ step: state.step + 1 })}
            disabled={!state.verificationComplete}
          >
            Next
          </StepButton>
        )}
        {steps[state.step - 1] && (
          <StepButton onClick={() => State.update({ step: state.step - 1 })}>
            Back
          </StepButton>
        )}
        {!steps[state.step + 1] && (
          <StepButton
            onClick={() => {
            }}
            disabled={true}
          >
            Finish
          </StepButton>
        )}
      </Controls>
    </Box>
  </DarkOverlay>
);
