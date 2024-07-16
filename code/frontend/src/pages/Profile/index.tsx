import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useQuery } from '../../providers/QueryProvider';
import { getCatsFact } from '../../libs/api';

const Profile: React.FC = () => {

  const { data: cat = {} } = useQuery(getCatsFact, {
    key: 'cat',
    variables: { country: 'fr' },
  })

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mathieu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Salut</IonTitle>
          </IonToolbar>
        </IonHeader>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
