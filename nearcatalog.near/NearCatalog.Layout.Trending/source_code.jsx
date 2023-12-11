
const Css = styled.div`
.awesome-trending-content{
    overflow-x: scroll; 
   white-space: nowrap; 
}
.awesome-trending-content .near-item-sm { 
   display: inline-block; 
   float: none; 
}
`;
const componentPath = props.componentPath;
let query = false;
State.init({
    projects : false
});
asyncFetch("https://nearcatalog.sctuts.com/wp-json/nearcatalog/v1/projects-by-category?cid=trending").then( res =>{
    State.update({projects:  res.body});
    console.log("async fecth ready! " , res.body);
} );

if (!state.projects) {
  return "🔥🔥🔥";
}
// const projects = query.body;
return (
    <Css>
        <h3 className="my-3">🔥Trending</h3>
        <div className="awesome-trending-content overflow-auto">
            {
                Object.keys(state.projects).map((e) => {
                    let p = state.projects[e];
                    return (<a className="near-item-sm" title={p.profile.name} href={`/${componentPath}.Project?id=${e}`}>
                        <div className="tile-icon"><img src={p.profile.image?.url || "https://learnnear.club/wp-content/uploads/2021/09/lnc-profile-desktop-150x150.png"}
                         alt={p.profile.name}/></div>
                        <div className="tile-content">
                            <h2 className="tile-title">{p.profile.name}</h2>
                        </div>
                    </a>)
                })
            }
        </div>
    </Css>
);