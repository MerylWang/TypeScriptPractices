// Basic coding challenge
// Say, an organization issues ID cards to its employees with unique ID codes.
// The ID code for an employee named Jigarius Caesar looks as follows: CAJI202002196.

// Here’s how the ID code is derived:

// CA: First 2 characters of the employee’s last name.
// JI: First 2 characters of the employee’s first name.
// 2020: Full year of joining.
// 02: 2 digit representation of the month of joining.
// 19: Indicates that this is the 19th employee who joined in Feb 2020.
// This will have at least 2 digits, starting with 01, 02, and so on.
// 6: The last digit is a verification digit which is computed as follows:
// Take the numeric part of the ID code (without the verification digit).
//      - Sum all digits in odd positions. Say this is O.
//      - Sum all digits in even positions. Say this is E.
//      - Difference between O & E. Say this is V.
//      - If V is negative, ignore the sign, e.g., -6 is treated as 6. Say this is V.
//      - If V is greater than 9, divide it by 10 and take the reminder. Say this is V.
//      - V is the verification code.
//      - For the above ID card, here’s how you‘ll test the verification digit.

// CAJI202002196 # ID code
// 202002196 # Numeric part
// 20200219 # Ignoring verification digit
// 2 + 2 + 0 + 1 = 5 # Sum of odd position digits, i.e. O
// 0 + 0 + 2 + 9 = 11 # Sum of even position digits, i.e. E
// 5 - 11 = -6 # V = O - E
// 6 # Verification digit, ignoring sign
// An ID code is considered valid if:

// The first 4 characters of the card are correct, i.e. CAJI.
// The verification digit is correct, i.e. 6.

function getVerificationDigit(code: string): string {
  const numericParts = code.slice(4, code.length - 1);
  let oddSum = 0;
  let evenSum = 0;
  for (let i = 0; i < numericParts.length; i++) {
    if (i % 2 === 0) {
      evenSum += parseInt(numericParts[i]);
    } else {
      oddSum += parseInt(numericParts[i]);
    }
  }

  const charIndex = Math.abs(oddSum - evenSum) % 10;
  const aIndex = 'a'.charCodeAt(0); // 97
}
function genEmployeeID({
  lastName,
  firstName,
  joinYear,
  joinMonth,
  nthEmployee,
}: {
  lastName: string;
  firstName: string;
  joinYear: number;
  joinMonth: number;
  nthEmployee: number;
}): string {
  if (lastName.length < 2 || firstName.length < 2) {
    throw new Error(
      'First name and last name should be at least 2 characters long',
    );
  }
  // throw error is first two chars of lastName or firstName contain non-alphabets
  if (
    !/^[a-zA-Z]+$/.test(lastName.slice(0, 2)) ||
    !/^[a-zA-Z]+$/.test(firstName.slice(0, 2))
  ) {
    throw new Error(
      'First two characters of first name and last name should be alphabets',
    );
  }

  // check joinYear is four digits
  if (joinYear.toString().length !== 4) {
    throw new Error('Please enter a valid year');
  }

  if (joinMonth < 1 || joinMonth > 12) {
    throw new Error('Please enter a month between 1 to 12');
  }

  // happy path
  let result = '';
  result += lastName.slice(0, 2).toUpperCase();
  result += firstName.slice(0, 2).toUpperCase();
  result += joinYear.toString();
  result += joinMonth.toString().padStart(2, '0');
  result += nthEmployee.toString().padStart(2, '0');

  const verificationDigit = getVerificationDigit(result);

  return result;
}

/**
 * Product Questions
 *  - do we always expect the same length for the code?
 *     - what if we hired thousands (or more) employees in one month
 * Architecture
 * - genEmployeeID(lastName: string, firstName: string, year: number, month: number, nthEmployee:number): string
 *
 * Testing Strategy
 * - genEmployeeID("Caesar", "Jigarius", 2020, 2, 19) => "CAJI202002196"
 *
 * - lastName, firstName:
 *    - empty string
 *    - 1 character
 *    - 2-n characters
 * - joinYear
 *    - valid range?
= *   - future join date: gonna leave flexible and allow 
 *   - should be 4 digits; otherwise invalid
 *   - *if person is born before 1970, they might not be stored in UTC. In JavaScript Date object, this value might be negative

     - before 1970 
     - 1970-current 
     - future (>current)
 * - joinMonth: 1-12
 *    - values outside this range should be invalid
 *    - negative values should be invalid
 *    - 0 should be invalid
 *    - values > 12
 * - nthEmployee: 1-99
 *    - single digits: string should be double digit
 *    - 10-99: string should be double digit
 *    - >99: should be as is
 */
