// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';

// import { Error, Loader, SongCard } from '../components';
// import { selectGenreListId, setActiveSong } from '../redux/features/playerSlice';
// import { mockSongs } from '../mockSongs';
const mockSongs = [
  {
    key: "1",
    title: "Song 1",
    artist: "Artist 1",
    genre: "POP",
    audioFilePath: "audio/1.mp3",
    // ... other song properties
  },
  {
    key: "2",
    title: "Song 2",
    artist: "Artist 2",
    genre: "HIP_HOP_RAP",
    audioFilePath: "audio/2.mp3",
    // ... other song properties
  },
  {
    key: "3",
    title: "Song 3",
    artist: "Artist 3",
    genre: "HIP_HOP_RAP",
    audioFilePath: "audio/3.mp3",
    // ... other song properties
  },
  {
    key: "4",
    title: "Song 4",
    artist: "Artist 4",
    genre: "POP",
    audioFilePath: "audio/4.mp3", // Corrected from 'udioFilePath' to 'audioFilePath'
    // ... other song properties
  },
  // Add more sample songs as needed
];
// import { genres } from '../assets/constants';

const genres = [
  { title: "Pop", value: "POP" },
  { title: "Hip-Hop", value: "HIP_HOP_RAP" },
  { title: "Dance", value: "DANCE" },
  { title: "Electronic", value: "ELECTRONIC" },
  { title: "Soul", value: "SOUL_RNB" },
  { title: "Alternative", value: "ALTERNATIVE" },
  { title: "Rock", value: "ROCK" },
  { title: "Latin", value: "LATIN" },
  { title: "Film", value: "FILM_TV" },
  { title: "Country", value: "COUNTRY" },
  { title: "Worldwide", value: "WORLDWIDE" },
  { title: "Reggae", value: "REGGAE_DANCE_HALL" },
  { title: "House", value: "HOUSE" },
  { title: "K-Pop", value: "K_POP" },
];
// const Discover = () => {
const dispatch = "useDispatch()";
const { genreListId } = "useSelector((state) => state.player)";
const { activeSong, isPlaying } = "useSelector((state) => state.player)";

// Replace the OpenAI query with the mockSongs data
const data = mockSongs;

const genreTitle = genres.find(({ value }) => value === genreListId)?.title;

const handleSongClick = (song) => {
  // Adjust the audio file path based on your project structure
  const audioFilePath = `/${song.audioFilePath}`;
  dispatch(setActiveSong({ song: { ...song, audioFilePath }, data, i }));
};

return (
  <div className="flex flex-col">
    <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
      <h2 className="font-bold text-3xl text-white text-left">
        Discover {genreTitle}
      </h2>

      <select
        onChange={(e) => dispatch(selectGenreListId(e.target.value))}
        value={genreListId || "pop"}
        className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
      >
        {genres.map((genre) => (
          <option key={genre.value} value={genre.value}>
            {genre.title}
          </option>
        ))}
      </select>
    </div>

    <div className="flex flex-wrap sm:justify-start justify-center gap-8">
      {data?.map((song, i) => (
        <Widget
          key={song.key}
          src="abnakore.near/widget/TNESongCard"
          props={{
            key: song.key,
            song: song,
            isPlaying: isPlaying,
            activeSong: activeSong,
            data: data,
            i: i,
            onSongClick: () => handleSongClick(song),
          }}
        />
      ))}
    </div>
  </div>
);
// };
//  <SongCard
//           key={song.key}
//           song={song}
//           isPlaying={isPlaying}
//           activeSong={activeSong}
//           data={data}
//           i={i}
//           onSongClick={() => handleSongClick(song)}
//         />
// export default Discover;
