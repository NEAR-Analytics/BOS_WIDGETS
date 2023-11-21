const [Markdown, setMarkdown] = useState(null);

useEffect(() => {
  console.log("efft!");
  (async () => {
    const mod = await import(
      "https://esm.sh/react-markdown@9.0.1?alias=react:preact/compat"
    );
    setMarkdown(mod.default);
  })();
}, [Markdown]);

debugger;
console.log(Markdown);
if (!Markdown) {
  return <div>Markdown loading...</div>;
}

return (
  <div id="r">
    <Markdown id="a">{"# does this *work*?"}</Markdown>
    <Markdown id="b">{"### does it *ever*"}</Markdown>
    <Markdown id="c">{"#### success"}</Markdown>
  </div>
);
