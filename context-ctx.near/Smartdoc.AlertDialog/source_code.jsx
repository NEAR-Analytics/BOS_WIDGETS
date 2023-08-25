// Styles
const Wrapper = styled.div`

  /* reset */
  button {
    all: unset;
  }

  .AlertDialogOverlay {
    background-color: var(--black-a9);
    position: fixed;
    inset: 0;
    animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  .AlertDialogContent {
    background-color: white;
    z-index: 99;
    border-radius: 6px;
    box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90vw;
    max-width: 500px;
    max-height: 85vh;
    padding: 25px;
    animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  .AlertDialogContent:focus {
    outline: none;
  }

  .AlertDialogTitle {
    margin: 0;
    color: var(--mauve-12);
    font-size: 17px;
    font-weight: 500;
  }

  .AlertDialogDescription {
    margin-top: 20px;
    margin-bottom: 20px;
    color: var(--mauve-11);
    font-size: 15px;
    line-height: 1.5;
  }

  .Button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    padding: 0 15px;
    font-size: 15px;
    line-height: 1;
    font-weight: 500;
    height: 35px;
  }
  .Button.violet {
    background-color: white;
    color: var(--violet-11);
    box-shadow: 0 2px 10px var(--black-a7);
  }
  .Button.violet:hover {
    background-color: var(--mauve-3);
  }
  .Button.violet:focus {
    box-shadow: 0 0 0 2px black;
  }
  .Button.red {
    background-color: var(--red-4);
    color: var(--red-11);
  }
  .Button.red:hover {
    background-color: var(--red-5);
  }
  .Button.red:focus {
    box-shadow: 0 0 0 2px var(--red-7);
  }
  .Button.mauve {
    background-color: var(--mauve-4);
    color: var(--mauve-11);
  }
  .Button.mauve:hover {
    background-color: var(--mauve-5);
  }
  .Button.mauve:focus {
    box-shadow: 0 0 0 2px var(--mauve-7);
  }

  @keyframes overlayShow {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes contentShow {
    from {
      opacity: 0;
      transform: translate(-50%, -48%) scale(0.96);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }
`;
const ButtonLabel = styled.label`
  color: #345AD5; 
  cursor: pointer;
`;

// Render
return (
  <Wrapper>
    <AlertDialog.Root open>
      <AlertDialog.Overlay className="AlertDialogOverlay" />
      <AlertDialog.Content className="AlertDialogContent">
        <AlertDialog.Title className="AlertDialogTitle">
          {props.title}
        </AlertDialog.Title>
        <AlertDialog.Description className="AlertDialogDescription">
          {props.description}
        </AlertDialog.Description>
        {!props.hideButton && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <AlertDialog.Cancel asChild>
              <button className="Button mauve" onClick={props.close}>
                <ButtonLabel>Accept</ButtonLabel>
              </button>
            </AlertDialog.Cancel>
          </div>
        )}
      </AlertDialog.Content>
    </AlertDialog.Root>
  </Wrapper>
);
