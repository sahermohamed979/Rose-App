import React from 'react';
import DashboardList from './dashboard-list';
import { Flower } from 'lucide-react';

export default function MobileNavDashboard() {
  return (
    <div className=" md:hidden   fixed bottom-0 w-full  border-t border-border-subtle   flex items-center justify-between px-4">
      <div className="w-13 h-13 flex items-center justify-center  rounded-full bg-bg-primary-saturated absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
        <Flower className="   text-text-inverse" size={30} />
      </div>
      <DashboardList />
    </div>
  );
}
