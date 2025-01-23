import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import PrivacyScreenContainer from '../components/PrivacyScreenContainer';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Privacy Screen Demo</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Privacy Screen Demo</IonTitle>
          </IonToolbar>
        </IonHeader>
        <PrivacyScreenContainer />
      </IonContent>
    </IonPage>
  );
};

export default Home;