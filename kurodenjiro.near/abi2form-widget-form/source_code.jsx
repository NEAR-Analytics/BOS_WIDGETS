const user = context.accountId;
const props = {"schema_version":"0.3.0","address":"chatme.near","metadata":{"name":"","version":"0.1.0","authors":[""]},"body":{"functions":[{"name":"a1","kind":"call","label":"Nhập ô","button":"Xác nhận","export":true,"params":{"serialization_type":"json","args":[]},"deposit":0,"gas":30000000000000},{"name":"a2","kind":"call","label":"Nhập B","button":"Xác nhận","export":true,"params":{"serialization_type":"json","args":[]},"deposit":0,"gas":30000000000000}]}} 

return (
  <>
    <Widget src={'kurodenjiro.near/widget/abi2form-widget'} props={props} />
  </>
);
