import { useEffect, useState } from "react";
import { GUEST_MENU, USER_MENU } from "../config/constant";
import { useAuth } from "../providers/AuthProvider";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const { getRole, logout } = useAuth();
  const [menu, setMenu] = useState<{ title: string; icon?: React.FC; link?: string; action?: string }[]>([]);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

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

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    console.log(scrollPosition);
    setIsHeaderVisible(scrollPosition < 100);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (getRole() === "USER") {
      setMenu(USER_MENU);
    } else {
      setMenu(GUEST_MENU);
    }
  }, [getRole]);

  const headerClassName = isHeaderVisible
    ? "bg-[#77DB48] fixed bottom-0 w-full z-10 transition-opacity duration-500"
    : "bg-[#77DB48] fixed bottom-0 w-full z-10 opacity-0 transition-opacity duration-500";

  return (
    <header className={headerClassName}>
      <nav className="container mx-auto px-4 py-2">
        <ul className="flex items-center">
          {menu.map((item: any, index: number) => (
            <li key={index} className="mr-4">
              {item?.link ? (
                <a href={item.link} className="text-white hover:text-gray-300">
                  {item.icon && <item.icon className="w-6 h-6" />}
                </a>
              ) : (
                <a onClick={() => handleAction(item.action)} className="text-white hover:text-gray-300">
                  {item.icon && <item.icon className="w-6 h-6" />}
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
