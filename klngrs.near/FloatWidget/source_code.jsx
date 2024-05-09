const css = fetch("https://floatui.com/tailwind.css").body;
if (!css) return "";
const Tailwind = styled.div`${css}`;

return (
  <>
    <Tailwind></Tailwind>
  </>
);
