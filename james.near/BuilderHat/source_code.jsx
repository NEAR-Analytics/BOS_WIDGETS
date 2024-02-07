const accountId = props.accountId ?? context.accountId;
if (!accountId) {
  return "";
}

const color =
  props.color || Social.get(`${accountId}/badge/builder/${accountId}`);

let isBuilder = props.isBuilder ?? false;

const badgeData =
  props.badgeData ||
  Social.get(`${context.accountId}/badge/builder/${accountId}`) ||
  Social.get(`${accountId}/badge/builder/${accountId}`);

if (badgeData.length > 0 || badgeData === "") {
  isBuilder = true;
}

const colorOptions = {
  yellow: { fill: "#ffd046", stroke: "#f0a957" },
  red: { fill: "#cc3333", stroke: "#FF4500" },
  blue: { fill: "#1E90FF", stroke: "#0000FF" },
  gray: { fill: "#808080", stroke: "#696969" },
  green: { fill: "#32CD32", stroke: "#008000" },
  maroon: { fill: "#800000", stroke: "#660000" },
  purple: { fill: "#8b63d3", stroke: "#4B0082" },
  pink: { fill: "#FFC0CB", stroke: "#FF69B4" },
  white: { fill: "#FFFFFF", stroke: "#888888" },
  black: { fill: "#000000", stroke: "#4F4F4F" },
  rust: { fill: "#f64c00", stroke: "#8B4513" },
  orange: { fill: "#FFA500", stroke: "#FF8C00" },
};

const { fill, stroke } = colorOptions[color] ?? {
  fill: "#808080",
  stroke: "#696969",
};

