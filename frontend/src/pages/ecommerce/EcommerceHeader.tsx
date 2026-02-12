import React from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { SearchInput } from './SearchInput';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function EcommerceHeader() {
  const [currentPage, setCurrentPage] = React.useState<string>('Home');

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Account', href: '/account/userinfo'} ,
    { name: 'Checkout', href: '/checkout' },
    { name: 'Orders', href: '/orders' },
  ];

  return (
    <Disclosure as="nav" className="relative bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              {/* Mobile menu button */}
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>

              {/* Logo & Desktop Menu */}
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-between">
                <div className="flex shrink-0 items-center">
                  <Link to="/">
                    <img
                      src="https://i0.wp.com/www.biocel.ie/wp-content/uploads/2021/11/Logo-Full-Colour-SigTag.png?fit=600%2C193&ssl=1"
                      alt="Your Company"
                      className="h-8 w-auto"
                    />
                  </Link>

                </div>
                                     <div className="hidden  sm:block w-[35vw]"><SearchInput   /></div>

                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex items-center space-x-4">
                    {navigation.map((item) => {
                      const isCurrent = currentPage === item.name;
                      return (
                        <Link
                          key={item.name}
                          to={item.href}
                          onClick={() => setCurrentPage(item.name)}
                          className={classNames(
                            isCurrent
                              ? 'bg-gray-900 text-white'
                              : 'text-gray-300 hover:bg-white/5 hover:text-white',
                            'rounded-md px-3 py-2 text-sm font-medium'
                          )}
                        >
                          {item.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right side icons */}
              
            </div>
          </div>

          {/* Mobile Menu */}
          <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => {
                const isCurrent = currentPage === item.name;
                return (
                  <DisclosureButton
                    key={item.name}
                    as={Link}
                    to={item.href}
                    onClick={() => setCurrentPage(item.name)}
                    className={classNames(
                      isCurrent
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-white/5 hover:text-white',
                      'block rounded-md px-3 py-2 text-base font-medium'
                    )}
                  >
                    {item.name}
                  </DisclosureButton>
                );
              })}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}