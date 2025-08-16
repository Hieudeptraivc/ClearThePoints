import { useEffect, useState, useRef } from "react";
import Header from "./Header";
import GameBoard from "./GameBoard";

function makeNumbers(count, width = 560, height = 360) {
  const padding = 20;
  const items = [];
  for (let i = 1; i <= count; i++) {
    const x = Math.floor(Math.random() * (width - padding * 2)) + padding;
    const y = Math.floor(Math.random() * (height - padding * 2)) + padding;
    items.push({ id: i, x, y, done: false });
  }
  return items;
}

function Game() {
  const [points, setPoints] = useState(10);
  const [time, setTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const [numbers, setNumbers] = useState(() => makeNumbers(points));
  const [target, setTarget] = useState(1);

  const timerRef = useRef(null);
  const autoplayRef = useRef(null);

  useEffect(() => {
    // regenerate when points change (but not while playing)
    if (!playing) setNumbers(makeNumbers(points));
  }, [points]);

  useEffect(() => {
    if (playing) {
      timerRef.current = setInterval(() => setTime((t) => t + 1), 1000);
    } else {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    return () => clearInterval(timerRef.current);
  }, [playing]);

  useEffect(() => {
    // autoplay logic: when enabled and playing, click the current target automatically
    if (autoPlay && playing) {
      autoplayRef.current = setInterval(() => {
        // find the current number and mark it as clicked
        handleNumberClick(target);
      }, 300);
    } else {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
    return () => clearInterval(autoplayRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay, playing, target]);

  function start() {
    setNumbers(makeNumbers(points));
    setTarget(1);
    setTime(0);
    setPlaying(true);
  }

  function stop() {
    setPlaying(false);
  }

  function handleNumberClick(id) {
    // only accept correct next number
    setNumbers((prev) => {
      const idx = prev.findIndex((p) => p.id === id);
      if (idx === -1) return prev;
      // if clicked number is the current target
      if (id === target) {
        const next = [...prev];
        next[idx] = { ...next[idx], done: true };
        // advance target
        setTarget((t) => t + 1);
        // if finished
        if (id >= points) setPlaying(false);
        return next;
      }
      return prev;
    });
  }

  return (
    <div className="border p-4 bg-white w-[600px]">
      <Header
        points={points}
        setPoints={setPoints}
        time={time}
        playing={playing}
        start={start}
        stop={stop}
        autoPlay={autoPlay}
        setAutoPlay={setAutoPlay}
      />
      <GameBoard
        numbers={numbers}
        onNumberClick={handleNumberClick}
        target={target}
        playing={playing}
      />
    </div>
  );
}

export default Game;
