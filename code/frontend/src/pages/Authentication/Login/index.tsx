import React, { useEffect } from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonInput, IonItem, IonList } from "@ionic/react";
// import { dbPost } from "../../api/network.js";
import { useAuth } from "../../../providers/AuthProvider";
import { useHistory } from "react-router";
import { ROUTES_PATH } from "../../../config/constant";

const Login: React.FC = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { getRole, login, token } = useAuth();
  const { push } = useHistory();

  useEffect(() => {
    if(getRole()){
      push(ROUTES_PATH.HOME);
    }
  }, [token]);
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          <IonItem>
            <IonInput placeholder="Email" value={email} onIonChange={(e) => setEmail(e.detail.value!)}></IonInput>
          </IonItem>
          <IonItem>
            <IonInput placeholder="Password" value={password} onIonChange={(e) => setPassword(e.detail.value!)}></IonInput>
          </IonItem>
          <IonButton onClick={() => {login(email, password)}}> Login</IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Login;
