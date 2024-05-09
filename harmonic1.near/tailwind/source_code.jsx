const css = fetch("https://floatui.com/tailwind.css").body;
if (!css) return "";
return styled.div`${css}`;
