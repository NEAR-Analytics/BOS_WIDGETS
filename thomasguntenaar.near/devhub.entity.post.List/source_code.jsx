// This component implementation was forked from [IndexFeed], but it does not fully implement lazy loading.
// While this component uses InfiniteScroll, it still loads the whole list of Post IDs in one view call.
// The contract will need to be extended with pagination support, yet, even in the current state the page loads much faster.
// [IndexFeed]: https://near.social/#/mob.near/widget/WidgetSource?src=mob.near/widget/IndexFeed

const { href } = VM.require("thomasguntenaar.near/widget/core.lib.url");

const { draftState, onDraftStateChange } = VM.require(
  "thomasguntenaar.near/widget/devhub.entity.post.draft"
);

if (!href) {
  return <p>Loading modules...</p>;
}

const QUERYAPI_ENDPOINT = `https://near-queryapi.api.pagoda.co/v1/graphql/`;

const queryName =
  props.queryName ?? `bo_near_devhub_v38_posts_with_latest_snapshot`;
const totalQueryName =
  props.totalQueryName ??
  "bo_near_devhub_v38_posts_with_latest_snapshot_aggregate";
const query = `query DevhubPostsQuery($limit: Int = 100, $offset: Int = 0, $where: ${queryName}_bool_exp = {}) {
    ${queryName}(
      limit: $limit
      offset: $offset
      order_by: {ts: desc}
      where: $where
    ) {
      post_id
    }
  }
`;

const totalQuery = `query DevhubTotalPostsQuery($where: ${queryName}_bool_exp = {}) {
  ${totalQueryName}(
      where: $where
    ) {
      aggregate {
        count
      }
    }
  }
`;

function fetchGraphQL(operationsDoc, operationName, variables) {
  return asyncFetch(QUERYAPI_ENDPOINT, {
    method: "POST",
    headers: { "x-hasura-role": `bo_near` },
    body: JSON.stringify({
      query: operationsDoc,
      variables: variables,
      operationName: operationName,
    }),
  });
}

function searchConditionChanged() {
  return (
    props.author != state.author ||
    props.term != state.term ||
    props.tag != state.tag ||
    props.recency != state.recency
  );
}

function updateSearchCondition() {
  State.update({
    author: props.author,
    term: props.term,
    tag: props.tag,
    recency: props.recency,
    loading: true,
  });
}

const initialRenderLimit = props.initialRenderLimit ?? 3;
const addDisplayCount = props.nextLimit ?? initialRenderLimit;

State.init({
  period: "week",
  totalItems: 0,
  displayCount: initialRenderLimit,
});

function getPostIds(tag, offset) {
  if (searchConditionChanged()) {
    updateSearchCondition();
  }
  let where = {};
  let authorId = props.author;
  let label = tag || props.tag;
  if (authorId) {
    where = { author_id: { _eq: authorId }, ...where };
  }
  if (props.term) {
    where = { description: { _ilike: `%${props.term}%` }, ...where };
  }
  if (label) {
    if (typeof label === "string") {
      // Handle a single label
      where = { labels: { _contains: label }, ...where };
    } else if (Array.isArray(label)) {
      // Handle an array of labels
      where = {
        labels: {
          _containsAny: label,
        },
        ...where,
      };
    }
  }
  if (!props.recency) {
    // show only top level posts
    where = { parent_id: { _is_null: true }, ...where };
  }

  // Don't show blog and devhub-test posts
  where = {
    _and: [
      {
        _not: {
          labels: { _contains: "blog" },
          parent_id: { _is_null: true },
          post_type: { _eq: "Comment" },
        },
      },
      {
        _not: {
          labels: { _contains: "devhub-test" },
        },
      },
    ],
    ...where,
  };

  if (!offset) {
    fetchGraphQL(totalQuery, "DevhubTotalPostsQuery", {
      where,
    }).then((result) => {
      const data = result.body.data[totalQueryName];
      State.update({
        totalItems: data.aggregate.count,
      });
    });
  }

  fetchGraphQL(query, "DevhubPostsQuery", {
    limit: 50,
    offset: offset ?? 0,
    where,
  }).then((result) => {
    if (result.status === 200) {
      if (result.body.data) {
        const data = result.body.data[queryName];
        if (offset) {
          State.update({
            postIds: state.postIds.concat(data.map((p) => p.post_id)),
            loading: false,
          });
        } else {
          State.update({
            postIds: data.map((p) => p.post_id),
            loading: false,
          });
        }
      }
    } else {
      State.update({ loading: false });
    }
  });
}

if (!state.items || searchConditionChanged()) {
  getPostIds();
}

function defaultRenderItem(postId, additionalProps) {
  if (!additionalProps) {
    additionalProps = {};
  }
  // It is important to have a non-zero-height element as otherwise InfiniteScroll loads too many items on initial load
  return (
    <div className="py-2" style={{ minHeight: "150px" }}>
      <Widget
        src={"thomasguntenaar.near/widget/devhub.entity.post.Post"}
        props={{
          id: postId,
          expandable: true,
          defaultExpanded: false,
          isInList: true,
          draftState,
          isPreview: false,
          onDraftStateChange,
          ...additionalProps,
          referral: postId,
          updateTagInParent: (tag) => {
            if (typeof props.updateTagInput === "function") {
              props.updateTagInput(tag);
            }
            getPostIds(tag);
          },
          transactionHashes: props.transactionHashes,
        }}
      />
    </div>
  );
}

