const user = context.accountId;
const props = {"schema_version":"0.3.0","address":"chatme.near","metadata":{"name":"","version":"0.1.0","authors":[""]},"body":{"functions":[{"name":"leave_group","kind":"call","export":true,"params":{"serialization_type":"json","args":[{"name":"clan_id","type_schema":{"type":"string"},"value":""},{"name":"account","type_schema":{"type":"$ref"},"value":"chatme.near"},{"name":"address","type_schema":{"type":"$ref"},"value":"chatme.near"},{"name":"id","type_schema":{"type":"number"},"value":0}]},"deposit":0,"gas":30000000000000,"label":"Out group","button":"Out"}]}} 

return (
  <>
    <Widget src={'magicbuilder.near/widget/widget'} props={props} />
  </>
);
