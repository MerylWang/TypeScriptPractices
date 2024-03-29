import '@radix-ui/themes/styles.css';
import './App.css';
import { useCallback, useState } from 'react';
import Grid from './Grid';

export type Direction = 'east' | 'west' | 'north' | 'south';

function App({ m = 10, n = 10 }: { m?: number; n?: number }) {
  const [roverLocation, setRoverLocation] = useState([0, 0] as [
    number,
    number,
  ]);
  const [direction, setDirection] = useState<Direction>('east');

  const goFoward = useCallback(() => {
    const [x, y] = roverLocation;
    switch (direction) {
      case 'east':
        if (y + 1 >= n) {
          // console.log('returning - 1');
          return;
        }

        setRoverLocation([x, y + 1]);
        break;

      case 'west':
        if (y - 1 < 0) {
          // console.log('returning - 2');

          return;
        }
        setRoverLocation([x, y - 1]);
        break;
      case 'north':
        if (x - 1 < 0) {
          // console.log('returning - 3');

          return;
        }
        setRoverLocation([x - 1, y]);
        break;
      case 'south':
        if (x + 1 >= m) {
          break;
        }
        setRoverLocation([x + 1, y]);
    }
  }, [roverLocation, direction, m, n]);

  const goLeft = useCallback(() => {
    const nextLeft: Record<Direction, Direction> = {
      west: 'south',
      south: 'east',
      east: 'north',
      north: 'west',
    };
    const nextDirection = nextLeft[direction];
    setDirection(nextDirection);
  }, [direction]);

  const goRight = useCallback(() => {
    // console.log('calling goRight');
    const nextRight: Record<Direction, Direction> = {
      west: 'north',
      south: 'west',
      east: 'south',
      north: 'east',
    };
    const nextDirection = nextRight[direction];
    // console.log('nextDirection ', nextDirection);

    setDirection(nextDirection);
  }, [direction]);

  return (
    <>
      <button onClick={goLeft}>left</button>
      <button onClick={goRight}>right</button>
      <button onClick={goFoward}>forward</button>
      <Grid roverLocation={roverLocation} direction={direction} m={m} n={n} />
    </>
  );
}

export default App;
