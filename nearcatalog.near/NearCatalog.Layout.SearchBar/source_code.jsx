
const componentPath = props.componentPath;

State.init({
    rs: false,
    kw: "",
    loading: false,
    searching: false,
});

function delayedSearch(kw) {
    if (state.searching) {
        clearTimeout(state.searching);
    }
    State.update({
        searching: setTimeout(() => {
            if (kw.length >= 3) {
                asyncFetch("https://nearcatalog.sctuts.com/wp-json/nearcatalog/v1/search?kw=" + kw).then(res => {
                    console.log(res);
                    State.update({
                        rs: res.body ,
                        kw: kw,
                        loading: false,
                    });
                    console.log("search results: ", state.rs);
                });
            }
        }, 1000)
    });
    if(typeof state.searching === "function") state.searching();
}
return (
    <>
        <div id="bos-search-input" class="input-group">
            <input class="form-control " type="text" placeholder="🔭 🔍 Explore NEAR" onChange={(e) => {
                let kw = e.target.value ? e.target.value.trim().toLowerCase() : "";
                State.update({ kw: kw, loading: true });
                delayedSearch(kw);
            }} />
        </div>

        <div className="search-result-content overflow-auto">
            {
                state.rs && Object.keys(state.rs).map((e) => {
                    let p = state.rs[e];
                    return (<a className="near-item-sm" title={p.profile.name} href={`/${componentPath}.Project?id=${e}`}>
                        <div className="tile-icon"><img src={p.profile.image?.url || "https://learnnear.club/wp-content/uploads/2021/09/lnc-profile-desktop-150x150.png"}
                            title={`${p.profile.name} - ${p.profile.tagline}`} /></div>
                        <div className="tile-content">
                            <h2 className="tile-title" title={`${p.profile.name} - ${p.profile.tagline}`}>{p.profile.name}</h2>
                        </div>
                    </a>)
                })
            }

            {
                !state.rs && state.kw.length > 0 && !state.loading && <>🙈Not found, maybe you should submit the project🙏</>
            }
        </div>
    </>
)
