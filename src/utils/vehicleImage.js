import { fleetData } from '../data/fleetData';

const normalize = (value = '') => value.toLowerCase().replace(/[^a-z0-9]/g, '');

export function getVehicleBackgroundClass(option) {
  const name = normalize(`${option?.name || ''} ${option?.displayName || ''} ${option?.title || ''} ${option?.id || ''}`);

  if (name.includes('businesssedan')) {
    return 'bg-[linear-gradient(145deg,#293431_0%,#171e1b_68%,#0d1310_100%)]';
  }
  if (name.includes('firstclass') || name.includes('premiumsedan')) {
    return 'bg-[linear-gradient(145deg,#252a37_0%,#151a22_70%,#0d1116_100%)]';
  }
  if (name.includes('suv')) {
    return 'bg-[linear-gradient(145deg,#382d26_0%,#211d19_68%,#111411_100%)]';
  }
  if (name.includes('sprinter') || name.includes('van')) {
    return 'bg-[linear-gradient(145deg,#332b24_0%,#1e1b18_68%,#101411_100%)]';
  }

  return 'bg-[linear-gradient(145deg,#293431_0%,#171e1b_68%,#0d1310_100%)]';
}

export function getVehicleImage(option) {
  const name = normalize(`${option?.name || ''} ${option?.displayName || ''}`);
  const category = normalize(`${option?.category || ''} ${option?.name || ''}`);

  // Prefer the locally bundled, branded fleet images over remote database URLs.
  if (name.includes('firstclass') || name.includes('executiveclass') || (name.includes('premium') && name.includes('sedan'))) {
    return '/vehicle-premium-sedan.png';
  }
  if (name.includes('business') && name.includes('sedan')) return '/vehicle-business-sedan.png';
  if (name.includes('midsize') && name.includes('suv')) return '/vehicle-midsize-suv.png';
  if (name.includes('business') && name.includes('suv')) return '/vehicle-business-suv.png';
  if (category.includes('sprinter') || category.includes('van')) {
    return '/vehicle-sprinter.png';
  }
  if (category.includes('suv') || category.includes('utility')) return '/vehicle-premium-suv.png';
  if (category.includes('sedan')) return '/premium-sedan.jfif';

  const exactMatch = fleetData.find((vehicle) => normalize(vehicle.name) === name);
  if (exactMatch) return exactMatch.image;
  if (option?.imageUrl) return option.imageUrl;

  return fleetData[0]?.image;
}
