console.log("trending props:  ", props);

const Css = styled.div`
.awesome-trending-content{
    overflow-x: scroll; 
    text-align: center;
}

.awesome-trending-content .near-item-sm { 
    display: inline-block; 
    float: none; 
}

@media screen and ( max-width : 700px ){
    .awesome-trending-content{white-space: nowrap !important;} 
}


`;
let query = false;
State.init({
  projects: false,
});
asyncFetch(props.indexer + "/projects-by-category?cid=trending").then((res) => {
  State.update({ projects: res.body });
  console.log("Trending: ", res.body);
});

if (!state.projects) {
  return "🔥🔥🔥";
}
// const projects = query.body;
return (
  <Css>
    <h3 className="my-3">🔥Trending</h3>
    <div
      className="awesome-trending-content overflow-auto"
      style={{
        whiteSpace: props.cat?.length > 0 ? "nowrap" : "",
      }}
    >
      {Object.keys(state.projects).map((e) => {
        let p = state.projects[e];
        return (
          <a
            className="near-item-sm"
            title={p.profile.name}
            href={`/${props.indexPath}?id=${e}`}
          >
            <div className="tile-icon">
              <img
                src={p.profile.image?.url || props.defaultImg}
                alt={p.profile.name}
              />
            </div>
            <div className="tile-content">
              <h2 className="tile-title">{p.profile.name}</h2>
            </div>
          </a>
        );
      })}
    </div>
  </Css>
);
