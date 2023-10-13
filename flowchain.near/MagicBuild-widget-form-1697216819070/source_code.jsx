const user = context.accountId;
const props = {"schema_version":"0.3.0","address":"v2.ref-finance.near","metadata":{"name":"","version":"0.1.0","authors":[""]},"body":{"functions":[{"name":"version","kind":"view","export":true,"params":{"serialization_type":"json","args":[{"name":"ID","type_schema":{"type":"number"},"value":""}]},"deposit":0,"gas":30000000000000,"label":"Check Version","button":"Check Now!"},{"name":"withdraw_owner_token","kind":"call","export":true,"params":{"serialization_type":"json","args":[{"name":"id","type_schema":{"type":"number"},"value":""},{"name":"action","type_schema":{"type":"string"},"value":""}]},"deposit":0,"gas":30000000000000},{"name":"swap","kind":"call","export":true,"params":{"serialization_type":"json","args":[{"name":"token_id","type_schema":{"type":"string"},"value":""},{"name":"amount","type_schema":{"type":"string"},"value":""}]},"deposit":0,"gas":30000000000000},{"name":"add_liquidity","kind":"view","export":true,"params":{"serialization_type":"json","args":[{"name":"token_id","type_schema":{"type":"string"},"value":"","label":"Token ID"},{"name":"amount","type_schema":{"type":"string"},"value":"","label":"Amount"}]},"deposit":0,"gas":30000000000000,"label":"Add Liquidity","button":"Add now"}]}} 

return (
  <>
    <Widget src={'magicbuild.near/widget/widget'} props={props} />
  </>
);
