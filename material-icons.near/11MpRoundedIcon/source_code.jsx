const { className, width, height, currentColor } = props;return <svg
    class={className ?? ""}
    width={width}
    height={height}
    aria-hidden="true"
    focusable="false"
    tabindex="-1"
    viewBox="0 0 24 24"
  ><g><rect fill={fill ?? "currentColor"} height="24" width="24"/></g><g><g><path d="M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M8.75,5.5H10c0.55,0,1,0.45,1,1 v4.25c0,0.41-0.34,0.75-0.75,0.75S9.5,11.16,9.5,10.75V7H8.75C8.34,7,8,6.66,8,6.25S8.34,5.5,8.75,5.5z M12.5,17.75 c0,0.41-0.34,0.75-0.75,0.75S11,18.16,11,17.75V14h-1v2.25C10,16.66,9.66,17,9.25,17S8.5,16.66,8.5,16.25V14h-1v3.75 c0,0.41-0.34,0.75-0.75,0.75S6,18.16,6,17.75V13.5c0-0.55,0.45-1,1-1h4.5c0.55,0,1,0.45,1,1V17.75z M13,6.25 c0-0.41,0.34-0.75,0.75-0.75H15c0.55,0,1,0.45,1,1v4.25c0,0.41-0.34,0.75-0.75,0.75s-0.75-0.34-0.75-0.75V7h-0.75 C13.34,7,13,6.66,13,6.25z M18,16c0,0.55-0.45,1-1,1h-2v0.75c0,0.41-0.34,0.75-0.75,0.75s-0.75-0.34-0.75-0.75V13.5 c0-0.55,0.45-1,1-1H17c0.55,0,1,0.45,1,1V16z"/><rect height="1.5" width="1.5" x="15" y="14"/></g></g></svg>;