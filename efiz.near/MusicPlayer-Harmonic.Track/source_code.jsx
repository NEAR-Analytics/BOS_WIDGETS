const styles = props.styles;
const selected = props.selected || false;
const playSong = props.playSong;
const pauseSong = props.pauseSong;
const song = props.song;

return (
  <div
    style={{
      ...styles.song,
      ...(state.currentSongIndex === i ? styles.selectedSong : {}),
    }}
    key={song.token_id}
    onClick={() => selectSong(i)}
    onMouseOver={(e) => (e.target.style.backgroundColor = "#BFDBFE")} // equivalent to "hover:bg-blue-200" in tailwind
    onMouseOut={
      (e) =>
        state.currentSongIndex !== i &&
        (e.target.style.backgroundColor = "transparent") // reset color on mouse out if not selected song
    }
  >
    {song.title}
  </div>
);
