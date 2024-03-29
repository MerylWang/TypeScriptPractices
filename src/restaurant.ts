// Restaurant Table Reservation System:
// Create a system that allows users to reserve tables at a restaurant for a specific date and time.
// The system should manage table availability and prevent double-booking.

// Input: A form where the user can select the date, time, number of people, and any special requests.

// Output: Confirmation of the reservation or an error message if the requested time is not available.

// Considerations: Implement functionality to adjust for restaurant opening hours, different table sizes, and the possibility of accommodating special requests.
// - special requests: text

// Stretch: Design the system to scale for use by multiple restaurants with varying capacities and reservation policies.

/**
 * assumption:
 * - time increments of 1 hour
 * - reservation cannot span over a day
 *
 * Reservation
 *  - id
 *  - startTime: datetime
 *  - endTime
 *  - number of people
 *  - special requests
 * Restaurant
 *  - startTime
 *  - endTime
 *  - capacity (num seats)
 *  - availability: {day: { hour: capacity  } ...}
 *  - reservations: Reservation[]
 *
 *  - addReservation(startTime, endTime, numPeople, specialRequests): boolean
 */

class Restaurant {
  startTime: Date;
  endTime: Date;
  capacity: number;
  availability: Map<string, Map<number, number>>; // day.toString: { hour: capacity  }
  reservations: Reservation[];

  constructor(startTime: number, endTime: number, capacity: number) {
    this.startTime = startTime;
    this.endTime = endTime;
    this.capacity = capacity;
    this.availability = {};
    // initialize availability
    this.reservations = [];
  }

  addReservation(
    startTime: Date,
    endTime: Date,
    numPeople: number,
    specialRequests: string,
  ): boolean {
    // if startTime is earlier than store's or endTime is later than store's: return false

    // if availability is empty: continue booking
    // isValid = true
    // for each hour in the reservation
    // - if hour in availability: check if availability[hour] >= numPeople
    // - ow. check if numPeople >= capacity
    // if booking is successful:
    // decrement availability for each hour in reservation
    // create Reservation
    if (startTime < this.startTime || endTime > this.endTime) {
      return false;
    }

    let isValid = true;
    const todayStr = startTime.getDay().toString();

    const todayAvail = this.availability.get(todayStr) || new Map();

    for (
      let hour = startTime;
      hour < endTime;
      hour.setHours(hour.getHours() + 1)
    ) {
      const hourAvail = todayAvail.get(hour.getHours()) || this.capacity;
      isValid = hourAvail >= numPeople;
      if (!isValid) {
        break;
      }
    }

    if (isValid) {
      this.availability.set(todayStr, todayAvail);
      this.reservations.push(
        new Reservation(startTime, endTime, numPeople, specialRequests),
      );
    }
    return isValid;
  }
}
