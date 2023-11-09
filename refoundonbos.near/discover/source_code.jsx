const ownerId = "refoundonbos.near";
const registryId = "refoundjournalism.near";

const IPFS_BASE_URL = "https://nftstorage.link/ipfs/";
const DEFAULT_BANNER_IMAGE_URL =
  IPFS_BASE_URL + "bafkreih4i6kftb34wpdzcuvgafozxz6tk6u4f5kcr2gwvtvxikvwriteci";
const DEFAULT_PROFILE_IMAGE_URL =
  IPFS_BASE_URL + "bafkreibwq2ucyui3wmkyowtzau6txgbsp6zizy4l2s5hkymsyv6tc75j3u";
const HERO_BACKGROUND_IMAGE_URL =
  IPFS_BASE_URL + "bafkreiewg5afxbkvo6jbn6jgv7zm4mtoys22jut65fldqtt7wagar4wbga";

const API_URL = "https://humans.nearverselabs.com/api";
const MAP_STYLE = "mapbox://styles/mapbox/dark-v10";
const MAP_TOKEN =
  "pk.eyJ1IjoidGVqMDEiLCJhIjoiY2xqcHZ2dGpkMDB5azNsbzQ0bmMwNjRjaCJ9.FVv2zRPaLwzZMgagbI2YZw";

const center = [0, 30];
const zoom = 1.7;
const accountId = context.accountId;

const getImageUrlFromSocialImage = (image) => {
  if (image.url) {
    return image.url;
  } else if (image.ipfs_cid) {
    return IPFS_BASE_URL + image.ipfs_cid;
  }
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const HeroOuter = styled.div`
  padding: 136px 64px;
`;

const HeroInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const SectionHeader = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  margin-bottom: 24px;
  padding: 96px 64px 24px 64px;
`;

const SectionTitle = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #2e2e2e;
  font-family: Mona-Sans;
`;

const ProjectsCount = styled.div`
  color: #7b7b7b;
  font-size: 24px;
  font-weight: 400;
  margin-left: 32px;
`;

const ProjectsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  // padding: 0px 64px 96px 64px;
  // background: #fafafa;
`;

const HeroContainer = styled.div`
  width: 100%;
  min-height: 700px;
  position: relative;
`;
const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 300px);
  align-items: stretch;
  flex-direction: column;
  background: black;
  overflow: auto;
  position: relative;
`;
const Hero = styled.img`
  width: 100%;
  height: 100%;
  display: block;
`;

State.init({
  registeredPosts: null, // TODO: change this back to null
});

if (!state.registeredPosts) {
  Near.asyncView(registryId, "get_series", {})
    .then((posts) => {
        const formattedPosts = posts.map((series) => {
          const formatted = {
            seriesId: series.series_id,
            ownerId: series.owner_id,
            title: series.metadata.title ?? "",
            description: series.metadata.description ?? "",
            media: series.metadata.media,
            dateTaken: series.metadata.extra && JSON.parse(series.metadata.extra).dateTaken,
            location: series.metadata.extra && JSON.parse(series.metadata.extra).locationTaken,
            tags: series.metadata.tags || [],
            verified: series.verified
          };
          console.log("series omn discover", series)
          return formatted;
        });
        State.update({
          registeredPosts: formattedPosts.filter((p) => p.seriesId !== 0 && p.seriesId !== 1 && p.seriesId !== 4) ,
        });
      });
}

if (!state.registeredPosts) return "";

const userIsAdmin =
  props.registryAdmins && props.registryAdmins.includes(context.accountId);

const projects = state.registeredPosts;

return (
  <>
  <Wrapper style={{backgroundColor:"#3C4DF2"}}>

  <img src="https://bafybeiatw7f5qy565cwkl43ctaonpzbbsmmjioleumsspkk3ajgk3u27h4.ipfs.w3s.link/map.png" alt="Map" />

</Wrapper>
    
    <ProjectsContainer>
      <SectionHeader>
        <SectionTitle>All posts</SectionTitle>
        <ProjectsCount>{projects.length}</ProjectsCount>
      </SectionHeader>
      <Widget
        src={`${ownerId}/widget/list`}
        props={{
          projects,
          renderItem: (post) => (
            <Widget
              src={`${ownerId}/widget/card`}
              props={{
                post,
                ...props,
              }}
            />
          ),
        }}
      />
    </ProjectsContainer>
  </>
);
