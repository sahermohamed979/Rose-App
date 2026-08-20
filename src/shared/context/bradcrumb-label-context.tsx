'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  useEffect,
} from 'react';

type BreadcrumbLabelsMap = Record<string, string>;

interface BreadcrumbLabelsContextValue {
  labels: BreadcrumbLabelsMap;
  setLabel: (segment: string, label: string) => void;
}

const BreadcrumbLabelsContext = createContext<
  BreadcrumbLabelsContextValue | undefined
>(undefined);

export function BreadcrumbLabelsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [labels, setLabels] = useState<BreadcrumbLabelsMap>({});

  const setLabel = useCallback((segment: string, label: string) => {
    setLabels((prev) => {
      if (prev[segment] === label) {
        return prev;
      }
      return { ...prev, [segment]: label };
    });
  }, []);

  return (
    <BreadcrumbLabelsContext.Provider value={{ labels, setLabel }}>
      {children}
    </BreadcrumbLabelsContext.Provider>
  );
}

export function useBreadcrumbLabels() {
  const ctx = useContext(BreadcrumbLabelsContext);
  if (!ctx) {
    throw new Error(
      'useBreadcrumbLabels must be used within BreadcrumbLabelsProvider'
    );
  }
  return ctx;
}

export function useSetBreadcrumbLabel(
  segment: string | undefined,
  label: string | undefined
) {
  const { setLabel } = useBreadcrumbLabels();

  useEffect(() => {
    if (segment && label) {
      setLabel(segment, label);
    }
  }, [segment, label, setLabel]);
}
