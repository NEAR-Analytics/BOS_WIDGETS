const videos = [
  {
    title: "Video Title 0",
    description: "Description for video 0.",
    publishedDate: "November 16, 2021",
    duration: 363,
    imageUrl: "https://placehold.co/640x360",
  },
  {
    title: "Video Title 1",
    description: "Description for video 1.",
    publishedDate: "November 16, 2022",
    duration: 378,
    imageUrl: "https://placehold.co/640x360",
  },
  {
    title: "Video Title 2",
    description: "Description for video 2.",
    publishedDate: "November 16, 2022",
    duration: 476,
    imageUrl: "https://placehold.co/640x360",
  },
];
return (
  <>
    <div className="container mx-auto px-4 py-8 bg-gray-900 text-white">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Videos</h1>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          New Video
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {videos.map((video, index) => (
          <div className="bg-gray-800 p-4 rounded-lg" key={index}>
            <img
              alt={video.title}
              className="rounded-lg mb-4"
              src={video.imageUrl}
              width="640"
              height="360"
            />
            <h2 className="text-lg font-semibold mb-2">{video.title}</h2>
            <p className="text-gray-400 text-sm mb-1">{video.description}</p>
            <p className="text-gray-400 text-sm mb-1">
              Published: {video.publishedDate}
            </p>
            <p className="text-gray-400 text-sm">Duration: {video.duration}</p>
          </div>
        ))}
      </div>
    </div>
  </>
);
