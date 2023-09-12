const getSocial = Social.get(["hangil11.near/collegium/post/*"]);

// const getSocial = Social.get(["hangil11.near/collegium/post/*", "junho9341.near/collegium/post/*"])

const getr = Social.getr("*/collegium/post", "final");
const index = Social.index("collegium.post", "main");

const keys = Social.keys("*/collegium/post/*", "final", {
  return_type: "BlockHeight",
});

const nearGet = Near.view("social.near", "get", {
  keys: ["hangil11.near/collegium/post/*"],
});

console.log({ getSocial, getr, index, keys, nearGet });

return <>
<h1>Social.get</h1>
<div>
{JSON.stringify(getSocial)}
</div>
<h1>Social.getr</h1>
<div>
{JSON.stringify(getr)}
</div>
<h1>Social.keys</h1>
<div>
{JSON.stringify(keys)}
</div>
<h1>Social.index</h1>
<div>
{JSON.stringify(index)}
</div>
<h1>Near.view</h1>
<div>
{JSON.stringify(nearGet)}
</div>
</>;
