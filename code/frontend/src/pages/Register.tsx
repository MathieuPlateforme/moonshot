import React from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonInput, IonItem, IonList } from "@ionic/react";
import { dbPost } from "../api/network.js";

const Register: React.FC = () => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const handleRegister = async () => {
    const registerForm = new FormData();
    registerForm.append("firstName", firstName);
    registerForm.append("lastName", lastName);
    registerForm.append("email", email);
    registerForm.append("username", username);
    registerForm.append("password", password);
    const registerRequest = await dbPost("register", registerForm);
    console.log(registerRequest);
    
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register</IonTitle>
          <IonButton routerLink="/register">Register</IonButton>
          <IonButton routerLink="/login">Login</IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          <IonItem>
            <IonInput placeholder="First name" value={firstName} onIonChange={(e) => setFirstName(e.detail.value!)}></IonInput>
          </IonItem>
          <IonItem>
            <IonInput placeholder="Last name" value={lastName} onIonChange={(e) => setLastName(e.detail.value!)}></IonInput>
          </IonItem>
          <IonItem>
            <IonInput placeholder="User name" value={username} onIonChange={(e) => setUsername(e.detail.value!)}></IonInput>
          </IonItem>
          <IonItem>
            <IonInput placeholder="Email" value={email} onIonChange={(e) => setEmail(e.detail.value!)}></IonInput>
          </IonItem>
          <IonItem>
            <IonInput placeholder="Password" value={password} onIonChange={(e) => setPassword(e.detail.value!)}></IonInput>
          </IonItem>
          <IonItem>
            <IonInput placeholder="Confirm password" value={confirmPassword} onIonChange={(e) => setConfirmPassword(e.detail.value!)}></IonInput>
          </IonItem>
          <IonButton onClick={() => {handleRegister()}}> Register</IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Register;
