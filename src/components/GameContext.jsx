import { createContext, useState, useReducer, useContext } from "react";
import { playerReducer } from "../utils/PlayerReducer";
import axios from "axios";
import { baseURL } from "../datas/const";
import { computerNames } from "../datas/const";
import { GlobalContext } from "./AppContext";
const computer_random_name =
  computerNames[Math.floor(Math.random() * computerNames.length)];

export const GamePlay = createContext();

const initialState = {
  player: {
    pseudo: "",
    chips_value: 5000,
    init_bet: 100,
    cards: [],
    score: 0,
    gained: 0,
  },
  computer: {
    pseudo: computer_random_name.pseudo,
    chips_value: 5000,
    init_bet: 100,
    cards: [],
    score: 0,
    gained: 0,
  },
};

const GameContext = ({ children }) => {
  const [state, dispatch] = useReducer(playerReducer, initialState);
  const [itsFirstHand, setItsFirstHand] = useState(true);
  const [loading, setLoading] = useState(false);
  const [deckID, setDeckID] = useState("");
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [winner, setWinner] = useState(false);
  const [playerStand, setPlayerStand] = useState(false);
  const [computerStand, setComputerStand] = useState(false);
  const [endMatch, setEndMatch] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const getNewDeck = async () => {
    try {
      const response = await axios.get(
        "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6"
      );

      setDeckID(response.data.deck_id);
      localStorage.setItem("deckID", response.data.deck_id);
    } catch (error) {
      console.log(error);
    }
  };

  const drawNewCard = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseURL}${deckID}/draw/?count=1`);
      dispatch({
        type: "handlePlayerCards",
        payload: response.data.cards,
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const computerDrawCard = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseURL}${deckID}/draw/?count=1`);
      dispatch({
        type: "handleComputerCards",
        payload: response.data.cards,
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getScore = (user, action) => {
    let total = [];
    let sum = 0;
    user.cards.map((card) => {
      if (
        card[0].value === "QUEEN" ||
        card[0].value === "KING" ||
        card[0].value === "JACK"
      ) {
        total.push(10);
        sum = total.reduce((a, b) => a + b, 0);
      } else if (card[0].value === "ACE" && sum > 11) {
        total.push(1);
        sum = total.reduce((a, b) => a + b, 0);
      } else if (card[0].value === "ACE" && sum <= 11) {
        total.push(10);
        sum = total.reduce((a, b) => a + b, 0);
      } else {
        total.push(Number(card[0].value));
        sum = total.reduce((a, b) => a + b, 0);
      }

      dispatch({ type: action, payload: sum });
    });
  };

  const checkWinner = () => {
    const limitPoint = 21;
    if (
      (state.player.score === limitPoint &&
        state.computer.score === limitPoint) ||
      state.player.score === state.computer.score
    ) {
      setWinner("draw");
      setEndMatch(true);
    }

    if (state.player.score <= limitPoint && state.computer.score > limitPoint) {
      setWinner("player");
      setEndMatch(true);
    }

    if (state.player.score > limitPoint) {
      setWinner("computer");
      setEndMatch(true);
    }

    if (
      state.player.score > state.computer.score &&
      state.player.score <= limitPoint
    ) {
      setWinner("player");
      setEndMatch(true);
    }

    if (
      state.computer.score > state.player.score &&
      state.computer.score <= limitPoint
    ) {
      setWinner("computer");
      setEndMatch(true);
    }
  };

  const handleGain = () => {
    if (winner === "player") {
      dispatch({ type: "handlePlayerGain" });
    } else if (winner === "computer") dispatch({ type: "handleComputerGain" });
    else return;
  };

  const quitGame = () => {
    // setStartGame(true);
    setComputerStand(false);
    setPlayerStand(false);
    setEndMatch(false);
    setWinner(false);
    setItsFirstHand(true);
    setGameOver(false);
    dispatch({ type: "quitGame" });
  };

  const continueGame = () => {
    setComputerStand(false);
    setPlayerStand(false);
    setEndMatch(false);
    setWinner(false);
    dispatch({ type: "continueGame" });
  };

  return (
    <GamePlay.Provider
      value={{
        state,
        dispatch,
        getScore,
        itsFirstHand,
        loading,
        setLoading,
        setItsFirstHand,
        deckID,
        setDeckID,
        getNewDeck,
        drawNewCard,
        computerDrawCard,
        computer_random_name,
        isPlayerTurn,
        setIsPlayerTurn,
        checkWinner,
        playerStand,
        setPlayerStand,
        computerStand,
        setComputerStand,
        endMatch,
        setEndMatch,
        winner,
        quitGame,
        continueGame,
        handleGain,
        gameOver,
        setGameOver,
      }}
    >
      {children}
    </GamePlay.Provider>
  );
};

export default GameContext;
