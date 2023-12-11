return (
  <div>
    <div id="tabs">
      {/* Render the objs as links */}
      {props.objs.map((obj) => (
        <Link
          key={obj.link}
          to={obj.link}
          className={`tab ${active === obj.link ? "active" : ""}`}
        >
          {obj.name}
        </Link>
      ))}
      {/* <Link to='/' className="tab">Vote Page</Link>
                <Link to='/result' className="tab">Results</Link>
                <Link to='/' className="tab">Login/Logout</Link> */}
    </div>
  </div>
);
