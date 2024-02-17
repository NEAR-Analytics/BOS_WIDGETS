const { RubikLogo } = VM.require(
  "rubik-ui.near/widget/RubikUI.Components.Core"
);
const { Rubik } = VM.require("rubik-ui.near/widget/RubikUI.Themes.RubikTheme");

const [loading, setLoading] = useState(true);

useEffect(() => {
  setLoading(false);
}, Rubik);

return (
  <>
    {loading ? (
      <>Loading...</>
    ) : (
      <Rubik>
        <RubikLogo></RubikLogo>
      </Rubik>
    )}
  </>
);
