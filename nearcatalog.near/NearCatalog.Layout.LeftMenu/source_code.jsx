
var path = props.indexPath;
return (
    <>
        {/* the menu */}
        <div className="awesome-aside-menu menu menu-nav">
            <div className="menu-parent"><a className="btn btn-lg active" href={`/${path}`}>All<span className="menu-badge d-none">1093</span></a></div>
            <div className="menu-parent"><a className="btn btn-lg " href={`/${path}?cat=comunity`}>Community</a></div>
            <div className="menu-parent">
                <a className="btn btn-lg " href={`/${path}?cat=dapps`}>DApps<span className="menu-badge d-none">488</span></a>
                <div className="menu menu-nav">
                    <div className="menu-item"><a className="btn" href={`/${path}?cat=defi`}>DeFi<span className="menu-badge d-none">209</span></a></div>
                    <div className="menu-item"><a className="btn" href={`/${path}?cat=dex`}>DEX<span className="menu-badge d-none">47</span></a></div>
                    <div className="menu-item"><a className="btn" href={`/${path}?cat=exchanges`}>Exchanges<span className="menu-badge d-none">63</span></a></div>
                    <div className="menu-item"><a className="btn" href={`/${path}?cat=launchpads`}>Launchpads<span className="menu-badge d-none">20</span></a></div>
                    <div className="menu-item"><a className="btn" href={`/${path}?cat=lending`}>Lending<span className="menu-badge d-none">20</span></a></div>
                    <div className="menu-item"><a className="btn" href={`/${path}?cat=stablecoins`}>Stablecoins<span className="menu-badge d-none">14</span></a></div>
                    <div className="menu-item"><a className="btn" href={`/${path}?cat=yield_aggregators`}>Yield Aggregators<span className="menu-badge d-none">17</span></a></div>
                    <div className="menu-item"><a className="btn" href={`/${path}?cat=gaming`}>Gaming<span className="menu-badge d-none">129</span></a></div>
                    <div className="menu-item"><a className="btn" href={`/${path}?cat=metaverse`}>Metaverse<span className="menu-badge d-none">32</span></a></div>
                    <div className="menu-item"><a className="btn" href={`/${path}?cat=social`}>Social<span className="menu-badge d-none">52</span></a></div>
                    <div className="menu-item"><a className="btn" href={`/${path}?cat=music`}>Music<span className="menu-badge d-none">18</span></a></div>
                </div>
            </div>
            <div className="menu-parent">
                <a className="btn btn-lg " href={`/${path}?cat=ecosystem`}>Ecosystem<span className="menu-badge d-none">132</span></a>
                <div className="menu menu-nav">
                    <div className="menu-item"><a className="btn" href={`/${path}?cat=dao`}>DAO<span className="menu-badge d-none">94</span></a></div>
                    <div className="menu-item"><a className="btn" href={`/${path}?cat=regional_hubs`}>Regional Hubs<span className="menu-badge d-none">6</span></a></div>
                    <div className="menu-item"><a className="btn" href={`/${path}?cat=funding`}>Funding<span className="menu-badge d-none">17</span></a></div>
                    <div className="menu-item"><a className="btn" href={`/${path}?cat=guilds`}>Guilds<span className="menu-badge d-none">44</span></a></div>
                    <div className="menu-item"><a className="btn" href={`/${path}?cat=education`}>Education<span className="menu-badge d-none">30</span></a></div>
                    <div className="menu-item"><a className="btn" href={`/${path}?cat=refi`}>ReFi<span className="menu-badge d-none">10</span></a></div>
                    <div className="menu-item"><a className="btn" href={`/${path}?cat=events`}>Events<span className="menu-badge d-none">7</span></a></div>
                </div>
            </div>
            <div className="menu-parent"><a className="btn btn-lg" href={`/${path}?cat=aurora`}>Aurora<span className="menu-badge d-none">283</span></a></div>
            <div className="menu-parent"><a className="btn btn-lg " href={`/${path}?cat=octopus`}>Octopus<span className="menu-badge d-none">20</span></a></div>
            <div className="menu-parent">
                <a className="btn btn-lg " href={`/${path}?cat=infrastructure`}>Infrastructure<span className="menu-badge d-none">251</span></a>
                <div className="menu menu-nav">
                    <div className="menu-item"><a className="btn" href={`/${path}?cat=wallets`}>Wallets<span className="menu-badge d-none">61</span></a></div>
                    <div className="menu-item"><a className="btn" href={`/${path}?cat=validators`}>Validators<span className="menu-badge d-none">70</span></a></div>
                    <div className="menu-item"><a className="btn" href={`/${path}?cat=explorers`}>Explorers<span className="menu-badge d-none">11</span></a></div>
                    <div className="menu-item"><a className="btn" href={`/${path}?cat=bridges`}>Bridges<span className="menu-badge d-none">33</span></a></div>
                    <div className="menu-item"><a className="btn" href={`/${path}?cat=storage`}>Storage<span className="menu-badge d-none">13</span></a></div>
                </div>
            </div>
            
            <div className="menu-parent">
                <a className="btn btn-lg " href={`/${path}?cat=nft`}>NFT<span className="menu-badge d-none">290</span></a>
                <div className="menu menu-nav">
                    <div className="menu-item"><a className="btn" href={`/${path}?cat=marketplaces`}>Marketplaces<span className="menu-badge d-none">60</span></a></div>
                    <div className="menu-item"><a className="btn" href={`/${path}?cat=collectibles`}>Collectibles<span className="menu-badge d-none">99</span></a></div>
                </div>
            </div>
            <div className="menu-parent">
                <a className="btn btn-lg " href={`/${path}?cat=utilities`}>Utilities<span className="menu-badge d-none">98</span></a>
                <div className="menu menu-nav">
                    <div className="menu-item"><a className="btn" href={`/${path}?cat=devtooling`}>Dev Tooling<span className="menu-badge d-none">124</span></a></div>
                    <div className="menu-item"><a className="btn" href={`/${path}?cat=oracles`}>Oracles<span className="menu-badge d-none">15</span></a></div>
                    <div className="menu-item"><a className="btn" href={`/${path}?cat=security`}>Security<span className="menu-badge d-none">13</span></a></div>
                    <div className="menu-item"><a className="btn" href={`/${path}?cat=data`}>Data<span className="menu-badge d-none">21</span></a></div>
                    <div className="menu-item"><a className="btn" href={`/${path}?cat=analytics`}>Analytics<span className="menu-badge d-none">41</span></a></div>
                    <div className="menu-item"><a className="btn" href={`/${path}?cat=portfolio`}>Portfolio<span className="menu-badge d-none">21</span></a></div>
                    <div className="menu-item"><a className="btn" href={`/${path}?cat=on_off_ramps`}>On/Off Ramps<span className="menu-badge d-none">16</span></a></div>
                    <div className="menu-item"><a className="btn" href={`/${path}?cat=payments`}>Payments<span className="menu-badge d-none">30</span></a></div>
                </div>
            </div>
            
        </div>
        {/* end the menu */}
    </>
)