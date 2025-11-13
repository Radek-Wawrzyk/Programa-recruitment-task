# Project Documentation - Vehicle Browsing Application

## 📋 Table of Contents

1. [Project Description](#project-description)
2. [Task Requirements](#task-requirements)
3. [Technologies](#technologies)
4. [Project Structure](#project-structure)
5. [Installation and Setup](#installation-and-setup)
6. [Application Architecture](#application-architecture)
7. [Main Features](#main-features)
8. [Composables](#composables)
9. [API and Data](#api-and-data)
10. [Styling](#styling)
11. [Internationalization](#internationalization)

---

## 📝 Project Description

A web application for browsing and configuring electric and hybrid vehicles for the fictional **Voltura** brand. This project was created as a recruitment task based on Figma mockups.

Users can:

- Browse a list of available vehicles
- Filter vehicles by type, drive type, and price range
- Open detailed modals with vehicle configuration
- Select version, color, and additional equipment
- Save configuration to localStorage
- View vehicle images with the ability to swap the main image

---

## 📋 Task Requirements

This project was built according to the following requirements:

### Original Requirements:

- **Technologies:** HTML5, CSS, and Bootstrap (for layout and basic components), with JavaScript or a framework (Svelte, React) for logic
- **Data Source:** Local JSON file (no backend)
- **Design:** Based on Figma mockups at [Figma Design](https://www.figma.com/design/0erZCITsI66pG54XATDXLo/Untitled?node-id=0-1&p=f)

### Functional Requirements:

1. **Homepage:**
   - Section "Gama naszych samochodów" (Our Vehicle Range)
   - Vehicle cards displayed in a grid layout
   - Filter bar above the grid (vehicle type, drive type, price range)
   - Real-time grid update when filters change

2. **Vehicle Details Modal:**
   - Opens when clicking "Sprawdź" (Check) button on vehicle card
   - Image gallery with main image and thumbnails
   - Clicking a thumbnail swaps it with the main image
   - Configuration options: model, version, color, addons, price
   - Save to localStorage when clicking "Znajdź dealera" (Find dealer) or "Znajdź punkt sprzedaży" (Find sales point)

### Implementation Decisions:

- **Framework:** Vue 3 (Composition API) was chosen instead of React/Svelte for better developer experience and modern reactive patterns
- **Styling:** Custom SCSS was written instead of Bootstrap to better match the Figma design and create more tailored, maintainable styles
- **TypeScript:** Added for better type safety and developer experience
- **Data:** Using `json-server` to simulate a REST API while still working with local JSON data (`db.json`)

---

## 🛠 Technologies

### Core Technologies:

- **Vue 3** (Composition API) - frontend framework
- **TypeScript** - static typing
- **Vite** - build tool
- **Vue Router** - routing
- **Vue I18n** - internationalization
- **Axios** - API communication
- **SCSS** - CSS preprocessor

### Development Tools:

- **json-server** - mock API server
- **ESLint** + **Oxlint** - linting
- **Prettier** - code formatting
- **vue-tsc** - TypeScript type checking

---

## 📁 Project Structure

```
src/
├── api/                    # API layer
│   ├── client.ts          # Axios configuration
│   └── services/
│       └── vehicle.ts     # Vehicle fetching service
│
├── assets/                 # Static assets
│   ├── home/              # Homepage images
│   └── logo.svg           # Application logo
│
├── components/            # Vue components
│   ├── App/              # Application components
│   │   ├── AppFooter/    # Application footer
│   │   └── AppNavigation/ # Main navigation
│   │
│   ├── Base/             # Base components (reusable)
│   │   ├── BaseAccordion/      # Accordion
│   │   ├── BaseButton/         # Button
│   │   ├── BaseCard/           # Card
│   │   ├── BaseCategorySelector/ # Category selector
│   │   ├── BaseColorSelector/   # Color selector
│   │   ├── BaseInput/           # Input field
│   │   ├── BaseModal/           # Modal (with Teleport)
│   │   └── BaseSelect/          # Select dropdown
│   │
│   ├── Home/             # Homepage components
│   │   ├── HomeCta/      # Call-to-action
│   │   ├── HomeDetails/  # Details
│   │   ├── HomeHeader/   # Header
│   │   ├── HomeInfo/     # Information
│   │   └── HomeOffer/    # Offers section
│   │
│   └── Vehicle/          # Vehicle-related components
│       ├── VehicleCard/          # Vehicle card
│       ├── VehicleDetailsModal/  # Details modal
│       ├── VehicleFilters/       # Vehicle filters
│       └── VehicleList/          # Vehicle list
│
├── composables/          # Composables (reusable logic)
│   ├── useCacheVehicle.ts  # Vehicle cache management (localStorage)
│   ├── usePrice.ts         # Price formatting
│   ├── useSanitize.ts      # Data sanitization
│   └── useVehicles.ts      # Vehicle logic (fetching, filtering)
│
├── constants/            # Constants
│   └── StorageKeys.ts   # localStorage keys
│
├── i18n/                # Internationalization
│   ├── index.ts         # i18n configuration
│   └── locales/
│       └── pl.json      # Polish translations
│
├── router/              # Routing
│   └── index.ts        # Router configuration
│
├── styles/              # Global styles
│   ├── main.scss       # Main stylesheet
│   └── modules/
│       ├── layout.scss      # Layout styles
│       ├── reset.scss       # CSS reset
│       ├── typography.scss  # Typography
│       └── variables.scss   # SCSS variables
│
├── types/               # TypeScript type definitions
│   └── Vehicle.ts      # Vehicle-related types
│
├── utils/               # Utility functions
│   └── index.ts
│
├── views/               # Views (pages)
│   └── HomePage/
│       └── HomePage.vue
│
├── App.vue              # Main application component
└── main.ts              # Application entry point
```

---

## 🚀 Installation and Setup

### Requirements:

- Node.js: `^20.19.0 || >=22.12.0`
- npm or yarn

### Install dependencies:

```bash
npm install
```

### Run in development mode:

**Terminal 1 - Application:**

```bash
npm run dev
```

**Terminal 2 - Mock API Server:**

```bash
npm run server
```

Application will be available at: `http://localhost:5173`  
API will be available at: `http://localhost:3001`

### Production build:

```bash
npm run build
```

### Preview build:

```bash
npm run preview
```

### Other commands:

```bash
# TypeScript type checking
npm run type-check

# Linting
npm run lint

# Code formatting
npm run format
```

---

## 🏗 Application Architecture

### Architectural Patterns:

1. **Composition API** - Vue 3 Composition API for component logic
2. **Composables** - Reusable logic in separate files
3. **Component-based Architecture** - Application built from components
4. **Separation of Concerns** - Separation of business logic from UI

### Data Flow:

```
API (json-server)
  ↓
vehicleService (api/services/vehicle.ts)
  ↓
useVehicles (composables/useVehicles.ts)
  ↓
HomeOffer → VehicleFilters → VehicleList → VehicleCard
  ↓
VehicleDetailsModal (with cache in localStorage)
```

### State Management:

- **Reactive State** - using Vue 3 `ref` and `computed`
- **Local Storage** - cache vehicle configurations (`useCacheVehicle`)
- **Composables** - state management in composables

---

## ✨ Main Features

### 1. Vehicle Browsing

- Displaying a list of vehicles as cards
- Each card contains: image, model, price, drive type, range

### 2. Vehicle Filtering

- Filter by vehicle type (SUV/Sedan)
- Filter by drive type (electric/hybrid/petrol/diesel)
- Filter by price range (min-max)

### 3. Vehicle Details Modal

- Displaying detailed vehicle information
- Image gallery with ability to swap main image
- Configuration:
  - Vehicle version selection
  - Color selection
  - Additional equipment selection (multi-select)
- Dynamic price calculation based on selected configuration
- Save configuration to localStorage

### 4. Configuration Cache

- Automatic saving of selected configuration
- Restoring saved configuration when reopening modal
- Updating existing configuration instead of duplicating

### 5. Responsive Design

- Layout adapted to different screen sizes
- Modal with responsive layout (50/50 on large screens, stacked on small)

---

## 🔧 Composables

### `useVehicles`

Vehicle management:

- `vehicles: Ref<Vehicle[]>` - list of all vehicles
- `filteredVehicles: ComputedRef<Vehicle[]>` - filtered vehicles
- `isLoading: Ref<boolean>` - loading state
- `filters: Ref<VehicleFilters>` - current filters
- `fetchVehicles()` - fetch vehicles from API
- `getVehicleById(id)` - get vehicle by ID
- `setFilters(newFilters)` - set filters

### `useCacheVehicle`

Vehicle configuration cache management in localStorage:

- `getVehicleFromCache(vehicleId)` - get saved configuration
- `saveVehicle(vehicleId, offer)` - save/update configuration
  - Checks if vehicle already exists in cache
  - If exists - updates data
  - If not exists - adds new entry

**Cache structure:**

```typescript
{
  vehicleId: number,
  offer: {
    model: string,
    version: string | null,
    color: string | null,
    addons: string[],
    price: number
  }
}[]
```

### `usePrice`

Price formatting:

- `formatPrice(price: number)` - formats price with PLN currency
- Uses `Intl.NumberFormat` with `style: 'currency'`
- Automatically adds currency symbol (zł)

### `useSanitize`

Data sanitization (e.g., HTML):

- Functions for cleaning input data

---

## 📡 API and Data

### Mock API (json-server)

**Endpoint:**

- `GET /vehicles` - fetches list of all vehicles

**Data file:** `db.json`

**Vehicle structure:**

```json
{
  "id": 1,
  "model": "Voltura ZX 2025",
  "type": "suv",
  "drive": "electric",
  "driveType": "AWD",
  "priceFrom": 100999,
  "range": 400,
  "versions": [{ "name": "Basic", "price": 129999 }],
  "colors": [{ "name": "Dark", "code": "#1F2937" }],
  "addons": ["winter-tires", "accessories"],
  "specification": {
    "accelerationTo100": 5.2,
    "maxSpeed": 200,
    "charging": 150,
    "trunkCapacity": 500,
    "warranty": 5
  },
  "images": [
    { "type": "main", "url": "/images/..." },
    { "type": "thumbnail", "url": "/images/..." }
  ]
}
```

### Images

Images are served by Vite from the `public/images/` folder.  
In `db.json`, absolute paths are used: `/images/filename.jpg`

---

## 🎨 Styling

### Style System:

1. **SCSS Modules** - each component has its own `.scss` file
2. **BEM Methodology** - class naming according to BEM
3. **CSS Variables** - variables in `variables.scss`:
   - Colors (primary, secondary, text, background, border)
   - Typography (font-family, font-weight, font-size)
   - Spacing, border-radius, shadows

### Responsiveness:

- **Mobile First** - designing from smallest screens
- **Breakpoints:**
  - `max-width: 576px` - mobile
  - `max-width: 1024px` - tablet
  - `min-width: 1200px` - desktop

### Class Examples:

```scss
.vehicle-details-modal {
  &__content {
    display: grid;
    grid-template-columns: 660px 1fr; // Desktop: 660px + rest

    @media (max-width: 1200px) {
      grid-template-columns: 1fr 1fr; // Tablet: 50/50
    }

    @media (max-width: 1024px) {
      grid-template-columns: 1fr; // Mobile: stacked
    }
  }
}
```

---

## 🌍 Internationalization

### Configuration (vue-i18n):

- **Default language:** Polish (`pl`)
- **Translation file:** `src/i18n/locales/pl.json`

### Usage in components:

```vue
<template>
  {{ $t('vehicle.model') }}
</template>

<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const label = t('vehicle.price');
</script>
```

### Translation structure:

```json
{
  "vehicle": {
    "model": "Model",
    "price": "Price",
    "from": "from",
    "check": "Check",
    "version": "Version",
    "color": "Color",
    "addons": "Addons",
    "specifications": "Specifications",
    "findDealer": "Find dealer",
    "findSalesPoint": "Find sales point"
  }
}
```

---

## 📝 TypeScript Types

### Main Types (`src/types/Vehicle.ts`):

```typescript
// Basic types
type VehicleType = 'suv' | 'sedan';
type VehicleDrive = 'electric' | 'hybrid' | 'petrol' | 'diesel';
type VehicleDriveType = 'AWD' | 'FWD' | 'RWD';
type VehicleAddon = 'winter-tires' | 'accessories';

// Interfaces
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

interface VehicleFilters {
  type?: VehicleType;
  driveType?: VehicleDrive;
  priceMin: number;
  priceMax: number;
}

interface VehicleOffer {
  model: string;
  version: string | null;
  color: string | null;
  addons: string[];
  price: number;
}

interface CachedVehicle {
  vehicleId: number;
  offer: VehicleOffer;
}
```

---

## 🔑 Key Technical Features

### 1. Vue 3 v-model

All base components use Vue 3 `v-model`:

- `modelValue` prop
- `update:modelValue` emit

### 2. Teleport for Modals

`BaseModal` uses `Teleport` to render in `body`, which ensures:

- Correct z-index stacking
- Avoiding overflow issues
- Better focus trap management

### 3. Reactive State Management

- Using `ref` and `computed` for reactive state
- Composables as source of truth for data

### 4. Cache Strategy

- localStorage for data persistence
- Automatic state restoration when opening modal
- Update instead of duplicating entries

### 5. Image Swapping

- Swapping main image with thumbnails
- Preserving image order
- Reset when vehicle changes

---

## 🚦 Project Status

✅ **All Task Requirements Implemented:**

- ✅ Homepage with "Gama naszych samochodów" section
- ✅ Vehicle cards in grid layout
- ✅ Filter bar (vehicle type, drive type, price range)
- ✅ Real-time grid update on filter changes
- ✅ Vehicle details modal on "Sprawdź" button click
- ✅ Image gallery with main image and thumbnails
- ✅ Image swapping (clicking thumbnail swaps with main image)
- ✅ Configuration options (version, color, addons)
- ✅ Dynamic price calculation
- ✅ Save to localStorage on "Znajdź dealera" / "Znajdź punkt sprzedaży" click
- ✅ Data loaded from local JSON file (`db.json`)

### Additional Features:

- Responsive design
- Internationalization (PL)
- TypeScript for type safety
- Component-based architecture
- Configuration cache restoration

---

## 📚 Additional Information

### Node.js Requirements:

Project requires Node.js version `^20.19.0 || >=22.12.0`

### Ports:

- **Application:** `5173` (Vite dev server)
- **API:** `3001` (json-server)
