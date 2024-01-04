const code = `
<script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
<script src="https://cdn.jsdelivr.net/npm/js-confetti@latest/dist/js-confetti.browser.js"></script>
<body />
<script>
const jsConfetti = new JSConfetti();
let script = document.createElement('script');

script.src = "https://cdn.jsdelivr.net/npm/js-confetti@latest/dist/js-confetti.browser.js"
document.head.append(script);

script.onload = function() {
  jsConfetti.addConfetti();
};
</script>
`;

const Confetti = () => <iframe className="w-100 h-100" srcDoc={code} />;

return { Confetti };
