import { useAuth } from '../../context/AuthContext';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { UserCircleIcon, BellIcon } from '@heroicons/react/24/outline';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="h-16 bg-dark border-b border-dark-lighter fixed top-0 right-0 left-64 z-10">
      <div className="h-full flex items-center justify-between px-6">
        <h1 className="text-lg font-semibold text-white">Dashboard</h1>
        
        <div className="flex items-center space-x-4">
          <button className="text-gray-400 hover:text-white">
            <BellIcon className="h-6 w-6" />
          </button>
          
          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center space-x-2 text-gray-400 hover:text-white">
              <UserCircleIcon className="h-8 w-8" />
              <span>{user?.name}</span>
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-dark border border-dark-lighter rounded-lg shadow-lg">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={logout}
                        className={`${
                          active ? 'bg-dark-lighter text-white' : 'text-gray-400'
                        } block w-full text-left px-4 py-2`}
                      >
                        Sign out
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </header>
  );
};

export default Header;