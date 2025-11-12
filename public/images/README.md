# Folder ze zdjęciami pojazdów

## Jak to działa?

1. **Vite automatycznie serwuje pliki z folderu `public`** - wszystko co jest w `public` jest dostępne pod ścieżką `/` w aplikacji
2. **JSON Server serwuje tylko API** - nie obsługuje plików statycznych, więc zdjęcia są serwowane przez Vite
3. **W produkcji** - Vite automatycznie kopiuje zawartość `public` do `dist` podczas builda

## Struktura

Umieść tutaj zdjęcia pojazdów zgodnie ze ścieżkami zdefiniowanymi w `db.json`:

- `/images/voltura-zx-main.jpg` - główne zdjęcie Voltura ZX
- `/images/voltura-zx-thumb1.jpg` - miniatura 1
- `/images/voltura-zx-thumb2.jpg` - miniatura 2
- `/images/voltura-zx-thumb3.jpg` - miniatura 3
- `/images/voltura-px-main.jpg` - główne zdjęcie Voltura PX
- `/images/voltura-sx-main.jpg` - główne zdjęcie Voltura SX
- `/images/placeholder-car.jpg` - placeholder (opcjonalnie, jeśli zdjęcie nie istnieje)

## Użycie w kodzie

Zdjęcia są już zintegrowane w komponentach:

- `VehicleCard` używa `imageUrl` prop
- `VehicleList` automatycznie znajduje główne zdjęcie z `images` array
- Fallback na placeholder jeśli zdjęcie nie istnieje

## Przykład

W `db.json`:

```json
"images": [
  {
    "type": "main",
    "url": "/images/voltura-zx-main.jpg"
  }
]
```

W komponencie Vue:

```vue
<img :src="imageUrl" :alt="model" />
```

Vite automatycznie zmapuje `/images/voltura-zx-main.jpg` na plik z `public/images/voltura-zx-main.jpg`
