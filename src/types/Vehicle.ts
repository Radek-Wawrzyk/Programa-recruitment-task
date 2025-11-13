type VehicleType = 'suv' | 'sedan';
type VehicleDrive = 'electric' | 'hybrid' | 'petrol' | 'diesel';
type VehicleDriveType = 'AWD' | 'FWD' | 'RWD';

interface VehicleFilters {
  type?: VehicleType;
  driveType?: VehicleDrive;
  priceMin: number;
  priceMax: number;
}

interface VehicleVersion {
  name: string;
  price: number;
}

type VehicleAddon = 'winter-tires' | 'accessories';

interface VehicleSpecification {
  accelerationTo100: number;
  maxSpeed: number;
  charging?: number;
  trunkCapacity: number;
  warranty: number;
}

interface VehicleColor {
  name: string;
  code: string;
}

interface VehicleImage {
  type: 'main' | 'thumbnail';
  url: string;
}

interface Vehicle {
  id: number;
  model: string;
  type: VehicleType;
  drive: VehicleDrive;
  driveType: VehicleDriveType;
  priceFrom: number;
  range: number;
  versions: VehicleVersion[];
  addons?: VehicleAddon[];
  colors: VehicleColor[];
  specification: VehicleSpecification;
  images: VehicleImage[];
}

interface CachedVehicle {
  vehicleId: number;
  offer: {
    model: string;
    version: string;
    color: string;
    addons: string[];
    price: number;
  };
}

export type {
  VehicleType,
  VehicleDrive,
  VehicleDriveType,
  VehicleFilters,
  VehicleVersion,
  VehicleAddon,
  Vehicle,
  CachedVehicle,
};
