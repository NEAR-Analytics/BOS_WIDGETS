const [loading, setLoading] = useState(true);

const Dependencies = useMemo(
  () => ({
    ...(VM.require("rubik-ui.near/widget/RubikUI.Components.Core") || {}),
    ...(VM.require("rubik-ui.near/widget/RubikUI.Cubes.AccordionCubes") || {}),
    ...(VM.require("rubik-ui.near/widget/RubikUI.Themes.RubikTheme") || {})
  }),
  []
);

useEffect(() => {
  if (
    Object.keys(Dependencies).length > 0 &&
    Object.values(Dependencies).every((dependency) => dependency)
  ) {
    setLoading(false);
  }
}, [Dependencies]);

if (loading) {
  return <>Loading</>;
} else {
  const { Rubik: Theme, RubikLogo: Logo, Accordion, AccordionItem } = Dependencies;

  return (
    <Theme>
      <Logo></Logo>
      <Accordion
        mediaMaxWidth800="background-color:red"
        onClick={() => console.log("Accordion clicked!")}
        width="800px"
        borderTop="4px solid #000"
      >
        {Array.from([1, 2, 3]).map((data, idx) => (
          <AccordionItem>{idx}</AccordionItem>
        ))}
      </Accordion>
    </Theme>
  );
}
