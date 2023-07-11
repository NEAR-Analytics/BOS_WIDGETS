const data = props.data;
const { Grid } = VM.require("efiz.near/widget/every.module");
const { Sharddog } = VM.require("efiz.near/widget/Sharddog.Template");

return (
  <Grid>
    {data.map((it) => (
      <Sharddog owner={it.owner} media={it.media} />
    ))}
  </Grid>
);
