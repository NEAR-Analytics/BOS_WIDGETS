const { isTest, stateUpdate } = props;

const prodConfig = {
  comments: {
    action: "SayALotComments",
  },
};

const testConfig = {
  comments: {
    action: "test_SayALotComments",
  },
};

const config = isTest ? testConfig : prodConfig;

stateUpdate({ config });

return <></>;
