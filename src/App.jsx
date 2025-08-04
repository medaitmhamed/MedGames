import { lazy, Suspense } from "react";
import Loading from "./pages/Loading";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import NoPage from "./pages/NoPage";
import GamePlay from "./games/hangman/components/GamePlay";
import HangmanLayout from "./games/hangman/HangmanLayout";
import PlayModes from "./games/hangman/components/PlayModes";
import ComingSoon from "./pages/ComingSoon";
import XOLayout from "./games/tic tac toe/XOLayout";
import GameModes from "./games/tic tac toe/components/GameModes";
import OnePlayer from "./games/tic tac toe/components/OnePlayer";
import Board from "./games/tic tac toe/components/Board";
import Nour from "./games/hangman/components/Nour";
const Home = lazy(() => import("./pages/Home"));

function App() {
  return (
   <>
      <Header />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home filterType="all games" />} />
          <Route path="/best-game" element={<Home filterType="best games" />} />
          <Route path="/newest" element={<Home filterType="new games" />} />
          <Route path="/categories" element={<ComingSoon />} />

          <Route path="/hangman" element={<HangmanLayout />}>
            <Route index element={<PlayModes />} />
            <Route path="beginner" element={<GamePlay mode="easy" />} />
            <Route path="explorer" element={<GamePlay mode="explorer" />} />
            <Route path="master" element={<GamePlay mode="master" />} />
            <Route path="nour" element={<Nour />} />

          </Route>
          <Route path="/tic-tac-toe" element={<XOLayout />}>
            <Route index element={<GameModes />} />
            <Route path="play_with_friend" element={<Board mode="2p"/>} />
            <Route path="single-player" element={<OnePlayer />} >
            </Route>
          </Route>
          <Route path="*" element={<NoPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
