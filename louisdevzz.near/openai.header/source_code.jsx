const tailwindCssUrl =
  "https://cdn.jsdelivr.net/npm/tailwindcss@2.2/dist/tailwind.min.css";

State.init({
  theme: null,
  isShow: false,
});

const tailwindCss = fetch(tailwindCssUrl).body;
if (!tailwindCss) return "Loading...";

if (!state.theme) {
  State.update({
    theme: styled.div`
    ${tailwindCss}`,
  });
}

const Theme = state.theme;

const handleClick = () => {
  State.update({ isShow: true });
};

return (
  <Theme>
    <div class="pt-2 px-2">
      <div class="w-full rounded-t-xl border bg-background p-4">
        <div class="grid grid-cols-3">
          <div class="col-span-2 items-center justify-center space-x-2 sm:col-span-1">
            <button
              class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10 false"
              data-state="closed"
            >
              <svg
                class="inline-block h-4 w-4"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M5.5 2V0H7V2H5.5ZM0.96967 2.03033L2.46967 3.53033L3.53033 2.46967L2.03033 0.96967L0.96967 2.03033ZM4.24592 4.24592L4.79515 5.75631L7.79516 14.0063L8.46663 15.8529L9.19636 14.0285L10.2739 11.3346L13.4697 14.5303L14.5303 13.4697L11.3346 10.2739L14.0285 9.19636L15.8529 8.46663L14.0063 7.79516L5.75631 4.79516L4.24592 4.24592ZM11.6471 8.53337L10.1194 9.14447C9.6747 9.32235 9.32235 9.6747 9.14447 10.1194L8.53337 11.6471L6.75408 6.75408L11.6471 8.53337ZM0 7H2V5.5H0V7Z"
                  fill="currentColor"
                ></path>
              </svg>
            </button>
          </div>
          <div class="col-span-1 hidden items-center justify-center space-x-2 sm:flex">
            <button
              class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10"
              data-state="closed"
            >
              <span class="sr-only">Toggle desktop view</span>
              <svg
                class="inline-block h-3.5 w-3.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 14v4m-4 1h8M1 10h18M2 1h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1Z"
                ></path>
              </svg>
            </button>
            <button
              class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10"
              data-state="closed"
            >
              <span class="sr-only">Toggle tablet view</span>
              <svg
                class="inline-block h-3.5 w-3.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7.5 16.5h3M2 1h14a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1Z"
                ></path>
              </svg>
            </button>
            <button
              class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10"
              data-state="closed"
            >
              <span class="sr-only">Toggle mobile view</span>
              <svg
                class="inline-block h-3.5 w-3.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 14h12M1 4h12M6.5 16.5h1M2 1h10a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1Z"
                ></path>
              </svg>
            </button>
          </div>
          <div class="col-span-1 flex justify-end">
            <button
              class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10"
              data-state="closed"
            >
              <svg
                data-toggle-icon="moon"
                class="hidden inline-block h-3.5 w-3.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 20"
              >
                <path d="M17.8 13.75a1 1 0 0 0-.859-.5A7.488 7.488 0 0 1 10.52 2a1 1 0 0 0 0-.969A1.035 1.035 0 0 0 9.687.5h-.113a9.5 9.5 0 1 0 8.222 14.247 1 1 0 0 0 .004-.997Z"></path>
              </svg>
              <svg
                data-toggle-icon="sun"
                class="false inline-block h-3.5 w-3.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0-11a1 1 0 0 0 1-1V1a1 1 0 0 0-2 0v2a1 1 0 0 0 1 1Zm0 12a1 1 0 0 0-1 1v2a1 1 0 1 0 2 0v-2a1 1 0 0 0-1-1ZM4.343 5.757a1 1 0 0 0 1.414-1.414L4.343 2.929a1 1 0 0 0-1.414 1.414l1.414 1.414Zm11.314 8.486a1 1 0 0 0-1.414 1.414l1.414 1.414a1 1 0 0 0 1.414-1.414l-1.414-1.414ZM4 10a1 1 0 0 0-1-1H1a1 1 0 0 0 0 2h2a1 1 0 0 0 1-1Zm15-1h-2a1 1 0 1 0 0 2h2a1 1 0 0 0 0-2ZM4.343 14.243l-1.414 1.414a1 1 0 1 0 1.414 1.414l1.414-1.414a1 1 0 0 0-1.414-1.414ZM14.95 6.05a1 1 0 0 0 .707-.293l1.414-1.414a1 1 0 1 0-1.414-1.414l-1.414 1.414a1 1 0 0 0 .707 1.707Z"></path>
              </svg>
              <span class="sr-only">Toggle dark/light mode</span>
            </button>
            <button
              class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10 ml-2"
              type="button"
              onClick={handleClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-message-circle-more "
              >
                <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
                <path d="M8 12h.01"></path>
                <path d="M12 12h.01"></path>
                <path d="M16 12h.01"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    <Widget
      src="louisdevzz.near/widget/openai.chat"
      props={{
        isShow: state.isShow,
        handleClick: () => {
          State.update({ isShow: false });
        },
      }}
    />
  </Theme>
);
