const slides = [
  "https://res.cloudinary.com/ndaxio/image/upload/dpr_auto,f_auto/frontend/pages/learn/background/near.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyWpRR6zZvRjQQHP5tLByQSpEmguBpB4sTEA&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCsqcBjSpq5DKshv90G8njiUoxJan4L5WrBg&s",
];
const features = [
  {
    title: "Web3 Integration",
    text: "Dive into the world of decentralized music distribution, ownership, and royalties.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgojW_K8hcGSWYGd8X8VU8zBofkCWLrmw1mg&s",
  },
  {
    title: "Creative Collaboration",
    text: "Connect with fellow musicians, producers, and creators to collaborate on projects in real-time.",
    image:
      "https://cryptonomist.ch/wp-content/uploads/2024/03/near-protocol.jpg",
  },
  {
    title: "Educational Resources",
    text: "Learn about blockchain technology, smart contracts, and how they're revolutionizing the music industry.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgojW_K8hcGSWYGd8X8VU8zBofkCWLrmw1mg&s",
  },
  {
    title: "Immersive Experiences",
    text: "Experience music in entirely new ways through virtual reality concerts, augmented reality music videos, and interactive live streams.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ60t12phs3VEF_7fQ99f10_wO6B_0vlHqIUg&s",
  },
];
const events = [
  {
    title: "Web3 Music Summit",
    desc: "Join industry leaders, artists, and developers for a two-day summit exploring the future of music in the Web3 ecosystem.",
    link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgojW_K8hcGSWYGd8X8VU8zBofkCWLrmw1mg&s",
  },
  {
    title: "Virtual Reality Concert Series",
    desc: "Immerse yourself in unforgettable musical performances from the comfort of your own home.",
    link: "https://cryptonomist.ch/wp-content/uploads/2024/03/near-protocol.jpg",
  },
];
const socials = [
  {
    title: "X",
    icon: (
      <svg height="24" width="24" viewBox="0 0 448 512">
        <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm297.1 84L257.3 234.6 379.4 396H283.8L209 298.1 123.3 396H75.8l111-126.9L69.7 116h98l67.7 89.5L313.6 116h47.5zM323.3 367.6L153.4 142.9H125.1L296.9 367.6h26.3z" />
      </svg>
    ),
    link: "https://twitter.com",
  },
  {
    title: "Facebook",
    icon: (
      <svg height="24" width="24" viewBox="0 0 448 512">
        <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64h98.2V334.2H109.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H255V480H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64z" />
      </svg>
    ),
    link: "https://facebook.com",
  },
  {
    title: "Telegram",
    icon: (
      <svg width="24" height="24" viewBox="0 0 496 512">
        <path d="M248 8C111 8 0 119 0 256S111 504 248 504 496 393 496 256 385 8 248 8zM363 176.7c-3.7 39.2-19.9 134.4-28.1 178.3-3.5 18.6-10.3 24.8-16.9 25.4-14.4 1.3-25.3-9.5-39.3-18.7-21.8-14.3-34.2-23.2-55.3-37.2-24.5-16.1-8.6-25 5.3-39.5 3.7-3.8 67.1-61.5 68.3-66.7 .2-.7 .3-3.1-1.2-4.4s-3.6-.8-5.1-.5q-3.3 .7-104.6 69.1-14.8 10.2-26.9 9.9c-8.9-.2-25.9-5-38.6-9.1-15.5-5-27.9-7.7-26.8-16.3q.8-6.7 18.5-13.7 108.4-47.2 144.6-62.3c68.9-28.6 83.2-33.6 92.5-33.8 2.1 0 6.6 .5 9.6 2.9a10.5 10.5 0 0 1 3.5 6.7A43.8 43.8 0 0 1 363 176.7z" />
      </svg>
    ),
    link: "https://t.me",
  },
];

