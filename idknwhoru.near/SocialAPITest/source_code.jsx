const getSocial = Social.get(["hangil11.near/collegium/post/*"]);

// const getSocial = Social.get(["hangil11.near/collegium/post/*", "junho9341.near/collegium/post/*"])

const getr = Social.getr("*/collegium/post", "final");
const index = Social.index("collegium.post", "main");

const keys = Social.keys("*/collegium/post/*", "final", {
  return_type: "BlockHeight",
});

const nearGet = Near.view("social.near", "get", {
  keys: ["*.near/collegium/post/*"],
});

console.log({ getSocial, getr, index, keys, nearGet });

return <div>Hello World</div>;
