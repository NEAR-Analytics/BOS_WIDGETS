return (
  <>
    <div className="mt-8 w-full">
      <h3 className="text-lg font-semibold mb-4">Pinned</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Repeat this block for each pinned item */}
        <div className="bg-gray-800 rounded-md p-4">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-xl font-semibold">
              Study-Reinforcement-Learning
            </h4>
            <span className="text-gray-400">(Public)</span>
          </div>
          <p className="text-gray-400 text-sm mb-4">
            Studying Reinforcement Learning Guide
          </p>
          <div className="flex items-center text-gray-400 text-sm">
            <i className="fas fa-star mr-2"></i>
            <span>150</span>
            <i className="fas fa-code-branch ml-4 mr-2"></i>
            <span>36</span>
          </div>
        </div>
        {/* Repeat for each pinned item */}
      </div>
    </div>
  </>
);
