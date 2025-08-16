import { useEffect, useState, useRef } from "react";
import Header from "./Header";
import GameBoard from "./GameBoard";

function makeNumbers(count, width = 520, height = 460) {
  const padding = 5;
  const items = [];
  for (let i = 1; i <= count; i++) {
    const x = Math.floor(Math.random() * (width - padding * 2)) + padding;
    const y = Math.floor(Math.random() * (height - padding * 2)) + padding;
    items.push({ id: i, x, y, done: false, lifetime: 3 });
  }
  return items;
}

function Game() {
  const [points, setPoints] = useState(5);
  const [time, setTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [status, setStatus] = useState("LET'S PLAY"); // start, playing, finished, game over
  const [autoPlay, setAutoPlay] = useState(false);
  const [numbers, setNumbers] = useState();
  const [target, setTarget] = useState(1);

  const timerRef = useRef(null);
  const autoplayRef = useRef(null);

  useEffect(() => {
    if (playing) {
      timerRef.current = setInterval(() => {
        setTime((t) => +(t + 0.1).toFixed(1));
      }, 100);
    } else {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    return () => clearInterval(timerRef.current);
  }, [playing]);

  useEffect(() => {
    if (autoPlay && playing) {
      autoplayRef.current = setInterval(() => {
        handleNumberClick(target);
      }, 1000);
    } else {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
    return () => clearInterval(autoplayRef.current);
  }, [autoPlay, playing, target]);

  useEffect(() => {
    if (playing && !numbers?.some((n) => n.lifetime > 0)) {
      handleGameFinished();
    }
  }, [numbers, playing]);

  const handleStart = function () {
    if (points < 1) return;
    setNumbers(makeNumbers(points));
    setPlaying(true);
  };
  const handleRestart = function () {
    setStatus("LET'S PLAY");
    setPlaying(false);
    setAutoPlay(false);
    setTime(0);
    setTarget(1);
  };
  const handleGameOver = function () {
    // setPlaying(false);
    setAutoPlay(false);
    setStatus("GAME OVER");
    clearInterval(timerRef.current);
    timerRef.current = null;
  };
  const handleGameFinished = function () {
    setStatus("ALL CLEARED");
    clearInterval(timerRef.current);
    timerRef.current = null;
  };
  const handleAutoPlay = function () {
    setAutoPlay(!autoPlay);
  };
  const handleNumberClick = function (id) {
    // console.log(`Clicked number: ${id}, Target: ${target}, numbers:`, numbers);
    if (id !== target) {
      handleGameOver();
      return;
    }
    setNumbers((prev) =>
      prev?.map((n) => (n.id === id ? { ...n, done: true } : n))
    );
    setTarget((t) => t + 1);
  };

  return (
    <div className="border p-11 bg-white w-[650px]">
      <Header
        points={points}
        setPoints={setPoints}
        time={time}
        playing={playing}
        onStart={handleStart}
        onRestart={handleRestart}
        status={status}
        autoPlay={autoPlay}
        OnAutoPlay={handleAutoPlay}
      />
      <GameBoard
        points={points}
        status={status}
        target={target}
        numbers={numbers}
        setNumbers={setNumbers}
        onNumberClick={handleNumberClick}
        playing={playing}
      />
    </div>
  );
}

export default Game;
