class ClockingEntry {
  constructor(
    id,
    ownerId,
    locationId,
    date,
    startTime,
    endTime,
    duration,
    title,
    description
  ) {
    // entry unique identifier
    this.id = id;

    // owner's id (employee)
    this.ownerId = ownerId;

    // location id (where was the work done)
    this.locationId = locationId;

    // date + time (when was the work done, duration in hours)
    this.date = date; // new Date(year, month, day)
    this.startTime = startTime;
    this.endTime = endTime;

    // needs to be automatically calculated, not input
    this.duration = duration;

    // entry title (automatically generated)
    this.title = title;

    // description (should the employee add some remarks)
    this.description = description;

    // to add photos
  }
}

export default ClockingEntry;
