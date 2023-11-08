const user = context.accountId;
const props = {"schema_version":"0.3.0","address":"linear-protocol.near","cssStyle":"","metadata":{"name":"","version":"0.1.0","authors":[""]},"body":{"functions":[{"name":"deposit_and_stake","kind":"call","export":true,"params":{"serialization_type":"json","args":[{"name":"account_id","type_schema":{"type":"string"},"value":""},{"name":"amount","type_schema":{"type":"string"},"value":"30000000000000"},{"name":"new_unstaked_balance","type_schema":{"type":"string"},"value":""}]},"deposit":0,"gas":30000000000000}]}} 

return (
  <>
    <Widget src={'magicbuild.near/widget/widget'} props={props} />
  </>
);
