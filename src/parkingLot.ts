//********************************************************************* */

// Goals: Design a parking lot using object-oriented principles

// Here are a few methods that you should be able to run:

// Tell us how many spots are remaining
// Tell us how many total spots are in the parking lot
// Tell us when the parking lot is full
// Tell us when the parking lot is empty
// Tell us when certain spots are full e.g. when all motorcycle spots are taken
// Tell us how many spots vans are taking up
// Assumptions:

// The parking lot can hold motorcycles, cars and vans
// The parking lot has motorcycle spots, car spots and large spots
// A motorcycle can park in any spot
// A car can park in a single compact spot, or a regular spot
// A van can park, but it will take up 3 regular spots
// These are just a few assumptions. Feel free to ask your interviewer about more assumptions as needed

/**
 * assumptions:
 * - parking lot is created with a certain number of spots for each type, which can be updated
 * - placement matters, e.g. when a large can takes up 3 medium spots, these spots are next to each other in a linear orientation
 *    - for the purposes of this interview, let's just we just care about count.
 *
 * Size Enum: small, medium, large
 *
 * Spot
 *  - size: small | medium | large
 *  - parkedCar: small | medium | large | null
 *
 *
 * ParkingLot
 *   - availableSpots (max space available due to size of parking lot): {small: number, medium: number, large: number}
 *   - remainingSpots (availableSpots - takenSpots): {small: number, medium: number, large: number}
 *   - spots: Spot[]
 *
 *   - parkCar( carSize: Size ) -> boolean
 *     - if carSize is large, check if large spots remain. If not, try 3 medium spots.
 *     - if car cannot be parked, return False. Else return True.
 *        - small car can park in all sizes, should priortize small spots
 *        - medium can park in medium and large, should prioritize medium spots
 *        - large can park in large and 3 medium, should prioritize large spots
 *     - after parking, if all spots of given type are taken, console log
 *   - takeCar (carSize: Size) -> None
 *     - if no such car in parking lot, do nothing
 *     - otherwise, free up corresponding spot
 *   - isFull -> boolean
 *   - isEmpty -> boolean
 *   - numSpotsTakenByCar(carSize: Size) -> number
 *       - filter spots by carSize spots.where(parkedCar === carSize).length
 *
 * alternatively, to keep track of which spots each car has taken up, we could keep an additional hashmap
 *  - spotsByCar: {small: { small: number, medium: number, large: number }, medium: { medium: number, large: number}, large: { medium: number, large: number}}
 *
 *
 */

// enum Size {
//   Small,
//   Medium,
//   Large,
// }
export enum Size {
  Small = 'Small',
  Medium = 'Medium',
  Large = 'Large',
}

class Spot {
  size: Size;
  parkedCar: Size | null;

  constructor(size: Size) {
    this.size = size;
    this.parkedCar = null;
  }
}

class ParkingLot {
  availableSpots: { [key in Size]: number };
  remainingSpots: { [key in Size]: number };
  spots: Spot[];

  constructor(availableSpots: { [key in Size]: number }) {
    Object.values(availableSpots).forEach((count) => {
      if (count < 0) {
        throw new Error('Number of spots cannot be negative');
      }
    });
    this.availableSpots = availableSpots;
    this.remainingSpots = { ...availableSpots };
    this.spots = [];

    // instantiate spots
    Object.entries(availableSpots).forEach(([size, count]) => {
      for (let i = 0; i < count; i++) {
        this.spots.push(new Spot(size as Size)); // Fix: Cast 'size' to 'Size' enum
      }
    });
  }

  getAvailableSpot(carSize: Size): Spot | null {
    console.log(
      'spots: ',
      this.spots.map((spot) => [spot.size, spot.parkedCar]),
    );
    return (
      this.spots.find(
        (spot) => spot.size == carSize && spot.parkedCar === null,
      ) || null
    );
  }

  // return the size of the spot the car should park in. If no spot is available, return null
  findSpot(carSize: Size): [Size, number] | null {
    console.log('finding spot for', carSize);
    if (this.isFull()) {
      console.log('Parking lot is full');
      return null;
    }

    if (carSize === Size.Large) {
      if (this.remainingSpots[Size.Large] > 0) {
        return [Size.Large, 1];
      } else if (this.remainingSpots[Size.Medium] >= 3) {
        return [Size.Medium, 3];
      }
    } else if (carSize == Size.Medium) {
      if (this.remainingSpots[Size.Medium] > 0) {
        return [Size.Medium, 1];
      } else if (this.remainingSpots[Size.Large] > 0) {
        return [Size.Large, 1];
      }
    } else if (carSize === Size.Small) {
      if (this.remainingSpots[Size.Small] > 0) {
        return [Size.Small, 1];
      } else if (this.remainingSpots[Size.Medium] > 0) {
        return [Size.Medium, 1];
      } else if (this.remainingSpots[Size.Large] > 0) {
        return [Size.Large, 1];
      }
    }

    console.log('returning null');
    return null;
  }

  /** checks availability, and parks car if available */
  parkCar(carSize: Size): boolean {
    const availableSpot = this.findSpot(carSize);
    if (availableSpot === null) {
      return false;
    }
    const [spotSize, spotsNeeded] = availableSpot;
    console.log(
      'should park at spot size',
      spotSize,
      'spots needed',
      spotsNeeded,
    );

    for (let i = 0; i < spotsNeeded; i++) {
      this.remainingSpots[spotSize]--;
      const spot = this.getAvailableSpot(spotSize);
      if (spot === null) {
        throw new Error('No available spot');
      }
      spot.parkedCar = carSize;
    }

    // alert if spots of a certain type are full
    Object.entries(this.remainingSpots).forEach(([size, count]) => {
      if (count === 0) {
        console.log(`All ${size} spots are taken.`);
      }
    });
    return false;
  }

  // remove car from parking lot, if it exists
  takeCar(carSize: Size): void {
    const spotIndex = this.spots.findIndex(
      (spot) => spot.parkedCar === carSize,
    );
    if (spotIndex === -1) {
      return;
    }
    // edge case: van parking in medium spots
    if (carSize === Size.Large && this.spots[spotIndex].size === Size.Medium) {
      this.remainingSpots[Size.Medium] += 3;
      for (let i = 0; i < 3; i++) {
        const spot = this.spots.find(
          (spot) => spot.parkedCar === carSize && spot.size === Size.Medium,
        );
        if (spot) {
          spot.parkedCar = null;
        }
      }
    } else {
      this.spots[spotIndex].parkedCar = null;
      this.remainingSpots[carSize]++;
    }
  }

  isFull(): boolean {
    return Object.values(this.remainingSpots).every((count) => count === 0);
  }

  isEmpty(): boolean {
    return Object.entries(this.remainingSpots).every(
      ([size, count]) =>
        count ===
        this.availableSpots[
          size as unknown as keyof typeof this.availableSpots // hm
        ],
    );
  }

  numSpotsTakenByCar(carSize: Size): number {
    return this.spots.filter((spot) => spot.parkedCar === carSize).length;
  }
}
export default ParkingLot;
