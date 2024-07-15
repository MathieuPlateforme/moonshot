import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import FeedCard from '../../components/FeedCard';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Spotty</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="relative">
        <FeedCard
          username="John Doe"
          timestamp="2021-08-12 12:00"
          title="Hello World"
          description="This is a test description"
          imageUrl="https://via.placeholder.com/800x400"
          avatarUrl="https://via.placeholder.com/50"
        />
        <IonButton color="primary">Primary</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
