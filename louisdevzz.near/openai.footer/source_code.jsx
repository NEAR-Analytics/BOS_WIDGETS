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
    <div class="code-syntax-wrapper">
      <div class="code-syntax relative border">
        <div class="grid w-full grid-cols-2 rounded-t-md border-b">
          <ul class="flex text-center text-sm font-medium text-gray-500 dark:text-gray-400">
            <li>
              <button
                type="button"
                class="inline-block w-full border-r p-2 px-3 "
              >
                JSX
              </button>
            </li>
          </ul>
          <div class="flex justify-end">
            <button
              type="button"
              aria-label="Download"
              class="flex items-center border-l px-3 text-sm text-secondary-foreground hover:bg-background"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.50005 1.04999C7.74858 1.04999 7.95005 1.25146 7.95005 1.49999V8.41359L10.1819 6.18179C10.3576 6.00605 10.6425 6.00605 10.8182 6.18179C10.994 6.35753 10.994 6.64245 10.8182 6.81819L7.81825 9.81819C7.64251 9.99392 7.35759 9.99392 7.18185 9.81819L4.18185 6.81819C4.00611 6.64245 4.00611 6.35753 4.18185 6.18179C4.35759 6.00605 4.64251 6.00605 4.81825 6.18179L7.05005 8.41359V1.49999C7.05005 1.25146 7.25152 1.04999 7.50005 1.04999ZM2.5 10C2.77614 10 3 10.2239 3 10.5V12C3 12.5539 3.44565 13 3.99635 13H11.0012C11.5529 13 12 12.5528 12 12V10.5C12 10.2239 12.2239 10 12.5 10C12.7761 10 13 10.2239 13 10.5V12C13 13.1041 12.1062 14 11.0012 14H3.99635C2.89019 14 2 13.103 2 12V10.5C2 10.2239 2.22386 10 2.5 10Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
            <button
              type="button"
              class="flex items-center border-l px-3 text-sm text-secondary-foreground hover:bg-background"
            >
              <svg
                class="mr-2 h-3.5 w-3.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 20"
              >
                <path d="M5 9V4.13a2.96 2.96 0 0 0-1.293.749L.879 7.707A2.96 2.96 0 0 0 .13 9H5Zm11.066-9H9.829a2.98 2.98 0 0 0-2.122.879L7 1.584A.987.987 0 0 0 6.766 2h4.3A3.972 3.972 0 0 1 15 6v10h1.066A1.97 1.97 0 0 0 18 14V2a1.97 1.97 0 0 0-1.934-2Z"></path>
                <path d="M11.066 4H7v5a2 2 0 0 1-2 2H0v7a1.969 1.969 0 0 0 1.933 2h9.133A1.97 1.97 0 0 0 13 18V6a1.97 1.97 0 0 0-1.934-2Z"></path>
              </svg>{" "}
              <span class="copy-text">Copy</span>
            </button>
          </div>
        </div>
        <div class="relative bg-zinc-50 dark:bg-zinc-900">
          <div
            class="max-h-[24vh] overflow-scroll pb-8 text-sm"
            tabindex="-1"
          ></div>
        </div>
      </div>
    </div>
    <div
      class="w-11/12 -translate-x-1/2 flex flex-wrap items-center justify-center gap-2 transition-all duration-500"
      style={{ position: "absolute" }}
    >
      <button
        type="button"
        class="w-xs min-w-xs max-w-xs cursor-pointer truncate rounded-full bg-gradient-to-r from-green-400 to-green-700  px-4 py-2 text-white transition-all hover:from-teal-500 hover:to-blue-600"
      >
        <span
          class="transition-all hover:-ml-96 hover:mr-36"
          style={{ transitionDuration: "3000ms" }}
        >
          Design a carousel slider for featured articles with previous and next
          controls, using a sleek, modern look.
        </span>
      </button>
      <button
        type="button"
        class="w-xs min-w-xs max-w-xs cursor-pointer truncate rounded-full bg-gradient-to-r from-purple-400 to-pink-500 px-4 py-2 text-white transition-all hover:from-purple-500 hover:to-pink-600"
      >
        <span
          class="transition-all hover:-ml-96 hover:mr-36"
          style={{ transitionDuration: "3000ms" }}
        >
          Design a to-do list app interface with tasks, checkboxes, and an add
          task form.
        </span>
      </button>
      <button
        type="button"
        class="w-xs min-w-xs max-w-xs cursor-pointer truncate rounded-full bg-gradient-to-r from-yellow-400 to-yellow-700 px-4 py-2 text-white transition-all hover:from-yellow-500 hover:to-orange-600"
      >
        <span
          class="transition-all hover:-ml-96 hover:mr-36"
          style={{ transitionDuration: "3000ms" }}
        >
          Generate a contact form with name, email, message fields, and a send
          button, with validation styles.
        </span>
      </button>
    </div>
  </Theme>
);
