"use strict";
const { message, onMessage } = props;
return <iframe
  style={{ display: "none" }}
  srcDoc={'<html><body><script>"use strict";(()=>{function d(o){return e=>e.split(`\n`).map(n=>n.length?"    ".repeat(o)+n:"").join(`\n`)}var _=class{constructor(e){this.config=e}generate(e){let n=[{path:["near_sdk_contract_tools","FungibleToken"]},{path:["near_sdk_contract_tools","standard","nep141","*"]}],a;if((this.config.preMint&&+this.config.preMint>0?(this.config.preMint+"").trim():void 0)!==void 0){let g;this.config.preMintReceiver?g=`"${this.config.preMintReceiver}".parse().unwrap()`:(n.push({path:["near_sdk","env"]}),g="env::predecessor_account_id()"),a=`contract.mint(${g}, ${this.config.preMint}u128, None);`}let s="decimals"in this.config?+this.config.decimals:24,i=Math.max(0,Math.min(38,s)),c=[`name = "${this.config.name}"`,`symbol = "${this.config.symbol}"`,`decimals = ${i}`],u=[],f=e.beforeChangeFunction.length?`\n`+e.beforeChangeFunction.map(d(1)).join(`\n`):"",p=e.afterChangeFunction.length?`\n`+e.afterChangeFunction.map(d(1)).join(`\n`):"",m=e.beforeAuthorizedFunction.length?`\n`+d(1)(e.beforeAuthorizedFunction.join(`\n`)):"";if(this.config.mintable){n.push({path:["near_sdk","AccountId"]}),n.push({path:["near_sdk","json_types","U128"]});let g=`\npub fn mint(&mut self, account_id: AccountId, amount: U128) {${f}${m}\n    Nep141Controller::mint(self, account_id, amount.into(), None);${p}\n}\n`.trim();u.push(g)}if(this.config.burnable){n.push({path:["near_sdk","env"]}),n.push({path:["near_sdk","json_types","U128"]});let g=`\npub fn burn(&mut self, amount: U128) {${f}\n    Nep141Controller::burn(self, env::predecessor_account_id(), amount.into(), None);${p}\n}\n`.trim();u.push(g)}let r=u.join(`\n\n`)||void 0,h;e.afterChangeFunction.length==0&&e.beforeChangeFunction.length==0?c.push("no_hooks"):h=`\nimpl Nep141Hook for Contract {\n    fn before_transfer(&mut self, transfer: &Nep141Transfer) {${d(1)(f)}\n    }\n\n    fn after_transfer(&mut self, transfer: &Nep141Transfer, _: ()) {${d(1)(p)}\n    }\n}\n`.trim();let l=`#[fungible_token(${c.join(", ")})]`;return{imports:n,deriveMacroName:"FungibleToken",deriveMacroAttribute:l,constructorCode:a,bindgenCode:r,otherCode:h}}},b=class{constructor(e){this.config=e}generate(e){let n=[{path:["near_sdk_contract_tools","nft","*"]}],a=`\ncontract.set_contract_metadata(ContractMetadata::new(\n    "${this.config.name}".to_string(),\n    "${this.config.symbol}".to_string(),\n    ${this.config.baseUri?`Some("${this.config.baseUri}".to_string())`:"None"},\n));\n`.trim(),t=[],s,i=e.beforeChangeFunction.length?`\n`+e.beforeChangeFunction.map(d(1)).join(`\n`):"",c=e.afterChangeFunction.length?`\n`+e.afterChangeFunction.map(d(1)).join(`\n`):"",u=e.beforeAuthorizedFunction.length?`\n`+d(1)(e.beforeAuthorizedFunction.join(`\n`)):"";if(e.afterChangeFunction.length==0&&e.beforeChangeFunction.length==0&&e.beforeAuthorizedFunction.length==0)t.push("no_core_hooks","no_approval_hooks");else{n.push({path:["near_sdk","AccountId"]});let r=[i.length>0?`\nfn before_nft_approve(&self, token_id: &TokenId, account_id: &AccountId) {${i}\n}\n\nfn before_nft_revoke(&self, token_id: &TokenId, account_id: &AccountId) {${i}\n}\n\nfn before_nft_revoke_all(&self, token_id: &TokenId) {${i}\n}\n`.trim():"",c.length>0?`\nfn after_nft_approve(&mut self, token_id: &TokenId, account_id: &AccountId, _approval_id: &ApprovalId) {${c}\n}\n\nfn after_nft_revoke(&mut self, token_id: &TokenId, account_id: &AccountId) {${c}\n}\n\nfn after_nft_revoke_all(&mut self, token_id: &TokenId) {${c}\n}\n`.trim():""].filter(l=>l.length>0).map(d(1)).join(`\n\n`);r.length==0?t.push("no_approval_hooks"):r=`\nimpl SimpleNep178Hook for Contract {\n${r}\n}\n`.trim();let h=[i.length>0?`fn before_nft_transfer(&self, transfer: &Nep171Transfer) {${i}\n}`:"",c.length>0?`fn after_nft_transfer(&self, transfer: &Nep171Transfer) {${c}\n}`:""].filter(l=>l.length>0).map(d(1)).join(`\n\n`);h.length==0?t.push("no_core_hooks"):h=`\nimpl SimpleNep171Hook for Contract {\n${h}\n}\n`.trim(),s=[r,h].filter(l=>l.length>0).join(`\n\n`)}let f=[];if(this.config.mintable){n.push({path:["near_sdk","AccountId"]}),n.push({path:["near_sdk","env"]});let r=`\npub fn mint(&mut self, token_id: TokenId, account_id: AccountId, metadata: TokenMetadata) {${u}${i}\n    Nep177Controller::mint_with_metadata(self, token_id, account_id, metadata)\n        .unwrap_or_else(|e| env::panic_str(&e.to_string()));${c}\n}\n`.trim();f.push(r)}if(this.config.burnable){n.push({path:["near_sdk","env"]});let r=`\npub fn burn(&mut self, token_id: TokenId) {${i}\n    Nep177Controller::burn_with_metadata(self, token_id, &env::predecessor_account_id())\n        .unwrap_or_else(|e| env::panic_str(&e.to_string()));${c}\n}\n`.trim();f.push(r)}let p=f.join(`\n\n`)||void 0,m=t.length>0?`#[non_fungible_token(${t.join(", ")})]`:void 0;return{imports:n,deriveMacroName:"NonFungibleToken",deriveMacroAttribute:m,constructorCode:a,bindgenCode:p,otherCode:s}}},C=class{constructor(e){this.config=e}generate(){let e=[{path:["near_sdk","borsh","self"]},{path:["near_sdk","borsh","BorshSerialize"]},{path:["near_sdk","BorshStorageKey"]},{path:["near_sdk_contract_tools","Rbac"]},{path:["near_sdk_contract_tools","rbac","*"]}],n;return this.config.accountId?n=`"${this.config.accountId}".parse().unwrap()`:(e.push({path:["near_sdk","env"]}),n="env::predecessor_account_id()"),{imports:e,deriveMacroName:"Rbac",deriveMacroAttribute:\'#[rbac(roles = "Role")]\',beforeChangeFunctionGuards:[],afterChangeFunctionGuards:[],authorizedFunctionGuards:["<Self as Rbac>::require_role(&Role::Admin);"],constructorCode:`contract.add_role(${n}, &Role::Admin);`,otherCode:`\n#[derive(BorshSerialize, BorshStorageKey)]\npub enum Role {\n    Admin,\n}\n`.trim()}}},k=class{constructor(e){this.config=e}generate(){let e=[{path:["near_sdk","env"]},{path:["near_sdk_contract_tools","Owner"]},{path:["near_sdk_contract_tools","owner","*"]}],a=`Owner::init(&mut contract, &${this.config.accountId?`"${this.config.accountId}".parse().unwrap()`:"env::predecessor_account_id()"});`;return{imports:e,deriveMacroName:"Owner",constructorCode:a,beforeChangeFunctionGuards:[],afterChangeFunctionGuards:[],authorizedFunctionGuards:["<Self as Owner>::require_owner();"]}}},F=class{constructor(e){}generate(){return{imports:[{path:["near_sdk_contract_tools","Pause"]},{path:["near_sdk_contract_tools","pause","*"]}],deriveMacroName:"Pause",beforeChangeFunctionGuards:["Contract::require_unpaused();"],afterChangeFunctionGuards:[],authorizedFunctionGuards:[]}}};function $(o){return o&&typeof o=="object"&&typeof o.token=="object"&&typeof o.token.which=="string"}function M(o){let e=o.token.which==="ft"?new _(o.token.config):new b(o.token.config),n=Object.entries(o.plugins).map(([a,t])=>{switch(a){case"owner":return new k(t);case"pause":return new F(t);case"rbac":return new C(t);default:throw new Error(`Unknown plugin: "${a}"`)}});return{token:e,plugins:n}}function I(o){let e={part:"",children:{}};function n(t,s){if(s.length==0)return;let[i,...c]=s;t.children[i]==null&&(t.children[i]={part:i,children:{}}),n(t.children[i],c)}for(let t of o)n(e,t.path);function a(t){let s=Object.values(t.children);if(s.length===1)return`${t.part}::${a(s[0])}`;if(s.length>1){let i=s.map(a).map(d(1)).join(`,\n`);return`${t.part}::{\n${i},\n}`}else return t.part}return Object.values(e.children).map(t=>`use ${a(t)};`).join(`\n`)}function v(o){let e;$(o)?e=M(o):e=o;let n=[{path:["near_sdk","near_bindgen"]},{path:["near_sdk","PanicOnDefault"]},{path:["near_sdk","borsh","self"]},{path:["near_sdk","borsh","BorshSerialize"]},{path:["near_sdk","borsh","BorshDeserialize"]}],a={beforeChangeFunction:[],afterChangeFunction:[],beforeAuthorizedFunction:[]},t=["BorshSerialize","BorshDeserialize","PanicOnDefault"],s=[],i=[],c=[];Object.values(e.plugins).forEach(m=>{let r=m.generate();n.push(...r.imports),a.beforeChangeFunction.push(...r.beforeChangeFunctionGuards),a.afterChangeFunction.push(...r.afterChangeFunctionGuards),a.beforeAuthorizedFunction.push(...r.authorizedFunctionGuards),r.constructorCode&&i.push(r.constructorCode),r.deriveMacroName&&t.push(r.deriveMacroName),r.deriveMacroAttribute&&s.push(r.deriveMacroAttribute),r.otherCode&&c.push(r.otherCode)});let u=e.token.generate(a);n.push(...u.imports),u.deriveMacroName&&t.push(u.deriveMacroName),u.deriveMacroAttribute&&s.push(u.deriveMacroAttribute),u.constructorCode&&i.push(u.constructorCode),u.otherCode&&c.push(u.otherCode),s.push("#[near_bindgen]");let f=`\nSelf {}`;i.length>0&&(f=`\nlet mut contract = Self {};\n\n${i.join(`\n`)}\n\ncontract`);let p="";return u.bindgenCode&&(p=`\n\n${u.bindgenCode}`),`\n${I(n)}\n\n#[derive(${t.join(", ")})]\n${s.join(`\n`)}\npub struct Contract {}\n\n#[near_bindgen]\nimpl Contract {\n    #[init]\n    pub fn new() -> Self {${d(2)(f)}\n    }${d(1)(p)}\n}\n\n${c.join(`\n\n`)}\n`.trim()+`\n`}window.addEventListener("message",o=>{window.top.postMessage(v(o.data),"*")});})();\n<\/script></body></html>'}
  message={message}
  onMessage={onMessage}
/>;
