const { Tailwind } = VM.require("beachsunandrockandroll.near/widget/preflight");

const { Button } = VM.require("beachsunandrockandroll.near/widget/button");
const {
  AlertDialogRoot,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} = VM.require("beachsunandrockandroll.near/widget/alertDialog");

State.init({
  cnButton: "",
  cnCancelButton: "",
  cnActionButton: "",
});

if (["", "lodaded"].includes(state.cnButton))
  return (
    <Widget
      src="beachsunandrockandroll.near/widget/buttonIframe"
      props={{
        output: (cnButton) => State.update({ cnButton }),
        variant: "outline",
      }}
    />
  );

if (["", "lodaded"].includes(state.cnCancelButton))
  return (
    <Widget
      src="beachsunandrockandroll.near/widget/buttonIframe"
      props={{
        output: (cnCancelButton) => State.update({ cnCancelButton }),
        variant: "outline",
        className: "mt-2 sm:mt-0",
      }}
    />
  );

if (["", "lodaded"].includes(state.cnActionButton))
  return (
    <Widget
      src="beachsunandrockandroll.near/widget/buttonIframe"
      props={{
        output: (cnActionButton) => State.update({ cnActionButton }),
      }}
    />
  );

return (
  <Tailwind>
    <div className="flex mx-auto w-max h-screen pt-10">
      <AlertDialogRoot>
        <AlertDialogTrigger>
          <Button className={state.cnButton}>Show Dialog</Button>
        </AlertDialogTrigger>
        <AlertDialogContent
          className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg"
          classNameOverlay="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        >
          <AlertDialogHeader className="flex flex-col space-y-2 text-center sm:text-left">
            <AlertDialogTitle className="text-lg font-semibold">
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-muted-foreground">
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
            <AlertDialogCancel className={state.cnCancelButton}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction className={state.cnActionButton}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogRoot>
    </div>
  </Tailwind>
);
