const [loading, setLoading] = useState(true);

const Dependencies = useMemo(
  () => ({
    ...(VM.require("rubik-ui.near/widget/RubikUI.Components.Core") || {}),
    ...(VM.require("rubik-ui.near/widget/RubikUI.Themes.RubikTheme") || {}),
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
  const { Rubik: Theme, RubikLogo: Logo } = Dependencies;

  const Wrapper = styled.div`
      width:20px;
      height:20px;
      background-color:red;
  `;

  const InnerWrapper = styled(Wrapper)`
      background-color:green;
  `;

  return (
    <Theme>
      <Logo></Logo>
      <InnerWrapper />
    </Theme>
  );
}
