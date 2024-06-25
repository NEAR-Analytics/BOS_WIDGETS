const css = fetch("https://floatui.com/tailwind.css").body;
const Tailwind = styled.div`${css}`;
return { Tailwind };
