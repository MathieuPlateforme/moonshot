import React from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonInput, IonItem, IonList } from "@ionic/react";
import { post } from "../../../libs/utils"
import { useAuth } from "../../../providers/AuthProvider";
import { useHistory } from "react-router";
import { ROUTES_PATH } from "../../../config/constant";

const Register: React.FC = () => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const { getRole } = useAuth();
  const { push } = useHistory();

  if (getRole() === 'USER') {
    push(ROUTES_PATH.HOME);
  }

  const handleRegister = async () => {
    const registerRequest = await post({url: "https://localhost:8000/register", data: {firstName, lastName, email, username, password}, options: {}});
    console.log(registerRequest);
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register</IonTitle>
          {/* <IonButton routerLink="/register">Register</IonButton>
          <IonButton routerLink="/login">Login</IonButton> */}
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
