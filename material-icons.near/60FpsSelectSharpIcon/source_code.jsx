const { className, width, height, currentColor } = props;return <svg
      class={className ?? ""}
      width={width}
      height={height}
      aria-hidden="true"
      focusable="false"
      tabindex="-1"
      viewBox="0 0 24 24"
    ><g><rect fill={fill ?? "currentColor"} height="24" width="24"/></g><g><g><path d="M18,6v6h-3V6H18z M20,4h-7v10h7V4z M11,6V4H4v10h7V8H6V6H11z M9,10v2H6v-2H9z M5,22H3v-5h2V22z M9,22H7v-5h2V22z M13,22 h-2v-5h2V22z M21,22h-6v-5h6V22z"/></g></g></svg>;