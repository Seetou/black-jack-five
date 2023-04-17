export const playerReducer = (state, action) => {
  switch (action.type) {
    case "handlePseudoInput":
      return {
        ...state,
        player: {
          ...state.player,
          pseudo: action.payload,
        },
      };

    case "handleChipsInput":
      return {
        ...state,
        player: {
          ...state.player,
          chips_value: action.payload,
        },

        computer: {
          ...state.computer,
          chips_value: action.payload,
        },
      };

    case "handleBetInput":
      return {
        ...state,
        player: {
          ...state.player,
          init_bet: action.payload,
        },

        computer: {
          ...state.computer,
          init_bet: action.payload,
        },
      };

    case "handlePlayerCards":
      return {
        ...state,
        player: {
          ...state.player,
          cards: [...state.player.cards, action.payload],
        },
      };

    case "updateScore":
      return {
        ...state,
        player: { ...state.player, score: action.payload },
      };

    case "handleComputerCards":
      return {
        ...state,
        computer: {
          ...state.computer,
          cards: [...state.computer.cards, action.payload],
        },
      };

    case "updateComputerScore":
      return {
        ...state,
        computer: { ...state.computer, score: action.payload },
      };

    case "handlePlayerGain":
      return {
        ...state,
        player: {
          ...state.player,
          gained: state.player.gained + state.player.init_bet,
          chips_value: state.player.chips_value + state.player.init_bet,
        },
        computer: {
          ...state.computer,
          chips_value: state.computer.chips_value - state.computer.init_bet,
          gained: state.computer.gained - state.computer.init_bet,
        },
      };

    case "handleComputerGain":
      return {
        ...state,
        player: {
          ...state.player,
          gained: state.player.gained - state.player.init_bet,
          chips_value: state.player.chips_value - state.player.init_bet,
        },
        computer: {
          ...state.computer,
          chips_value: state.computer.chips_value + state.computer.init_bet,
          gained: state.computer.gained + state.computer.init_bet,
        },
      };

    case "continueGame":
      return {
        ...state,
        player: { ...state.player, score: 0, cards: [] },
        computer: {
          ...state.computer,
          score: 0,
          cards: [],
        },
      };

    case "quitGame":
      return {
        ...state,
        player: {
          ...state.player,
          pseudo: "",
          chips_value: 5000,
          init_bet: 100,
          cards: [],
          score: 0,
          gained: 0,
        },
        computer: {
          ...state.computer,

          chips_value: 5000,
          init_bet: 100,
          cards: [],
          score: 0,
          gained: 0,
        },
      };

    default:
      throw new Error();
  }
};
