const { className, width, height, currentColor } = props;return <svg
      class={className ?? ""}
      width={width}
      height={height}
      aria-hidden="true"
      focusable="false"
      tabindex="-1"
      viewBox="0 0 24 24"
    ><g><rect fill={fill ?? "currentColor"} height="24" width="24"/></g><g><g><g><path d="M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M19,9v6v4H5v-8.5h1V15h1.5V9H5V5 h14V9z"/><polygon points="15.5,11.25 15.5,9 14,9 14,15 15.5,15 15.5,12.75 17.25,15 19,15 16.75,12 19,9 17.25,9"/><path d="M9.5,15H12c0.55,0,1-0.45,1-1v-4c0-0.55-0.45-1-1-1H9.5c-0.55,0-1,0.45-1,1v4C8.5,14.55,8.95,15,9.5,15z M10,10.5h1.5v3 H10V10.5z"/></g></g></g></svg>;