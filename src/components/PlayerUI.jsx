import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { GamePlay } from "./GameContext";
import { v4 as uuidv4 } from "uuid";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const PlayerUI = () => {
  const {
    state,
    getScore,
    isPlayerTurn,
    setPlayerStand,
    setComputerStand,
    setIsPlayerTurn,
  } = useContext(GamePlay);

  useEffect(() => {
    getScore(state.player, "updateScore");
    if (state.player.score > 21) {
      setPlayerStand(true);
      setComputerStand(true);
      setIsPlayerTurn(false);
      console.log("amez");
    }
  }, [state.player.cards]);

  return (
    <PlayerUIContainer>
      <div className={`main__ui ${isPlayerTurn ? "active" : ""}`}>
        <div className="card__container">
          <Splide
            className="carousel_container"
            options={{
              perPage: 3,
              perMove: 1,
              gap: "1rem",
              drag: "free",
              padding: { right: "1rem" },
              classes: { arrows: "splide__arrows card-carousel-arrows" },
              mediaQuery: "min",
              breakpoints: {
                901: {
                  gap: "0rem",
                  perPage: 1,
                  trimSpace: true,
                  autoWidth: true,
                },
              },
            }}
          >
            {state.player.cards.map((card) => {
              return (
                <SplideSlide className="card__slide" key={uuidv4()}>
                  <img src={card[0].image} alt="" />
                </SplideSlide>
              );
            })}
          </Splide>
        </div>
        <div className="scoreboard__container">
          <p className="scoreboard__header">Score</p>
          <p className="scoreboard__count">{state.player.score}</p>
        </div>
      </div>

      <div className="player__stats">
        <p>
          Me: <span>{state.player.pseudo}</span>
        </p>
        <p>
          Chips: <span>{state.player.chips_value}</span>
        </p>
        <p>
          Bet: <span>{state.player.init_bet}</span>
        </p>
        <p>
          Gained: <span>{state.player.gained}</span>
        </p>
      </div>
    </PlayerUIContainer>
  );
};

export default PlayerUI;
const PlayerUIContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0.5rem;

  .main__ui {
    display: flex;
    width: 100%;
    gap: 1rem;
    border-radius: 5px;
    padding: 0.2rem;

    .card__container {
      flex-grow: 1;
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow-x: hidden;

      background: var(--primary-clr);
      max-height: 30vh;

      .carousel_container {
        max-width: 90%;
        margin: 0;
        padding: 0;

        .splide__arrows.card-carousel-arrows button {
          background: var(--primary-clr);
          border: 1px solid white;
        }
      }

      .card__slide {
        img {
        }
      }
    }

    .scoreboard__container {
      background: white;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-radius: 5px;

      & .scoreboard__header {
        font-size: 2rem;
        color: var(--secondary-clr);
      }

      & .scoreboard__count {
        font-size: 5rem;
        color: var(--secondary-clr);
      }
    }
  }

  .player__stats {
    display: flex;
    background: white;
    border-radius: 5px;
    padding: 1rem;
    align-items: center;
    justify-content: space-evenly;
    margin-top: 1rem;

    p {
      font-size: 1.2rem;
      color: var(--secondary-clr);
      font-weight: 500;

      & span {
        color: var(--accent-clr);
      }
    }
  }

  @media (max-width: 37.438em) {
    .card__slide {
      img {
        width: 60px;
      }
    }
  }

  @media (min-width: 37.5em) and (max-width: 56.25em) {
    .card__container {
      padding: 0.5rem 0;
      .carousel_container {
        max-width: 95%;
        width: 100%;
        margin: 0;
        padding: 0;
        height: 100%;

        .splide__arrows.card-carousel-arrows button {
          background: var(--primary-clr);
        }
      }

      .card__slide {
        img {
          width: 80%;
        }
      }
    }

    .player__stats {
      height: 5vh;

      p {
        font-size: 1.5rem;
      }
    }
  }

  @media (min-width: 56.313em) {
    .card__container {
      padding: 0.5rem 0;
      .carousel_container {
        max-width: 95%;
        width: 100%;
        margin: 0;
        padding: 0;
        height: 100%;

        .splide__arrows.card-carousel-arrows button {
          background: var(--primary-clr);
        }
      }

      .card__slide {
        img {
          width: 50%;
        }
      }
    }

    .player__stats {
      height: 5vh;

      p {
        font-size: 1.5rem;
      }
    }

    .scoreboard__container {
      flex-grow: 1;
      min-width: 20%;
    }
  }
`;
