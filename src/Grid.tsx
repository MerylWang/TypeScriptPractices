import { Direction } from './App';
import Rover from './Rover';

export function Cell({
  isRover,
  roverDirection,
}: {
  isRover?: boolean;
  roverDirection?: Direction | undefined;
}) {
  if (isRover) {
    // console.log('[Cell] roverDirection: ', roverDirection);
  }
  return (
    <div
      style={{
        width: 50,
        height: 50,
        background: 'white',
        border: '1px solid black',
      }}
    >
      {isRover && <Rover direction={roverDirection} />}
    </div>
  );
}

export default function Grid({
  m = 10,
  n = 10,
  roverLocation = [0, 0],
  direction = 'east',
}: {
  m?: number;
  n?: number;
  roverLocation?: [number, number];
  direction?: Direction;
}) {
  // console.log('[Grid] direction: ', direction);
  const grid = [];
  const [x, y] = roverLocation;
  for (let i = 0; i < m; i++) {
    const row = [];
    for (let j = 0; j < n; j++) {
      row.push(
        <Cell
          key={i * n + j}
          isRover={i == x && j == y}
          roverDirection={direction}
        />,
      );
    }
    grid.push(
      <div
        key={i}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {row}
      </div>,
    );
  }

  return <div>{grid}</div>;
}
