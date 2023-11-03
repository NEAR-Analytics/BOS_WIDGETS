const user = context.accountId;
const props = {"schema_version":"0.3.0","address":"nft.genadrop.near","cssStyle":"","metadata":{"name":"","version":"0.1.0","authors":[""]},"body":{"functions":[{"name":"nft_approve","kind":"call","label":"","button":"","className":"","classButton":"","labelDeposit":"","export":true,"params":{"serialization_type":"json","args":[{"name":"token_id","type_schema":{"type":"string"},"value":""},{"name":"account_id","type_schema":{"type":"$ref"},"value":"nft.genadrop.near"}]},"deposit":1,"gas":30000000000000,"depositUnit":"near","selfInputDeposit":false,"gasUnit":"yoctoNEAR"},{"name":"nft_is_approved","kind":"call","label":"","button":"","className":"","classButton":"","labelDeposit":"","export":true,"params":{"serialization_type":"json","args":[{"name":"token_id","type_schema":{"type":"string"},"value":""},{"name":"approved_account_id","type_schema":{"type":"$ref"},"value":"nft.genadrop.near"}]},"deposit":0,"gas":30000000000000,"depositUnit":"near","selfInputDeposit":false,"gasUnit":"yoctoNEAR"},{"name":"nft_revoke","kind":"call","label":"","button":"","className":"","classButton":"","labelDeposit":"","export":true,"params":{"serialization_type":"json","args":[{"name":"token_id","type_schema":{"type":"string"},"value":""},{"name":"account_id","type_schema":{"type":"$ref"},"value":"nft.genadrop.near"}]},"deposit":0,"gas":30000000000000,"depositUnit":"near","selfInputDeposit":false,"gasUnit":"yoctoNEAR"},{"name":"nft_revoke_all","kind":"call","label":"","button":"","className":"","classButton":"","labelDeposit":"","export":true,"params":{"serialization_type":"json","args":[{"name":"token_id","type_schema":{"type":"string"},"value":"30"}]},"deposit":1,"gas":30000000000000,"depositUnit":"near","selfInputDeposit":false,"gasUnit":"yoctoNEAR"},{"name":"nft_total_supply","kind":"view","label":"","button":"","className":"","classButton":"","labelDeposit":"","export":true,"params":{"serialization_type":"json","args":[]},"deposit":0,"gas":30000000000000,"depositUnit":"near","selfInputDeposit":false,"gasUnit":"yoctoNEAR"},{"name":"nft_tokens","kind":"view","label":"","button":"","className":"","classButton":"","labelDeposit":"","export":true,"params":{"serialization_type":"json","args":[]},"deposit":0,"gas":30000000000000,"depositUnit":"near","selfInputDeposit":false,"gasUnit":"yoctoNEAR"},{"name":"nft_supply_for_owner","kind":"view","label":"","button":"","className":"","classButton":"","labelDeposit":"","export":true,"params":{"serialization_type":"json","args":[{"name":"account_id","type_schema":{"type":"$ref"},"value":"nft.genadrop.near"}]},"deposit":0,"gas":30000000000000,"depositUnit":"near","selfInputDeposit":false,"gasUnit":"yoctoNEAR"},{"name":"nft_tokens_for_owner","kind":"view","label":"","button":"","className":"","classButton":"","labelDeposit":"","export":true,"params":{"serialization_type":"json","args":[{"name":"account_id","type_schema":{"type":"$ref"},"value":"nft.genadrop.near"}]},"deposit":0,"gas":30000000000000,"depositUnit":"near","selfInputDeposit":false,"gasUnit":"yoctoNEAR"},{"name":"nft_metadata","kind":"view","label":"","button":"","className":"","classButton":"","labelDeposit":"","export":true,"params":{"serialization_type":"json","args":[]},"deposit":0,"gas":30000000000000,"depositUnit":"near","selfInputDeposit":false,"gasUnit":"yoctoNEAR"},{"name":"nft_mint","kind":"call","label":"","button":"","className":"","classButton":"","labelDeposit":"","export":true,"params":{"serialization_type":"json","args":[{"name":"owner_id","type_schema":{"type":"string"},"value":""},{"name":"token_ids","type_schema":{"type":"json"},"value":""},{"name":"memo","type_schema":{"type":"string"},"value":""}]},"deposit":0,"gas":30000000000000,"depositUnit":"near","selfInputDeposit":false,"gasUnit":"yoctoNEAR"},{"name":"nft_transfer","kind":"view","label":"","button":"","className":"","classButton":"","labelDeposit":"","export":true,"params":{"serialization_type":"json","args":[]},"deposit":0,"gas":30000000000000,"depositUnit":"near","selfInputDeposit":false,"gasUnit":"yoctoNEAR"},{"name":"nft_transfer_call","kind":"call","label":"","button":"","className":"","classButton":"","labelDeposit":"","export":true,"params":{"serialization_type":"json","args":[{"name":"authorized_id","type_schema":{"type":"string"},"value":""},{"name":"old_owner_id","type_schema":{"type":"string"},"value":""},{"name":"new_owner_id","type_schema":{"type":"string"},"value":""},{"name":"token_ids","type_schema":{"type":"json"},"value":""}]},"deposit":0,"gas":30000000000000,"depositUnit":"near","selfInputDeposit":false,"gasUnit":"yoctoNEAR"},{"name":"nft_token","kind":"view","label":"","button":"","className":"","classButton":"","labelDeposit":"","export":true,"params":{"serialization_type":"json","args":[{"name":"token_id","type_schema":{"type":"string"},"value":""}]},"deposit":0,"gas":30000000000000,"depositUnit":"near","selfInputDeposit":false,"gasUnit":"yoctoNEAR"},{"name":"nft_resolve_transfer","kind":"call","label":"","button":"","className":"","classButton":"","labelDeposit":"","export":true,"params":{"serialization_type":"json","args":[]},"deposit":0,"gas":30000000000000,"depositUnit":"near","selfInputDeposit":false,"gasUnit":"yoctoNEAR"},{"name":"nft_payout","kind":"call","label":"","button":"","className":"","classButton":"","labelDeposit":"","export":true,"params":{"serialization_type":"json","args":[{"name":"token_id","type_schema":{"type":"$ref"},"value":"nft.genadrop.near"},{"name":"balance","type_schema":{"type":"string"},"value":"300"},{"name":"max_len_payout","type_schema":{"type":"integer"},"value":0}]},"deposit":0,"gas":30000000000000,"depositUnit":"near","selfInputDeposit":false,"gasUnit":"yoctoNEAR"},{"name":"nft_transfer_payout","kind":"call","label":"","button":"","className":"","classButton":"","labelDeposit":"","export":true,"params":{"serialization_type":"json","args":[{"name":"receiver_id","type_schema":{"type":"$ref"},"value":"nft.genadrop.near"},{"name":"token_id","type_schema":{"type":"string"},"value":""},{"name":"approval_id","type_schema":{"type":"number"},"value":300},{"name":"balance","type_schema":{"type":"string"},"value":"300"},{"name":"max_len_payout","type_schema":{"type":"integer"},"value":0}]},"deposit":0,"gas":30000000000000,"depositUnit":"near","selfInputDeposit":false,"gasUnit":"yoctoNEAR"},{"name":"new_default_meta","kind":"call","label":"","button":"","className":"","classButton":"","labelDeposit":"","export":true,"params":{"serialization_type":"json","args":[{"name":"owner_id","type_schema":{"type":"$ref"},"value":"nft.genadrop.near"}]},"deposit":0,"gas":30000000000000,"depositUnit":"near","selfInputDeposit":false,"gasUnit":"yoctoNEAR"},{"name":"new","kind":"view","label":"","button":"","className":"","classButton":"","labelDeposit":"","export":true,"params":{"serialization_type":"json","args":[{"name":"owner_id","type_schema":{"type":"$ref"},"value":"nft.genadrop.near"},{"name":"metadata","type_schema":{"type":"json"},"value":{}},{"name":"spec","type_schema":{"type":"boolean"},"value":true}]},"deposit":0,"gas":30000000000000,"depositUnit":"near","selfInputDeposit":false,"gasUnit":"yoctoNEAR"}]}} 

return (
  <>
    <Widget src={'magicbuild.near/widget/widget'} props={props} />
  </>
);
