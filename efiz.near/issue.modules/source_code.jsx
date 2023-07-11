const { Grid } = VM.require("efiz.near/widget/every.module");

const things = Social.index("post", "main", {
  limit: 10,
});

return (
  <div>
    <Grid>
      {things?.map((it) => (
        <p>{JSON.stringify(it)}</p>
      ))}
    </Grid>
  </div>
);
