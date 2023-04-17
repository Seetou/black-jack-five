import PlayerUI from "../components/PlayerUI";
import ComputerUI from "../components/ComputerUI";
import GameUI from "../components/GameUI";
import styled from "styled-components";
import { useEffect, useContext } from "react";
import { GamePlay } from "../components/GameContext";
import bg from "../images/chips_background.jpg";

const Game = () => {
  return (
    <GameContainer>
      <ComputerUI />
      <GameUI />
      <PlayerUI />
    </GameContainer>
  );
};

export default Game;

const GameContainer = styled.div`
  /* border: 1px solid white;
  background-image: url(${bg});
  background-position: center;
  background-size: cover; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 0.5rem;
  position: relative;
`;
