const [Markdown, setMarkdown] = useState(null);
const importMarkdown = async () => {
  try {
    const markdownDyn = await import(
      "https://esm.sh/marked-react@2.0.0?alias=react:preact/compat&deps=preact@10.17.1"
    );
    console.log("markdown imported", markdownDyn);
    setMarkdown(markdownDyn.default);
  } catch (err) {
    console.log("markdown import error", err);
  }
};

useEffect(() => {
  importMarkdown();
}, []);

if (Markdown) {
  return (
    <div>
      <Markdown>{"# hi"}</Markdown>
    </div>
  );
}

return <>not imported yet</>;
