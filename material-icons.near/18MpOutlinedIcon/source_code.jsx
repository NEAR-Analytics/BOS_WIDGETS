const { className, width, height, currentColor } = props;return <svg
      class={className ?? ""}
      width={width}
      height={height}
      aria-hidden="true"
      focusable="false"
      tabindex="-1"
      viewBox="0 0 24 24"
    ><g><rect fill={fill ?? "currentColor"} height="24" width="24"/></g><g><g><path d="M7.5,14h1v3H10v-3h1v4.5h1.5v-5c0-0.55-0.45-1-1-1H7c-0.55,0-1,0.45-1,1v5h1.5V14z"/><path d="M13.5,18.5H15V17h2c0.55,0,1-0.45,1-1v-2.5c0-0.55-0.45-1-1-1h-3.5V18.5z M15,14h1.5v1.5H15V14z"/><path d="M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M19,19H5V5h14V19z"/><polygon points="8.5,11.5 10,11.5 10,5.5 7,5.5 7,7 8.5,7"/><path d="M13,11.5h2.5c0.55,0,1-0.45,1-1v-4c0-0.55-0.45-1-1-1H13c-0.55,0-1,0.45-1,1v4C12,11.05,12.45,11.5,13,11.5z M13.5,6.5H15 V8h-1.5V6.5z M13.5,9H15v1.5h-1.5V9z"/></g></g></svg>;