// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';

// import { Error, Loader, SongCard } from '../components';
// import { selectGenreListId, setActiveSong } from '../redux/features/playerSlice';
// import { mockSongs } from '../mockSongs';

const StyledDiv = styled.div`
  .relative-flex {
    background-color: blue;
    display: flex;
    position: relative;

    .main-body {
      --tw-gradient-to: #121286;
      --tw-gradient-from: #191624;
      --tw-gradient-to: rgb(25 22 36 / 0);
      --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
      background-image: linear-gradient(to bottom right, var(--tw-gradient-stops));
      flex-direction: column;
      flex: 1 1 0%;
      display: flex;

      .body-contents {
        flex-direction: row;
        scrollbar-width: none;
        padding-left: 1.5rem;
        padding-right: 1.5rem;
        overflow-y: scroll;
        height: calc(100vh - 72px);
        display: flex;

        .group1 {
          padding-bottom: 10rem;
          flex: 1 1 0%;
          height: fit-content;

          .inner {
            display: flex;
            flex-direction: column;

            .headings {
              flex-direction: row;
              justify-content: space-between;
              align-items: center;
              width: 100%;
              display: flex;
              margin-bottom: 2.5rem;
              margin-top: 1rem;

              h2 {
                --tw-text-opacity: 1;
                color: rgb(255 255 255 / var(--tw-text-opacity));
                font-weight: 700;
                font-size: 1.875rem;
                line-height: 2.25rem;
                text-align: left;
                margin: 0;
              }

              .dropdown {
                margin-top: 0px;
                outline: 2px solid transparent;
                outline-offset: 2px;
                --tw-text-opacity: 1;
                color: rgb(209 213 219 / var(--tw-text-opacity));
                font-size: 0.875rem;
                line-height: 1.25rem;
                padding: 0.75rem;
                --tw-bg-opacity: 1;
                background-color: rgb(25 22 36 / var(--tw-bg-opacity));
                border-radius: 0.5rem;
                text-transform: none;
                border-width: 0;
                font-weight: inherit;
                font-family: inherit;
              }
            }

            .audio-cards {
              display: flex;
              justify-content: flex-start;
              flex-wrap: wrap;
              gap: 2rem;
            }
          }
        }

        .group2 {
          top: 0px;
          position: sticky;
          height: fit-content;
        }
      }
    }
  }
`;

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
  <StyledDiv>
    <div className="relative-flex">
      <Widget src="abnakore.near/widget/TNESideBar" props={{}} />
      <div className="main-body">
        <Widget src="abnakore.near/widget/TNESearchBar" props={{}} />
        <div className="body-contents">
          <div className="group1">
            <div className="inner">
              <div className="headings">
                <h2 className="font-bold text-3xl text-white text-left">
                  Discover
                </h2>
                <select className="dropdown">
                  <option value="POP">Pop</option>
                  <option value="HIP_HOP_RAP">Hip-Hop</option>
                  <option value="DANCE">Dance</option>
                  <option value="ELECTRONIC">Electronic</option>
                  <option value="SOUL_RNB">Soul</option>
                  <option value="ALTERNATIVE">Alternative</option>
                  <option value="ROCK">Rock</option>
                  <option value="LATIN">Latin</option>
                  <option value="FILM_TV">Film</option>
                  <option value="COUNTRY">Country</option>
                  <option value="WORLDWIDE">Worldwide</option>
                  <option value="REGGAE_DANCE_HALL">Reggae</option>
                  <option value="HOUSE">House</option>
                  <option value="K_POP">K-Pop</option>
                </select>
              </div>
              <div className="audio-cards">
                <Widget src="abnakore.near/widget/TNEAudioCard" props={{}} />
                <Widget src="abnakore.near/widget/TNEAudioCard" props={{}} />
                <Widget src="abnakore.near/widget/TNEAudioCard" props={{}} />
                <Widget src="abnakore.near/widget/TNEAudioCard" props={{}} />
              </div>
            </div>
          </div>
          <div className="group2">
            <div className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col">
              <div className="w-full flex flex-col">
                <div className="flex flex-row justify-between items-center">
                  <h2 className="text-white font-bold text-2xl">Top Charts</h2>
                  <a href="/top-charts">
                    <p className="text-gray-300 text-base cursor-pointer">
                      See more
                    </p>
                  </a>
                </div>
                <div className="mt-4 flex flex-col gap-1"></div>
              </div>
              <div className="w-full flex flex-col mt-8">
                <div className="flex flex-row justify-between items-center">
                  <h2 className="text-white font-bold text-2xl">Top Artists</h2>
                  <a href="/top-artists">
                    <p className="text-gray-300 text-base cursor-pointer">
                      See more
                    </p>
                  </a>
                </div>
                <div className="swiper swiper-initialized swiper-horizontal swiper-pointer-events swiper-free-mode mt-4">
                  <div
                    className="swiper-wrapper"
                    style={{ transitionDuration: "0ms" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </StyledDiv>
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

// <div className="flex flex-col">
//   <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
//     <h2 className="font-bold text-3xl text-white text-left">
//       Discover {genreTitle}
//     </h2>

//     <select
//       onChange={(e) => dispatch(selectGenreListId(e.target.value))}
//       value={genreListId || "pop"}
//       className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
//     >
//       {genres.map((genre) => (
//         <option key={genre.value} value={genre.value}>
//           {genre.title}
//         </option>
//       ))}
//     </select>
//   </div>

//   <div className="flex flex-wrap sm:justify-start justify-center gap-8">
//     {data?.map((song, i) => (
//       <Widget
//         key={song.key}
//         src="abnakore.near/widget/TNESongCard"
//         props={{
//           key: song.key,
//           song: song,
//           isPlaying: isPlaying,
//           activeSong: activeSong,
//           data: data,
//           i: i,
//           onSongClick: () => handleSongClick(song),
//         }}
//       />
//     ))}
//   </div>
// </div>
