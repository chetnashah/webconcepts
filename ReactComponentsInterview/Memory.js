import React from "react";

const TILE_COLORS = ["red", "green", "blue", "yellow"];

const tiles = TILE_COLORS.concat(TILE_COLORS);
const shuffledTiles = shuffle(tiles);

export default function Memory() {
  // Write your code here.

  const [openedTiles, setOpenedTiles] = useState([]);
  const [revealedTiles, setRevealedTiles] = useState([]);

  function onTileClick(idx) {
    console.log("tile clicked : " + idx);
    if (openedTiles.indexOf(idx) !== -1) {
      return;
    }
    if (revealedTiles.indexOf(idx) !== -1 || revealedTiles.length === 2) {
      return;
    }

    if (revealedTiles.length === 1) {
      if (shuffledTiles[idx] === shuffledTiles[revealedTiles[0]]) {
        setRevealedTiles([]);
        setOpenedTiles((opTiles) => [...opTiles, idx, revealedTiles[0]]);
      } else {
        // not same
        setRevealedTiles((rTiles) => [...rTiles, idx]);
        setTimeout(() => {
          setRevealedTiles([]);
        }, 1000);
      }
    }

    if (revealedTiles.length === 0) {
      setRevealedTiles([idx]);
    }
  }

  function onRestart() {
    setRevealedTiles([]);
    setOpenedTiles([]);
  }

  return (
    <>
      <h1>
        {openedTiles.length === shuffledTiles.length ? "You Win!" : "Memory"}
      </h1>
      <div className="board">
        {shuffledTiles.map((tile, idx) => {
          const shouldBeShown =
            revealedTiles.indexOf(idx) != -1 || openedTiles.indexOf(idx) != -1;
          const colorClass = shouldBeShown ? ` ${shuffledTiles[idx]}` : "";
          return (
            <div
              onClick={() => onTileClick(idx)}
              className={"tile" + colorClass}
            ></div>
          );
        })}
      </div>
      {openedTiles.length === shuffledTiles.length ? (
        <button onClick={onRestart}>Restart</button>
      ) : null}
    </>
  );
}

/**
 * Returns the array shuffled into a random order.
 * Do not edit this function.
 */
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    // Swap the elements at i and randomIndex
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
}
