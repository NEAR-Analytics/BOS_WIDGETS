const { className, width, height, currentColor } = props;return <svg
      class={className ?? ""}
      width={width}
      height={height}
      aria-hidden="true"
      focusable="false"
      tabindex="-1"
      viewBox="0 0 24 24"
    ><g><rect fill={fill ?? "currentColor"} height="24" width="24"/></g><g><g><rect height="1.5" width="1.5" x="15" y="14"/><path d="M3,3v18h18V3H3z M12.5,18.5H11V14h-1v3H8.5v-3h-1v4.5H6v-6h6.5V18.5z M11.25,11.5L12.62,7H10V5.5h4.87l-1.87,6H11.25z M18,17h-3v1.5h-1.5v-6H18V17z"/></g></g></svg>;