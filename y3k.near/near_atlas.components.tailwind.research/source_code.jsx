return (
  <div className="bg-gradient-to-bl from-blue-900 to-violet-900 flex items-center justify-center lg:h-screen">
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-lg border-gray-700 p-4">
          <img
            src="https://placehold.co/300x200/d1d4ff/352cb5.png"
            alt="Placeholder Image"
            className="w-full h-48 rounded-md object-cover"
          />
          <div className="px-1 py-4">
            <div className="font-bold text-xl text-white mb-2">Blog Title</div>
            <p className="text-gray-300 text-base">
              This is a simple blog card example using Tailwind CSS. You can
              replace this text with your own blog content.
            </p>
          </div>
          <div className="px-1 py-4">
            <a href="#" className="text-blue-400 hover:underline">
              Read More
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);
