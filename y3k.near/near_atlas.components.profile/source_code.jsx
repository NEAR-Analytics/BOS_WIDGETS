return (
  <div class="min-h-full">
    {/* <!-- When the mobile menu is open, add `overflow-hidden` to the `body` element to prevent double scrollbars Menu open: "fixed inset-0 z-40 overflow-y-auto", Menu closed: "" --> */}

    <div class="py-10">
      <div class="mx-auto max-w-3xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-8 lg:px-8">
        <div class="hidden lg:col-span-3 lg:block xl:col-span-2">
          <nav
            class="sticky top-4 divide-y divide-gray-300"
            aria-label="Sidebar"
          >
            <div class="space-y-1 pb-8">
              {/* <!-- Current: "bg-gray-200 text-gray-900", Default: "text-gray-700 hover:bg-gray-50"--> */}
              <a
                class="bg-gray-200 text-gray-900 group flex items-center rounded-md px-3 py-2 text-sm font-medium"
                href="#"
                aria-current="page"
              >
                <svg
                  class="text-gray-500 -ml-1 mr-3 h-6 w-6 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  ></path>
                </svg>
                <span class="truncate">Home</span>
              </a>
              <a
                class="text-gray-700 hover:bg-gray-50 group flex items-center rounded-md px-3 py-2 text-sm font-medium"
                href="#"
              >
                <svg
                  class="text-gray-400 group-hover:text-gray-500 -ml-1 mr-3 h-6 w-6 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
                  ></path>
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"
                  ></path>
                </svg>
                <span class="truncate">Popular</span>
              </a>
              <a
                class="text-gray-700 hover:bg-gray-50 group flex items-center rounded-md px-3 py-2 text-sm font-medium"
                href="#"
              >
                <svg
                  class="text-gray-400 group-hover:text-gray-500 -ml-1 mr-3 h-6 w-6 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                  ></path>
                </svg>
                <span class="truncate">Communities</span>
              </a>
              <a
                class="text-gray-700 hover:bg-gray-50 group flex items-center rounded-md px-3 py-2 text-sm font-medium"
                href="#"
              >
                <svg
                  class="text-gray-400 group-hover:text-gray-500 -ml-1 mr-3 h-6 w-6 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                  ></path>
                </svg>
                <span class="truncate">Trending</span>
              </a>
            </div>
            <div class="pt-10">
              <p
                class="px-3 text-sm font-medium text-gray-500"
                id="communities-headline"
              >
                Communities
              </p>
              <div
                class="mt-3 space-y-2"
                aria-labelledby="communities-headline"
              >
                <a
                  class="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  href="#"
                >
                  <span class="truncate">Movies</span>
                </a>
                <a
                  class="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  href="#"
                >
                  <span class="truncate">Food</span>
                </a>
                <a
                  class="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  href="#"
                >
                  <span class="truncate">Sports</span>
                </a>
                <a
                  class="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  href="#"
                >
                  <span class="truncate">Animals</span>
                </a>
                <a
                  class="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  href="#"
                >
                  <span class="truncate">Science</span>
                </a>
                <a
                  class="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  href="#"
                >
                  <span class="truncate">Dinosaurs</span>
                </a>
                <a
                  class="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  href="#"
                >
                  <span class="truncate">Talents</span>
                </a>
                <a
                  class="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  href="#"
                >
                  <span class="truncate">Gaming</span>
                </a>
              </div>
            </div>
          </nav>
        </div>
        <div class="lg:col-span-9 xl:col-span-6">
          <div class="px-4 sm:px-0">
            <div class="sm:hidden">
              <label class="sr-only" for="question-tabs">
                Select a tab
              </label>
              <select
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-rose-500"
                id="question-tabs"
              >
                <option selected="">Recent</option>
                <option>Most Liked</option>
                <option>Most Answers</option>
              </select>
            </div>
            <div class="hidden sm:block">
              <nav
                class="isolate flex divide-x divide-gray-200 rounded-lg shadow"
                aria-label="Tabs"
              >
                {/* <!-- Current: "text-gray-900", Default: "text-gray-500 hover:text-gray-700"--> */}
                <a
                  class="text-gray-900 rounded-l-lg group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-6 text-center text-sm font-medium hover:bg-gray-50 focus:z-10"
                  href="#"
                  aria-current="page"
                >
                  <span>Recent</span>
                  <span
                    class="bg-rose-500 absolute inset-x-0 bottom-0 h-0.5"
                    aria-hidden="true"
                  ></span>
                </a>
                <a
                  class="text-gray-500 hover:text-gray-700 group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-6 text-center text-sm font-medium hover:bg-gray-50 focus:z-10"
                  href="#"
                >
                  <span>Most Liked</span>
                  <span
                    class="bg-transparent absolute inset-x-0 bottom-0 h-0.5"
                    aria-hidden="true"
                  ></span>
                </a>
                <a
                  class="text-gray-500 hover:text-gray-700 rounded-r-lg group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-6 text-center text-sm font-medium hover:bg-gray-50 focus:z-10"
                  href="#"
                >
                  <span>Most Answers</span>
                  <span
                    class="bg-transparent absolute inset-x-0 bottom-0 h-0.5"
                    aria-hidden="true"
                  ></span>
                </a>
              </nav>
            </div>
          </div>
          <div class="mt-4">
            <h1 class="sr-only">Recent questions</h1>
            <ul class="space-y-4" role="list">
              <li class="bg-white px-4 py-6 shadow sm:rounded-lg sm:p-6">
                <div aria-labelledby="question-title-81614">
                  <div>
                    <div class="flex space-x-3">
                      <div class="flex-shrink-0">
                        <img
                          class="h-10 w-10 rounded-full"
                          src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
                          alt=""
                        />
                      </div>
                      <div class="min-w-0 flex-1">
                        <p class="text-sm font-medium text-gray-900">
                          <a class="hover:underline" href="#">
                            Dries Vincent
                          </a>
                        </p>
                        <p class="text-sm text-gray-500">
                          <a class="hover:underline" href="#">
                            <span datetime="2020-12-09T11:43:00">
                              December 9 at 11:43 AM
                            </span>
                          </a>
                        </p>
                      </div>
                      <div class="flex flex-shrink-0 self-center">
                        <div class="relative inline-block text-left">
                          <div>
                            <button
                              class="-m-2 flex items-center rounded-full p-2 text-gray-400 hover:text-gray-600"
                              id="options-menu-0-button"
                              type="button"
                              aria-expanded="false"
                              aria-haspopup="true"
                            >
                              <span class="sr-only">Open options</span>
                              <svg
                                class="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM10 8.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM11.5 15.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z"></path>
                              </svg>
                            </button>
                          </div>
                          {/* <!-- Dropdown menu, show/hide based on menu state. Entering: "transition ease-out duration-100" From: "transform opacity-0 scale-95" To: "transform opacity-100 scale-100" Leaving: "transition ease-in duration-75" From: "transform opacity-100 scale-100" To: "transform opacity-0 scale-95" --> */}
                          <div
                            class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="options-menu-0-button"
                            tabindex="-1"
                          >
                            <div class="py-1" role="none">
                              {/* <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700"--> */}
                              <a
                                class="text-gray-700 flex px-4 py-2 text-sm"
                                id="options-menu-0-item-0"
                                href="#"
                                role="menuitem"
                                tabindex="-1"
                              >
                                <svg
                                  class="mr-3 h-5 w-5 text-gray-400"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  aria-hidden="true"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                    clip-rule="evenodd"
                                  ></path>
                                </svg>
                                <span>Add to favorites</span>
                              </a>
                              <a
                                class="text-gray-700 flex px-4 py-2 text-sm"
                                id="options-menu-0-item-1"
                                href="#"
                                role="menuitem"
                                tabindex="-1"
                              >
                                <svg
                                  class="mr-3 h-5 w-5 text-gray-400"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  aria-hidden="true"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M6.28 5.22a.75.75 0 010 1.06L2.56 10l3.72 3.72a.75.75 0 01-1.06 1.06L.97 10.53a.75.75 0 010-1.06l4.25-4.25a.75.75 0 011.06 0zm7.44 0a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L17.44 10l-3.72-3.72a.75.75 0 010-1.06zM11.377 2.011a.75.75 0 01.612.867l-2.5 14.5a.75.75 0 01-1.478-.255l2.5-14.5a.75.75 0 01.866-.612z"
                                    clip-rule="evenodd"
                                  ></path>
                                </svg>
                                <span>Embed</span>
                              </a>
                              <a
                                class="text-gray-700 flex px-4 py-2 text-sm"
                                id="options-menu-0-item-2"
                                href="#"
                                role="menuitem"
                                tabindex="-1"
                              >
                                <svg
                                  class="mr-3 h-5 w-5 text-gray-400"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  aria-hidden="true"
                                >
                                  <path d="M3.5 2.75a.75.75 0 00-1.5 0v14.5a.75.75 0 001.5 0v-4.392l1.657-.348a6.449 6.449 0 014.271.572 7.948 7.948 0 005.965.524l2.078-.64A.75.75 0 0018 12.25v-8.5a.75.75 0 00-.904-.734l-2.38.501a7.25 7.25 0 01-4.186-.363l-.502-.2a8.75 8.75 0 00-5.053-.439l-1.475.31V2.75z"></path>
                                </svg>
                                <span>Report content</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <h2
                      class="mt-4 text-base font-medium text-gray-900"
                      id="question-title-81614"
                    >
                      What would you have done differently if you ran Jurassic
                      Park?
                    </h2>
                  </div>
                  <div class="mt-2 space-y-4 text-sm text-gray-700">
                    <p>
                      Jurassic Park was an incredible idea and a magnificent
                      feat of engineering, but poor protocols and a disregard
                      for human safety killed what could have otherwise been one
                      of the best businesses of our generation.
                    </p>
                    <p>
                      Ultimately, I think that if you wanted to run the park
                      successfully and keep visitors safe, the most important
                      thing to prioritize would be…
                    </p>
                  </div>
                  <div class="mt-6 flex justify-between space-x-8">
                    <div class="flex space-x-6">
                      <span class="inline-flex items-center text-sm">
                        <button
                          class="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                          type="button"
                        >
                          <svg
                            class="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path d="M1 8.25a1.25 1.25 0 112.5 0v7.5a1.25 1.25 0 11-2.5 0v-7.5zM11 3V1.7c0-.268.14-.526.395-.607A2 2 0 0114 3c0 .995-.182 1.948-.514 2.826-.204.54.166 1.174.744 1.174h2.52c1.243 0 2.261 1.01 2.146 2.247a23.864 23.864 0 01-1.341 5.974C17.153 16.323 16.072 17 14.9 17h-3.192a3 3 0 01-1.341-.317l-2.734-1.366A3 3 0 006.292 15H5V8h.963c.685 0 1.258-.483 1.612-1.068a4.011 4.011 0 012.166-1.73c.432-.143.853-.386 1.011-.814.16-.432.248-.9.248-1.388z"></path>
                          </svg>
                          <span class="font-medium text-gray-900">29</span>
                          <span class="sr-only">likes</span>
                        </button>
                      </span>
                      <span class="inline-flex items-center text-sm">
                        <button
                          class="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                          type="button"
                        >
                          <svg
                            class="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M10 2c-2.236 0-4.43.18-6.57.524C1.993 2.755 1 4.014 1 5.426v5.148c0 1.413.993 2.67 2.43 2.902.848.137 1.705.248 2.57.331v3.443a.75.75 0 001.28.53l3.58-3.579a.78.78 0 01.527-.224 41.202 41.202 0 005.183-.5c1.437-.232 2.43-1.49 2.43-2.903V5.426c0-1.413-.993-2.67-2.43-2.902A41.289 41.289 0 0010 2zm0 7a1 1 0 100-2 1 1 0 000 2zM8 8a1 1 0 11-2 0 1 1 0 012 0zm5 1a1 1 0 100-2 1 1 0 000 2z"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                          <span class="font-medium text-gray-900">11</span>
                          <span class="sr-only">replies</span>
                        </button>
                      </span>
                      <span class="inline-flex items-center text-sm">
                        <button
                          class="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                          type="button"
                        >
                          <svg
                            class="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"></path>
                            <path
                              fill-rule="evenodd"
                              d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                          <span class="font-medium text-gray-900">2.7k</span>
                          <span class="sr-only">views</span>
                        </button>
                      </span>
                    </div>
                    <div class="flex text-sm">
                      <span class="inline-flex items-center text-sm">
                        <button
                          class="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                          type="button"
                        >
                          <svg
                            class="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path d="M13 4.5a2.5 2.5 0 11.702 1.737L6.97 9.604a2.518 2.518 0 010 .792l6.733 3.367a2.5 2.5 0 11-.671 1.341l-6.733-3.367a2.5 2.5 0 110-3.475l6.733-3.366A2.52 2.52 0 0113 4.5z"></path>
                          </svg>
                          <span class="font-medium text-gray-900">Share</span>
                        </button>
                      </span>
                    </div>
                  </div>
                </div>
              </li>
              {/* <!-- More questions...--> */}
            </ul>
          </div>
        </div>
        <div class="hidden xl:col-span-4 xl:block">
          <div class="sticky top-4 space-y-4">
            <div aria-labelledby="who-to-follow-heading">
              <div class="rounded-lg bg-white shadow">
                <div class="p-6">
                  <h2
                    class="text-base font-medium text-gray-900"
                    id="who-to-follow-heading"
                  >
                    Who to follow
                  </h2>
                  <div class="mt-6 flow-root">
                    <ul class="-my-4 divide-y divide-gray-200" role="list">
                      <li class="flex items-center space-x-3 py-4">
                        <div class="flex-shrink-0">
                          <img
                            class="h-8 w-8 rounded-full"
                            src="https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
                            alt=""
                          />
                        </div>
                        <div class="min-w-0 flex-1">
                          <p class="text-sm font-medium text-gray-900">
                            <a href="#">Leonard Krasner</a>
                          </p>
                          <p class="text-sm text-gray-500">
                            <a href="#">@leonardkrasner</a>
                          </p>
                        </div>
                        <div class="flex-shrink-0">
                          <button
                            class="inline-flex items-center gap-x-1.5 text-sm font-semibold leading-6 text-gray-900"
                            type="button"
                          >
                            <svg
                              class="h-5 w-5 text-gray-400"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z"></path>
                            </svg>
                            <span>Follow</span>
                          </button>
                        </div>
                      </li>
                      {/* <!-- More people...--> */}
                    </ul>
                  </div>
                  <div class="mt-6">
                    <a
                      class="block w-full rounded-md bg-white px-3 py-2 text-center text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
                      href="#"
                    >
                      View all
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div aria-labelledby="trending-heading">
              <div class="rounded-lg bg-white shadow">
                <div class="p-6">
                  <h2
                    class="text-base font-medium text-gray-900"
                    id="trending-heading"
                  >
                    Trending
                  </h2>
                  <div class="mt-6 flow-root">
                    <ul class="-my-4 divide-y divide-gray-200" role="list">
                      <li class="flex space-x-3 py-4">
                        <div class="flex-shrink-0">
                          <img
                            class="h-8 w-8 rounded-full"
                            src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
                            alt="Floyd Miles"
                          />
                        </div>
                        <div class="min-w-0 flex-1">
                          <p class="text-sm text-gray-800">
                            What books do you have on your bookshelf just to
                            look smarter than you actually are?
                          </p>
                          <div class="mt-2 flex">
                            <span class="inline-flex items-center text-sm">
                              <button
                                class="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                                type="button"
                              >
                                <svg
                                  class="h-5 w-5"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  aria-hidden="true"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M10 2c-2.236 0-4.43.18-6.57.524C1.993 2.755 1 4.014 1 5.426v5.148c0 1.413.993 2.67 2.43 2.902.848.137 1.705.248 2.57.331v3.443a.75.75 0 001.28.53l3.58-3.579a.78.78 0 01.527-.224 41.202 41.202 0 005.183-.5c1.437-.232 2.43-1.49 2.43-2.903V5.426c0-1.413-.993-2.67-2.43-2.902A41.289 41.289 0 0010 2zm0 7a1 1 0 100-2 1 1 0 000 2zM8 8a1 1 0 11-2 0 1 1 0 012 0zm5 1a1 1 0 100-2 1 1 0 000 2z"
                                    clip-rule="evenodd"
                                  ></path>
                                </svg>
                                <span class="font-medium text-gray-900">
                                  291
                                </span>
                              </button>
                            </span>
                          </div>
                        </div>
                      </li>
                      {/* <!-- More posts...--> */}
                    </ul>
                  </div>
                  <div class="mt-6">
                    <a
                      class="block w-full rounded-md bg-white px-3 py-2 text-center text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
                      href="#"
                    >
                      View all
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
