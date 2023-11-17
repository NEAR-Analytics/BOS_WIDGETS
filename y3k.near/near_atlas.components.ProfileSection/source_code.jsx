return (
  <>
    <div className="flex flex-col items-start">
      <img
        alt="Profile picture in a circular frame with a scenic background"
        className="rounded-full border-4 border-gray-800"
        height="150"
        src="https://placehold.co/150x150"
        width="150"
      />
      <h1 className="text-3xl font-semibold mt-4">Yad Konrad</h1>
      <p className="text-gray-400">@Observer07</p>
      <p className="text-center mt-2">
        Data and Research @NEAR-Analytics
        <br />
        Otherwise, indie research -<br />
        Cybersecurity, ML and Meta-Learning
      </p>
      <button className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-md">
        Edit profile
      </button>
      <div className="flex items-center mt-4 space-x-6">
        <div className="flex items-center">
          <i className="fas fa-user-friends text-gray-400"></i>
          <span className="ml-2 text-gray-400">172 followers</span>
        </div>
        <div className="flex items-center">
          <i className="fas fa-user-friends text-gray-400"></i>
          <span className="ml-2 text-gray-400">153 following</span>
        </div>
      </div>
      <div className="flex items-center mt-2 space-x-4">
        <i className="fas fa-map-marker-alt text-gray-400"></i>
        <span className="text-gray-400">New York</span>
      </div>
      <div className="flex items-center mt-2 space-x-4">
        <i className="fas fa-link text-gray-400"></i>
        <a className="text-blue-400" href="http://yad.codes">
          http://yad.codes
        </a>
      </div>
      <div className="flex items-center mt-2 space-x-4">
        <i className="fab fa-twitter text-gray-400"></i>
        <span className="text-gray-400">@yadkonrad</span>
      </div>
      <div className="flex flex-wrap justify-start gap-2 mt-4">
        {/* Repeat this for each badge */}
        <img
          alt="Achievement badge"
          className="rounded-md"
          height="40"
          src="https://placehold.co/40x40"
          width="40"
        />
        {/* ... */}
      </div>
    </div>
  </>
);
