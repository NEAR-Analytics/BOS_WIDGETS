const { Button } = VM.require("buildhub.near/widget/components.Button");

const defaultConfig = {
  name: "${context.accountId}-DAO",
  purpose: "build",
  metadata: "",
};

const defaultPolicy = ["infinity.near", "council.near"];

State.init({
  args: {
    config: defaultConfig,
    policy: defaultPolicy,
  },
});

const dao_args = Buffer.from(JSON.stringify(state.args), "utf-8").toString(
  "base64"
);

const handleCreate = () => {
  Near.call([
    {
      contractName: "sputnik-dao.near",
      methodName: "create",
      args: {
        name: defaultConfig.name,
        args: dao_args,
      },
      deposit: "7000000000000000000000000",
      gas: "200000000000000",
    },
  ]);
};

function CreateDAO({ input }) {
  if (input) {
    return (
      <div className="mb-3">
        <Button onClick={handleCreate} variant="primary">
          Create DAO
        </Button>
      </div>
    );
  }
}

return { CreateDAO };
