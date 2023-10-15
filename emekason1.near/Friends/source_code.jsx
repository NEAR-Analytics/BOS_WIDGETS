State.init({
  show: false,
});

const handleOnMouseEnter = () => {
  State.update({ show: true });
};
const handleOnMouseLeave = () => {
  State.update({ show: false });
};

const overlay = (
  <div
    className="border left-0 flex justify-center items-center top-0 p-3 blur-3xl w-full"
    style={{
      width: "100%",
      height: "100vh",
      left: "0",
      position: "absolute",
      background: "rgba(255, 255, 255, 0.5)",
      backdropFilter: "blur(3px)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <div
      onClick={handleOnMouseLeave}
      style={{
        height: "100%",
        width: "100%",
        position: "absolute",
        top: "0",
        left: "0",
      }}
    ></div>
    <div
      style={{
        background: "white",
        borderRadius: "20px",
        width: "20rem",
        background: "white",
        borderRadius: "20px",
        zIndex: "100",
        padding: "20px 15px",
        boxShadow: "2px 3px 70px 7px rgba(0,0,0,0.27)",
      }}
    >
      <div
        onClick={handleOnMouseLeave}
        style={{
          marginLeft: "92%",
          display: "flex",
          borderRadius: "50px",
          padding: "3px",
          background: "#F2F2F2",
          width: "25px",
          height: "25px",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "1rem",
          cursor: "pointer",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          aria-hidden="true"
          height="16px"
          width="16px"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </div>
      <div
        style={{
          display: "flex",
          height: "2.5rem",
          border: "1px solid #EBEBEB",
          borderRadius: "5px",
          marginBottom: ".5rem",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          style={{ width: "2rem", marginLeft: "10px" }}
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
          ></path>
        </svg>
        <input
          type="tel"
          placeholder="555 555 555"
          className="focus:oultine-white focus:border-white"
          style={{ border: "0px", width: "90%", paddingLeft: "10px" }}
        />
        <button
          style={{
            borderRadius: "0px 5px 5px 0px",
            background: "#F5F5F5",
            border: "0px",
            color: "#989691",
          }}
        >
          Submit
        </button>
      </div>
      <p
        style={{
          fontSize: "12px",
          color: "rgb(134, 134, 134)",
          marginBottom: "0.8rem",
        }}
      >
        Get started quickly with your phone
      </p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "10px",
        }}
      >
        <div
          style={{
            borderWidth: "0.01rem",
            width: "8rem",
            borderStyle: "solid",
            borderColor: "#F1F1F1",
          }}
        ></div>
        <p
          style={{
            display: "block",
            margin: "2px 4px 0px 4px",
            color: "rgb(134, 134, 134)",
          }}
        >
          Or
        </p>
        <div
          style={{
            borderWidth: "0.01rem",
            width: "8rem",
            borderStyle: "solid",
            borderColor: "#F1F1F1",
          }}
        ></div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button
          style={{ width: "48%", background: "white", borderColor: "#EFEFEF" }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.255H17.92C17.665 15.63 16.89 16.795 15.725 17.575V20.335H19.28C21.36 18.42 22.56 15.6 22.56 12.25Z"
              fill="#4285F4"
            ></path>
            <path
              d="M12 23C14.97 23 17.46 22.015 19.28 20.335L15.725 17.575C14.74 18.235 13.48 18.625 12 18.625C9.13504 18.625 6.71004 16.69 5.84504 14.09H2.17004V16.94C3.98004 20.535 7.70004 23 12 23Z"
              fill="#34A853"
            ></path>
            <path
              d="M5.845 14.09C5.625 13.43 5.5 12.725 5.5 12C5.5 11.275 5.625 10.57 5.845 9.91V7.06H2.17C1.4 8.59286 0.999321 10.2846 1 12C1 13.775 1.425 15.455 2.17 16.94L5.845 14.09Z"
              fill="#FBBC05"
            ></path>
            <path
              d="M12 5.375C13.615 5.375 15.065 5.93 16.205 7.02L19.36 3.865C17.455 2.09 14.965 1 12 1C7.70004 1 3.98004 3.465 2.17004 7.06L5.84504 9.91C6.71004 7.31 9.13504 5.375 12 5.375Z"
              fill="#EA4335"
            ></path>
          </svg>
        </button>
        <button
          style={{ width: "48%", background: "white", borderColor: "#EFEFEF" }}
        >
          <svg
            fill="#000000"
            width="24"
            height="24"
            viewBox="-52.01 0 560.035 560.035"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path d="M380.844 297.529c.787 84.752 74.349 112.955 75.164 113.314-.622 1.988-11.754 40.191-38.756 79.652-23.343 34.117-47.568 68.107-85.731 68.811-37.499.691-49.557-22.236-92.429-22.236-42.859 0-56.256 21.533-91.753 22.928-36.837 1.395-64.889-36.891-88.424-70.883-48.093-69.53-84.846-196.475-35.496-282.165 24.516-42.554 68.328-69.501 115.882-70.192 36.173-.69 70.315 24.336 92.429 24.336 22.1 0 63.59-30.096 107.208-25.676 18.26.76 69.517 7.376 102.429 55.552-2.652 1.644-61.159 35.704-60.523 106.559M310.369 89.418C329.926 65.745 343.089 32.79 339.498 0 311.308 1.133 277.22 18.785 257 42.445c-18.121 20.952-33.991 54.487-29.709 86.628 31.421 2.431 63.52-15.967 83.078-39.655"></path>
            </g>
          </svg>
        </button>
      </div>
      <div
        style={{
          margin: "0 auto",
          display: "flex",
          width: "fit-content",
          marginTop: "10px",
          cursor: "pointer",
        }}
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="hide-on-mobile"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M2.37126 11.0323C2.37126 12.696 3.90598 13.4421 5.40654 13.4468C8.91753 13.4468 12.8021 11.2897 12.7819 7.67984C12.7673 5.07728 10.3748 2.86167 7.54357 2.88296C4.8495 2.88296 2.21821 4.6411 2.21803 7.03628C2.21803 7.67951 2.58722 8.30178 3.55231 8.37184C2.74763 9.16826 2.37126 10.1225 2.37126 11.0323ZM7.55283 8.68012C8.11562 8.68012 8.57186 8.13217 8.57186 7.45624C8.57186 6.78032 8.11562 6.23237 7.55283 6.23237C6.99003 6.23237 6.53379 6.78032 6.53379 7.45624C6.53379 8.13217 6.99003 8.68012 7.55283 8.68012ZM10.4747 8.68012C11.0375 8.68012 11.4937 8.13217 11.4937 7.45625C11.4937 6.78032 11.0375 6.23237 10.4747 6.23237C9.91186 6.23237 9.45562 6.78032 9.45562 7.45625C9.45562 8.13217 9.91186 8.68012 10.4747 8.68012Z"
            fill="#909090"
          ></path>
        </svg>
        <p style={{ fontSize: "10px", color: "#909090", marginLeft: "3px" }}>
          Protected by privy
        </p>
      </div>
    </div>
  </div>
);

return (
  <div
    style={{
      width: "100%",
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <div
      style={{
        width: "70%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "22px 0",
      }}
    >
      <img
        style={{ width: "8rem", margin: "10px" }}
        src="https://www.friend.tech/friendtechlogo.png"
        alt="Friends.tech Logo"
      />
      <h2 style={{ fontSize: "18px" }}>
        <p
          style={{ display: "inline", color: "#00BAFA", marginBottom: "50px" }}
        >
          friend.
        </p>
        tech
      </h2>
      <p style={{ fontSize: "14px", color: "rgb(134, 134, 134)" }}>
        The marketplace for your friends
      </p>
      <div style={{ justifySelf: "end", marginTop: "26vh" }}>
        <OverlayTrigger
          show={state.show}
          trigger={["click", "focus"]}
          delay={{ show: 250, hide: 300 }}
          placement="absolute"
          overlay={overlay}
        >
          <button
            style={{
              width: "20rem",
              background: "#00BAFA",
              border: "0px",
              display: "block",
              borderRadius: "100px",
              padding: "12px",
              marginBottom: "16px",
            }}
            onClick={handleOnMouseEnter}
          >
            Sign In
          </button>
        </OverlayTrigger>
        <a
          href="*"
          style={{
            fontSize: "14px",
            margin: "0 auto",
            color: "rgb(134, 134, 134)",
            textAlign: "center",
            display: "block",
          }}
        >
          Check out our privacy policy →
        </a>
      </div>
    </div>
  </div>
);
