const { className, width, height, currentColor } = props;return <svg
      class={className ?? ""}
      width={width}
      height={height}
      aria-hidden="true"
      focusable="false"
      tabindex="-1"
      viewBox="0 0 24 24"
    ><g><rect fill={fill ?? "currentColor"} height="24" width="24"/></g><g><path d="M21,3H3v18h18V3z M11,13.5h-1V15H8.5v-1.5h-3V9H7v3h1.5V9H10v3h1V13.5z M14.75,15L13,12.75V15h-1.5V9H13v2.25L14.75,9h1.75 l-2.25,3l2.25,3H14.75z M19,12.5h-1.5V14h-1v-1.5H15v-1h1.5V10h1v1.5H19V12.5z"/></g></svg>;