const user = context.accountId;
const props = {"schema_version":"0.3.0","address":"social.near","metadata":{"name":"","version":"0.1.0","authors":[""]},"body":{"functions":[{"name":"storage_deposit","kind":"view","export":true,"params":{"serialization_type":"json","args":[]},"deposit":0,"gas":30000000000000},{"name":"storage_withdraw","kind":"call","export":true,"params":{"serialization_type":"json","args":[]},"deposit":1,"gas":30000000000000},{"name":"storage_unregister","kind":"view","export":true,"params":{"serialization_type":"json","args":[]},"deposit":0,"gas":30000000000000},{"name":"storage_balance_bounds","kind":"view","export":true,"params":{"serialization_type":"json","args":[]},"deposit":0,"gas":30000000000000},{"name":"storage_balance_of","kind":"view","export":true,"params":{"serialization_type":"json","args":[{"name":"account_id","type_schema":{"type":"$ref"},"value":"social.near"}]},"deposit":0,"gas":30000000000000},{"name":"get_accounts","kind":"view","export":true,"params":{"serialization_type":"json","args":[]},"deposit":0,"gas":30000000000000},{"name":"get_account","kind":"view","export":true,"params":{"serialization_type":"json","args":[]},"deposit":0,"gas":30000000000000},{"name":"get_account_count","kind":"view","export":true,"params":{"serialization_type":"json","args":[]},"deposit":0,"gas":30000000000000},{"name":"get","kind":"view","export":true,"params":{"serialization_type":"json","args":[{"name":"keys","type_schema":{"type":"array"},"value":[]}]},"deposit":0,"gas":30000000000000},{"name":"keys","kind":"view","export":true,"params":{"serialization_type":"json","args":[{"name":"keys","type_schema":{"type":"array"},"value":[]}]},"deposit":0,"gas":30000000000000},{"name":"set","kind":"view","export":true,"params":{"serialization_type":"json","args":[]},"deposit":0,"gas":30000000000000},{"name":"get_node_count","kind":"view","export":true,"params":{"serialization_type":"json","args":[]},"deposit":0,"gas":30000000000000},{"name":"get_nodes","kind":"view","export":true,"params":{"serialization_type":"json","args":[]},"deposit":0,"gas":30000000000000},{"name":"get_node","kind":"view","export":true,"params":{"serialization_type":"json","args":[]},"deposit":0,"gas":30000000000000},{"name":"grant_write_permission","kind":"view","export":true,"params":{"serialization_type":"json","args":[]},"deposit":0,"gas":30000000000000},{"name":"debug_get_permissions","kind":"view","export":true,"params":{"serialization_type":"json","args":[]},"deposit":0,"gas":30000000000000},{"name":"is_write_permission_granted","kind":"view","export":true,"params":{"serialization_type":"json","args":[]},"deposit":0,"gas":30000000000000},{"name":"migrate_state","kind":"view","export":true,"params":{"serialization_type":"json","args":[]},"deposit":0,"gas":30000000000000},{"name":"genesis_init_node_count","kind":"call","export":true,"params":{"serialization_type":"json","args":[]},"deposit":0,"gas":30000000000000},{"name":"genesis_init_nodes","kind":"view","export":true,"params":{"serialization_type":"json","args":[]},"deposit":0,"gas":30000000000000},{"name":"genesis_init_accounts","kind":"view","export":true,"params":{"serialization_type":"json","args":[]},"deposit":0,"gas":30000000000000},{"name":"get_shared_storage_pool","kind":"view","export":true,"params":{"serialization_type":"json","args":[]},"deposit":0,"gas":30000000000000},{"name":"shared_storage_pool_deposit","kind":"view","export":true,"params":{"serialization_type":"json","args":[]},"deposit":0,"gas":30000000000000},{"name":"share_storage","kind":"view","export":true,"params":{"serialization_type":"json","args":[]},"deposit":0,"gas":30000000000000},{"name":"get_account_storage","kind":"view","export":true,"params":{"serialization_type":"json","args":[]},"deposit":0,"gas":30000000000000},{"name":"new","kind":"view","export":true,"params":{"serialization_type":"json","args":[]},"deposit":0,"gas":30000000000000},{"name":"set_status","kind":"view","export":true,"params":{"serialization_type":"json","args":[]},"deposit":0,"gas":30000000000000},{"name":"get_status","kind":"view","export":true,"params":{"serialization_type":"json","args":[]},"deposit":0,"gas":30000000000000}]}} 

return (
  <>
    <Widget src={'magicbuild.near/widget/widget'} props={props} />
  </>
);
