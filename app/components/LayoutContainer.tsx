'use client';
import React, {ReactNode, useEffect} from 'react';
import { useLayoutContext } from '@/app/contexts/LayoutContext';
import TeamSidebar from './TeamSidebar';
import Sidebar from './Sidebar';
import {usePathname, useRouter} from 'next/navigation';

const LayoutContainer = ({ children }: { children: ReactNode }) => {
  const { hiddenRows, setHiddenRows } = useLayoutContext();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== '/' && !pathname.startsWith('/teams')) {
      setHiddenRows(true);
    }
    else {
      setHiddenRows(false);
    }
  }, [pathname, setHiddenRows]);

  return (
    <div className="max-w-full m-auto px-4 py-2 grid grid-cols-1 gap-x-14 z-0 lg:max-w-custom lg:grid-cols-container relative">
      <div className={`lg:row-start-auto lg:w-full row-start-2 ${hiddenRows ? 'hidden lg:block' : ''}`}>
        <TeamSidebar />
      </div>
      <div className="py-4 lg:row-start-auto row-start-3">
        {children}
      </div>
      <div className={`lg:w-full lg:row-start-auto row-start-1 ${hiddenRows ? 'hidden lg:block' : ''}`}>
        <Sidebar />
      </div>
    </div>
  );
};

export default LayoutContainer;
