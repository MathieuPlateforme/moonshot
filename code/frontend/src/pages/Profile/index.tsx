import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useQuery } from '../../providers/QueryProvider';
import { getCatsFact } from '../../libs/api';
import ExploreContainer from '../../components/ExploreContainer';
import './index.css';

const Profile: React.FC = () => {

  const { data: cat = {} } = useQuery(getCatsFact, {
    key: 'cat',
    variables: { country: 'fr' },
  })

  console.log(cat)


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
        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default Profile;
