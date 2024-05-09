const Size = props.size || 20;
return (
  <div style={{ color: props.color }}>
    <svg
      width={Size}
      height={Size * 0.9}
      viewBox="0 0 20 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8.26829 1C9.03809 -0.333333 10.9626 -0.333333 11.7324 1L19.5266 14.5C20.2964 15.8333 19.3342 17.5 17.7946 17.5H2.20611C0.666508 17.5 -0.295742 15.8333 0.474058 14.5L8.26829 1ZM9.00034 7C9.00034 6.44772 9.44805 6 10.0003 6C10.5526 6 11.0003 6.44772 11.0003 7V11C11.0003 11.5523 10.5526 12 10.0003 12C9.44805 12 9.00034 11.5523 9.00034 11V7ZM10.0003 13C9.44805 13 9.00034 13.4477 9.00034 14C9.00034 14.5523 9.44805 15 10.0003 15C10.5526 15 11.0003 14.5523 11.0003 14C11.0003 13.4477 10.5526 13 10.0003 13Z"
        fill="currentColor"
      />
    </svg>
  </div>
);
