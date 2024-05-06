const Css = styled.div`
  overflow-x:hidden;
.awesome-trending-content{
  text-align: center;
  white-space: nowrap !important;
}

.awesome-trending-content .near-item-sm { 
  display: inline-block; 
  float: none; 
}
`

const Marquee = styled.div`
@keyframes marquee {
  from {
    transform: translateX(0%);
  }
  to {
    transform: translateX(-100%);
  }
}
animation: marquee 30s linear infinite;
margin: 0 auto;
&:hover{
  animation-play-state: paused;
}
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
      <div
        className="awesome-trending-content"
        style={{
          marginLeft:100,
          width: (Object.keys(state.trendingProjects).length-1)*90
        }}
      >
      <Marquee>
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
      </Marquee>
      </div>
    </Css>
  );
