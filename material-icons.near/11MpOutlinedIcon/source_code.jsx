const { className, width, height, currentColor } = props;return <svg
    class={className ?? ""}
    width={width}
    height={height}
    aria-hidden="true"
    focusable="false"
    tabindex="-1"
    viewBox="0 0 24 24"
  ><g><rect fill={fill ?? "currentColor"} height="24" width="24"/></g><g><g><g><path d="M7.5,14h1v3H10v-3h1v4.5h1.5v-5c0-0.55-0.45-1-1-1H7c-0.55,0-1,0.45-1,1v5h1.5V14z"/></g><g><path d="M13.5,18.5H15V17h2c0.55,0,1-0.45,1-1v-2.5c0-0.55-0.45-1-1-1h-3.5V18.5z M15,14h1.5v1.5H15V14z"/></g><g><path d="M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M19,19H5V5h14V19z"/></g><g><polygon points="9.5,11.5 11,11.5 11,5.5 8,5.5 8,7 9.5,7"/></g><g><polygon points="14.5,11.5 16,11.5 16,5.5 13,5.5 13,7 14.5,7"/></g></g></g></svg>;