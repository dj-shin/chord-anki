export type PITCH = string;
export const PITCHES: PITCH[] = [
  "E,,", "F,,", "G,,", "A,,", "B,,",
  "C,", "D,", "E,", "F,", "G,", "A,", "B,",
  "C", "D", "E", "F", "G", "A", "B",
  "c", "d", "e", "f", "g", "a",
]
export const LOW_RANGE: PITCH[] = PITCHES.slice(0, 15);
export const HIGH_RANGE: PITCH[] = PITCHES.slice(9, 25);
export const NAME_MAP: {[k: PITCH]: string} = {
  "E,,": "미",
  "F,,": "파",
  "G,,": "솔",
  "A,,": "라",
  "B,,": "시",
  "C,": "도",
  "D,": "레",
  "E,": "미",
  "F,": "파",
  "G,": "솔",
  "A,": "라",
  "B,": "시",
  "C": "도",
  "D": "레",
  "E": "미",
  "F": "파",
  "G": "솔",
  "A": "라",
  "B": "시",
  "c": "도",
  "d": "레",
  "e": "미",
  "f": "파",
  "g": "솔",
  "a": "라",
}