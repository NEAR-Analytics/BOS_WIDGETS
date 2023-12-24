const SEARCH_API_KEY = props.searchApiKey ?? "0e42c01107b8f555a41bcc0fa7f2a4df";
const APPLICATION_ID = props.appId ?? "B6PI9UKKJT";
const INDEX = props.index ?? "prod_near-social-feed";
const API_URL =
  props.apiUrl ??
  `https://${APPLICATION_ID}-dsn.algolia.net/1/indexes/${INDEX}/query?`;
const INITIAL_PAGE = props.initialPage ?? 0;
const facets = props.facets ?? ["All", "Users", "Apps", "Components", "Posts"];
const tab = props.tab ?? "All";

const showHeader = props.showHeader ?? true;
const showSearchBar = props.showSearchBar ?? true;
const showPagination = props.showPagination ?? true;
const userId = props.accountId ?? context.accountId;

const componentsUrl = `/#/calebjacob.near/widget/ComponentsPage`;
const peopleUrl = `/#/calebjacob.near/widget/PeoplePage`;

State.init({
  facet: tab,
});

const Wrapper = styled.div`
border-radius: 32px 32px 0px 0px;
  display: flex;
  flex-direction: column;
  gap: 48px;
  padding-bottom: 48px;
  max-width: 600px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const TabsButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-weight: 600;
  font-size: 12px;
  padding: 0 12px;
  position: relative;
  color: ${(p) => (p.selected ? "#11181C" : "#687076")};
  background: none;
  border: none;
  outline: none;
  text-align: center;
  text-decoration: none !important;
  flex: 1;

  &:hover {
    color: #11181C;
    border-bottom: 4px solid #20A46C;

  }

  &::after {
    content: "";
    display: ${(p) => (p.selected ? "block" : "none")};
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: #59e692;
  }
`;

const Search = styled.div``;

const Facets = styled.div`
  overflow: auto;
`;

const H1 = styled.h1`
font-style: normal; 
font-weight: 400;
font-size: 36px;
  line-height: 39px;
  color: #11181c;
  margin: 0;
`;

const H2 = styled.h2`
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  color: #687076;
  margin: 0;
`;

const H3 = styled.h3`
  color: #11181C;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  margin: 0;
  width: 188px;
height: 30px;
font-style: normal;
font-weight: 600;
font-size: 19px;
line-height: 23px;
`;

const Group = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const GroupHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const Text = styled.p`
  margin: 0;
  line-height: 1.5rem;
  color: ${(p) => (p.bold ? "#11181C" : "#687076")};
  font-weight: ${(p) => (p.bold ? "600" : "400")};
  font-size: ${(p) => (p.small ? "12px" : "14px")};
  overflow: ${(p) => (p.ellipsis ? "hidden" : "")};
  text-overflow: ${(p) => (p.ellipsis ? "ellipsis" : "")};
  white-space: ${(p) => (p.ellipsis ? "nowrap" : "")};
  overflow-wrap: anywhere;

  b {
    font-weight: 600;
    color: #11181c;
  }

  &[href] {
    color: #006adc;
    outline: none;
    font-weight: 600;

    &:hover,
    &:focus {
      color: #006adc;
      text-decoration: underline;
    }
  }
`;

const Items = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 12px;
`;

const Item = styled.div``;

// Add the following styles to your CSS or a styled-component
const GridItems = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 16px;
`;

const resetSearcheHits = () => {
  State.update({
    currentPage: 0,
    search: undefined,
    paginate: undefined,
    facet: undefined,
  });
};

const writeStateTerm = (term) => {
  State.update({
    term,
  });

  if (term === "") {
    resetSearcheHits();
  }
};

const profiles = (records) => {
  const profiles = [];
  for (const [i, record] of records ?? []) {
    profiles.push({
      accountId: record.author,
      searchPosition: i,
    });
  }
  return profiles;
};

const posts = (content, postType) => {
  const posts = [];
  for (const [i, post] of content || []) {
    const accountId = post.author;
    const blockHeight = post.objectID.split("/").slice(-1)[0];

    let snipContent = true;
    let text = post.content;
    if (post._highlightResult.content.matchLevel === "full") {
      // Use algolia provided snipped content:
      snipContent = false;
      text = post._snippetResult.content.value
        .replaceAll("<em>", "")
        .replaceAll("</em>", "");
    }

    const postContent = {
      type: "md",
      text,
    };

    posts.push({
      accountId,
      blockHeight,
      postContent,
      postType,
      snipContent,
      searchPosition: i,
    });
  }
  return posts;
};

