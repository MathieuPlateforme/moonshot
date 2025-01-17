import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Header from '../../components/Header';
import { useHistory } from 'react-router';
import { ROUTES_PATH } from '../../config/constant';
import { useAuth } from '../../providers/AuthProvider';
import { useEffect } from 'react';


const Home: React.FC = () => {

  const { push } = useHistory();
  const { getRole, token } = useAuth();

  useEffect(() => {
    if(token){
      push(ROUTES_PATH.EVENTS);
    }
  }, [token]);

  return (
    <IonPage>
      <IonContent fullscreen className="relative">
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <div className="text-xl font-be-vietnam font-bold mb-4 p-2 text-center text-24">Connectez-vous pour découvrir des milliers d'évènements autour de vous</div>
          <IonButton className="mb-2" onClick={() => push(ROUTES_PATH.LOGIN)}>Login</IonButton>
          <div className="text-sm font-be-vietnam text-center">Et si vous n'êtes pas inscrits, profitez-en, c'est gratuit</div>
          <IonButton className="mt-2" onClick={() => push(ROUTES_PATH.REGISTER)}>Register</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
