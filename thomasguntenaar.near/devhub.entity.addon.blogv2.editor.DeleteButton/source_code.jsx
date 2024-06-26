const { onDelete, disabled } = props;
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

if (Tailwind == undefined) return "";
if (ButtonConf == undefined) return "";
if (ButtonConf == undefined) return "";

const [buttonCancel, setButtonCancel] = useState("");
const [buttonContinue, setButtonContinue] = useState("");
const [buttonDestructive, setButtonDestructive] = useState("");

if (buttonCancel === "")
  return (
    <ButtonConf
      output={setButtonCancel}
      variant="outline"
      className="w-full sm:w-fit"
    />
  );

if (buttonContinue === "")
  return (
    <ButtonConf
      output={setButtonContinue}
      className="w-full sm:w-fit mb-2 sm:mb-0"
    />
  );

if (buttonDestructive === "")
  return <ButtonConf output={setButtonDestructive} variant="destructive" />;

return (
  <Tailwind>
    <AlertDialog>
      <AlertDialogTrigger>
        <Button className={buttonDestructive}>
          <Widget
            src={"thomasguntenaar.near/widget/devhub.components.atom.Icon"}
            props={{
              type: "bootstrap_icon",
              variant: "bi-trash",
            }}
          />
          {disabled ? "Loading.." : "Delete"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your blog
            and remove your data from socialDB.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className={buttonCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={buttonContinue}
            onClick={() => {
              if (disabled) return;
              onDelete();
            }}
          >
            Continue to delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </Tailwind>
);
