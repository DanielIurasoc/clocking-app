import Clocking from '../models/Clocking.js';

const ENTRIES = [
  new Clocking(
    '001',
    'u001',
    'l001',
    '29 Sept 2023, Iurasoc, Location 1',
    'Work was done on Location 1. Type of work tbd',
    '08:00',
    '17:30',
    new Date(2023, 8, 29)
  ),
  new Clocking(
    '002',
    'u001',
    'l001',
    '30 Sept 2023, Iurasoc, Location 1',
    'Work was done on Location 1. I dont know how',
    '08:00',
    '17:30',
    new Date(2023, 8, 30)
  ),
  new Clocking(
    '003',
    'u002',
    'l001',
    '29 Sept 2023, Popescu, Location 1',
    'Work was done on Location 1. Please pay me more',
    '08:00',
    '17:30',
    new Date(2023, 8, 29)
  ),
  new Clocking(
    '004',
    'u002',
    'l002',
    '30 Sept 2023, Popescu, Location 2',
    'Work was done on Location 2. What am I even doing?',
    '08:00',
    '17:30',
    new Date(2023, 8, 30)
  ),
];

export default ENTRIES;
