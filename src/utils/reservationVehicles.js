const priorityNames = ['Business Sedan', 'Executive Full-Size SUV', 'First Class', 'Sprinter'];
const priorityModels = [
  'Cadillac Lyriq or similar.',
  'Cadillac Escalade or Chevrolet Suburban or similar.',
  'Mercedes-Benz S-Class or similar.',
  'Mercedes-Benz Sprinter or similar.',
];

function normalizedName(option) {
  return `${option?.name || ''} ${option?.category || ''}`.toLowerCase().replace(/[^a-z0-9]/g, '');
}

export function reservationVehicleRank(option) {
  const name = normalizedName(option);
  if (name.includes('business') && name.includes('sedan')) return 0;
  if (name.includes('fullsize') && name.includes('suv')) return 1;
  if (name.includes('firstclass')) return 2;
  if (name.includes('sprinter')) return 3;
  return -1;
}

export function reservationVehicleLabel(option) {
  const rank = reservationVehicleRank(option);
  return rank >= 0 ? priorityNames[rank] : option?.name || 'Vehicle';
}

export function reservationVehicleModel(option) {
  const rank = reservationVehicleRank(option);
  if (rank >= 0) return priorityModels[rank];
  return option?.modelDescription || option?.description || '';
}

export function orderReservationVehicles(options = []) {
  const usedRanks = new Set();
  return options
    .map((option) => ({ option, rank: reservationVehicleRank(option) }))
    .filter(({ rank }) => rank >= 0)
    .sort((a, b) => a.rank - b.rank)
    .filter(({ rank }) => {
      if (usedRanks.has(rank)) return false;
      usedRanks.add(rank);
      return true;
    })
    .map(({ option, rank }) => ({ ...option, displayName: priorityNames[rank] }));
}
