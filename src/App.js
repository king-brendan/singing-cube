import React from "react";
import useHarmonizer from "./useHarmonizer.js";
import "./App.css";
import AnimatedDot from "./animatedDot.js";
import {
  INITIAL_CUBE_SIZE,
  INITIAL_CUBE_RADIUS,
  INITIAL_YELLOW,
  FINAL_YELLOW,
  PINK,
  BLUE,
  PURPLE,
} from "./constants.js";

function App() {
  const [
    changeCurrentChord,
    playNote,
    playChord,
    currentChordSet,
    playDrums,
    stopDrums,
  ] = useHarmonizer();

  const [cubeRadius, setCubeRadius] = React.useState(INITIAL_CUBE_RADIUS);
  const [cubeColor, setCubeColor] = React.useState(INITIAL_YELLOW);
  const [drumsPlaying, setDrumsPlaying] = React.useState(false);
  const [isAudioLoaded, setIsAudioLoaded] = React.useState(false);

  const keyMap = new Map([
    [65, 0],
    [83, 1],
    [68, 2],
    [70, 3],
  ]);

  const switchChordKeyMap = new Map([
    [74, () => changeCurrentChord("cMajor")],
    [75, () => changeCurrentChord("gMajor")],
    [76, () => changeCurrentChord("dMinor")],
    [186, () => changeCurrentChord("fMajor7")],
  ]);

  const colorMap = new Map([
    ["cMajor", INITIAL_YELLOW],
    ["gMajor", PINK],
    ["dMinor", BLUE],
    ["fMajor7", PURPLE],
  ]);

  React.useEffect(() => {
    function handleKeyDown(e) {
      console.log(e.keyCode);
      if (keyMap.has(e.keyCode)) {
        playNote(keyMap.get(e.keyCode));
        setCubeRadius(cubeRadius - 30);
      } else if (e.keyCode === 32) {
        if (drumsPlaying) {
          stopDrums();
          setDrumsPlaying(false);
        } else {
          playDrums();
          setDrumsPlaying(true);
        }
      } else if (switchChordKeyMap.has(e.keyCode)) {
        switchChordKeyMap.get(e.keyCode)();
      }
    }

    function handleKeyUp(e) {
      if (keyMap.has(e.keyCode)) {
        setCubeRadius(INITIAL_CUBE_RADIUS);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return function cleanup() {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [playNote]);

  React.useEffect(() => {
    console.log(cubeRadius);
    setCubeColor(colorMap.get(currentChordSet));
    setCubeRadius(cubeRadius - 20);
  }, [currentChordSet]);

  return (
    <div
      style={{
        marginTop: "50px",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <AnimatedDot finalRadius={cubeRadius} initialColor={cubeColor} />
      <h2 style={{ marginTop: "100px" }}>A, S, D, F to play me.</h2>
      <h2>J, K, L, ; to change me.</h2>
      <h2>Space Bar to get funky .</h2>
    </div>
  );
}

export default App;
