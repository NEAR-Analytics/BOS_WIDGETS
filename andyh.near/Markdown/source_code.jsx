const [Markdown, setMarkdown] = useState(null);

useEffect(() => {
  console.log("efft!")(async () => {
    const md = await import(
      "https://esm.sh/react-markdown@9.0.1?alias=react:preact/compat"
    );
    console.log(md);
  })();
}, [Markdown]);

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
