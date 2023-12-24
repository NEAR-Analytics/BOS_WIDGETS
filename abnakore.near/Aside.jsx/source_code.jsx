const Wrapper = styled.div`

.aside {
  position: fixed;
  background-color: #333;
  padding: 20px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  top: 0;
  left: 0;
}
.aside #tabs {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.aside #tabs .tab {
  padding: 10px;
  font-size: 16px;
  color: #fff;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.aside #tabs .tab:hover, .aside #tabs .active {
  background-color: #555;
}

`;

return (
  <Wrapper>
    <div className="aside">
      <div id="tabs">
        {/* Render the objs as links */}
        {props.objs.map((obj) => (
          <a
            key={obj.link}
            href={obj.link}
            className={`tab ${active === obj.link ? "active" : ""}`}
          >
            {obj.name}
          </a>
        ))}
        {/* <Link to='/' className="tab">Vote Page</Link>
                    <Link to='/result' className="tab">Results</Link>
                    <Link to='/' className="tab">Login/Logout</Link> */}
      </div>
    </div>
  </Wrapper>
);
