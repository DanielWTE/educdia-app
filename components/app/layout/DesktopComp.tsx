import { Disclosure, Menu } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import Link from "next/link";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function LayoutDesktop({ navigation, user }: any) {
  const full_name =
    user.given_name + (user.family_name ? " " + user.family_name : "");
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex h-16 justify-between">
        <div className="flex">
          <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
            {navigation.map((item: any) => (
              <Link
                key={item.name}
                href={item.href}
                aria-current={item.current ? "page" : undefined}
                className={classNames(
                  item.current
                    ? "border-blue-500 text-gray-900"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                  "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="hidden sm:ml-6 sm:flex sm:items-center">
          <p className="ml-3 text-sm font-medium text-gray-900">{full_name}</p>
          <Menu as="div" className="relative ml-3">
            <div>
              <Menu.Button className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                <span className="absolute -inset-1.5" />
                <span className="sr-only">Open user menu</span>
                <img
                  alt={full_name}
                  src={user.picture || "/default_avatar.jpg"}
                  className="h-8 w-8 rounded-full"
                />
              </Menu.Button>
            </div>
            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
              <Menu.Item key={"signout"}>
                <LogoutLink className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                  Abmelden
                </LogoutLink>
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
        <div className="-mr-2 flex items-center sm:hidden">
          <Disclosure.Button className="group relative inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            <span className="absolute -inset-0.5" />
            <span className="sr-only">Open main menu</span>
            <Bars3Icon
              aria-hidden="true"
              className="block h-6 w-6 group-data-[open]:hidden"
            />
            <XMarkIcon
              aria-hidden="true"
              className="hidden h-6 w-6 group-data-[open]:block"
            />
          </Disclosure.Button>
        </div>
      </div>
    </div>
  );
}
