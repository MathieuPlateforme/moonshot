import React from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonInput, IonItem, IonList } from "@ionic/react";
// import { dbPost } from "../../api/network.js";
import { post } from "../../../libs/utils"
import useLocalStorage from "../../../hooks/useLocalStorage";

const Login: React.FC = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [token, setToken, removeToken] = useLocalStorage('token');
  
  const handleLogin = async () => {
    const loginRequest = await post({url: "https://localhost:8000/tempLogin", data: {email, password}, options: {}});
    if(loginRequest.status === 200){
      (setToken as (value: any) => void)(loginRequest.data);
    }
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
