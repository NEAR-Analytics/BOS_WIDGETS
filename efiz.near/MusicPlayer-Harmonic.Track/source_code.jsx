const styles = props.styles;
const selected = props.selected || false;
const selectSong = props.selectSong;
const song = props.song;

const audioElem = new Audio(song.reference_blob);

return (
  <div
    style={{
      ...styles.song,
      ...(selected ? styles.selectedSong : {}),
    }}
    key={song.token_id}
    onClick={() => selectSong(audioElem)}
    onMouseOver={(e) => (e.target.style.backgroundColor = "#BFDBFE")} // equivalent to "hover:bg-blue-200" in tailwind
    onMouseOut={
      (e) => selected && (e.target.style.backgroundColor = "transparent") // reset color on mouse out if not selected song
    }
  >
    {song.title}
  </div>
);
