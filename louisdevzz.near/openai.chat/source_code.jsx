const tailwindCssUrl =
  "https://cdn.jsdelivr.net/npm/tailwindcss@2.2/dist/tailwind.min.css";

State.init({
  theme: null,
});

const tailwindCss = fetch(tailwindCssUrl).body;

if (!tailwindCss) return "";

if (!state.theme) {
  State.update({
    theme: styled.div`
    ${tailwindCss}`,
  });
}

const Theme = state.theme;

const handleClick = () => {
  props.handleClick();
};

return (
  <Theme>
    {props.isShow && (
      <div>
        <div
          data-state="open"
          class="flex absolute inset-0 z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
          style={{ pointerEvents: "auto", background: "rgba(0,0,0,0.2)" }}
        ></div>
        <div
          role="dialog"
          class="flex z-50 absolute gap-4 bg-white p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500 inset-y-0 right-0 h-full border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm w-[100%] overflow-scroll sm:max-lg:max-w-[75%] md:max-w-[50%]"
          tabindex="-1"
          style={{ pointerEvents: "auto", width: "100%" }}
        >
          <div class="flex flex-col space-y-2 text-center sm:text-left">
            <h2 id="radix-:rq:" class="text-lg font-semibold text-foreground">
              Chat history
            </h2>
            <div class="prose prose-sm prose-zinc max-w-full dark:prose-invert">
              <h3></h3>
            </div>
          </div>
          <button
            onClick={handleClick}
            type="button"
            class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-x h-4 w-4"
            >
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
            <span class="sr-only">Close</span>
          </button>
        </div>
      </div>
    )}
  </Theme>
);
