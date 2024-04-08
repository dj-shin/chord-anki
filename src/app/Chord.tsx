import { useEffect, useRef, useState } from "react";
import * as abcjs from "abcjs";
import { PITCH } from "@/app/notes";

interface ChordProps {
  notes: PITCH[],
  isBass: boolean,
}
const Chord = (props: ChordProps) => {
  const chordRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (chordRef.current) {
      let sheet = "X:1\n";
      if (props.isBass) {
        sheet += "K:clef=bass\n";
      }
      sheet += `[${props.notes.join("2")}]\n`
      abcjs.renderAbc(chordRef.current, sheet);
    }
  }, [props]);
  return (
    <div ref={chordRef} style={{ width: "100%" }}>
    </div>
  )
};
export default Chord;