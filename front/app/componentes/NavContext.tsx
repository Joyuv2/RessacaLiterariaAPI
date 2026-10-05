'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export type NavLink = {
  label: string;
  href: string;
};

type NavContextValue = {
  links: NavLink[];
  setLinks: (links: NavLink[]) => void;
};

const NavContext = createContext<NavContextValue | undefined>(undefined);

export function NavProvider({
  children,
  initialLinks = [],
}: {
  children: ReactNode;
  initialLinks?: NavLink[];
}) {
  const [links, setLinksState] = useState<NavLink[]>(initialLinks);

  const setLinks = useCallback((nextLinks: NavLink[]) => {
    setLinksState(nextLinks);
  }, []);

  const value = useMemo(() => ({ links, setLinks }), [links, setLinks]);

  return <NavContext.Provider value={value}>{children}</NavContext.Provider>;
}

export function useNav() {
  const context = useContext(NavContext);

  if (!context) {
    throw new Error('useNav must be used inside a NavProvider');
  }

  return context;
}
