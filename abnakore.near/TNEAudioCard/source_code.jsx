// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useDispatch } from 'react-redux';

// import PlayPause from './PlayPause';
// import { playPause, setActiveSong } from '../redux/features/playerSlice';

// const SongCard = ({ song, isPlaying, activeSong, data, i }) => {

const StyledCard = styled.div`
    .outer{
        padding: 1rem;
        --tw-bg-opacity: 0.8;
        background-color: rgb(255 255 255 / 0.05);
        border-radius: 0.5rem;
        flex-direction: column;
        animation: slideup 1s ease-in-out;
        width: 250px;
        display: flex;

        --tw-backdrop-blur: blur(4px);
        backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);

        .group1{
            width: 100%;
            height: 14rem;
            position: relative;
            cursor: pointer;

            .play{
                --tw-bg-opacity: 0.5;
                --tw-bg-opacity: 1;
                background-color: rgb(25 22 36 / var(--tw-bg-opacity));
                justify-content: center;
                align-items: center;
                display: none;
                top: 0px;
                right: 0px;
                bottom: 0px;
                left: 0px;
                border-radius: 5px;
                position: absolute;
            }

            img {
                border-radius: 0.5rem;
                width: 100%;
                height: 100%;
                max-width: 100%;
                height: auto;
                display: block;
            }
        }
        .group1:hover {
            .play {
                display: flex;
            }
        }

        .group2{
            flex-direction: column;
            display: flex;
            margin-top: 1rem;

            p {
                --tw-text-opacity: 1;
                color: rgb(255 255 255 / var(--tw-text-opacity));
                font-weight: 600;
                font-size: 1.125rem;
                line-height: 1.75rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                margin: 0;
            }
        }
    }
`;

const song = {
  key: "1",
  title: "Song 1",
  artist: "Artist 1",
  genre: "POP",
  audioFilePath: "audio/1.mp3",
  image: "http://localhost:5173/src/assets/logo.png",
  subtitle: "You",
  // ... other song properties
};

const dispatch = "useDispatch()";

const handlePauseClick = () => {
  dispatch(playPause(false));
};

const handlePlayClick = () => {
  dispatch(setActiveSong({ song, data, i }));
  dispatch(playPause(true));
};

return (
  <StyledCard>
    <div className="outer flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="group1 relative w-full h-56 group">
        <div
          className={`play absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${
            activeSong?.title === song.title
              ? "flex bg-black bg-opacity-70"
              : "hidden"
          }`}
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 512 512"
            class="text-gray-300"
            height="35"
            width="35"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm115.7 272l-176 101c-15.8 8.8-35.7-2.5-35.7-21V152c0-18.4 19.8-29.8 35.7-21l176 107c16.4 9.2 16.4 32.9 0 42z"></path>
          </svg>
          {/*<PlayPause
          isPlaying={isPlaying}
          activeSong={activeSong}
          song={song}
          handlePause={handlePauseClick}
          handlePlay={handlePlayClick}
        />*/}
        </div>
        <img
          alt="song_img"
          src={song.image}
          className="w-full h-full rounded-lg"
        />
      </div>

      <div className="group2 mt-4 flex flex-col">
        <p className="font-semibold text-lg text-white truncate">
          <Link to={`/songs/${song?.key}`}>{song.title}</Link>
        </p>
        <p className="text-sm truncate text-gray-300 mt-1">
          <Link
            to={
              song.artists
                ? `/artists/${song?.artists[0]?.adamid}`
                : "/top-artists"
            }
          >
            {song.subtitle}
          </Link>
        </p>
      </div>
    </div>
  </StyledCard>
);
// };

// export default SongCard;
