return (
  <div class="inline-block align-bottom bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all mb-4 w-full sm:w-1/3 sm:my-8">
    <div className="bg-gray-800 shadow-xl rounded-lg p-6 w-1/2">
      <div className="flex flex-col items-center">
        <h3 className="text-xl text-center font-semibold mb-4 text-white">
          {props.Title}
        </h3>
        <span className="text-4xl font-bold text-gray-200">
          {props.Stats.toLocaleString("en-US")}
        </span>
      </div>
    </div>
  </div>
);
