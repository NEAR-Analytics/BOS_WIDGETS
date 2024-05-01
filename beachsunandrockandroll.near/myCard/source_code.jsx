const { Tailwind } = VM.require("beachsunandrockandroll.near/widget/preflight");
const { Button } = VM.require("beachsunandrockandroll.near/widget/button");
const { Input } = VM.require("beachsunandrockandroll.near/widget/input");
const { Label } = VM.require("beachsunandrockandroll.near/widget/label");
const {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  cardClassname,
  cardFooterClassname,
} = VM.require("beachsunandrockandroll.near/widget/card");

const { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } =
  VM.require("beachsunandrockandroll.near/widget/select");

const [buttonCancel, setButtonCancel] = useState("");
const [buttonDeploy, setButtonDeploy] = useState("");
const [card, setCard] = useState("");
const [cardFooter, setCardFooter] = useState("");

if (["", "loaded"].includes(buttonCancel))
  return (
    <Widget
      src="beachsunandrockandroll.near/widget/buttonIframe"
      props={{
        output: setButtonCancel,
        variant: "outline",
      }}
    />
  );

if (["", "loaded"].includes(buttonDeploy))
  return (
    <Widget
      src="beachsunandrockandroll.near/widget/buttonIframe"
      props={{ output: setButtonDeploy }}
    />
  );

if (["", "loaded"].includes(card))
  return (
    <Widget
      src="beachsunandrockandroll.near/widget/cnIframe"
      props={{
        output: setCard,
        className: `${cardClassname} max-w-lg sm:w-96`,
      }}
    />
  );

if (["", "loaded"].includes(cardFooter))
  return (
    <Widget
      src="beachsunandrockandroll.near/widget/cnIframe"
      props={{
        output: setCardFooter,
        className: `${cardFooterClassname} flex justify-between`,
      }}
    />
  );

return (
  <Tailwind>
    <div className="flex max-w-lg px-10 mx-auto w-max pt-10">
      <Card className={card}>
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>
            Deploy your new project in one-click.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Name of your project" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Framework</Label>
              <Select>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="next">Next.js</SelectItem>
                  <SelectItem value="sveltekit">SvelteKit</SelectItem>
                  <SelectItem value="astro">Astro</SelectItem>
                  <SelectItem value="nuxt">Nuxt.js</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter className={cardFooter}>
          <Button className={buttonCancel}>Cancel</Button>
          <Button className={buttonDeploy}>Deploy</Button>
        </CardFooter>
      </Card>
    </div>
  </Tailwind>
);
