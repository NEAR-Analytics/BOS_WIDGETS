const { className, width, height, currentColor } = props;return <svg
      class={className ?? ""}
      width={width}
      height={height}
      aria-hidden="true"
      focusable="false"
      tabindex="-1"
      viewBox="0 0 24 24"
    ><g><rect fill={fill ?? "currentColor"} height="24" width="24"/></g><g><path d="M21,11h-1.5v-0.5h-2v3h2V13H21v2h-5V9h5V11z M8,9v6H6.5v-1.5h-2V15H3V9H8z M6.5,10.5h-2V12h2V10.5z M13.5,12 c0.55,0,1,0.45,1,1v1c0,0.55-0.45,1-1,1h-4V9h4c0.55,0,1,0.45,1,1v1C14.5,11.55,14.05,12,13.5,12z M11,10.5v0.75h2V10.5H11z M13,12.75h-2v0.75h2V12.75z"/></g></svg>;