const components = (records) => {
  const components = [];
  for (const [i, component] of records || []) {
    const idParts = component.objectID.split("/");
    const widgetName = idParts[idParts.length - 1];
    const accountId = component.author;
    components.push({
      accountId,
      widgetName,
      searchPosition: i,
    });
  }
  return components;
};

const categorizeSearchHits = (rawResp) => {
  const results = {};
  for (const [i, result] of rawResp.hits?.entries()) {
    const { categories: categories_raw } = result;
    if (categories_raw.length > 1) {
      categories_raw.sort();
    }

    const categories = categories_raw.join(", ");
    results[categories] = results[categories] || [];
    results[categories].push([i + 1, result]);
  }
  return {
    results,
    hitsTotal: rawResp.nbHits,
    hitsPerPage: rawResp.hitsPerPage,
  };
};

const debounce = (callable, timeout) => {
  return (args) => {
    clearTimeout(state.timer);
    State.update({
      timer: setTimeout(() => callable(args), timeout ?? 50),
    });
  };
};

const fetchSearchHits = (query, { pageNumber, configs, optionalFilters }) => {
  configs = configs ?? configsPerFacet(state.facet);
  let body = {
    query,
    page: pageNumber ?? 0,
    optionalFilters: optionalFilters ?? [
      "categories:profile<score=3>",
      "categories:widget<score=2>",
      "categories:post<score=1>",
      "categories:comment<score=0>",
    ],
    clickAnalytics: true,
    ...configs,
  };

  return asyncFetch(API_URL, {
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      "X-Algolia-Api-Key": SEARCH_API_KEY,
      "X-Algolia-Application-Id": APPLICATION_ID,
    },
    method: "POST",
  });
};

const updateSearchHits = debounce(({ term, pageNumber, configs }) => {
  fetchSearchHits(term, { pageNumber, configs }).then((resp) => {
    const { results, hitsTotal, hitsPerPage } = categorizeSearchHits(resp.body);
    State.update({
      search: {
        profiles: profiles(results["profile"]),
        components: components(results["widget"]),
        postsAndComments: posts(results["post"], "post").concat(
          posts(results["comment, post"], "post-comment")
        ),
      },
      currentPage: pageNumber,
      paginate: {
        hitsTotal,
        hitsPerPage,
      },
      queryID: resp.body.queryID,
    });
  });
});

const onSearchChange = ({ term }) => {
  writeStateTerm(term);
  updateSearchHits({ term, pageNumber: INITIAL_PAGE });
};

const onPageChange = (pageNumber) => {
  const algoliaPageNumber = pageNumber - 1;
  if (algoliaPageNumber === state.currentPage) {
    console.log(`Selected the same page number as before: ${pageNumber}`);
    return;
  }
  // Need to clear out old search data otherwise we'll get multiple entries
  // from the previous pages as well. Seems to be cache issue on near.social.
  State.update({
    search: undefined,
    currentPage: algoliaPageNumber,
  });
  updateSearchHits({ term: state.term, pageNumber: algoliaPageNumber });
};

const FACET_TO_CATEGORY = {
  Users: "profile",
  Apps: "app",
  Components: "widget",
  Posts: "post",
};

const searchFilters = (facet) => {
  const category = FACET_TO_CATEGORY[facet];
  let filters = category ? `categories:${category}` : undefined;
  if (category === "post") {
    filters = `(${filters} OR categories:comment)`;
  }
  if (category === "app") {
    filters = `(${filters} OR tags:app)`;
  }
  if (filters) {
    filters = `${filters} AND `;
  }
  filters = `${filters}NOT author:hypefairy.near AND NOT _tags:hidden`;

  return filters;
};

const restrictSearchable = (facet) => {
  const category = FACET_TO_CATEGORY[facet];
  let restrictSearchableAttrs = undefined;
  if (category === "post") {
    // Only the content should be searchable when the posts facet is selected.
    restrictSearchableAttrs = ["content"];
  }
  return restrictSearchableAttrs;
};

const configsPerFacet = (facet) => {
  return {
    filters: searchFilters(facet),
    restrictSearchableAttributes: restrictSearchable(facet),
  };
};

const onFacetClick = (facet) => {
  if (facet === state.facet) {
    console.log("Clicked the same facet");
    return;
  }

  State.update({
    facet,
  });

  updateSearchHits({
    term: state.term,
    configs: configsPerFacet(facet),
  });
};

