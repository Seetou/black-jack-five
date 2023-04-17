import Form from "../components/Form";
import StartGame from "../components/StartGame";
import styled from "styled-components";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../components/AppContext";
import { GamePlay } from "../components/GameContext";

const Home = () => {
  const { startgame } = useContext(GlobalContext);

  return (
    <HomeContainer>
      {startgame && <StartGame />}
      {!startgame && <Form />}
    </HomeContainer>
  );
};

export default Home;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;
