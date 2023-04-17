import styled from "styled-components";
import { useContext, useEffect } from "react";
import { GamePlay } from "./GameContext";
import { useNavigate } from "react-router-dom";

const GameUI = () => {
  const {
    itsFirstHand,
    setItsFirstHand,
    isPlayerTurn,
    setIsPlayerTurn,
    drawNewCard,
    state,
    loading,
    checkWinner,
    endMatch,
    winner,
    getNewDeck,
    computer_random_name,
    setPlayerStand,
    computerStand,
    playerStand,
    setComputerStand,
    quitGame,
    continueGame,
    handleGain,
    gameOver,
    setGameOver,
  } = useContext(GamePlay);
  const navigate = useNavigate();

  useEffect(() => {
    getNewDeck();
  }, []);

  useEffect(() => {
    if (playerStand && computerStand) {
      checkWinner();
    }
  }, [playerStand, computerStand]);

  useEffect(() => {
    if (state.player.score > 21) {
      setPlayerStand(true);
      setComputerStand(true);
      setIsPlayerTurn(false);
    }
  }, [state.player.score]);

  useEffect(() => {
    handleGain();
  }, [winner]);

  useEffect(() => {
    if (
      state.player.chips_value < state.player.init_bet ||
      state.computer.chips_value < state.computer.init_bet
    )
      setGameOver(true);
  }, [state.player.chips_value, state.computer.chips_value]);

  return (
    <GameUIContainer>
      <div className="dealer_profile">
        <img src={computer_random_name.profile} alt="" />
      </div>
      {/* IT'S PLAYER FIRST DRAW */}
      {itsFirstHand && isPlayerTurn && !endMatch && !gameOver && (
        <>
          <h3>{`Hello ${state.player.pseudo}, am ${state.computer.pseudo}. Click the button bellow to start. Good Luck!`}</h3>
          <div className="UI__buttons">
            <button
              onClick={() => {
                drawNewCard();
                setItsFirstHand(false);
                setIsPlayerTurn(false);
                setPlayerStand(false);
              }}
            >
              Draw
            </button>
          </div>
        </>
      )}
      {/* --------------------------------------------------------------------- */}
      {/* WAITING FOR COMPUTER */}
      {!isPlayerTurn && !endMatch && !gameOver && (
        <>
          <h3>Please wait for your turn</h3>
          <div className="spinner-loader"></div>
        </>
      )}
      {/* -------------------------------------------------------------------- */}

      {/* IT'S PLAYER TURN */}
      {!itsFirstHand && !loading && isPlayerTurn && !endMatch && !gameOver && (
        <>
          <h3>{`It's your turn ${state.player.pseudo}. You can stand or draw a new card.`}</h3>
          <div className="UI__buttons">
            <button
              onClick={() => {
                setIsPlayerTurn(false);
                setPlayerStand(true);
              }}
            >
              stand
            </button>
            <button
              onClick={() => {
                drawNewCard();
                setIsPlayerTurn(false);
              }}
            >
              draw
            </button>
          </div>
        </>
      )}
      {/* ---------------------------------------------------------- */}
      {/* IT'S END OF MATCH PLAYER WIN */}
      {winner === "player" && endMatch && !gameOver && (
        <h3>{`🎉 Congratulations ${state.player.pseudo}. You win! Do you want to continue?`}</h3>
      )}
      {/* ---------------------------------------------------------- */}
      {/* IT'S END OF MATCH PLAYER LOSE */}
      {winner === "computer" && endMatch && !gameOver && (
        <h3>{`😢 Sorry ${state.player.pseudo}. You lose! Do you want to continue?`}</h3>
      )}
      {/* ---------------------------------------------------------- */}
      {/* IT'S END OF MATCH NO WINNER */}
      {winner === "draw" && endMatch && !gameOver && (
        <h3>{`🤜🤛 It's a draw! Do you want to continue?`}</h3>
      )}
      {/* ---------------------------------------------------------- */}
      {/* IT'S END OF MATCH BUTTONS */}
      {winner && endMatch && !gameOver && (
        <>
          <div className="UI__buttons">
            <button
              onClick={() => {
                quitGame();
                navigate("/");
              }}
            >
              quit
            </button>
            <button
              onClick={() => {
                continueGame();
              }}
            >
              continue
            </button>
          </div>
        </>
      )}
      {/* ---------------------------------------------------------- */}
      {/* ---------------------------------------------------------- */}
      {/* IT'S GAME OVER*/}
      {gameOver && (
        <>
          <h3>{`Table closed! Insufficient chips `}</h3>
          <div className="UI__buttons">
            <button
              onClick={() => {
                quitGame();
                navigate("/");
              }}
            >
              quit
            </button>
          </div>
        </>
      )}
      {/* ---------------------------------------------------------- */}
    </GameUIContainer>
  );
};

export default GameUI;

const GameUIContainer = styled.div`
  border: 2px solid white;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
  margin: 5rem 0;
  background: var(--font-clr);
  position: absolute;
  z-index: 2;

  .dealer_profile {
    display: flex;
    align-items: center;
    justify-content: center;

    & img {
      object-fit: cover;
      width: 100px;
      border-radius: 50%;
      border: 2px solid white;
      box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
        rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    }
  }

  .spinner-loader {
    width: 50px;
    height: 50px;
    border-radius: 100%;
    border: 5px solid transparent;
    border-bottom: 5px solid var(--secondary-clr);
    margin: 0 auto;
    animation: rotationLoader 1s infinite;
  }

  @keyframes rotationLoader {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  h3 {
    font-weight: 700;
    font-size: 1.3rem;
    color: var(--secondary-clr);
    text-align: center;
    width: 60%;
    margin: 2rem auto;
  }

  .UI__buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;

    & button {
      background: var(--primary-clr);
      color: white;
      padding: 1rem 2rem;
      width: 50%;

      &:hover {
        background: var(--secondary-clr);
      }
    }
  }

  @media (max-width: 20em) {
    margin: 2rem auto;
    .dealer_profile img {
      width: 80px;
    }
  }

  @media (min-width: 37.5em) {
    padding: 2rem;

    .dealer_profile {
      img {
        width: 120px;
      }
    }

    h3 {
      font-size: 2rem;
      width: 60%;
    }
  }
`;
