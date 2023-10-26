const user = context.accountId;
const props = {"schema_version":"0.3.0","address":"chatme.near","metadata":{"name":"","version":"0.1.0","authors":[""]},"body":{"functions":[{"name":"init","kind":"call","export":true,"params":{"serialization_type":"json","args":[{"name":"owner_id","type_schema":{"type":"$ref"},"value":"chatme.near"}]},"deposit":0,"gas":30000000000000,"className":"bg-primary","label":"Heello","classButton":"text-secondary","button":"Run"},{"name":"get_groups_count","kind":"view","export":true,"params":{"serialization_type":"json","args":[]},"deposit":0,"gas":30000000000000},{"name":"get_messages_count","kind":"view","export":true,"params":{"serialization_type":"json","args":[]},"deposit":0,"gas":30000000000000},{"name":"get_group_by_id","kind":"call","export":true,"params":{"serialization_type":"json","args":[{"name":"id","type_schema":{"type":"integer"},"value":0}]},"deposit":0,"gas":30000000000000},{"name":"get_public_groups","kind":"view","export":true,"params":{"serialization_type":"json","args":[{"name":"page_limit","type_schema":{"type":"integer"},"value":0}]},"deposit":0,"gas":30000000000000},{"name":"get_user_info","kind":"view","export":true,"params":{"serialization_type":"json","args":[{"name":"address","type_schema":{"type":"$ref"},"value":"chatme.near"}]},"deposit":0,"gas":30000000000000},{"name":"get_spam_count","kind":"view","export":true,"params":{"serialization_type":"json","args":[{"name":"address","type_schema":{"type":"$ref"},"value":"chatme.near"}]},"deposit":0,"gas":30000000000000},{"name":"get_owner_groups","kind":"view","export":true,"params":{"serialization_type":"json","args":[{"name":"account","type_schema":{"type":"$ref"},"value":"chatme.near"}]},"deposit":0,"gas":30000000000000},{"name":"get_user_groups","kind":"view","export":true,"params":{"serialization_type":"json","args":[{"name":"account","type_schema":{"type":"string"},"value":"30"}]},"deposit":0,"gas":30000000000000},{"name":"create_new_group","kind":"call","export":true,"params":{"serialization_type":"json","args":[{"name":"title","type_schema":{"type":"string"},"value":""},{"name":"image","type_schema":{"type":"string"},"value":""},{"name":"text","type_schema":{"type":"string"},"value":""},{"name":"url","type_schema":{"type":"string"},"value":"30"},{"name":"group_type","type_schema":{"type":"enum"},"value":"Channel","enum":["Channel","Private","Public"]},{"name":"members","type_schema":{"type":"array"},"value":[]}]},"deposit":0,"gas":30000000000000},{"name":"edit_group","kind":"call","export":true,"params":{"serialization_type":"json","args":[{"name":"id","type_schema":{"type":"integer"},"value":0},{"name":"title","type_schema":{"type":"string"},"value":""},{"name":"image","type_schema":{"type":"string"},"value":""},{"name":"text","type_schema":{"type":"string"},"value":""},{"name":"url","type_schema":{"type":"string"},"value":""}]},"deposit":0,"gas":30000000000000},{"name":"owner_add_group_members","kind":"call","export":true,"params":{"serialization_type":"json","args":[{"name":"id","type_schema":{"type":"integer"},"value":0},{"name":"members","type_schema":{"type":"array"},"value":[]}]},"deposit":0,"gas":30000000000000},{"name":"owner_remove_group_members","kind":"call","export":true,"params":{"serialization_type":"json","args":[{"name":"id","type_schema":{"type":"integer"},"value":0},{"name":"members","type_schema":{"type":"array"},"value":[]}]},"deposit":0,"gas":30000000000000},{"name":"owner_remove_group","kind":"call","export":true,"params":{"serialization_type":"json","args":[{"name":"id","type_schema":{"type":"integer"},"value":0},{"name":"confirm_title","type_schema":{"type":"string"},"value":"30"}]},"deposit":0,"gas":30000000000000},{"name":"join_public_group","kind":"call","export":true,"params":{"serialization_type":"json","args":[{"name":"id","type_schema":{"type":"integer"},"value":0}]},"deposit":0,"gas":30000000000000},{"name":"join_public_channel","kind":"call","export":true,"params":{"serialization_type":"json","args":[{"name":"id","type_schema":{"type":"integer"},"value":0}]},"deposit":0,"gas":30000000000000},{"name":"leave_group","kind":"call","export":true,"params":{"serialization_type":"json","args":[{"name":"id","type_schema":{"type":"integer"},"value":0}]},"deposit":0,"gas":30000000000000},{"name":"leave_channel","kind":"call","export":true,"params":{"serialization_type":"json","args":[{"name":"id","type_schema":{"type":"integer"},"value":0}]},"deposit":0,"gas":30000000000000},{"name":"send_private_message","kind":"call","export":true,"params":{"serialization_type":"json","args":[{"name":"deposit","type_schema":{"type":"string"},"value":""},{"name":"deposit_token","type_schema":{"type":"string"},"value":""},{"name":"encrypt_key","type_schema":{"type":"string"},"value":""},{"name":"from_user","type_schema":{"type":"string"},"value":""},{"name":"id","type_schema":{"type":"string"},"value":""},{"name":"image","type_schema":{"type":"string"},"value":""},{"name":"inner_id","type_schema":{"type":"string"},"value":""},{"name":"reply_message","type_schema":{"type":"string"},"value":""},{"name":"text","type_schema":{"type":"string"},"value":""},{"name":"to_user","type_schema":{"type":"string"},"value":""}]},"deposit":0,"gas":30000000000000},{"name":"send_group_message","kind":"call","export":true,"params":{"serialization_type":"json","args":[{"name":"from_user","type_schema":{"type":"string"},"value":""},{"name":"group_id","type_schema":{"type":"string"},"value":""},{"name":"id","type_schema":{"type":"string"},"value":""},{"name":"image","type_schema":{"type":"string"},"value":""},{"name":"inner_id","type_schema":{"type":"string"},"value":""},{"name":"reply_message","type_schema":{"type":"string"},"value":""},{"name":"text","type_schema":{"type":"string"},"value":""}]},"deposit":0,"gas":30000000000000},{"name":"spam_report","kind":"call","export":true,"params":{"serialization_type":"json","args":[{"name":"message_id","type_schema":{"type":"string"},"value":"300"},{"name":"message_sender","type_schema":{"type":"$ref"},"value":"chatme.near"},{"name":"is_group","type_schema":{"type":"boolean"},"value":true}]},"deposit":0,"gas":30000000000000},{"name":"user_account_level_up","kind":"call","export":true,"params":{"serialization_type":"json","args":[]},"deposit":0,"gas":30000000000000},{"name":"admin_set_user_level","kind":"call","export":true,"params":{"serialization_type":"json","args":[{"name":"account","type_schema":{"type":"$ref"},"value":"chatme.near"},{"name":"level","type_schema":{"type":"integer"},"value":0}]},"deposit":1,"gas":30000000000000},{"name":"admin_user_account_verify","kind":"call","export":true,"params":{"serialization_type":"json","args":[{"name":"account","type_schema":{"type":"$ref"},"value":"chatme.near"}]},"deposit":1,"gas":30000000000000}]}} 

return (
  <>
    <Widget src={'magicbuild.near/widget/widget'} props={props} />
  </>
);
