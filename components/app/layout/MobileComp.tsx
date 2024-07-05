import { Disclosure } from "@headlessui/react";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function LayoutMobile({ navigation, user }: any) {
  const full_name =
    user.given_name + (user.family_name ? " " + user.family_name : "");
  return (
    <Disclosure.Panel className="sm:hidden">
      <div className="space-y-1 pb-3 pt-2">
        {navigation.map((item: any) => (
          <Disclosure.Button
            key={item.name}
            as="a"
            href={item.href}
            aria-current={item.current ? "page" : undefined}
            className={classNames(
              item.current
                ? "border-blue-500 bg-blue-50 text-blue-700"
                : "border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800",
              "block border-l-4 py-2 pl-3 pr-4 text-base font-medium"
            )}
          >
            {item.name}
          </Disclosure.Button>
        ))}
      </div>
      <div className="border-t border-gray-200 pb-3 pt-4">
        <div className="flex items-center px-4">
          <div className="flex-shrink-0">
            <img
              alt={full_name}
              src={user.picture || "/default_avatar.jpg"}
              className="h-10 w-10 rounded-full"
            />
          </div>
          <div className="ml-3">
            <div className="text-base font-medium text-gray-800">
              {full_name}
            </div>
            <div className="text-sm font-medium text-gray-500">
              {user.email}
            </div>
          </div>
        </div>
        <div className="mt-3 space-y-1">
          <LogoutLink>
            <Disclosure.Button
              key="signout"
              as="a"
              className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
            >
              Abmelden
            </Disclosure.Button>
          </LogoutLink>
        </div>
      </div>
    </Disclosure.Panel>
  );
}
