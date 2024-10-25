import React, { useState } from 'react';

const RegisterPlayer: React.FC = () => {
  const [playerName, setPlayerName] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerName(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Player Name:', playerName);
    // Here you can add logic to send the player name to the server
  };

  return (
    <div>
      <h1>Register New Player</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={playerName}
          onChange={handleInputChange}
          placeholder="Enter player name"
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPlayer;
