const css = fetch("https://floatui.com/tailwind.css").body;
if (!css) return "";

// @ts-ignore
const Tailwind = styled.div`${css}`;

return { Tailwind };
