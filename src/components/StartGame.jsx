import { useContext } from "react";
import styled from "styled-components";
import image from "../images/home-black-jack.png";
import { GlobalContext } from "./AppContext";
import Logo from "./Logo";

const StartGame = () => {
  const { setStartGame } = useContext(GlobalContext);

  return (
    <StartGameContainer>
      <Logo />
      <img src={image} alt="black Jack card" />
      <button
        onClick={() => {
          setStartGame(false);
        }}
      >
        Start game
      </button>
    </StartGameContainer>
  );
};

export default StartGame;

const StartGameContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90vw;
  height: 100vh;
  margin: 0 auto;
  gap: 4rem;

  img {
    width: 100%;
  }

  button {
    background: var(--primary-clr);
    color: white;
    padding: 1rem 3rem;
    width: 100%;

    &:hover {
      background: var(--secondary-clr);
    }
  }

  @media (max-width: 37.438em) {
    img {
      width: 50%;
    }

    button {
      width: 60%;
    }
  }

  @media (min-width: 37.5em) and (max-width: 56.25em) {
    img {
      width: 50%;
    }
    button {
      width: 40%;
    }
  }

  @media (min-width: 56.313em) {
    gap: 4rem;

    margin: 0;
    img {
      width: 30%;
    }
    button {
      width: 40%;
      padding: 1rem 2rem;
      font-size: 2rem;
    }
  }
`;
