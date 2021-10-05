import React from "react";
import useSound from "use-sound";
import boopSfx from "./assets/bonk.mp3";
import A from "./assets/A.mp3";
import B from "./assets/B.mp3";
import C from "./assets/C.mp3";
import D from "./assets/D.mp3";
import E from "./assets/E.mp3";
import F from "./assets/F.mp3";
import G from "./assets/G.mp3";
import Gsharp from "./assets/G#.mp3";
import highA from "./assets/highA.mp3";
import highB from "./assets/highB.mp3";
import highC from "./assets/highC.mp3";
import highD from "./assets/highD.mp3";
import highE from "./assets/highE.mp3";
import highF from "./assets/highF.mp3";
import highG from "./assets/highG.mp3";
import drums from "./assets/drums.mp3";

function useHarmonizer() {
  const [playBoop] = useSound(boopSfx);
  const [playA] = useSound(A);
  const [playB] = useSound(B);
  const [playC] = useSound(C);
  const [playD] = useSound(D);
  const [playE] = useSound(E);
  const [playF] = useSound(F);
  const [playG] = useSound(G);
  const [playGsharp] = useSound(Gsharp);
  const [playhighA] = useSound(highA);
  const [playhighB] = useSound(highB);
  const [playhighC] = useSound(highC);
  const [playhighD] = useSound(highD);
  const [playhighE] = useSound(highE);
  const [playhighF] = useSound(highF);
  const [playhighG] = useSound(highG);
  const [playDrums, data] = useSound(drums);

  const chordMap = new Map([
    ["cMajor", [playC, playE, playG, playhighC]],
    ["gMajor", [playG, playB, playhighD, playhighG]],
    ["dMinor", [playD, playF, playA, playhighC]],
    ["fMajor7", [playF, playA, playhighC, playhighE]],
  ]);

  const [currentChordSet, setCurrentChordSet] = React.useState("cMajor");

  console.log("current chord: " + currentChordSet);

  const changeCurrentChord = (chord) => {
    setCurrentChordSet(chord);
  };

  const playNote = (noteIndex) => {
    chordMap.get(currentChordSet)[noteIndex]();
  };

  const playChord = () => {
    chordMap.get(currentChordSet).forEach((c) => c());
  };

  return [
    changeCurrentChord,
    playNote,
    playChord,
    currentChordSet,
    playDrums,
    data.stop,
  ];
}

export default useHarmonizer;
