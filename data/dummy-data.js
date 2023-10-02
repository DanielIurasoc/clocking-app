import ClockingEntry from '../models/clockingEntry.js';

const ENTRIES = [
  new ClockingEntry(
    '001',
    'u001',
    'l001',
    new Date(2023, 8, 29),
    '08:00',
    '17:30',
    8,
    '29 Sept 2023, Iurasoc, Location 1',
    'Work was done on Location 1. Type of work tbd'
  ),
  new ClockingEntry(
    '002',
    'u001',
    'l001',
    new Date(2023, 8, 30),
    '08:00',
    '17:30',
    8,
    '30 Sept 2023, Iurasoc, Location 1',
    'Work was done on Location 1. I dont know how'
  ),
  new ClockingEntry(
    '003',
    'u002',
    'l001',
    new Date(2023, 8, 29),
    '08:00',
    '17:30',
    8,
    '29 Sept 2023, Popescu, Location 1',
    'Work was done on Location 1. Please pay me more'
  ),
  new ClockingEntry(
    '004',
    'u002',
    'l002',
    new Date(2023, 8, 30),
    '08:00',
    '17:30',
    8,
    '30 Sept 2023, Popescu, Location 2',
    'Work was done on Location 2. What am I even doing?'
  ),
];

export default ENTRIES;
