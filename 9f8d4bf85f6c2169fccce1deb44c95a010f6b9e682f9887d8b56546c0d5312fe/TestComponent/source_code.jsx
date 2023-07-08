State.init({
  isModalOpen: false,
});

return (
  <Dialog.Root>
    <Dialog.Trigger
      asChild
      onClick={() => {
        State.update({ ...state, isModalOpen: !isModalOpen });
      }}
    >
      <button
        className="Button violet"
        style={{ display: `${state.isModalOpen ? "none" : "block"}` }}
      >
        Check test TODO
      </button>
    </Dialog.Trigger>
    <Dialog.Overlay className="DialogOverlay" />
    <Dialog.Content className="DialogContent">
      <Dialog.Title className="DialogTitle">Check test TODO</Dialog.Title>
      <Dialog.Description className="DialogDescription">
        Test TODO from placeholderjson
      </Dialog.Description>
      <div>
        <Widget src="9f8d4bf85f6c2169fccce1deb44c95a010f6b9e682f9887d8b56546c0d5312fe/widget/FetchTest" />
      </div>
      <Dialog.Close asChild>
        <button
          className="IconButton"
          aria-label="Close"
          onClick={() => {
            State.update({ ...state, isModalOpen: false });
          }}
        >
          close
        </button>
      </Dialog.Close>
    </Dialog.Content>
  </Dialog.Root>
);
