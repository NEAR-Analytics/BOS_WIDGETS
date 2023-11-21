const [Markdown, setMarkdown] = useState(null);

const loadMarkdown = async () => {
  const mod = await import(
    "https://esm.sh/marked-react@2.0.0?alias=react:preact/compat"
  );
  const pkg = mod.default;
  debugger;
  setMarkdown(pkg);
};

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