const onSearchResultClick = ({ searchPosition, objectID, eventName }) => {
  const position =
    searchPosition + state.currentPage * state.paginate.hitsPerPage;
  const event = {
    type: "clickedObjectIDsAfterSearch",
    data: {
      eventName,
      userToken: userId.replace(".", "+"),
      queryID: state.queryID,
      objectIDs: [objectID],
      positions: [position],
      timestamp: Date.now(),
    },
  };

  // Deferred due to State.update causing multiple clicks to be needed
  // before the browser redirect to the page the user clicks on.
  setTimeout(() => {
    // This will trigger the Insights widget:
    State.update({ event });
  }, 50);
};

return (
  <Wrapper>
    {showHeader && (
      <Header>
        <H1>Search</H1>
      </Header>
    )}

    {showSearchBar && (
      <Search>
        <Widget
          src="dorgon108.near/widget/SearchPill"
          props={{
            onChange: onSearchChange,
            term: props.term,
          }}
        />
      </Search>
    )}

    {state.search && (
      <Facets>
        <Widget
          src="dorgon108.near/widget/Facets"
          props={{
            facets,
            onFacetClick,
            defaultFacet: facets[0],
            initialFacet: tab,
            tabButtonStyle: TabsButton,
          }}
        />
      </Facets>
    )}

    {state.paginate?.hitsTotal == 0 && (
      <H2>No matches were found for "{state.term}".</H2>
    )}

    {state.search?.components.length > 0 && (
      <Group>
        <GroupHeader>
          <H3>Apps</H3>
          <Text as="a" href={componentsUrl} small>
            View All
          </Text>
        </GroupHeader>
        <GridItems>
          {state.search.components
            .filter((_, index) => (currentTab !== "Apps" ? index < 2 : true))
            .map((component, i) => (
              <Item key={component.accountId + component.widgetName}>
                <Widget
                  src="dorgon108.near/widget/ComponentCard-SearchAll"
                  props={{
                    src: `${component.accountId}/widget/${component.widgetName}`,
                    onClick: () =>
                      onSearchResultClick({
                        searchPosition: component.searchPosition,
                        objectID: `${component.accountId}/widget/${component.widgetName}`,
                        eventName: "Clicked Component After Search",
                      }),
                  }}
                />
              </Item>
            ))}
        </GridItems>
      </Group>
    )}

    {state.search?.profiles.length > 0 && (
      <Group>
        <GroupHeader>
          <H3>People</H3>
          <Text as="a" href={peopleUrl} small>
            View All
          </Text>
        </GroupHeader>
        <GridItems>
          {state.search.profiles
            .filter((_, index) => (currentTab !== "People" ? index < 2 : true))
            .map((profile, i) => (
              <Item key={profile.accountId}>
                <Widget
                  src="dorgon108.near/widget/AccountProfileCard"
                  props={{
                    accountId: profile.accountId,
                    onClick: () =>
                      onSearchResultClick({
                        searchPosition: profile.searchPosition,
                        objectID: `${profile.accountId}/profile`,
                        eventName: "Clicked Profile After Search",
                      }),
                  }}
                />
              </Item>
            ))}
        </GridItems>
      </Group>
    )}

    {state.search?.postsAndComments.length > 0 && (
      <Group>
        <GroupHeader>
          <H3>Posts</H3>
        </GroupHeader>
        <GridItems>
          {state.search.postsAndComments
            .filter((_, index) => (currentTab !== "Apps" ? index < 2 : true))
            .map((post, i) => (
              <Item
                key={`${post.accountId}/${post.postType}/${post.blockHeight}`}
              >
                <Widget
                  src="dorgon108.near/widget/SearchPost-SearchAll"
                  props={{
                    accountId: post.accountId,
                    blockHeight: post.blockHeight,
                    content: post.postContent,
                    snipContent: post.snipContent,
                    postType: post.postType,
                    onClick: () =>
                      onSearchResultClick({
                        searchPosition: post.searchPosition,
                        objectID: `${post.accountId}/${post.postType}/${post.blockHeight}`,
                        eventName: "Clicked Post After Search",
                      }),
                  }}
                />
              </Item>
            ))}
        </GridItems>
      </Group>
    )}

    {!props.disableInsights && (
      <Widget
        src="chaotictempest.near/widget/Insights"
        props={{
          event: state.event,
          searchApiKey: SEARCH_API_KEY,
          appId: APPLICATION_ID,
          index: INDEX,
        }}
      />
    )}

    {props.debug && (
      <div>
        <p>Debug Data:</p>
        <pre>{JSON.stringify(state, undefined, 2)}</pre>
      </div>
    )}
  </Wrapper>
);
