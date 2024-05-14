const Wrapper = styled.div`
.aside {
  background-color: #333;
  padding: 10px;
  color: #fff;
  background-color: #333;
  padding: 20px;
  height: 50%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  top: 0;
  left: 0;
  z-index: 100;
}

.aside a {
  color: #fff;
  text-decoration: none;
  margin: 0 10px;
}

.aside #tabs .tab {
  padding: 10px;
  font-size: 16px;
  color: #fff;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.aside #tabs a.active::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 3px;
  background-color: #fff;
  border-radius: 5px 5px 0 0;
}
`;

return (
  <Wrapper>
    <div className="aside card text-center">
      <div id="tabs" className="card-header">
        <ul className="nav nav-tabs card-header-tabs">
          <li class="nav-item">
            <a
              href="https://near.social/abnakore.near/widget/VoteChain"
              className={`nav-item  ${
                active === "https://near.social/abnakore.near/widget/VoteChain"
                  ? "active"
                  : ""
              }`}
            >
              <i class="bi bi-house-fill fs-4"></i>
            </a>
          </li>
          {/* Render the objs as links */}
          {props.objs.map((obj) =>
            obj.type === "button" ? (
              <li key={obj.link} class="nav-item">
                <a
                  class={`nav-link tab ${active === obj.link ? "active" : ""}`}
                  aria-current={active === obj.link}
                  href={obj.link}
                >
                  <button>{obj.name}</button>
                </a>
              </li>
            ) : (
              <li key={obj.link} class="nav-item">
                <a
                  class={`nav-link tab ${active === obj.link ? "active" : ""}`}
                  aria-current={active === obj.link}
                  href={obj.link}
                >
                  {obj.name}
                </a>
              </li>
            )
          )}
        </ul>

        {/* <Link to='/' className="tab">Vote Page</Link>
                    <Link to='/result' className="tab">Results</Link>
                    <Link to='/' className="tab">Login/Logout</Link> */}
      </div>
    </div>
  </Wrapper>
);
//

// .aside {
//   position: fixed;
//   background-color: #333;
//   padding: 20px;
//   height: 50px;
//   width: 100vw;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: space-between;
//   top: 0;
//   left: 0;
//   z-index: 100;
// }
// .aside #tabs {
//   display: flex;
//   flex-direction: row;
//   gap: 20px;
// }
// .aside #tabs .tab {
//   padding: 10px;
//   font-size: 16px;
//   color: #fff;
//   text-align: center;
//   cursor: pointer;
//   transition: background-color 0.3s ease;
// }

// .aside #tabs .tab:hover, .aside #tabs .active {
//   background-color: #555;
// }

// <a href="#">Home</a>
// <a href="#">About</a>
// <a href="#">Services</a>
// <a href="#">Contact</a>
