
const path = props.indexPath;
const cat = props.cat;
const listItems = [
    { l: "", t: "All" },
    {
      t: "Dapps",
      l: "?cat=dapps",
      menuItems: [
        { l: "?cat=ai", t: "AI" },
        { l: "?cat=lending", t: "Lending" },
        { l: "?cat=defi", t: "Defi" },
        { l: "?cat=desci", t: "Desci" },
        { l: "?cat=dex", t: "DEX" },
        { l: "?cat=game", t: "Game" },
        { l: "?cat=launchpad", t: "Launchpad" },
        { l: "?cat=loyalty", t: "Loyalty" },
        { l: "?cat=marketplace", t: "Marketplace" },
        // { l: "?cat=memecoin", t: "Memecoin" },
        { l: "?cat=nft", t: "NFT" },
        { l: "?cat=privacy", t: "Privacy" },
        { l: "?cat=restaking", t: "Restaking" },
        { l: "?cat=rwa", t: "RWA" },
        { l: "?cat=social", t: "Social" },
        { l: "?cat=sports", t: "Sports" },
        { l: "?cat=stablecoin", t: "Stablecoin" }
      ]
    },
    {
      t: "Ecosystem",
      l: "?cat=ecosystem",
      menuItems: [
        { l: "?cat=accelerator", t: "Accelerator" },
        { l: "?cat=audits", t: "Audits" },
        { l: "?cat=bounties", t: "Bounties" },
        { l: "?cat=community", t: "Community" },
        { l: "?cat=compliance", t: "Compliance" },
        { l: "?cat=dao", t: "DAO" },
        { l: "?cat=design_support", t: "Design Support" },
        { l: "?cat=developer_support", t: "Developer Support" },
        { l: "?cat=devhub_grant", t: "DevHub Grant" },
        { l: "?cat=education", t: "Education" },
        { l: "?cat=enterprise", t: "Enterprise" },
        { l: "?cat=events", t: "Events" },
        { l: "?cat=funding_node", t: "Funding Node" },
        { l: "?cat=metapool_grant", t: "Metapool grant" },
        { l: "?cat=mintbase_grant", t: "Mintbase Grant" },
        { l: "?cat=ndc_grant", t: "NDC Grant" },
        { l: "?cat=nf_grant", t: "NF Grant" },
        { l: "?cat=proximity_grant", t: "Proximity Grant" },
        { l: "?cat=regional_hub", t: "Regional Hub" },
        { l: "?cat=security", t: "Security" },
        { l: "?cat=service_provider", t: "Service Provider" }
      ]
    },
    {
      t: "Infrastructure",
      l: "?cat=infrastructure",
      menuItems: [
        { l: "?cat=aurora", t: "Aurora" },
        { l: "?cat=bos", t: "BOS" },
        { l: "?cat=bridges", t: "Bridges" },
        { l: "?cat=cex", t: "CEX" },
        { l: "?cat=custodian", t: "Custodian" },
        { l: "?cat=chain_abstraction", t: "Chain Abstraction" },
        { l: "?cat=explorer", t: "Explorer" },
        { l: "?cat=indexers", t: "Indexers" },
        { l: "?cat=data_availability", t: "Data Availability" },
        { l: "?cat=mobile", t: "Mobile" },
        { l: "?cat=oracles", t: "Oracles" },
        { l: "?cat=rpc", t: "RPC" },
        { l: "?cat=storage", t: "Storage" },
        { l: "?cat=validator", t: "Validator" },
        { l: "?cat=wallets", t: "Wallets" }
      ]
    },
    {
      t: "Utilities",
      l: "?cat=utilities",
      menuItems: [
        { l: "?cat=analytics", t: "Analytics" },
        { l: "?cat=asset_management", t: "Asset Management" },
        { l: "?cat=developer_tooling", t: "Developer Tooling" },
        { l: "?cat=utilities", t: "Utilities" },
        { l: "?cat=messaging", t: "Messaging" },
        { l: "?cat=on_off_ramp", t: "On/Off-Ramp" },
        { l: "?cat=payments", t: "Payments" },
        { l: "?cat=productivity_tool", t: "Productivity Tool" },
        { l: "?cat=zero_knowledge", t: "Zero Knowledge" }
      ]
    },
    {
      t: "Other",
      l: "?cat=other"
    }
  ];

return (
    <>
        {/* the menu */}
        <div className="awesome-aside-menu menu menu-nav">
            {
                listItems.map( e => {
                    console.log("the path is:" , path , "cat: " , cat);
                    let subMenu = e.menuItems ? e.menuItems.map(s => { return(
                        <div className="menu-item"><a key={s.t} preventScrollReset={true} className={`${ ( cat == ( s.l.length > 0 ? s.l.substring(5) : "" ) ? " active " : "" )+ "btn" }`}
                         href={`/${path + (s.l ? s.l : "") }`}>{s.t}<span className="menu-badge d-none">6</span></a></div>
                    ) }) : false;
                    return(
                        <div className="menu-parent"><a key={e.t}  preventScrollReset={true} className={`${ ( cat == ( e.l.length > 0 ? e.l.substring(5) : "" ) ? " active " : "" )+ "btn btn-lg" }`} 
                            href={`/${path + (e.l ? e.l : "") }`}>{e.t}<span className="menu-badge d-none">9</span></a>
                            { subMenu ?  <div className="menu menu-nav">{subMenu}</div> : <></> }
                        </div>
                    )
                } )
            }
            
            
        </div>
        {/* end the menu */}
    </>
)
