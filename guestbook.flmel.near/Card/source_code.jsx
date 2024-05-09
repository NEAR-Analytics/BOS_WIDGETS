const { message, latest } = props;
const availableColors = ['red', 'orange', 'lime', 'green', 'teal', 'cyan', 'violet', 'indigo', 'fuchsia', 'pink', 'rose', 'blue', 'sky'];

const randomColor = availableColors[Math.floor(Math.random() * availableColors.length)];

return <>
  <div
    class={`bg-${randomColor}-200 border-2 border-slate-800 p-4 rounded-3xl mb-4 flex-1 ${message.premium ? 'font-bold' : ''} break-inside-avoid-column`}>
    <div class="py-2 px-4 rounded-xl bg-white py-4 ">
      <svg width="38px" height="38px" viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd"
          d="M18.8533 9.11599C11.3227 13.9523 7.13913 19.5812 6.30256 26.0029C5.00021 36 13.9404 40.8933 18.4703 36.4967C23.0002 32.1002 20.2848 26.5196 17.0047 24.9942C13.7246 23.4687 11.7187 24 12.0686 21.9616C12.4185 19.9231 17.0851 14.2713 21.1849 11.6392C21.4569 11.4079 21.5604 10.9591 21.2985 10.6187C21.1262 10.3947 20.7883 9.95557 20.2848 9.30114C19.8445 8.72888 19.4227 8.75029 18.8533 9.11599Z"
          fill="currentColor" />
        <path fill-rule="evenodd" clip-rule="evenodd"
          d="M38.6789 9.11599C31.1484 13.9523 26.9648 19.5812 26.1282 26.0029C24.8259 36 33.7661 40.8933 38.296 36.4967C42.8259 32.1002 40.1105 26.5196 36.8304 24.9942C33.5503 23.4687 31.5443 24 31.8943 21.9616C32.2442 19.9231 36.9108 14.2713 41.0106 11.6392C41.2826 11.4079 41.3861 10.9591 41.1241 10.6187C40.9519 10.3947 40.614 9.95557 40.1105 9.30114C39.6702 8.72888 39.2484 8.75029 38.6789 9.11599Z"
          fill="currentColor" />
      </svg>

      {latest &&
        <div class="h-20"></div>
      }
      <div>
        <p class="text-xl">{message.text}</p>
        <div class="h-2 w-20 bg-slate-700 my-4"></div>
        <div class="text-lg flex justify-between items-center">
          <a href={`https://testnet.nearblocks.io/address/${message.sender}`}>{message.sender}</a>
          {/* message is premium */}
          {message.premium &&
            <span class="text-amber-200">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12">
                <path fill-rule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clip-rule="evenodd" />
              </svg>
            </span>
          }
        </div>
      </div>
    </div>
  </div>
</>
