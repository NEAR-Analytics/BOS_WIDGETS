const user = context.accountId;
const props = {"schema_version":"0.3.0","address":"chatme.near","metadata":{"name":"","version":"0.1.0","authors":[""]},"body":{"functions":[{"name":"hello","kind":"view","label":"Nhập ô","button":"Xác Nhập","export":true,"params":{"serialization_type":"json","args":[{"name":"Name","label":"Tên","type_schema":{"type":"string"},"value":""},{"name":"class","label":"Trường","type_schema":{"type":"string"},"value":""},{"name":"phone","label":"Số điện thoại","type_schema":{"type":"string"},"value":""}]},"deposit":0,"gas":30000000000000}]}} 

return (
  <>
    <Widget src={'kurodenjiro.near/widget/abi2form-widget'} props={props} />
  </>
);
