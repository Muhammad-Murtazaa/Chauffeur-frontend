import { fleetData } from '../data/fleetData';

const normalize = (value = '') => value.toLowerCase().replace(/[^a-z0-9]/g, '');

export function getVehicleImage(option) {
  const name = normalize(`${option?.name || ''} ${option?.displayName || ''}`);
  const category = normalize(`${option?.category || ''} ${option?.name || ''}`);

  // Prefer the locally bundled, branded fleet images over remote database URLs.
  if (name.includes('firstclass') || name.includes('executiveclass') || (name.includes('premium') && name.includes('sedan'))) {
    return '/premium-sedan.jfif';
  }
  if (name.includes('business') && name.includes('sedan')) return '/sedan.jfif';
  if (name.includes('midsize') && name.includes('suv')) return '/midsize-suv.jfif';
  if (name.includes('business') && name.includes('suv')) return '/business-suv.jfif';
  if (category.includes('sprinter') || category.includes('van')) {
    return name.includes('limo') ? '/sprinter-limo.jfif' : '/jet-sprinter.jfif';
  }
  if (category.includes('suv') || category.includes('utility')) return '/suv.jfif';
  if (category.includes('sedan')) return '/premium-sedan.jfif';

  const exactMatch = fleetData.find((vehicle) => normalize(vehicle.name) === name);
  if (exactMatch) return exactMatch.image;
  if (option?.imageUrl) return option.imageUrl;

  return fleetData[0]?.image;
}
