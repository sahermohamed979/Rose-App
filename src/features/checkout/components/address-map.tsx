'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
} from 'react-leaflet';
import L from 'leaflet';
import { LoaderCircle, MapPinIcon, WifiOff } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

import { Button } from '@/shared/components/ui/button';

const DEFAULT_CENTER: [number, number] = [30.0444, 31.2357]; // Cairo [lat, lng]
const DEFAULT_ZOOM = 12;

type Coordinates = {
  latitude: number;
  longitude: number;
};

interface AddressMapProps {
  city: string;
  street: string;
  latitude?: string;
  longitude?: string;
  onLocationChange?: (coords: {
    latitude: string;
    longitude: string;
  }) => void;
}

const markerIcon = L.icon({
  iconUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

async function geocodeAddress(
  city: string,
  street: string
): Promise<Coordinates | null> {
  const query = [street, city].filter(Boolean).join(', ');

  if (!query.trim()) {
    return null;
  }

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(query)}`,
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );

    if (!response.ok) {
      return null;
    }

    const results: Array<{ lat: string; lon: string }> =
      await response.json();

    if (!results[0]) {
      return null;
    }

    return {
      latitude: Number(results[0].lat),
      longitude: Number(results[0].lon),
    };
  } catch {
    return null;
  }
}

function getInitialCoordinates(
  latitude?: string,
  longitude?: string
): Coordinates {
  const lat = Number(latitude);
  const lng = Number(longitude);

  if (
    !Number.isNaN(lat) &&
    !Number.isNaN(lng) &&
    latitude &&
    longitude
  ) {
    return { latitude: lat, longitude: lng };
  }

  return {
    latitude: DEFAULT_CENTER[0],
    longitude: DEFAULT_CENTER[1],
  };
}

function MapCenter({ coordinates }: { coordinates: Coordinates }) {
  const map = useMap();

  useEffect(() => {
    map.setView(
      [coordinates.latitude, coordinates.longitude],
      map.getZoom()
    );
  }, [coordinates.latitude, coordinates.longitude, map]);

  return null;
}

function DraggableMarker({
  coordinates,
  onDragEnd,
}: {
  coordinates: Coordinates;
  onDragEnd: (coords: Coordinates) => void;
}) {
  const markerRef = useRef<L.Marker | null>(null);

  const eventHandlers = useMemo(
    () => ({
      dragend: () => {
        const marker = markerRef.current;
        if (!marker) {
          return;
        }

        const { lat, lng } = marker.getLatLng();
        onDragEnd({ latitude: lat, longitude: lng });
      },
    }),
    [onDragEnd]
  );

  return (
    <Marker
      draggable
      position={[coordinates.latitude, coordinates.longitude]}
      icon={markerIcon}
      eventHandlers={eventHandlers}
      ref={markerRef}
    />
  );
}

export default function AddressMap({
  city,
  street,
  latitude,
  longitude,
  onLocationChange,
}: AddressMapProps) {
  // Translations
  const t = useTranslations('address');

  // State
  const [coordinates, setCoordinates] = useState<Coordinates>(() =>
    getInitialCoordinates(latitude, longitude)
  );
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(
    null
  );
  const [isMapLoading, setIsMapLoading] = useState(true);
  const [mapError, setMapError] = useState<string | null>(null);

  // Functions
  const updateCoordinates = (next: Coordinates) => {
    setCoordinates(next);
    onLocationChange?.({
      latitude: String(next.latitude),
      longitude: String(next.longitude),
    });
  };

  const handleMapLoading = () => {
    setIsMapLoading(true);
  };

  const handleMapLoad = () => {
    setIsMapLoading(false);
  };

  const handleMapError = () => {
    setIsMapLoading(false);
    setMapError(t('mapUnavailable'));
  };

  // Sync initial pin to parent so submit always has lat/lng
  useEffect(() => {
    if (latitude && longitude) {
      return;
    }

    onLocationChange?.({
      latitude: String(coordinates.latitude),
      longitude: String(coordinates.longitude),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFindMyLocation = () => {
    if (!('geolocation' in navigator)) {
      setLocationError(t('locationDenied'));
      return;
    }

    setIsLocating(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        updateCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setIsLocating(false);
      },
      () => {
        setLocationError(t('locationDenied'));
        setIsLocating(false);
      },
      { timeout: 10000 }
    );
  };

  // Effects
  useEffect(() => {
    const handleOffline = () => {
      setIsMapLoading(false);
      setMapError(t('mapUnavailable'));
    };

    const handleOnline = () => {
      setMapError(null);
      setIsMapLoading(true);
    };

    if (!navigator.onLine) {
      handleOffline();
    }

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, [t]);

  useEffect(() => {
    if (latitude && longitude) {
      return;
    }

    let isCancelled = false;

    const resolveLocation = async () => {
      const geocoded = await geocodeAddress(city, street);

      if (isCancelled || !geocoded) {
        return;
      }

      updateCoordinates(geocoded);
    };

    void resolveLocation();

    return () => {
      isCancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city, street, latitude, longitude]);

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="relative h-80 w-full overflow-hidden rounded-xl border border-border-muted z-0">
        <MapContainer
          center={[coordinates.latitude, coordinates.longitude]}
          zoom={DEFAULT_ZOOM}
          scrollWheelZoom
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            eventHandlers={{
              loading: handleMapLoading,
              load: handleMapLoad,
              tileerror: handleMapError,
            }}
          />
          <MapCenter coordinates={coordinates} />
          <DraggableMarker
            coordinates={coordinates}
            onDragEnd={updateCoordinates}
          />
        </MapContainer>

        {isMapLoading && !mapError && (
          <div
            className="absolute inset-0 z-1000 flex flex-col items-center justify-center gap-3 bg-bg-plain/90 text-text-default"
            role="status"
          >
            <LoaderCircle className="size-8 animate-spin text-text-primary" />
            <span className="text-sm font-medium">
              {t('mapLoading')}
            </span>
          </div>
        )}

        {mapError && (
          <div
            className="absolute inset-0 z-1000 flex flex-col items-center justify-center gap-3 bg-bg-plain/90 px-6 text-center text-text-default"
            role="alert"
          >
            <WifiOff className="size-8 text-destructive" />
            <span className="text-sm font-medium">{mapError}</span>
          </div>
        )}

        <Button
          type="button"
          variant="secondary"
          onClick={handleFindMyLocation}
          disabled={isLocating}
          className="absolute inset-s-4 top-4 z-1000 gap-0 rounded-xl border border-border-primary bg-bg-plain px-2 py-4 text-sm font-semibold leading-5 text-text-primary"
        >
          <MapPinIcon className="me-2 size-5" />
          {t('findMyLocation')}
        </Button>
      </div>

      {locationError && (
        <p className="text-sm text-destructive">{locationError}</p>
      )}
    </div>
  );
}
