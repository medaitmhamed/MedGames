import { lazy, Suspense } from "react";
import Loading from "./pages/Loading";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import NoPage from "./pages/NoPage";
import GamePlay from "./games/hangman/components/GamePlay";
import HangmanLayout from "./games/hangman/HangmanLayout";
import PlayModes from "./games/hangman/components/PlayModes";
import ComingSoon from "./pages/ComingSoon";
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
          </Route>
          <Route path="*" element={<NoPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
