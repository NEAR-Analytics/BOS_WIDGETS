return (
  <div class="inline-block align-bottom bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all mb-4 w-full sm:w-1/3 sm:my-8">
    <div class="bg-gray-800 p-5">
      <div class="sm:flex sm:items-start">
        <div class="text-center sm:mt-0 sm:ml-2 sm:text-left">
          <h3 class="text-sm leading-6 font-medium text-gray-400">
            {props.Title}
          </h3>
          <p class="text-3xl font-bold text-gray-200">
            {props.Stats.toLocaleString("en-US")}
          </p>
        </div>
      </div>
    </div>
  </div>
);
