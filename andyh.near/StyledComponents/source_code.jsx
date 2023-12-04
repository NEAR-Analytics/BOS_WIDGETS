const [StyledComponents, setStyledComponents] = useState(null);
const importMarkdown = async () => {
  try {
    const pkg = await import(
      "https://esm.sh/styled-components@6.1.1?alias=react:preact/compat&deps=preact@10.17.1"
    );
    console.log("SC imported", pkg);
    setStyledComponents(() => pkg.default);
  } catch (err) {
    console.log("SC import error", err);
  }
};

useEffect(() => {
  importStyledComponents();
}, []);

if (StyledComponents) {
  const styled = StyledComponents;
  const Spaghetti = styled.div`border: 1px solid blue`;
  return (
    <div>
      <Spaghetti>I have a border</Spaghetti>
    </div>
  );
}

return <>not imported yet</>;
