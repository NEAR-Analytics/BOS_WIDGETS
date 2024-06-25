const { Tailwind } = VM.require("uiisnear.near/widget/tailwind");

const { Button, ButtonConf } = VM.require("uiisnear.near/widget/button");
const {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} = VM.require("uiisnear.near/widget/alertDialog");

const { open, setOpen, onClick } = props;

if (Tailwind == undefined) return "";
if (ButtonConf == undefined) return "";

const [buttonContinue, setButtonContinue] = useState("");
const [buttonOutline, setButtonOutline] = useState("");

if (buttonOutline === "")
  return <ButtonConf output={setButtonOutline} variant="outline" />;

if (buttonContinue === "")
  return <ButtonConf output={setButtonContinue} className="mb-2 sm:mb-0" />;

return (
  <Tailwind>
    <div className="flex mx-auto w-max pt-10">
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger>
          <>TODO</>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
            <AlertDialogDescription>
              You are about to close this item with unsaved changes. Would you
              like to save these changes before closing?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className={buttonOutline}
              onClick={(event) => onClick(event, "discard")}
            >
              Discard changes
            </AlertDialogCancel>
            <AlertDialogAction
              className={buttonContinue}
              onClick={(event) => onClick(event, "save")}
            >
              Save changes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  </Tailwind>
);
