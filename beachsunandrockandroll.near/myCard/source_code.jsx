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

const [buttonContinue, setButtonContinue] = useState("");
const [buttonOutline, setButtonOutline] = useState("");

if (buttonOutline === "")
  return <ButtonConf output={setButtonOutline} variant="outline" />;

if (buttonContinue === "")
  return <ButtonConf output={setButtonContinue} className="mb-2 sm:mb-0" />;

const wait = () => new Promise((resolve) => setTimeout(resolve, 4000));

const [open, setOpen] = useState(false);
const [loading, setLoading] = useState(false);

const Loader = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="mr-2 h-4 w-4 animate-spin"
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
  </svg>
);

return (
  <Tailwind>
    <div className="flex mx-auto w-max pt-10">
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger>
          <Button className={buttonOutline}>Show Dialog</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className={buttonOutline} disabled={loading}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className={buttonContinue}
              disabled={loading}
              onClick={(event) => {
                setLoading(true);
                wait().then(() => {
                  setOpen(false);
                  setLoading(false);
                });
                event.preventDefault();
              }}
            >
              {loading && <Loader />}
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  </Tailwind>
);
