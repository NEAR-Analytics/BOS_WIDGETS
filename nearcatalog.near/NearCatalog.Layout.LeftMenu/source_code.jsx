
var path = props.componentPath;
return (
    <>
        {/* the menu */}
        <div className="awesome-aside-menu menu menu-nav">
            <div className="menu-parent"><a className="btn btn-lg active" href={`/${path}.App`}>All<span className="menu-badge">1093</span></a></div>
            <div className="menu-parent"><a className="btn btn-lg" href={`/${path}.App?cat=aurora`}>Aurora
                <span className="menu-badge">283</span></a></div>
            <div className="menu-parent"><a className="btn btn-lg " href={`/${path}.App?cat=octopus`}>Octopus<span className="menu-badge">20</span></a></div>
            <div className="menu-parent">
                <a className="btn btn-lg " href={`/${path}.App?cat=infrastructure`}>Infrastructure<span className="menu-badge">251</span></a>
                <div className="menu menu-nav">
                    <div className="menu-item"><a className="btn" href={`/${path}.App?cat=wallets`}>Wallets<span className="menu-badge">61</span></a></div>
                    <div className="menu-item"><a className="btn" href={`/${path}.App?cat=validators`}>Validators<span className="menu-badge">70</span></a></div>
                    <div className="menu-item"><a className="btn" href={`/${path}.App?cat=explorers`}>Explorers<span className="menu-badge">11</span></a></div>
                    <div className="menu-item"><a className="btn" href={`/${path}.App?cat=bridges`}>Bridges<span className="menu-badge">33</span></a></div>
                    <div className="menu-item"><a className="btn" href={`/${path}.App?cat=storage`}>Storage<span className="menu-badge">13</span></a></div>
                </div>
            </div>
            <div className="menu-parent">
                <a className="btn btn-lg " href={`/${path}.App?cat=dapps`}>DApps<span className="menu-badge">488</span></a>
                <div className="menu menu-nav">
                    <div className="menu-item"><a className="btn" href={`/${path}.App?cat=defi`}>DeFi<span className="menu-badge">209</span></a></div>
                    <div className="menu-item"><a className="btn" href={`/${path}.App?cat=dex`}>DEX<span className="menu-badge">47</span></a></div>
                    <div className="menu-item"><a className="btn" href={`/${path}.App?cat=exchanges`}>Exchanges<span className="menu-badge">63</span></a></div>
                    <div className="menu-item"><a className="btn" href={`/${path}.App?cat=launchpads`}>Launchpads<span className="menu-badge">20</span></a></div>
                    <div className="menu-item"><a className="btn" href={`/${path}.App?cat=lending`}>Lending<span className="menu-badge">20</span></a></div>
                    <div className="menu-item"><a className="btn" href={`/${path}.App?cat=stablecoins`}>Stablecoins<span className="menu-badge">14</span></a></div>
                    <div className="menu-item"><a className="btn" href={`/${path}.App?cat=yield_aggregators`}>Yield Aggregators<span className="menu-badge">17</span></a></div>
                    <div className="menu-item"><a className="btn" href={`/${path}.App?cat=gaming`}>Gaming<span className="menu-badge">129</span></a></div>
                    <div className="menu-item"><a className="btn" href={`/${path}.App?cat=metaverse`}>Metaverse<span className="menu-badge">32</span></a></div>
                    <div className="menu-item"><a className="btn" href={`/${path}.App?cat=social`}>Social<span className="menu-badge">52</span></a></div>
                    <div className="menu-item"><a className="btn" href={`/${path}.App?cat=music`}>Music<span className="menu-badge">18</span></a></div>
                </div>
            </div>
            <div className="menu-parent">
                <a className="btn btn-lg " href={`/${path}.App?cat=nft`}>NFT<span className="menu-badge">290</span></a>
                <div className="menu menu-nav">
                    <div className="menu-item"><a className="btn" href={`/${path}.App?cat=marketplaces`}>Marketplaces<span className="menu-badge">60</span></a></div>
                    <div className="menu-item"><a className="btn" href={`/${path}.App?cat=collectibles`}>Collectibles<span className="menu-badge">99</span></a></div>
                </div>
            </div>
            <div className="menu-parent">
                <a className="btn btn-lg " href={`/${path}.App?cat=utilities`}>Utilities<span className="menu-badge">98</span></a>
                <div className="menu menu-nav">
                    <div className="menu-item"><a className="btn" href={`/${path}.App?cat=devtooling`}>Dev Tooling<span className="menu-badge">124</span></a></div>
                    <div className="menu-item"><a className="btn" href={`/${path}.App?cat=oracles`}>Oracles<span className="menu-badge">15</span></a></div>
                    <div className="menu-item"><a className="btn" href={`/${path}.App?cat=security`}>Security<span className="menu-badge">13</span></a></div>
                    <div className="menu-item"><a className="btn" href={`/${path}.App?cat=data`}>Data<span className="menu-badge">21</span></a></div>
                    <div className="menu-item"><a className="btn" href={`/${path}.App?cat=analytics`}>Analytics<span className="menu-badge">41</span></a></div>
                    <div className="menu-item"><a className="btn" href={`/${path}.App?cat=portfolio`}>Portfolio<span className="menu-badge">21</span></a></div>
                    <div className="menu-item"><a className="btn" href={`/${path}.App?cat=on_off_ramps`}>On/Off Ramps<span className="menu-badge">16</span></a></div>
                    <div className="menu-item"><a className="btn" href={`/${path}.App?cat=payments`}>Payments<span className="menu-badge">30</span></a></div>
                </div>
            </div>
            <div className="menu-parent">
                <a className="btn btn-lg " href={`/${path}.App?cat=ecosystem`}>Ecosystem<span className="menu-badge">132</span></a>
                <div className="menu menu-nav">
                    <div className="menu-item"><a className="btn" href={`/${path}.App?cat=dao`}>DAO<span className="menu-badge">94</span></a></div>
                    <div className="menu-item"><a className="btn" href={`/${path}.App?cat=regional_hubs`}>Regional Hubs<span className="menu-badge">6</span></a></div>
                    <div className="menu-item"><a className="btn" href={`/${path}.App?cat=funding`}>Funding<span className="menu-badge">17</span></a></div>
                    <div className="menu-item"><a className="btn" href={`/${path}.App?cat=guilds`}>Guilds<span className="menu-badge">44</span></a></div>
                    <div className="menu-item"><a className="btn" href={`/${path}.App?cat=education`}>Education<span className="menu-badge">30</span></a></div>
                    <div className="menu-item"><a className="btn" href={`/${path}.App?cat=refi`}>ReFi<span className="menu-badge">10</span></a></div>
                    <div className="menu-item"><a className="btn" href={`/${path}.App?cat=events`}>Events<span className="menu-badge">7</span></a></div>
                </div>
            </div>
        </div>
        {/* end the menu */}
    </>
)