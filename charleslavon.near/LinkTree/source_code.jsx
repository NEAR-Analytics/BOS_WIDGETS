const linktree = Object.entries(props.linktree ?? {});


const LittleLinkSVG = styled.svg`<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="48" height="48" rx="16" fill="url(#paint0_linear_612_446)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.87868 21.3535C8.70711 22.525 8.70711 24.4245 9.87868 25.5961L10.0377 25.7551C11.2092 26.9267 13.1087 26.9267 14.2803 25.7551L24.331 15.7044L28.4498 19.8232C29.6214 20.9947 31.5209 20.9947 32.6924 19.8232L32.8514 19.6642C34.023 18.4926 34.023 16.5931 32.8514 15.4215L26.5302 9.10026C25.98 8.55012 25.2694 8.25831 24.549 8.22483C23.6891 8.14312 22.8006 8.43151 22.1422 9.08998L9.87868 21.3535Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M38.699 26.4081C39.8705 25.2366 39.8705 23.3371 38.699 22.1655L38.54 22.0065C37.3684 20.8349 35.4689 20.8349 34.2973 22.0065L24.2467 32.0571L20.1281 27.9385C18.9565 26.7669 17.057 26.7669 15.8854 27.9385L15.7264 28.0975C14.5549 29.269 14.5549 31.1685 15.7264 32.3401L22.0477 38.6614C22.598 39.2117 23.309 39.5035 24.0297 39.5369C24.8892 39.6183 25.7772 39.3298 26.4355 38.6716L38.699 26.4081Z" fill="white"/>
<defs>
<linearGradient id="paint0_linear_612_446" x1="-24.24" y1="24.48" x2="24.72" y2="72.96" gradientUnits="userSpaceOnUse">
<stop stop-color="#4899F7"/>
<stop offset="1" stop-color="#2457F5"/>
</linearGradient>
</defs>
</svg>`;

const Icon = styled.img`
  padding: 0px 8px 3.5px 0px;
  vertical-align: middle;
  width: 20px;
  height: 20px;
`

const linktreeElements = {
  website: {
    prefix: "https://",
    icon: "bi-globe2",
  },
  github: {
    prefix: "https://github.com/",
    icon: "bi-github",
  },
  twitter: {
    prefix: "https://twitter.com/",
    icon: "bi-twitter",
  },
  telegram: {
    prefix: "https://t.me/",
    icon: "bi-telegram",
  },
};

const linktreeObjects = linktree.map((o, i) => {
  const key = o[0];
  let value = o[1];
  if (!value) {
    return null;
  }
  const e = linktreeElements[key];
  if (e.prefix) {
    value = value && value.replace(e.prefix, "");
  }
  const icon = e.icon ? (
    <i className={`bi ${e.icon ?? ""} text-secondary me-1`}></i>
  ) : (
    ""
  );
  return e.prefix ? (
    <div key={i}>
      <a  class="button button-default" target="_blank" href={`${e.prefix}${value}`}>
        {icon}
        {value}
      </a>
    </div>
  ) : (
    <div key={i}>
      {key}: {icon}
      {value}
    </div>
  );
});

return <>{linktreeObjects}</>;
