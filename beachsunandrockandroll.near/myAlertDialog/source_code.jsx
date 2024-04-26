const { Tailwind } = VM.require("beachsunandrockandroll.near/widget/preflight");
const { Button } = VM.require("beachsunandrockandroll.near/widget/button");
const {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} = VM.require("beachsunandrockandroll.near/widget/card");

State.init({
  cnButtonCancel: "",
  cnButtonDeploy: "",
});

if (["", "loaded"].includes(state.cnButtonCancel))
  return (
    <Widget
      src="beachsunandrockandroll.near/widget/buttonIframe"
      props={{
        output: (cnButtonCancel) => State.update({ cnButtonCancel }),
        variant: "outline",
      }}
    />
  );

if (["", "loaded"].includes(state.cnButtonDeploy))
  return (
    <Widget
      src="beachsunandrockandroll.near/widget/buttonIframe"
      props={{
        output: (cnButtonDeploy) => State.update({ cnButtonDeploy }),
      }}
    />
  );

return (
  <Tailwind>
    <div className="flex mx-auto w-max pt-10">
      <Card className="rounded-xl border bg-card text-card-foreground shadow w-[350px]">
        <CardHeader className="flex flex-col space-y-1.5 p-6">
          <CardTitle className="font-semibold leading-none tracking-tight">
            Create project
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Deploy your new project in one-click.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5"></div>
            <div className="flex flex-col space-y-1.5"></div>
          </div>
        </CardContent>
        <CardFooter className="flex items-center p-6 pt-0 justify-between">
          <Button className={state.cnButtonCancel}>Cancel</Button>
          <Button className={state.cnButtonDeploy}>Deploy</Button>
        </CardFooter>
      </Card>
    </div>
  </Tailwind>
);