return (
  <div className="w-100 h-100">
    <div className="header">
      <div
        dataBsVersion="5.1"
        className="menu menu1 cid-sQaxniv33D"
        once="menu"
        id="menu1-k"
      >
        <div className="navbar navbar-dropdown navbar-expand-lg">
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              dataToggle="collapse"
              dataBsToggle="collapse"
              dataTarget="#navbarSupportedContent"
              dataBsTarget="#navbarSupportedContent"
              ariaControls="navbarNavAltMarkup"
              ariaExpanded="false"
              ariaLabel="Toggle navigation"
            >
              <div className="hamburger">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </button>

            <div className="navbar-brand">
              <span className="navbar-caption-wrap">
                <a className="navbar-caption text-black display-5" href="#">
                  <img
                    src="https://tnesociety.com/wp-content/uploads/2024/04/cropped-cropped-cropped-tne.jpg"
                    alt="..."
                    width="62px"
                    height="62px"
                  />
                </a>
              </span>
            </div>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul
                className="navbar-nav nav-dropdown"
                data-app-modern-menu="true"
              >
                <li className="nav-item">
                  <a className="nav-link link text-black display-4" href="#">
                    About us
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link link text-black display-4" href="#">
                    Events
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link link text-black display-4" href="#">
                    Announcements
                  </a>
                </li>
              </ul>

              <div className="navbar-buttons mbr-d-btn">
                <a className="btn btn-primary display-7" href="#">
                  Les't Talk
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div
        id="carouselExampleInterval"
        className="carousel slide w-100"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          {slides.map((slide, i) => (
            <div class={`carousel-item ${i === 0 ? "active" : ""}`}>
              <img src={slide} className="d-block w-100" alt="..." />
              <div
                className="position-absolute top-0 left-0 w-100 h-100 bg-dark"
                style={{ opacity: 0.7 }}
              ></div>
            </div>
          ))}
          <div
            className="carousel-caption d-none d-md-block w-100 h-100"
            style={{ display: "flex", left: 0, top: 0, placeContent: "center" }}
          >
            <h2 className="fw-bold fs-1">Welcome To TNE!</h2>
            <p className="fw-medium fs-6 text-wrap">
              Where Music Meets Web3 in NEAR Ecosystem.
            </p>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
    <div className="features mt-3">
      <div className="container">
        <h2 className="h2">Explore Our Features:</h2>
        <div className="row">
          {features.map((feature) => (
            <div className="col-md-6 mt-2">
              <div className="card">
                <img src={feature.image} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{feature.title}</h5>
                  <p className="card-text">{feature.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <div className="events mt-3">
      <div className="container">
        <div className="card list-group">
          <h5 className="card-header">Upoming Events:</h5>
          <div className="accordion" id="eventsAccordion">
            {events.map((event, i) => (
              <div className="accordion-item">
                <h2 class={`accordion-header ${i > 0 ? "collapsed" : ""}`}>
                  <button
                    class={`accordion-button bg-light`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse${i}`}
                    aria-expanded={i > 0 ? "false" : "true"}
                    aria-controls={`collapse${i}`}
                  >
                    {event.title}
                  </button>
                </h2>
                <div
                  id={`collapse${i}`}
                  class={`accordion-collapse collapse ${i < 1 ? "show" : ""}`}
                  data-bs-parent="#eventsAccordion"
                >
                  <div className="accordion-body">{event.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    <div className="card text-center mt-3">
      <div className="card-body">
        <h5 className="card-title">Join Our Community:</h5>
        <p className="card-text">
          Become a part of our vibrant community of music enthusiasts,
          technologists, and visionaries.
        </p>
        {socials.map((media) => (
          <a href={media.link}>{media.icon}</a>
        ))}
      </div>
    </div>
    <div className="container">
      <div className="py-5">
        <div className="row">
          <div className="col-6 col-md-2 mb-3">
            <h5>About Us</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-muted">
                  Mission Statement
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-muted">
                  Our Team
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-muted">
                  Membership
                </a>
              </li>
            </ul>
          </div>

          <div className="col-6 col-md-2 mb-3">
            <h5>Events</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-muted">
                  Upcoming Events
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-muted">
                  Past Events
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-muted">
                  Events Calender
                </a>
              </li>
            </ul>
          </div>

          <div className="col-6 col-md-2 mb-3">
            <h5>Resources</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-muted">
                  Scholarships
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-muted">
                  Music Education
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-muted">
                  Publications
                </a>
              </li>
            </ul>
          </div>

          <div className="col-6 col-md-2 mb-3">
            <h5>Connect</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-muted">
                  Contact Us
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-muted">
                  Support
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-muted">
                  Social Media
                </a>
              </li>
            </ul>
          </div>

          <div className="col-md-5 offset-md-1 mb-3">
            <div>
              <h5>Subscribe to our newsletter</h5>
              <p>Monthly digest of what's new and exciting from us.</p>
              <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                <label for="newsletter1" className="visually-hidden">
                  Email address
                </label>
                <input
                  id="newsletter1"
                  type="email"
                  className="form-control"
                  placeholder="Email address"
                />
                <button className="btn btn-primary" type="button">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
          <p>© 2024 TNE, Inc. All rights reserved.</p>
          <ul className="list-unstyled d-flex">
            {socials.map((media) => (
              <li className="ms-3">
                <a className="link-dark" href={media.link}>
                  {media.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </div>
);
