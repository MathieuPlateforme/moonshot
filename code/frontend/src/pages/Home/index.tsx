import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import FeedCard from '../../components/FeedCard';
import EventCard from '../../components/EventCard';
import ProfileCard from '../../components/ProfilCard';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen className="relative">
        <div className="sm">
          <FeedCard
            username="John Doe"
            timestamp="2021-08-12 12:00"
            description="This is a test description"
            avatarUrl="https://via.placeholder.com/50"
          />
        </div>
        <IonButton color="primary">Primary</IonButton>
          {/* <EventCard
            imageUrl="https://via.placeholder.com/800x400"
            title="Event Title"
            date="2021-08-12 12:00"
            location="Event Location"
            buttonText="Register"
            onButtonClick={() => alert('Button clicked')}
          /> */}
          <ProfileCard
            avatarUrl="https://via.placeholder.com/50"
            name="John Doe"
            description="This is a test description"
          />
      </IonContent>
    </IonPage>
  );
};

export default Home;
