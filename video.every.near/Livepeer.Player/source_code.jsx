return (
  <LivepeerPlayer
    title={props.title}
    playbackId={props.playbackId}
    poster={props.PosterImage || <></>}
    showPipButton={props.showPipButton && true}
    objectFit={props.objectFit || "cover"}
    priority={props.priority && true}
    {...props}
  />
);
