const updateAudioDetails = props.updateAudioDetails;
const audioCardFullWidth = props.audioCardFullWidth;

function AudioCard() {
  State.init({ page: 1 });
  const nwSite = "https://nearweek.com";

  const fetchData = (url) => {
    return fetch(url, {
      method: "GET",
      headers: {
        Accept: "*/*",
        Authorization:
          "Bearer 15699f0723aa9fe9f655b1a94e450552476c08807f67b525b5a3c8011eecc8aee6d45923443620f17815b897858be058cd7bd89ddf23a28aabaecb178e7ebc55d380293beeb51a8ce87b40e1518ce4708e4d51a06b115f27fa64ab5cbee5a3511cec785d7ae6a155ecd05ac8196aadae3e9b8e9401b8df8d8b69904f7364f925",
      },
    });
  };

  const fetchAudio = fetchData(
    `https://nearweek.com/api/show-audio?populate=deep&sort=createdAt:desc&pagination[pageSize]=${
      state.page * 5
    }`
  );

  function formatPodcastDate(dateString) {
    const timeAgo = (diffSec) =>
      diffSec < 60000
        ? `${(diffSec / 1000) | 0}s`
        : diffSec < 3600000
        ? `${(diffSec / 60000) | 0}m`
        : diffSec < 86400000
        ? `${(diffSec / 3600000) | 0}h`
        : `${(diffSec / 86400000) | 0}d`;
    const podcastDate = new Date(dateString);
    const diffMillis = Date.now() - podcastDate.getTime();
    return timeAgo(diffMillis);
  }

  const audio = [...(fetchAudio?.body.data ?? [])].map((item) => {
    const categories = item.categories.map((category) => category.Name);

    return {
      title: item.Title,
      thumbnail: nwSite + item.Thumbnail.formats.thumbnail.url,
      categories: categories.slice(0, 2), // Slice the first two categories
      createdAt: formatPodcastDate(item.createdAt),
      url: nwSite + "/audio/" + item.slug,
      frame: item.frame,
      frameSrc: item.frameSrc,
      description: item.Description,
    };
  });

  const AudioCard = styled.div`
    position: relative;
    cursor: pointer;
    width: 100%;
    padding: 12px;
    border-radius: 12px;
    background: #fff;
    display:flex;
    border: 1px solid #eceef0;
    overflow: hidden;
    margin-bottom: 10px;
  `;

  const AudioThumbnail = styled.img`
  max-width: 70px;
  max-height: 70px;
  border-radius: 10px;
  `;

  const AudioTitle = styled.div`
  height: 41px;
  owerflow: hidden;
  text-overflow: elipsis;
  whitespace: nowrap;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    color: black;
    text-decoration: none;
    cursor: pointer;
    }
  `;

  const AudioTitleText = styled.h4`
  color: black;  `;

  const AudioTitleLinkContent = styled.p`
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;
  `;

  const AudioCategories = styled.div`
    align: left;
    justify-self: left;
    grid-area: 2 / 1 / 3 / 2;
  `;

  const AudioCategoriesContent = styled.p`
    font-weight: 500;
    font-size: 10px;
    line-height: 8.5px;
    color: #9C9C9C;
    margin: 0;
    text-align: center;
    align-items: center;
    margin-top: 2.5px;
    background-color: #F5F5F5;
    border-radius: 4px;
    padding: 6px 20px;
  `;

  const AudioDate = styled.p`
    color: rgba(28, 31, 65, 0.45);
    text-align: right;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 8.5px; /* 70.833% */
    letter-spacing: 0.12px;
    grid-area: 2 / 2 / 3 / 3;
    padding:2px;
    margin:0;
  `;
  const AudioCardDescription = styled.div`
    width: 100%;
    margin-left:15px
  `;

  const H2 = styled.h2`
    color: #1C1F41;
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: 15px;
    margin-bottom: 15px;
`;

  const AudioButtonLoad = styled.button`
    width: 180px;
    padding: 8px;
    height: 31px;
    background: transparent;
    margin: 20px auto 0px auto;
    border: 1px solid #d7dbdf;
    border-radius: 100px;
    font-weight: 500;
    font-size: 12px;
    line-height: 22px;
    letter-spacing: -0.03em;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    cursor: pointer;
    white-space: nowrap;
    color: hsla(204, 22%, 9%, 1);
    &:hover,
    &:focus {
      text-decoration: none;
      outline: none;
      }
  `;

  const MainSection = styled.div`
    border: 1px solid var(--bs-border-color);
    border-radius: 20px;
    padding: 20px 15px;
    margin-bottom: 24px;
    height: fit-content;
    width: 100%;
    max-width: ${(props) => (props.fullWidth ? "100%" : "341px")};
    background: white;
    @media screen and (min-width: ${breakpoints.lg}) {
      max-width: 700px;
    }
`;

  return (
    <MainSection fullWidth={audioCardFullWidth} class="border border-danger">
      <H2>{audioCardFullWidth ? "RELATED AUDIO" : "AUDIO"}</H2>
      {audio.length > 0 ? (
        audio.map((podcast, index) => (
          <div key={index}>
            <AudioCard onClick={() => updateAudioDetails(podcast)}>
              <AudioThumbnail src={podcast.thumbnail} alt={podcast.title} />
              <AudioCardDescription>
                {/* Display the podcast title as a link */}
                <AudioTitle>
                  <AudioTitleText>
                    <AudioTitleLinkContent>
                      {podcast.title}
                    </AudioTitleLinkContent>
                  </AudioTitleText>
                </AudioTitle>
                {/* Display categories */}
                <div className="d-flex align-items-center gap-1 mt-1 justify-content-between">
                  <div className="d-flex flex-wrap align-items-center gap-2">
                    {podcast.categories.map((c) => {
                      return (
                        <AudioCategories key={c}>
                          <AudioCategoriesContent>{c}</AudioCategoriesContent>
                        </AudioCategories>
                      );
                    })}
                    {/* Display creation date */}
                  </div>
                  <AudioDate>{podcast.createdAt}</AudioDate>
                </div>
              </AudioCardDescription>
            </AudioCard>
          </div>
        ))
      ) : (
        <div>Loading ...</div>
      )}
      <AudioButtonLoad onClick={() => State.update({ page: state.page + 1 })}>
        Load more
      </AudioButtonLoad>
    </MainSection>
  );
}

return <AudioCard />;
