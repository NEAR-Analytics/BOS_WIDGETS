const [subneddit, setSubneddit] = useState(
  !subneddit || subneddit === "all" ? "" : subneddit
);

const onSubnedditChange = (subneddit) => {
  setSubneddit(subneddit);
  props.onChange && props.onChange(subneddit);
};

const rawAllSubneddits = Social.index("subneddits", "all", {
  limit: 10000,
  order: "desc",
});
const allSubneddits = useMemo(() => {
  const counts = new Map();
  rawAllSubneddits.forEach(({ value }) => {
    const subneddit = value?.subneddit;
    if (subneddit) {
      counts.set(subneddit, (counts.get(subneddit) || 0) + 1);
    }
  });
  const allSubneddits = [...counts.entries()].map((name, count) => ({
    name,
    count,
  }));
  allSubneddits.sort((a, b) => b.count - a.count);
  return allSubneddits;
}, [rawAllSubneddits]);

return (
  <div>
    <Typeahead
      id={state.id}
      labelKey="subneddit"
      onChange={(tag) => setSubneddit(tag)}
      options={allSubneddits}
      placeholder={"Enter a subneddit, e.g. NEARCON"}
      selected={subneddit}
      positionFixed
      allowNew
    />
  </div>
);
