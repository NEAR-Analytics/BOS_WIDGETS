const Wrapper = styled.div`
  @import "https://cdn.jsdelivr.net/npm/@radix-ui/colors@latest/black-alpha.css";

  /* reset */
  button,
  fieldset,
  input {
    all: unset;
  }

  .DialogOverlay {
    background-color: var(--black-a9);
    position: fixed;
    inset: 0;
    animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  .DialogContent {
    background-color: white;
    border-radius: 6px;
    box-shadow:
      hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
      hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90vw;
    max-width: 450px;
    max-height: 85vh;
    padding: 25px;
    animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  .DialogContent:focus {
    outline: none;
  }

  .DialogTitle {
    margin: 0;
    font-weight: 500;
    color: var(--mauve-12);
    font-size: 17px;
  }

  .DialogDescription {
    margin: 10px 0 20px;
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
  .Button.green {
    background-color: var(--green-4);
    color: var(--green-11);
  }
  .Button.green:hover {
    background-color: var(--green-5);
  }
  .Button.green:focus {
    box-shadow: 0 0 0 2px var(--green-7);
  }

  .IconButton {
    font-family: inherit;
    border-radius: 100%;
    height: 25px;
    width: 25px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--violet-11);
    position: absolute;
    top: 10px;
    right: 10px;
  }
  .IconButton:hover {
    background-color: var(--violet-4);
  }
  .IconButton:focus {
    box-shadow: 0 0 0 2px var(--violet-7);
  }

  .Fieldset {
    display: flex;
    gap: 20px;
    align-items: center;
    margin-bottom: 15px;
  }

  .Label {
    font-size: 15px;
    color: var(--violet-11);
    width: 90px;
    text-align: right;
  }

  .Input {
    width: 100%;
    flex: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    padding: 0 10px;
    font-size: 15px;
    line-height: 1;
    color: var(--violet-11);
    box-shadow: 0 0 0 1px var(--violet-7);
    height: 35px;
  }
  .Input:focus {
    box-shadow: 0 0 0 2px var(--violet-8);
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

return (
  <Wrapper>
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="Button violet">Edit profile</button>
      </Dialog.Trigger>
      <Dialog.Overlay className="DialogOverlay" />
      <Dialog.Content className="DialogContent">
        <Dialog.Title className="DialogTitle">Edit profile</Dialog.Title>
        <Dialog.Description className="DialogDescription">
          Make changes to your profile here. Click save when you're done.
        </Dialog.Description>
        <fieldset className="Fieldset">
          <label className="Label" htmlFor="name">
            Name
          </label>
          <input className="Input" id="name" defaultValue="Pedro Duarte" />
        </fieldset>
        <fieldset className="Fieldset">
          <label className="Label" htmlFor="username">
            Username
          </label>
          <input className="Input" id="username" defaultValue="@peduarte" />
        </fieldset>
        <div
          style={{ display: "flex", marginTop: 25, justifyContent: "flex-end" }}
        >
          <Dialog.Close asChild>
            <button className="Button green">Save changes</button>
          </Dialog.Close>
        </div>
        <Dialog.Close asChild>
          <button className="IconButton" aria-label="Close">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10ZM9.17 14.83l5.66-5.66M14.83 14.83 9.17 9.17"
                stroke="#000000"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  </Wrapper>
);
