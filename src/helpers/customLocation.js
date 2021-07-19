import { customLocations } from '../constants/customLocations';

export function getCustomLocation(loc) {
  return customLocations[loc.toLowerCase()];
}
