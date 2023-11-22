const [Markdown, setMarkdown] = useState(null);

const loadMarkdown = useCallback(async () => {
  const mod = await import("https://esm.sh/react-markdown");
  const pkg = mod.default;
  setMarkdown(pkg);
});

useEffect(() => {
  loadMarkdown();
}, []);

console.log(Markdown);
if (!Markdown) {
  return <div>Markdown loading...</div>;
}

return (
  <div id="r">
    <Markdown id="a"># does this *work*?</Markdown>
    <Markdown id="b">### does it *ever*</Markdown>
    <Markdown id="c">#### success</Markdown>
  </div>
);
