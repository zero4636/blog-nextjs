'use client';

import MultiLevelSidebar from './siderBar';

const MainLayout = ({ children }) => (
  <div className="flex min-h-[140px] w-full overflow-x-scroll rounded-lg lg:overflow-visible">
    <MultiLevelSidebar />
    <div className="content-wrapper w-full mx-4">{children}</div>
  </div>
);

export default MainLayout;