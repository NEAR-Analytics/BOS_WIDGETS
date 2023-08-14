const SEARCH_API_KEY = props.searchApiKey ?? "0e42c01107b8f555a41bcc0fa7f2a4df";
const APPLICATION_ID = props.appId ?? "B6PI9UKKJT";
const INDEX = props.index ?? "prod_near-social-feed";
const API_URL =
  props.apiUrl ??
  `https://${APPLICATION_ID}-dsn.algolia.net/1/indexes/${INDEX}/query?`;
const INITIAL_PAGE = props.initialPage ?? 0;
const facets = props.facets ?? ["Components", "People", "Posts"];
const tab = props.tab ?? "Components";
const showSearchBar = props.showSearchBar ?? true;
const showFacets = props.showFacets ?? true;
const showPagination = props.showPagination ?? true;
const userId = props.accountId ?? context.accountId;

const componentsUrl = `/near/widget/ComponentsPage`;
const peopleUrl = `/near/widget/PeoplePage`;

State.init({
  facet: tab,
});

const Wrapper =
  props.wrapper ??
  styled.div`
    display: flex;
    flex-direction: column;
    gap: 23px;
    margin: 0 auto;
  `;

const Group = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Items =
  props.styles.Items ??
  styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  `;

const Item = props.styles.Item ?? styled.div``;

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
      profile_name: record.profile_name,
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
      timer: setTimeout(() => callable(args), timeout ?? 250),
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
        components: components(results["app, widget"]).concat(
          components(results["widget"])
        ),
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
  People: "profile",
  Components: "widget",
  Posts: "post",
};

const searchFilters = (facet) => {
  const category = FACET_TO_CATEGORY[facet];
  let filters = category ? `categories:${category}` : undefined;
  if (category === "post") {
    filters = `(${filters} OR categories:comment)`;
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
  setTimeout(() => {
    State.update({ event });
  }, 50);
};

return (
  <Wrapper>
    <br />
    {showSearchBar && (
      <Widget
        src="james.near/widget/search.input"
        props={{
          onChange: onSearchChange,
          term: props.term,
        }}
      />
    )}

    {showFacets && state.search && (
      <Widget
        src="near/widget/Search.FullPage.Facets"
        props={{
          facets,
          onFacetClick,
          defaultFacet: facets[0],
          initialFacet: tab,
        }}
      />
    )}

    {state.paginate?.hitsTotal == 0 && (
      <h3>no matches were found for "{state.term}".</h3>
    )}

    {state.search?.profiles.length > 0 && (
      <Group>
        <h3>people</h3>
        <a href={peopleUrl}>view all</a>

        <Items>
          {state.search.profiles.map((profile, i) => (
            <Item key={profile.accountId}>
              <Widget
                src="near/widget/Search.FullPage.AccountProfileCard"
                props={{
                  accountId: profile.accountId,
                  onClick: () =>
                    onSearchResultClick({
                      searchPosition: profile.searchPosition,
                      objectID: `${profile.accountId}/profile`,
                      eventName: "clicked profile after search",
                    }),
                }}
              />
            </Item>
          ))}
        </Items>
      </Group>
    )}

    {state.search?.components.length > 0 && (
      <Group>
        <h3>components</h3>
        <a href={componentsUrl}>view all</a>

        <Items>
          {state.search.components.map((component, i) => (
            <Item key={component.accountId + component.widgetName}>
              <Widget
                src="near/widget/Search.FullPage.ComponentCard"
                props={{
                  src: `${component.accountId}/widget/${component.widgetName}`,
                  onClick: () =>
                    onSearchResultClick({
                      searchPosition: component.searchPosition,
                      objectID: `${component.accountId}/widget/${component.widgetName}`,
                      eventName: "clicked profile after search",
                    }),
                }}
              />
            </Item>
          ))}
        </Items>
      </Group>
    )}

    {state.search?.postsAndComments.length > 0 && (
      <Group>
        <h3>posts and comments</h3>

        <Items>
          {state.search.postsAndComments.map((post, i) => (
            <Item
              key={`${post.accountId}/${post.postType}/${post.blockHeight}`}
            >
              <Widget
                src="near/widget/Search.FullPage.PostCard"
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
                      eventName: "clicked profile after search",
                    }),
                }}
              />
            </Item>
          ))}
        </Items>
      </Group>
    )}

    {showPagination &&
      state.paginate &&
      state.paginate.hitsTotal > state.paginate.hitsPerPage && (
        <Widget
          src="near/widget/Search.Paginate"
          props={{
            totalCount: state.paginate.hitsTotal,
            pageSize: state.paginate.hitsPerPage,
            onPageChange,
          }}
        />
      )}

    {!state.term && <Widget src="james.near/widget/apps" />}
  </Wrapper>
);
