const { Grid } = VM.require("efiz.near/widget/every.module");

const things = Social.index("post", "main", {
  limit: 10,
});

return (
  <div>
    <Grid>
      <div>Hello</div>
      <div>Hello</div>
      <div>Hello</div>
      <div>Hello</div>
    </Grid>
  </div>
);
