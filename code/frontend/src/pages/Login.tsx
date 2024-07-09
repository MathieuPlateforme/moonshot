import React from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonInput, IonItem, IonList } from "@ionic/react";
import { dbPost } from "../api/network.js";

const Login: React.FC = () => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const handleLogin = async () => {
    const loginForm = new FormData();
    loginForm.append("_username", email);
    loginForm.append("password", password);
    const loginRequest = await dbPost("login", loginForm);
    console.log(loginRequest);
    
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
          <IonButton routerLink="/register">Register</IonButton>
          <IonButton routerLink="/login">Login</IonButton>
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