const renderItem = props.renderItem ?? defaultRenderItem;

const cachedRenderItem = (item, i) => {
  if (props.term) {
    return renderItem(item, {
      searchKeywords: [props.term],
    });
  }

  const key = JSON.stringify(item);

  if (!(key in state.cachedItems)) {
    state.cachedItems[key] = renderItem(item);
    State.update();
  }
  return state.cachedItems[key];
};

const ONE_DAY = 60 * 60 * 24 * 1000;
const ONE_WEEK = 60 * 60 * 24 * 1000 * 7;
const ONE_MONTH = 60 * 60 * 24 * 1000 * 30;

function getHotnessScore(post) {
  //post.id - shows the age of the post, should grow exponentially, since newer posts are more important
  //post.likes.length - linear value
  const age = Math.pow(post.id, 5);
  const comments = post.comments;
  const commentAge = comments.reduce((sum, age) => sum + Math.pow(age, 5), 0);
  const totalAge = age + commentAge;
  //use log functions to make likes score and exponentially big age score close to each other
  return Math.log10(post.likes.length) + Math.log(Math.log10(totalAge));
}

const getPeriodText = (period) => {
  let text = "Last 24 hours";
  if (period === "week") {
    text = "Last week";
  }
  if (period === "month") {
    text = "Last month";
  }
  return text;
};

let postIds = state.postIds ?? null;

const loader = (
  <div className="loader" key={"loader"}>
    <span
      className="spinner-grow spinner-grow-sm me-1"
      role="status"
      aria-hidden="true"
    />
    Loading ...
  </div>
);

if (postIds === null) {
  return loader;
}
const initialItems = postIds;

const jInitialItems = JSON.stringify(initialItems);
if (state.jInitialItems !== jInitialItems) {
  // const jIndex = JSON.stringify(index);
  // if (jIndex !== state.jIndex) {
  State.update({
    jIndex,
    jInitialItems,
    items: initialItems,
    cachedItems: {},
  });
}

const makeMoreItems = () => {
  State.update({
    displayCount: state.displayCount + addDisplayCount,
  });
  if (
    state.items.length - state.displayCount < addDisplayCount * 5 &&
    !state.loading
  ) {
    State.update({ loading: true });
    getPostIds(null, state.items.length);
  }
};

const items = state.items ? state.items.slice(0, state.displayCount) : [];
const renderedItems = items.map(cachedRenderItem);

const Head =
  props.recency == "hot" ? (
    <div class="row">
      <div class="fs-5 col-6 align-self-center">
        <i class="bi-fire"></i>
        <span>Hottest Posts</span>
      </div>
      <div class="col-6 dropdown d-flex justify-content-end">
        <a
          class="btn btn-secondary dropdown-toggle"
          href="#"
          role="button"
          id="dropdownMenuLink"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {getPeriodText(state.period)}
        </a>

        <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
          <li>
            <button
              class="dropdown-item"
              onClick={() => {
                State.update({ period: "day" });
              }}
            >
              {getPeriodText("day")}
            </button>
          </li>
          <li>
            <button
              class="dropdown-item"
              onClick={() => {
                State.update({ period: "week" });
              }}
            >
              {getPeriodText("week")}
            </button>
          </li>
          <li>
            <button
              class="dropdown-item"
              onClick={() => {
                State.update({ period: "month" });
              }}
            >
              {getPeriodText("month")}
            </button>
          </li>
        </ul>
      </div>
    </div>
  ) : (
    <></>
  );

return (
  <>
    {Head}
    {state.loading ? loader : null}
    {is_edit_or_add_post_transaction ? (
      <p class="text-secondary mt-4">
        Post {transaction_method_name == "edit_post" ? "edited" : "added"}{" "}
        successfully. Back to{" "}
        <Link
          style={{
            color: "#3252A6",
          }}
          className="fw-bold"
          to={href({
            widgetSrc: "thomasguntenaar.near/widget/app",
            params: { page: "feed" },
          })}
        >
          feed
        </Link>
      </p>
    ) : state.items.length > 0 ? (
      <div style={{ overflow: "auto", height: "60vh" }}>
        <InfiniteScroll
          pageStart={0}
          loadMore={makeMoreItems}
          hasMore={state.totalItems > state.items.length}
          loader={loader}
          useWindow={false}
        >
          {renderedItems}
        </InfiniteScroll>
      </div>
    ) : (
      <p class="text-secondary">
        No posts{" "}
        {props.term || props.tag || props.author ? "matches search" : ""}
        {props.recency === "hot"
          ? " in " + getPeriodText(state.period).toLowerCase()
          : ""}
      </p>
    )}
  </>
);
