// Import the class you want to test
import ParkingLot from '../src/parkingLot.ts';
import { Size } from '../src/parkingLot.ts';
// const ParkingLot = require('../src/parkingLot.ts');

describe('Create ParkingLot', () => {
  it('should create a parking lot with the correct number of spots', () => {
    const parkingLot = new ParkingLot({ 0: 10, 1: 20, 2: 30 });
    expect(parkingLot.availableSpots).toEqual({ 0: 10, 1: 20, 2: 30 });
    expect(parkingLot.remainingSpots).toEqual({ 0: 10, 1: 20, 2: 30 });
    expect(parkingLot.spots.length).toBe(60);
  });

  it('should throw an error if the parking lot is created with negative spots', () => {
    expect(() => new ParkingLot({ 0: -10, 1: 20, 2: 30 })).toThrow(
      'Number of spots cannot be negative',
    );
  });

  it('should create a parking lot with 0 spots', () => {
    const parkingLot = new ParkingLot({ 0: 0, 1: 0, 2: 0 });
    expect(parkingLot.availableSpots).toEqual({ 0: 0, 1: 0, 2: 0 });
    expect(parkingLot.remainingSpots).toEqual({ 0: 0, 1: 0, 2: 0 });
    expect(parkingLot.spots.length).toBe(0);
  });
});

describe('Parking a car', () => {
  it('should return false if there are no available spots', () => {
    const parkingLot = new ParkingLot({ Small: 0, Medium: 0, Large: 0 });
    expect(parkingLot.parkCar(0)).toBe(false);
    expect(parkingLot.parkCar(1)).toBe(false);
    expect(parkingLot.parkCar(2)).toBe(false);
  });

  it('should return true if there are available spots', () => {
    const parkingLot = new ParkingLot({ Small: 10, Medium: 20, Large: 30 });
    expect(parkingLot.parkCar(Size.Small)).toBe(true);
    // expect(parkingLot.parkCar(1)).toBe(true);
    // expect(parkingLot.parkCar(2)).toBe(true);
  });

  it('should update remainingSpots and spots when parking a car', () => {
    const parkingLot = new ParkingLot({ 0: 10, 1: 20, 2: 30 });
    parkingLot.parkCar(0);
    expect(parkingLot.remainingSpots).toEqual({ 0: 9, 1: 20, 2: 30 });
    parkingLot.parkCar(1);
    expect(parkingLot.remainingSpots).toEqual({ 0: 9, 1: 19, 2: 30 });
    parkingLot.parkCar(2);
    expect(parkingLot.remainingSpots).toEqual({ 0: 9, 1: 19, 2: 29 });
  });

  it('should park a small car in a medium spot if no small spots are available', () => {
    const parkingLot = new ParkingLot({ 0: 0, 1: 20, 2: 30 });
    parkingLot.parkCar(0);
    expect(parkingLot.remainingSpots).toEqual({ 0: 0, 1: 19, 2: 30 });
  });
});

/**
 * parking lot sizes
 *  - negative numbers -> should throw error
 *  - 0 -> ok
 *  - positive numbers -> ok
 *  - very large numbers -> ok as long as storage allows
 *
 * parking car
 *  - no available spot -> should return false
 *  - available spot -> should return true and update remainingSpots, spots
 *    - parking small car
 *      - all spots available -> park in small spot
 *      - no small spots, but medium spots available -> park in medium spot
 *      - etc
 *    - parking medium car
 *      - medium and large not avail, small avail -> return false
 *      - medium avail -> park in medium
 *      - medium not avail & large avail -> park in large
 *      - etc
 *    - parking large car, large spot avaible
 *        - no large spot, but medium spots available
 *        - no spots avaialble
 *
 * taking car
 * - car not in parking lot -> do nothing
 * - car in parking lot -> free up spot, update remainingSpots, spots
 *   - take small car, from spot of each size
 *   - take  medium car, from spot of each size
 *  - take large car, from spot of each size
 *    - if van parked in medium spots, should free up 3 medium spots
 *    - if van parked in large spot, should free up 1 large spot
 *
 * isFull, isEmpty
 *
 */

// Import the class you want to test
//   import { Person } from './Person';

//   describe('Person Class', () => {
//       it('should create a new Person instance with the correct name and age', () => {
//           const person = new Person('Alice', 30);
//           expect(person.name).toBe('Alice');
//           expect(person.age).toBe(30);
//       });

//       it('should greet correctly', () => {
//           const person = new Person('Bob', 25);
//           expect(person.greet()).toBe('Hello, my name is Bob and I am 25 years old.');
//       });
//   });
