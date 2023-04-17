import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { GamePlay } from "./GameContext";

const ProtectedRoute = ({ children }) => {
  const { state } = useContext(GamePlay);
  if (!state.player.pseudo) return <Navigate to={"/"} />;
  else return children;
};

export default ProtectedRoute;
