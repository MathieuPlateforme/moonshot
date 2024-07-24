import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact, IonHeader } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { ROUTES_PATH, ACCESSES } from "./config/constant";
import { routes } from "./config/routes";
import { useAuth } from "./providers/AuthProvider";
import { useEffect } from "react";
import Home from "./pages/Home";
import Header from "./components/Header";
import "./theme/tailwind.css";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";

setupIonicReact();

const App: React.FC = () => {
  const { hasAccess } = useAuth();
  useEffect(() => {
    // Force light mode
    document.documentElement.classList.remove('dark');
    localStorage.theme = 'light';
  }, []);

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path={ROUTES_PATH.HOME} component={Home} exact />
          {routes.map(({ component: Component, path, accesses = [] }) =>
            hasAccess(accesses) ? <Route key={path} path={path} component={Component} exact /> : <Redirect key={path} to={ROUTES_PATH.HOME} />
          )}
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
