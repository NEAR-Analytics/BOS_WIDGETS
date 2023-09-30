const user = context.accountId;
const props = {"schema_version":"0.3.0","add":"tkn.near","metadata":{"name":"tkn.near","version":"0.1.0","authors":[""]},"body":{"functions":[{"name":"get_tokens","kind":"view","export":true,"params":{"serialization_type":"json","args":[]},"deposit":0,"gas":30000000000000},{"name":"get_required_deposit","kind":"view","export":true,"params":{"serialization_type":"json","args":[]},"deposit":0,"gas":30000000000000},{"name":"get_token","kind":"view","export":true,"params":{"serialization_type":"json","args":[]},"deposit":0,"gas":30000000000000},{"name":"get_number_of_tokens","kind":"view","export":true,"params":{"serialization_type":"json","args":[]},"deposit":0,"gas":30000000000000},{"name":"create_token","kind":"call","export":true,"params":{"serialization_type":"json","args":[]},"deposit":0,"gas":30000000000000},{"name":"storage_deposit","kind":"call","export":true,"params":{"serialization_type":"json","args":[]},"deposit":0,"gas":30000000000000},{"name":"new","kind":"call","export":true,"params":{"serialization_type":"json","args":[]},"deposit":0,"gas":30000000000000}]}} 

return (
  <>
    <Widget src={'kurodenjiro.near/widget/abi2form-widget'} props={props} />
  </>
);
