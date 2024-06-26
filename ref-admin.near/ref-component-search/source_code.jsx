const allMetadata =
  Social.get(
    [
      "*/widget/*/metadata/name",
      "*/widget/*/metadata/tags/*",
      "*/widget/*/metadata/description",
    ],
    "final"
  ) || {};

console.log("allMetadata: ", allMetadata);

const keys = Social.keys(["*/widget/*"], "final", { values_only: true }) || {};

const requiredTags = props.filterTags;

const chains = props.chains;

const boostedTag = props.boostedTag;
const inputTerm = props.term;

const SearchIcon = (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="7.19239"
      cy="7.19238"
      r="5.08579"
      transform="rotate(-45 7.19239 7.19238)"
      stroke="#73818B"
      stroke-width="2"
    />
    <path
      d="M10.7891 10.7886L14.3853 14.3848"
      stroke="#73818B"
      stroke-width="2"
      stroke-linecap="round"
    />
  </svg>
);

const debounce = (func, wait) => {
  const pause = wait || 350;
  let timeout;

  return (args) => {
    const later = () => {
      clearTimeout(timeout);
      func(args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, pause);
  };
};

const _search = (term) => {
  const terms = (term || "")
    .toLowerCase()
    .split(/[^\w._\/-]/)
    .filter((s) => !!s.trim());

  const matchedWidgets = [];

  const limit = props.limit ?? 30;

  const MaxSingleScore = 1;
  const MaxScore = MaxSingleScore * 5;

  const computeScore = (s) => {
    s = s.toLowerCase();
    return (
      terms
        .map((term) => {
          const pos = s.indexOf(term);
          return pos >= 0 ? Math.exp(-pos) : 0;
        })
        .reduce((s, v) => s + v, 0) / terms.length
    );
  };

  Object.entries(keys).forEach(([accountId, data]) => {
    Object.keys(data.widget).forEach((componentId) => {
      const widgetSrc = `${accountId}/widget/${componentId}`;
      const widgetSrcScore = computeScore(widgetSrc);

      const metadata = allMetadata[accountId].widget[componentId].metadata;

      const componentIdScore = computeScore(componentId);

      const descriptionScore = computeScore(
        metadata.description || componentId
      );

      const name = metadata.name || componentId;

      const metaTags = Object.keys(metadata.tags || {});

      if (requiredTags) {
        if (!metadata.tags) return;

        const noChainTags = requiredTags.filter((t) => !chains.includes(t));

        const chainTags = requiredTags.filter((t) => chains.includes(t));

        const hasRefTag = metaTags.some((t) =>
          noChainTags.map((f) => f.toLowerCase()).includes(t.toLowerCase())
        );

        const hasChainTag = chainTags.some((t) =>
          metaTags.some((f) => f.toLowerCase() === t.toLowerCase())
        );

        if (chainTags?.length > 0 && !hasChainTag) return;

        if (noChainTags?.length > 0 && !hasRefTag) return;
      }
      const boosted =
        boostedTag && metadata.tags && boostedTag in metadata.tags;
      const tags = Object.keys(metadata.tags || {}).slice(0, 10);
      const nameScore = computeScore(name);
      const tagsScore = Math.min(
        MaxSingleScore,
        tags.map(computeScore).reduce((s, v) => s + v, 0)
      );
      const score =
        (widgetSrcScore +
          componentIdScore +
          nameScore +
          tagsScore +
          descriptionScore) /
        MaxScore;
      if (score > 0) {
        matchedWidgets.push({
          score,
          accountId,
          widgetName: componentId,
          widgetSrc,
          name,
          tags,
          boosted,
        });
      }
    });
  });

  matchedWidgets.sort(
    (a, b) => (b.boosted ? 2 : 0) + b.score - (a.boosted ? 2 : 0) - a.score
  );
  const result = matchedWidgets.slice(0, limit);

  State.update({
    result,
  });

  if (props.onChange) {
    props.onChange({ term: term || "", result });
  }
};

const _searchDebounced = debounce(_search, 200);

const computeResults = (term) => {
  State.update({
    term: term,
  });

  _searchDebounced(term);
};

if (props.term && props.term !== state.oldTerm) {
  State.update({
    oldTerm: props.term,
  });
  if (props.term !== state.term) {
    computeResults(props.term);
  }
}

if (requiredTags?.length || 0 !== (state.oldFilters || []).length) {
  State.update({
    oldFilters: requiredTags,
  });
  computeResults(state.term);
}

const Wrapper = styled.div`
  width: 482px;
  height: 36px;
  display: flex;
  align-items: center;
  padding: 0 0 0 14px;

  background: #1a2e33;
  border-radius: 10px;

  @media (max-width: 500px) {
    width: 100%;
  }
`;

const Input = styled.input`
  padding-left: 4px;
  appearance: none;
  outline: none;
  width: 100%;
  background: none;
  border: none;
  color: #ffffff;
  ::placeholder {
    color: #ffffff;
    opacity: 0.3;
  }
`;

return (
  <Wrapper>
    {SearchIcon}
    <Input
      type="text"
      className={`ref-component-search`}
      value={state.term ?? ""}
      onChange={(e) => computeResults(e.target.value)}
      placeholder={props.placeholder ?? `Search`}
    />
  </Wrapper>
);
