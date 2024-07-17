import { useEffect, useState }from 'react';
import { GUEST_MENU, USER_MENU } from '../config/constant';
import { useAuth } from '../providers/AuthProvider';

interface HeaderProps {

}

const Header: React.FC<HeaderProps> = () => {

  const { getRole, logout } = useAuth();
  const [menu, setMenu] = useState<{ title: string; icon?: React.FC, link?: string, action?: string; }[]>([]);

  useEffect(() => {
    if(getRole() === 'USER'){
      setMenu(USER_MENU);
    } else {
      setMenu(GUEST_MENU);
    }
  }, [getRole]);

  const handleAction = (action: string) => {
    switch(action){
      case 'logout':
        logout();
        window.location.reload();
        break;
      default:
        break;
    }
  }

  return (
    <header className="bg-gray-800">
      <nav className="container mx-auto px-4 py-2">
        <ul className="flex items-center">
          {menu.map((item: any, index: number) => (
            <li key={index} className="mr-4">
              {item?.link ? (
                <a href={item.link} className="text-white hover:text-gray-300">{item.icon && <item.icon className="w-6 h-6" />} {item.title}</a>
              ) : (
                <button onClick={() => handleAction(item.action)} className="text-white hover:text-gray-300">{item.icon && <item.icon className="w-6 h-6" />} {item.title}</button>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;