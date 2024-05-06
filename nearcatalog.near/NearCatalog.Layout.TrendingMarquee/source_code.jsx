const Css = styled.div`
overflow-x:hidden;
.awesome-trending-content{
text-align: center;
}
.awesome-trending-content .near-item-sm { 
display: inline-block; 
float: none; 
}

@media (max-width: 768px) {
/* Adjust styles for smaller screens */
font-size: 0.8em;
gap: 0.5em;
}
@media screen and ( max-width : 700px ){
  .awesome-trending-content{white-space: nowrap !important;} 
}
`;
const Marquee = styled.div`
@keyframes marquee {
from {
  transform: translateX(0%);
}
to {
  transform: translateX(-100%);
}
}
animation: marquee 15s linear infinite;
margin: 0 auto;
`
State.init({
  trendingProjects: false,
});
const router = props.router || "";
if (props.cat == "trending") return <></>;

asyncFetch(props.indexer + "/projects-by-category?cid=trending").then((res) => {
  State.update({ trendingProjects: res.body });
  console.log("Trending: ", res.body);
});

if (!state.trendingProjects) {
  return <>
    <br />
    🐲🐉🐶😺~
    <br />
  </>;
}
return (
  <Css>
    <h3 className="my-3">🔥Trending</h3>
    <Marquee>
      <div
        className="awesome-trending-content"
        style={{
          whiteSpace: ["category", "bookmark"].indexOf(router) ? "nowrap" : "",
        }}
      >
        {Object.keys(state.trendingProjects).map((e) => {
          let p = state.trendingProjects[e];
          return (
            <Link
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
            </Link>
          );
        })}
      </div>
    </Marquee>
  </Css>
);