const tailwindCssUrl =
  "https://cdn.jsdelivr.net/npm/tailwindcss@2.2/dist/tailwind.min.css";

State.init({
  theme: null,
  isShow: true,
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

const Prompt = styled.div`
  position:absolute;
  width: 91.666667%;
  transform: translateX(-50%);
  left:50%;
  display:flex;
  flex-wrap:wrap;
  justify-content:center;
  align-items:center;
  gap:10px;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 500ms;
  bottom:180px;
`;

const handleClick = () => {
  State.update({ isShow: !state.isShow });
};

return (
  <Theme>
    <div class="code-syntax-wrapper px-2">
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
        <div
          class="bg-zinc-50 dark:bg-zinc-900"
          style={{ position: "relative" }}
        >
          <div
            class="max-h-[24vh] overflow-scroll pb-8 text-sm"
            tabindex="-1"
          ></div>
        </div>
      </div>
    </div>
    {state.isShow && (
      <Prompt>
        <button
          type="button"
          class="w-xs min-w-xs max-w-xs cursor-pointer truncate rounded-full bg-gradient-to-r from-green-400 to-green-700  px-4 py-2 text-white transition-all hover:from-teal-500 hover:to-blue-600"
        >
          <span
            class="transition-all hover:-ml-96 hover:mr-36"
            style={{ transitionDuration: "3000ms" }}
          >
            Design a carousel slider for featured articles with previous and
            next controls, using a sleek, modern look.
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
      </Prompt>
    )}
    <div class="flex items-center justify-center">
      <button
        onClick={handleClick}
        class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background  transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-10 w-10 absolute left-[calc(50%-1.25rem)] z-10 hover:scale-125 hover:animate-pulse hover:bg-transparent"
        style={{ bottom: "10px" }}
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="inline-block h-5 w-5"
        >
          <path
            d="M3.85355 2.14645C3.65829 1.95118 3.34171 1.95118 3.14645 2.14645C2.95118 2.34171 2.95118 2.65829 3.14645 2.85355L7.14645 6.85355C7.34171 7.04882 7.65829 7.04882 7.85355 6.85355L11.8536 2.85355C12.0488 2.65829 12.0488 2.34171 11.8536 2.14645C11.6583 1.95118 11.3417 1.95118 11.1464 2.14645L7.5 5.79289L3.85355 2.14645ZM3.85355 8.14645C3.65829 7.95118 3.34171 7.95118 3.14645 8.14645C2.95118 8.34171 2.95118 8.65829 3.14645 8.85355L7.14645 12.8536C7.34171 13.0488 7.65829 13.0488 7.85355 12.8536L11.8536 8.85355C12.0488 8.65829 12.0488 8.34171 11.8536 8.14645C11.6583 7.95118 11.3417 7.95118 11.1464 8.14645L7.5 11.7929L3.85355 8.14645Z"
            fill="currentColor"
            fill-rule="evenodd"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
    {state.isShow && (
      <div
        class="absolute w-full left-[calc(50%)] -translate-x-1/2 flex items-center justify-center"
        style={{ bottom: "60px" }}
      >
        <div
          id="llm-input"
          class="flex w-11/12 justify-center rounded-full bg-background px-8 py-4 border border-gray-300 align-middle transition-all duration-500 lg:max-w-full"
        >
          <input
            class="flex w-full border-none px-3 py-2 ring-offset-background placeholder:text-muted-foreground focus:outline-none  disabled:cursor-not-allowed disabled:opacity-50 min-h-[41px] min-w-0 flex-1 resize-none rounded-none border-none text-base focus-visible:ring-0 focus-visible:ring-offset-0"
            name="query"
            rows="1"
            placeholder="Describe a UI you desire"
          />
          <div class="flex items-center">
            <button
              class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 w-8 flex-none rounded-full"
              type="submit"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
              >
                <path
                  d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    )}
  </Theme>
);
