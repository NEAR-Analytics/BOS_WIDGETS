const { className, width, height, currentColor } = props;return <svg
      class={className ?? ""}
      width={width}
      height={height}
      aria-hidden="true"
      focusable="false"
      tabindex="-1"
      viewBox="0 0 24 24"
    ><g><rect fill={fill ?? "currentColor"} height="24" width="24"/></g><g><g><rect height="1.5" width="1.5" x="15" y="14"/><path d="M3,3v18h18V3H3z M6.5,8h3V7h-3V5.5H11V9H8v1h3v1.5H6.5V8z M12.5,18.5H11V14h-1v3H8.5v-3h-1v4.5H6v-6h6.5V18.5z M18,17h-3 v1.5h-1.5v-6H18V17z M18.5,10h-1v1.5H16V10h-3V5.5h1.5v3H16v-3h1.5v3h1V10z"/></g></g></svg>;