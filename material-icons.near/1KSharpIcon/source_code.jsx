const { className, width, height, currentColor } = props;return <svg
      class={className ?? ""}
      width={width}
      height={height}
      aria-hidden="true"
      focusable="false"
      tabindex="-1"
      viewBox="0 0 24 24"
    ><g><rect fill={fill ?? "currentColor"} height="24" width="24"/></g><g><path d="M21,3H3v18h18V3z M10,15H8.5v-4.5H7V9h3V15z M17,15h-1.75l-1.75-2.25V15H12V9h1.5v2.25L15.25,9H17l-2.25,3L17,15z"/></g></svg>;