const content = isBuilder ? (
  <span style={{ verticalAlign: "center" }}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="23"
      height="18"
      viewBox="0 0 173.74 133.808"
    >
      <defs>
        <radialGradient
          id="radialGradient3026-9-1"
          cx="-464.92"
          cy="873.19"
          r="255.59"
          gradientTransform="matrix(-.12273 0 0 .12273 -1807.363 -1063.95)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.5" stopColor={fill} stopOpacity="1"></stop>
          <stop offset="1" stopColor={stroke} stopOpacity="1"></stop>
        </radialGradient>
      </defs>
      <g transform="translate(-333.13 -288.315)">
        <g
          strokeLinejoin="round"
          display="inline"
          transform="matrix(3.77953 0 0 3.77953 7058.318 3939.28)"
        >
          <path
            fill={fill}
            stroke={stroke}
            strokeOpacity="1"
            strokeWidth="1.899"
            d="M-1764.608-935.999s3.8 2.048 9.629 4.077c3.52 1.227 9.773-.843 13.028-1.705 3.26-.865 8.892-2.655 7.33-4.218-1.564-1.562-6.058-4.895-6.058-4.895s4.28 7.066-23.93 6.741z"
          ></path>
          <path
            fill={fill}
            stroke={stroke}
            strokeOpacity="1"
            strokeWidth="1.899"
            d="M-1738.595-941.137c0 2.98-8.916 5.397-19.915 5.397-10.999 0-19.913-2.417-19.913-5.397 2.294-1.663 1.963-3.063 1.963-3.063h35.996s-.32 1.4 1.869 3.062z"
          ></path>
          <path
            fill={fill}
            d="M-1774.271-954.868c.445-1.016 2.17-4.525 5.677-6.995 6.358-4.483 14.242-3.628 18.877-.937 3.133 1.822 5.29 4.17 7 7.618.418.843 1.195 2.64 1.729 5.21.46 2.23.505 3.636.58 5.971 0 1.952-3.707 3.712-10.088 4.569-8.93 1.195-19.723.157-24.103-2.32-1.253-.709-1.845-1.462-1.842-2.197.092-3.017.204-6.435 2.17-10.919z"
          ></path>
          <path
            fill={fill}
            fillOpacity="1"
            stroke={stroke}
            strokeOpacity="1"
            strokeWidth="1.899"
            d="M-1774.271-954.868c.445-1.016 2.17-4.525 5.677-6.995 6.358-4.483 14.242-3.628 18.877-.937 3.133 1.822 5.29 4.17 7 7.618.418.843 1.195 2.64 1.729 5.21.46 2.23.505 3.636.58 5.971 0 1.952-3.707 3.712-10.088 4.569-8.93 1.195-19.723.157-24.103-2.32-1.253-.709-1.845-1.462-1.842-2.197.092-3.017.204-6.435 2.17-10.919z"
          ></path>
          <path
            fill={fill}
            fillOpacity="1"
            stroke={stroke}
            strokeOpacity="1"
            strokeWidth="0.633"
            d="M-1764.757-936.088s3.801 2.044 9.628 4.076c3.52 1.225 9.77-.843 13.026-1.708 3.26-.862 8.894-2.651 7.33-4.218-1.562-1.562-6.054-4.893-6.054-4.893s4.277 7.066-23.93 6.743z"
          ></path>
          <path
            fill={fill}
            fillOpacity="1"
            stroke={stroke}
            strokeOpacity="1"
            strokeWidth="0.633"
            d="M-1738.745-941.227c0 2.98-8.913 5.395-19.914 5.395-10.998 0-19.914-2.414-19.914-5.395 2.295-1.662 1.961-3.062 1.961-3.062h35.999s-.214 1.634 1.973 3.296z"
          ></path>
          <path
            fill={fill}
            d="M-1774.422-954.959c.445-1.015 2.171-4.522 5.677-6.995 6.357-4.483 14.24-3.627 18.877-.936 3.134 1.822 5.291 4.17 7 7.615.418.842 1.197 2.64 1.728 5.212.46 2.228.505 3.635.58 5.967 0 1.952-3.709 3.715-10.09 4.569-8.93 1.199-19.721.157-24.1-2.32-1.254-.709-1.847-1.46-1.844-2.197.096-3.012.208-6.43 2.172-10.915z"
          ></path>
          <path
            fill={fill}
            stroke={stroke}
            strokeWidth="0.633"
            d="M-1774.422-954.959c.445-1.015 2.171-4.522 5.677-6.995 6.357-4.483 14.24-3.627 18.877-.936 3.134 1.822 5.291 4.17 7 7.615.418.842 1.197 2.64 1.728 5.212.46 2.228.505 3.635.58 5.967 0 1.952-3.709 3.715-10.09 4.569-8.93 1.199-19.721.157-24.1-2.32-1.254-.709-1.847-1.46-1.844-2.197.096-3.012.208-6.43 2.172-10.915z"
          ></path>
          <path
            fill="url(#radialGradient3026-9-1)"
            stroke={stroke}
            strokeOpacity="1"
            strokeWidth="1.899"
            d="M-1764.608-935.999s3.8 2.048 9.629 4.077c3.52 1.227 9.773-.843 13.028-1.705 3.26-.865 8.892-2.655 7.33-4.218-1.564-1.562-6.058-4.895-6.058-4.895s4.28 7.066-23.93 6.741z"
          ></path>
          <path
            fill={fill}
            d="M-1767.915-962.626c13.374-8.528 26.947 8.987 26.523 20.234l1.244.502c0-12.26-13.286-30.33-27.767-20.736"
          ></path>
          <path
            fill={fill}
            d="M61.197 281.15L66.729 266.15 76.865 262.06z"
            transform="matrix(-.12273 0 0 .12273 -1731.96 -974.555)"
          ></path>
          <path
            fill={fill}
            fillOpacity="1"
            stroke="none"
            strokeLinecap="round"
            strokeWidth="0.633"
            d="M-1745.35-940.136c0-11.095-6.621-28.383-18.612-24.458 12.858-4.352 23.81 11.568 23.81 22.7l.68 1.842-5.202 1.754-.676-1.837z"
          ></path>
          <path
            fill={fill}
            d="M-1745.349-940.136l.678 1.842-3.05-2.138c.426-11.248-6.82-30.721-20.194-22.196 14.482-9.591 22.566 10.231 22.566 22.493z"
          ></path>
          <path
            fill={fill}
            fillOpacity="1"
            stroke="none"
            strokeLinecap="round"
            strokeWidth="0.633"
            d="M-1745.349-940.136l.678 1.842-3.05-2.138c.426-11.248-6.82-30.721-20.194-22.196 14.482-9.591 22.566 10.231 22.566 22.493z"
          ></path>
          <path
            fill={fill}
            fillOpacity="1"
            stroke={stroke}
            strokeLinecap="round"
            strokeOpacity="1"
            strokeWidth="5.159"
            d="M254.68 222.57L265.49 233.41 267.24 277.31 253.03 251.64z"
            transform="matrix(-.12273 0 0 .12273 -1731.96 -974.555)"
          ></path>
          <path
            d="M322.32 217.4L327.99 223.07 329.73 266.98 320.7 241.3z"
            transform="matrix(-.12273 0 0 .12273 -1731.96 -974.555)"
          ></path>
          <path
            fill={fill}
            fillOpacity="1"
            stroke={stroke}
            strokeLinecap="round"
            strokeOpacity="1"
            strokeWidth="0.633"
            d="M-1764.757-940.521s-7.3-.905-7.667-1.271c-.367-.363.213-5.388.213-5.388l7.67 1.268-.216 5.391z"
          ></path>
          <path
            fill={fill}
            fillOpacity="1"
            stroke={stroke}
            strokeLinecap="round"
            strokeOpacity="1"
            strokeWidth="5.159"
            d="M327.99 223.07L317.16 212.24 254.68 222.57 265.49 233.41z"
            transform="matrix(-.12273 0 0 .12273 -1731.96 -974.555)"
          ></path>
        </g>
      </g>
    </svg>
  </span>
) : (
  ""
);

return (
  <Widget
    loading={content}
    src="mob.near/widget/N.Common.OverlayTrigger"
    props={{
      popup: <div>{color} builder hat</div>,
      children: content,
    }}
  />
);
