'use client';

import NavbarDefault from './header';

const MainLayout = ({ children }) => (
  <div className="">
    <NavbarDefault />
    <div className="content-wrapper">{children}</div>
  </div>
);

export default MainLayout;