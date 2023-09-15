const Size = props.size || 50;
const color = props.color || "#22C134";

return (
  <svg
    width={Size}
    height={Size}
    viewBox="0 0 50 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_d_2364_2859)">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M25 34C29.9706 34 34 29.9706 34 25C34 20.0294 29.9706 16 25 16C20.0294 16 16 20.0294 16 25C16 29.9706 20.0294 34 25 34ZM30.2071 22.7071C30.5976 22.3166 30.5976 21.6834 30.2071 21.2929C29.8166 20.9024 29.1834 20.9024 28.7929 21.2929L24 26.0858L21.7071 23.7929C21.3166 23.4024 20.6834 23.4024 20.2929 23.7929C19.9024 24.1834 19.9024 24.8166 20.2929 25.2071L24 28.9142L30.2071 22.7071Z"
        fill={color}
      />
    </g>
  </svg>
);
