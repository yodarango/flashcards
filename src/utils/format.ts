export function format() {
  function thousandSeparator(number: number): string {
    // Convert the number to a string
    let numberString = number.toString();

    // Use a regular expression to add commas every thousand
    let formattedNumber = numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return formattedNumber;
  }

  return {
    thousandSeparator,
  };
}
