import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';

const SongCard = ({ song, isPlaying, activeSong, data, i }) => {
  const dispatch = useDispatch();
  const [isSpinning, setIsSpinning] = useState(false);
  const [initialRotation] = useState(0);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  const cardStyle = {
    width: '220px',
    height: '220px',
    overflow: 'hidden',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    transform: `rotate(${isSpinning ? 360 : initialRotation}deg)`,
    justifyContent: 'center',
    transition: 'transform 1s ease-in-out',
    backgroundImage: 'linear-gradient(135deg, #333 50%, #000 50%)',
  };


  const defaultArtist = { name: 'Unknown Artist', adamid: 'unknown' };
  const artist = (song.artists && song.artists[0]) ? song.artists[0] : defaultArtist;

  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div style={cardStyle} onClick={() => setIsSpinning(!isSpinning)} className="relative rounded-full w-[240px] h-[240px] group">
        <div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${activeSong?.title === song.title ? 'flex bg-black bg-opacity-70' : 'hidden'}`}>
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>
        <img alt="song_img" src={song.images?.coverart} className="w-full h-full object-cover rounded-full" />
      </div>

      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-lg text-white truncate">
          <Link to={`/songs/${song?.key}`}>
            {song.title}
          </Link>
        </p>
        <p className="text-sm truncate text-gray-300 mt-1">
          <Link to={`/artists/${artist.adamid}`}>
            {artist.name}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SongCard;
