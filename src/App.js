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
  const [cubeSize, setCubeSize] = React.useState(INITIAL_CUBE_SIZE);
  const [drumsPlaying, setDrumsPlaying] = React.useState(false);

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
        setCubeSize(cubeSize + 30);
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
        setCubeSize(INITIAL_CUBE_SIZE);
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
    setCubeRadius(INITIAL_CUBE_RADIUS);
    setCubeSize(INITIAL_CUBE_SIZE);
  }, [currentChordSet]);

  return (
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          marginTop: "50px",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <AnimatedDot
          finalSize={cubeSize}
          finalRadius={cubeRadius}
          initialColor={cubeColor}
        />
      </div>
      <div
        style={{
          marginTop: "50px",
          marginBottom: "160px",
          border: "solid",
          width: "24%",
          borderRadius: "20px",
          position: "absolute",
          bottom: 0,
          backgroundColor: "#d7e5fc",
        }}
      >
        <div
          style={{
            marginTop: "10px",
            marginBottom: "10px",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h2>A, S, D, F to play me.</h2>
          <h2>J, K, L, ; to change me.</h2>
          <h2>Space Bar to get funky.</h2>
        </div>
      </div>
    </div>
  );
}

export default App;
