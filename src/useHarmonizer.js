import React from "react";
import useSound from "use-sound";
import drums from "./assets/drums.mp3";
import * as Tone from "tone";

const sampler = new Tone.Sampler({
  urls: {
    C4: "C4.mp3",
    "D#4": "Ds4.mp3",
    "F#4": "Fs4.mp3",
    A4: "A4.mp3",
  },
  release: 1,
  baseUrl: "https://tonejs.github.io/audio/salamander/",
}).toDestination();

const NOTE_DURATION = 3;

function useHarmonizer() {
  const [playDrums, data] = useSound(drums);

  const note = (note) => {
    return () => sampler.triggerAttackRelease(note, NOTE_DURATION);
  };

  const chordMap = new Map([
    ["cMajor", [note("C4"), note("E4"), note("G4"), note("C5")]],
    ["gMajor", [note("G4"), note("B4"), note("D5"), note("G5")]],
    ["dMinor", [note("D4"), note("F4"), note("A4"), note("C5")]],
    ["fMajor7", [note("F4"), note("A4"), note("C5"), note("E5")]],
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
