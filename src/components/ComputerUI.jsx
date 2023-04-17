import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { GamePlay } from "./GameContext";
import { v4 as uuidv4 } from "uuid";
import back from "../images/back-card.png";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const ComputerUI = () => {
  const {
    state,
    getScore,
    isPlayerTurn,
    setIsPlayerTurn,
    computerDrawCard,
    setComputerStand,
    endMatch,
  } = useContext(GamePlay);

  useEffect(() => {
    setTimeout(() => {
      if (!isPlayerTurn && state.computer.score < 19) {
        computerDrawCard();
        setIsPlayerTurn(true);
      } else if (!isPlayerTurn && state.computer.score >= 19) {
        setIsPlayerTurn(true);
        setComputerStand(true);
      } else return;
    }, 500);
  }, [isPlayerTurn, state.computer.score]);

  useEffect(() => {
    getScore(state.computer, "updateComputerScore");
  }, [state.computer.cards]);

  return (
    <ComputerUIContainer>
      <div className="computer__stats">
        <p>
          Dealer: <span>{state.computer.pseudo}</span>
        </p>
        <p>
          Chips: <span>{state.computer.chips_value}</span>
        </p>
        <p>
          Bet: <span>{state.computer.init_bet}</span>
        </p>
        <p>
          Gained: <span>{state.computer.gained}</span>
        </p>
      </div>
      <div className={`main__ui ${!isPlayerTurn ? "active" : ""}`}>
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
            {endMatch &&
              state.computer.cards.map((card) => {
                return (
                  <SplideSlide className="card__slide" key={uuidv4()}>
                    <img src={card[0].image} alt="blackjack card" />
                  </SplideSlide>
                );
              })}

            {!endMatch &&
              state.computer.cards.map((card) => {
                return (
                  <SplideSlide className="card__slide" key={uuidv4()}>
                    <img src={back} alt="blackjack card" />
                  </SplideSlide>
                );
              })}
          </Splide>
        </div>
        <div className="scoreboard__container">
          <p className="scoreboard__header">Score</p>
          <p className="scoreboard__count">
            {endMatch ? state.computer.score : 0}
          </p>
        </div>
      </div>
    </ComputerUIContainer>
  );
};

export default ComputerUI;

const ComputerUIContainer = styled.div`
  position: absolute;
  top: 0;
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

  .computer__stats {
    display: flex;
    background: white;
    border-radius: 5px;
    padding: 1rem;
    align-items: center;
    justify-content: space-evenly;
    margin-bottom: 1rem;

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

    .computer__stats {
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

    .computer__stats {
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
