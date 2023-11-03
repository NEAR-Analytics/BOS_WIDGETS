return (
  <div className="bg-gray-800 rounded-lg border-gray-700 p-4">
    <img
      src={props.thumbnail}
      alt="Placeholder Image"
      className="w-full h-48 rounded-md object-cover"
    />
    <div className="px-1 py-4">
      <div className="font-bold text-xl text-white mb-2">{props.title}</div>
      <p className="text-gray-300 text-base">{props.description}</p>
    </div>
    <div className="px-1 py-4">
      <a
        href={props.link}
        target="_blank"
        className="text-blue-400 hover:underline"
      >
        Read More
      </a>
    </div>
  </div>
);
