import { Direction } from './App';

const directionMap: Record<Direction, string> = {
  east: '>',
  west: '<',
  north: '^',
  south: 'v',
};

export default function Rover({
  direction = 'east',
}: {
  direction?: Direction;
}) {
  // console.log('calling Rover');
  // console.log('[Rover] direction: ', direction);
  const directionStr = directionMap[direction];
  // console.log('[Rover] directionStr: ', directionStr);

  return (
    <div
      style={{
        height: 25,
        width: 25,
        backgroundColor: '#bbb',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        verticalAlign: 'center',
      }}
    >
      {directionStr}
    </div>
  );
}
