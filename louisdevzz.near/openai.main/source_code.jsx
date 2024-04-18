const tailwindCssUrl =
  "https://cdn.jsdelivr.net/npm/tailwindcss@2.2/dist/tailwind.min.css";

State.init({
  theme: null,
});

const tailwindCss = fetch(tailwindCssUrl).body;
if (!tailwindCss) return "Can't load CSS 😔.";

if (!state.theme) {
  State.update({
    theme: styled.div`
    ${tailwindCss}`,
  });
}

const Theme = state.theme;

return (
  <Theme>
    <div class="code-preview-wrapper px-2">
      <div class="code-preview flex border-l border-r border-gray-300">
        <div
          class="code-responsive-wrapper w-full overflow-auto"
          style={{ height: "60vh" }}
        >
          <div
            class="flex h-full items-center bg-background"
            role="button"
            tabindex="0"
          >
            <label class="relative mx-auto h-72 w-64 cursor-pointer rounded-lg bg-white p-4 text-center text-zinc-600 shadow-lg dark:bg-zinc-800">
              <div class="mb-5 text-6xl">📸</div>
              <span class="text-lg">
                Drag a screenshot of UI or click me to upload one.
              </span>
              <div class="mt-2 text-sm">
                You can also just explain what you want in the text box below.
              </div>
              <div class="absolute inset-0 h-full w-full rounded-lg border-2 border-dashed border-zinc-400 bg-transparent"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  </Theme>
);
