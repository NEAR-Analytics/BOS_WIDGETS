const { Tailwind } = VM.require("beachsunandrockandroll.near/widget/preflight");

// const { Button } = VM.require("beachsunandrockandroll.near/widget/button");
const { Button, BtnIframe } = VM.require(
  "beachsunandrockandroll.near/widget/buttonv2"
);

const [buttonOutline, setButtonOutline] = useState("");
const [buttonDestructive, setButtonDestructive] = useState("");

if (buttonOutline === "")
  return (
    <BtnIframe
      output={setButtonOutline}
      variant="outline"
    />
  );

if (buttonDestructive === "")
  return (
    <BtnIframe
      output={setButtonDestructive}
      variant="destructive"
      className="text-green-400 rounded-xl"
    />
  );

if (Tailwind == undefined) return "";

return (
  <Tailwind>
    <div className="flex mx-auto w-max pt-10">
      <Button>Button</Button>
      <Button className={buttonOutline}>Outline</Button>
      <Button className={buttonDestructive}>Destructive</Button>
    </div>
  </Tailwind>
);
