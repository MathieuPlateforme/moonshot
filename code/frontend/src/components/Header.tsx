import { useEffect, useState } from "react";
import { GUEST_MENU, USER_MENU } from "../config/constant";
import { useAuth } from "../providers/AuthProvider";

interface HeaderProps {
  isVisible: boolean;
}

const Header: React.FC<HeaderProps> = ({isVisible}) => {
  const { getRole, logout } = useAuth();
  const [menu, setMenu] = useState<{ title: string; icon?: React.FC; link?: string; action?: string }[]>([]);
  
  const headerClassName = isVisible
    ? "bg-[#77DB48] fixed bottom-0 w-full z-10 transition-opacity duration-100"
    : "hidden transition-opacity duration-500";

  const handleAction = (action: string) => {
    switch (action) {
      case "logout":
        logout();
        window.location.reload();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (getRole() === "USER") {
      setMenu(USER_MENU);
    } else {
      setMenu(GUEST_MENU);
    }
  }, [getRole]);

  return (
    <header className={headerClassName}>
      <nav className="container px-4 py-2">
        <ul className="flex items-center justify-between">
          {menu.map((item: any, index: number) => (
            <li key={index} className="mr-4">
              {item?.link ? (
                <a href={item.link} className="text-white hover:text-gray-300">
                  {item.icon && <item.icon className="w-8 h-8" />}
                </a>
              ) : (
                <a onClick={() => handleAction(item.action)} className="text-white hover:text-gray-300">
                  {item.icon && <item.icon className="w-8 h-8" />}
                </a>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
