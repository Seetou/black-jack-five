import { createContext, useState } from "react";

export const GlobalContext = createContext();
const AppContext = ({ children }) => {
  const [startgame, setStartGame] = useState(true);

  return (
    <GlobalContext.Provider value={{ startgame, setStartGame }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default AppContext;
