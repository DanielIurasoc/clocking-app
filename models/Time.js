// simple class for Time format
class Time {
  // numbers given as arguments to the constructor
  constructor(hours, minutes) {
    this.hours = hours;
    this.minutes = minutes;
  }

  // return a string of format hh:mm
  getTime() {
    const hh =
      this.hours < 10 ? '0' + this.hours.toString() : this.hours.toString();
    const mm =
      this.minutes < 10
        ? '0' + this.minutes.toString()
        : this.minutes.toString();

    return hh + ':' + mm;
  }
}

export default Time;
