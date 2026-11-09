import { Check } from 'lucide-react';
import { getVehicleBackgroundClass, getVehicleImage } from '../utils/vehicleImage';
import { reservationVehicleLabel, reservationVehicleModel } from '../utils/reservationVehicles';

export default function VehicleSelectionCard({ option, selected, disabled = false, onSelect, priceLabel }) {
  const label = reservationVehicleLabel(option);
  const model = reservationVehicleModel(option);

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onSelect}
      className={`relative w-[220px] max-w-full shrink-0 snap-start rounded-2xl border p-2.5 text-left transition ${
        selected ? 'border-gold bg-gold/10 ring-1 ring-gold/60' : 'border-white/10 bg-white/[.03]'
      } ${disabled ? 'cursor-default opacity-80' : 'hover:border-gold/60'}`}
    >
      <img
        src={getVehicleImage(option)}
        alt={label}
        className={`mb-2 h-32 w-full rounded-xl object-contain ${getVehicleBackgroundClass(option)}`}
        loading="lazy"
      />
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="text-sm font-bold text-white">{label}</div>
          <div className="mt-1 text-xs text-neutral-400">{option.passengerCapacity} passengers · {option.luggageCapacity} bags</div>
        </div>
        {selected && <Check className="h-4 w-4 shrink-0 text-gold" />}
      </div>
      {model && <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-neutral-400">{model}</p>}
      <div className="mt-3 border-t border-white/10 pt-2 text-sm font-semibold text-gold">{priceLabel}</div>
    </button>
  );
}
