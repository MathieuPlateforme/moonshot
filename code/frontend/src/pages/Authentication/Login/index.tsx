import React from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonInput, IonItem, IonList } from "@ionic/react";
// import { dbPost } from "../../api/network.js";
import { post } from "../../../libs/utils"

const Login: React.FC = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = async () => {
    // const request = await post("login", {email, password});
    
  };
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
          <IonButton onClick={() => {handleLogin()}}> Login</IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Login;
