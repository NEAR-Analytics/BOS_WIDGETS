const user = context.accountId;
const props = {"schema_version":"0.3.0","address":"nft.genadrop.near","metadata":{"name":"","version":"0.1.0","authors":[""]},"body":{"functions":[{"name":"nft_approve","kind":"call","export":true,"params":{"serialization_type":"json","args":[{"name":"token_id","type_schema":{"type":"string"},"value":""},{"name":"account_id","type_schema":{"type":"$ref"},"value":"nft.genadrop.near"}]},"deposit":1,"gas":30000000000000},{"name":"nft_is_approved","kind":"call","export":true,"params":{"serialization_type":"json","args":[{"name":"token_id","type_schema":{"type":"string"},"value":""},{"name":"approved_account_id","type_schema":{"type":"$ref"},"value":"nft.genadrop.near"}]},"deposit":0,"gas":30000000000000},{"name":"nft_revoke","kind":"call","export":true,"params":{"serialization_type":"json","args":[{"name":"token_id","type_schema":{"type":"string"},"value":"30"},{"name":"account_id","type_schema":{"type":"$ref"},"value":"nft.genadrop.near"}]},"deposit":0,"gas":30000000000000},{"name":"nft_revoke_all","kind":"call","export":true,"params":{"serialization_type":"json","args":[{"name":"token_id","type_schema":{"type":"string"},"value":"30"}]},"deposit":1,"gas":30000000000000},{"name":"nft_total_supply","kind":"view","export":true,"params":{"serialization_type":"json","args":[]},"deposit":0,"gas":30000000000000},{"name":"nft_tokens","kind":"view","export":true,"params":{"serialization_type":"json","args":[]},"deposit":0,"gas":30000000000000},{"name":"nft_supply_for_owner","kind":"view","export":true,"params":{"serialization_type":"json","args":[{"name":"account_id","type_schema":{"type":"$ref"},"value":"nft.genadrop.near"}]},"deposit":0,"gas":30000000000000},{"name":"nft_tokens_for_owner","kind":"view","export":true,"params":{"serialization_type":"json","args":[{"name":"account_id","type_schema":{"type":"$ref"},"value":"nft.genadrop.near"}]},"deposit":0,"gas":30000000000000},{"name":"nft_metadata","kind":"view","export":true,"params":{"serialization_type":"json","args":[]},"deposit":0,"gas":30000000000000},{"name":"nft_mint","kind":"call","export":true,"params":{"serialization_type":"json","args":[{"name":"owner_id","type_schema":{"type":"string"},"value":""},{"name":"token_ids","type_schema":{"type":"json"},"value":""},{"name":"memo","type_schema":{"type":"string"},"value":""}]},"deposit":0,"gas":30000000000000},{"name":"nft_transfer","kind":"call","export":true,"params":{"serialization_type":"json","args":[{"name":"old_owner_id","type_schema":{"type":"string"},"value":""},{"name":"new_owner_id","type_schema":{"type":"string"},"value":""},{"name":"token_ids","type_schema":{"type":"json"},"value":""}]},"deposit":0,"gas":30000000000000},{"name":"nft_transfer_call","kind":"call","export":true,"params":{"serialization_type":"json","args":[{"name":"authorized_id","type_schema":{"type":"string"},"value":""},{"name":"old_owner_id","type_schema":{"type":"string"},"value":""},{"name":"new_owner_id","type_schema":{"type":"string"},"value":""},{"name":"token_ids","type_schema":{"type":"json"},"value":""}]},"deposit":0,"gas":30000000000000},{"name":"nft_token","kind":"view","export":true,"params":{"serialization_type":"json","args":[{"name":"token_id","type_schema":{"type":"string"},"value":""}]},"deposit":0,"gas":30000000000000},{"name":"nft_resolve_transfer","kind":"call","export":true,"params":{"serialization_type":"json","args":[]},"deposit":0,"gas":30000000000000},{"name":"nft_payout","kind":"call","export":true,"params":{"serialization_type":"json","args":[{"name":"token_id","type_schema":{"type":"string"},"value":""},{"name":"balance","type_schema":{"type":"string"},"value":"300"},{"name":"max_len_payout","type_schema":{"type":"integer"},"value":0}]},"deposit":0,"gas":30000000000000},{"name":"nft_transfer_payout","kind":"call","export":true,"params":{"serialization_type":"json","args":[{"name":"receiver_id","type_schema":{"type":"$ref"},"value":"nft.genadrop.near"},{"name":"token_id","type_schema":{"type":"string"},"value":"30"},{"name":"approval_id","type_schema":{"type":"integer"},"value":0},{"name":"balance","type_schema":{"type":"string"},"value":"300"},{"name":"max_len_payout","type_schema":{"type":"integer"},"value":0}]},"deposit":0,"gas":30000000000000},{"name":"new_default_meta","kind":"call","export":true,"params":{"serialization_type":"json","args":[{"name":"owner_id","type_schema":{"type":"$ref"},"value":"nft.genadrop.near"}]},"deposit":0,"gas":30000000000000},{"name":"new","kind":"view","export":true,"params":{"serialization_type":"json","args":[{"name":"owner_id","type_schema":{"type":"$ref"},"value":"nft.genadrop.near"},{"name":"metadata","type_schema":{"type":"json"},"value":{}},{"name":"spec","type_schema":{"type":"string"},"value":""}]},"deposit":0,"gas":30000000000000}]}} 

return (
  <>
    <Widget src={'magicbuild.near/widget/widget'} props={props} />
  </>
);
