import styled from "styled-components";
import { useState, useContext } from "react";
import FormValidator from "../utils/FormValidator";
import Logo from "./Logo";
import { useNavigate } from "react-router-dom";
import { GamePlay } from "./GameContext";

const Form = () => {
  const { state, dispatch } = useContext(GamePlay);

  const navigate = useNavigate();

  const [errorForm, setErrorForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!state.player.pseudo || !state.player.init_bet) {
      setErrorForm(true);
    } else {
      navigate("/gamesession");
    }
  };

  return (
    <>
      <Logo />
      <FormContainer onSubmit={handleSubmit}>
        {errorForm && <FormValidator />}
        <div>
          <label htmlFor="pseudo">Pseudo</label>
          <input
            type="text"
            maxLength={6}
            name="pseudo"
            value={state.player.pseudo}
            onChange={(e) =>
              dispatch({
                type: "handlePseudoInput",
                payload: e.target.value,
              })
            }
          />
        </div>
        <div className="inputSelect">
          <label htmlFor="chips_value">Chips value</label>
          <select
            name="chips_value"
            value={state.player.chips_value}
            onChange={(e) =>
              dispatch({
                type: "handleChipsInput",
                payload: Number(e.target.value),
              })
            }
          >
            <option value="500">500</option>
            <option value="5000">5.000</option>
            <option value="10000">10.000</option>
            <option value="25000">25.000</option>
            <option value="50000">50.000</option>
            <option value="100000">100.000</option>
            <option value="200000">200.000</option>
            <option value="300000">300.000</option>
            <option value="400000">400.000</option>
          </select>
        </div>
        <div>
          <label htmlFor="init_bet">Starting Bet</label>
          <input
            type="number"
            name="init_bet"
            min="100"
            max="500"
            step="1"
            value={state.player.init_bet}
            onChange={(e) =>
              dispatch({
                type: "handleBetInput",
                payload: e.target.value,
              })
            }
          />
        </div>
        <button type="submit">join table</button>
      </FormContainer>
    </>
  );
};

export default Form;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60%;
  padding: 5rem 2rem;
  gap: 2rem;

  background: var(--font-clr);
  border-radius: 5px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  margin-top: 5rem;

  & div {
    text-align: center;

    & label {
      font-size: 1.5rem;
      font-weight: 500;
      color: var(--secondary-clr);

      &::before,
      &::after {
        content: " - ";
        color: var(--secondary-clr);
      }
    }

    & input {
      width: 100%;
      padding: 0.5rem 1rem;
      border: none;
      margin-top: 1rem;
      border-radius: 5px;

      &:focus {
        border: none;
        outline: none;
      }
    }

    &.inputSelect select {
      margin-top: 1rem;
      width: 100%;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 5px;
      background: white;
    }
  }

  & button {
    background: var(--primary-clr);
    padding: 1rem 3rem;
    color: white;

    &:hover {
      background: var(--secondary-clr);
    }
  }

  @media (max-width: 20em) {
    width: 90%;
  }

  @media (min-width: 56.313em) {
    width: 40%;

    & div {
      text-align: center;

      & label {
        font-size: 3rem;
        font-weight: 500;
        color: var(--secondary-clr);

        &::before,
        &::after {
          content: " - ";
          color: var(--secondary-clr);
        }
      }

      & input {
        width: 100%;
        padding: 1rem;
        border: none;
        margin-top: 1rem;
        border-radius: 5px;
        font-size: 2rem;

        &:focus {
          border: none;
          outline: none;
        }
      }

      &.inputSelect select {
        margin-top: 1rem;
        width: 100%;
        border: none;
        padding: 1rem;
        border-radius: 5px;
        background: white;
        font-size: 2rem;
      }
    }

    & button {
      background: var(--primary-clr);
      padding: 1rem 2rem;
      color: white;
      font-size: 2rem;

      &:hover {
        background: var(--secondary-clr);
      }
    }
  }
`;
