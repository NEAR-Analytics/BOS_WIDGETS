const { Tailwind } = VM.require("beachsunandrockandroll.near/widget/preflight");
const { Label, labelClassname } = VM.require(
  "beachsunandrockandroll.near/widget/label"
);
const { Input, inputClassname } = VM.require(
  "beachsunandrockandroll.near/widget/input"
);
const { Button } = VM.require("beachsunandrockandroll.near/widget/button");
const {
  Dialog,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  dialogContentClassname,
} = VM.require("beachsunandrockandroll.near/widget/dialog");

State.init({
  cnButtonEdit: "",
  cnButtonSave: "",
  cnLabel: "",
  cnDialogContentClassname: "",
  cnInput: "",
});

if (["", "loaded"].includes(state.cnButtonEdit))
  return (
    <Widget
      src="beachsunandrockandroll.near/widget/buttonIframe"
      props={{
        output: (cnButtonEdit) => State.update({ cnButtonEdit }),
        variant: "outline",
      }}
    />
  );

if (["", "loaded"].includes(state.cnButtonSave))
  return (
    <Widget
      src="beachsunandrockandroll.near/widget/buttonIframe"
      props={{
        output: (cnButtonSave) => State.update({ cnButtonSave }),
      }}
    />
  );

if (["", "loaded"].includes(state.cnLabel))
  return (
    <Widget
      src="beachsunandrockandroll.near/widget/cnIframe"
      props={{
        output: (cnLabel) => State.update({ cnLabel }),
        className: `${labelClassname} text-right`,
      }}
    />
  );

if (["", "loaded"].includes(state.cnDialogContentClassname))
  return (
    <Widget
      src="beachsunandrockandroll.near/widget/cnIframe"
      props={{
        output: (cnDialogContentClassname) =>
          State.update({ cnDialogContentClassname }),
        className: `${dialogContentClassname} sm:max-w-[425px]`,
      }}
    />
  );

if (["", "loaded"].includes(state.cnInput))
  return (
    <Widget
      src="beachsunandrockandroll.near/widget/cnIframe"
      props={{
        output: (cnInput) => State.update({ cnInput }),
        className: `${inputClassname} col-span-3`,
      }}
    />
  );

return (
  <Tailwind>
    <div className="flex mx-auto w-max pt-10">
      <Dialog>
        <DialogTrigger>
          <Button className={state.cnButtonEdit}>Edit Profile</Button>
        </DialogTrigger>
        <DialogContent className={state.cnDialogContentClassname}>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className={state.cnLabel}>
                Name
              </Label>
              <Input id="name" value="Pedro Duarte" className={state.cnInput} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className={state.cnLabel}>
                Username
              </Label>
              <Input
                id="username"
                value="@peduarte"
                className={state.cnInput}
              />
            </div>
          </div>
          <DialogFooter>
            <Button className={state.cnButtonSave} type="submit">
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  </Tailwind>
);
