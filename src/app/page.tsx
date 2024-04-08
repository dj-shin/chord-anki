'use client'

import styles from "./page.module.css";
import Chord from "@/app/Chord";
import { useCallback, useEffect, useState } from "react";
import { HIGH_RANGE, LOW_RANGE, NAME_MAP, PITCH, PITCHES } from "@/app/notes";

export default function Home() {
  const [notes, setNotes] = useState<PITCH[]>([]);
  const [isBass, setBass] = useState<boolean>(true);
  const [noteCount, setNoteCount] = useState<number>(1);

  const answer = notes.map(note => NAME_MAP[note])
  const [myAnswer, setMyAnswer] = useState<string[]>([]);
  const [solveState, setSolveState] = useState<string>("TRYING");
  const [startTime, setStartTime] = useState<number>();
  const [endTime, setEndTime] = useState<number>();

  const generate = useCallback(() => {
    const bass = Math.random() < 0.5;
    setBass(bass);
    const nextNotes: PITCH[] = [];
    const candidates = bass ? [...LOW_RANGE] : [...HIGH_RANGE];
    for (let i = 0; i < noteCount; i++) {
      const popIndex = Math.floor(Math.random() * candidates.length);
      nextNotes.push(candidates.splice(popIndex, 1)[0]);
    }
    setNotes(
      nextNotes.sort(
        (a, b) => PITCHES.indexOf(a) - PITCHES.indexOf(b)
      )
    );
    setSolveState("TRYING");
    setMyAnswer([]);
    setStartTime(Date.now());
    setEndTime(undefined);
  }, [noteCount]);

  useEffect(() => {
    generate();
  }, [generate]);

  const appendAnswer = (v: string) => {
    const nextAnswer = [...myAnswer, v];
    if (nextAnswer.length === answer.length) {
      if (nextAnswer.join("") === answer.join("")) {
        setSolveState("CORRECT");
      } else {
        setSolveState("WRONG");
      }
      setEndTime(Date.now());
    } else {
      setMyAnswer(nextAnswer);
    }
  }

  return (
    <main className={styles.main}>
      <label>
        Count
        <input
          type="number"
          value={noteCount}
          onChange={e =>
          setNoteCount(e.target.valueAsNumber)}
        />
      </label>
      <div>
        {["도", "레", "미", "파", "솔", "라", "시"].map((v, i) => (
          <button style={{
            "width": "40px",
            "padding": "5px"
          }} key={i} onClick={() => appendAnswer(v)}>{v}</button>
        ))}
      </div>
      <Chord notes={notes} isBass={isBass}/>
      {solveState === "TRYING" ?
        <p>Answer: {myAnswer}</p> :
        <p
          style={{
            "color": solveState === "WRONG" ? "red" : "#98FB98"
          }}>
          [{solveState}] Answer: {answer}
        </p>
      }
      {endTime && startTime &&
          <p>Time: {(endTime - startTime) / 1000} s</p>
      }
      <button onClick={generate}>Roll</button>
    </main>
  );
}
