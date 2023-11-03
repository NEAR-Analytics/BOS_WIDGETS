return (
  <div className="bg-gray-800 shadow-xl rounded-lg p-6 w-1/2">
    <div className="flex flex-col items-center">
      <h3 className=" text-center font-semibold mb-4 text-white">
        {props.Title}
      </h3>
      <span className="text-4xl font-bold text-gray-200">
        {props.Stats.toLocaleString("en-US")}
      </span>
    </div>
  </div>
);
