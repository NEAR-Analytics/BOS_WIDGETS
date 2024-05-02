const { Tailwind } = VM.require("beachsunandrockandroll.near/widget/preflight");

// const { Button } = VM.require("beachsunandrockandroll.near/widget/button");
const { Button, BtnIframe } = VM.require(
  "beachsunandrockandroll.near/widget/buttonv2"
);

const [buttonOutline, setButtonOutline] = useState("");
const [buttonDestructive, setButtonDestructive] = useState("");
const [buttonSecondary, setButtonSecondary] = useState("");
const [buttonGhost, setButtonGhost] = useState("");
const [buttonLink, setButtonLink] = useState("");

if (buttonOutline === "")
  return <BtnIframe output={setButtonOutline} variant="outline" />;

if (buttonDestructive === "")
  return <BtnIframe output={setButtonDestructive} variant="destructive" />;

if (buttonSecondary === "")
  return <BtnIframe output={setButtonSecondary} variant="secondary" />;

if (buttonGhost === "")
  return <BtnIframe output={setButtonGhost} variant="ghost" />;

if (buttonLink === "")
  return <BtnIframe output={setButtonLink} variant="link" />;

if (Tailwind == undefined) return "";

return (
  <Tailwind>
    <div className="flex mx-auto w-max pt-10">
      <Button>Button</Button>
      <Button className={buttonOutline}>Outline</Button>
      <Button className={buttonDestructive}>Destructive</Button>
      <Button className={buttonSecondary}>Secondary</Button>
      <Button className={buttonGhost}>Ghost</Button>
      <Button className={buttonLink}>Link</Button>
    </div>
  </Tailwind>
);
