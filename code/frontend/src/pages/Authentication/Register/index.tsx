//RegisterForm

import React from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonInput, IonItem, IonList, IonInputPasswordToggle } from "@ionic/react";
import { ArobaseIcon } from '../../../icons/ArobaseIcon';
import { CalendarIcon } from '../../../icons/CalendarIcon';
import { UserIcon } from '../../../icons/UserIcon';
import GoogleButton from 'react-google-button';
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
    const registerRequest = await post({ url: "https://localhost:8000/register", data: { firstName, lastName, email, username, password }, options: {} });
    console.log(registerRequest);
  };

  const handleGoogleRegister = () => {
    console.log('Google Register button clicked');
    // Ajoutez votre logique de gestion de l'inscription avec Google ici
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center">Register</h2>
          <img
            src="https://via.placeholder.com/400x150"
            alt="Illustration"
            className="w-full h-20 object-cover"
          />
          <IonList className="space-y-4">
            <IonItem className="flex items-center border-b border-gray-300 py-2">
              <IonInput placeholder="First name" value={firstName} onIonChange={(e) => setFirstName(e.detail.value!)} className="w-full px-2 py-2 text-gray-700 focus:outline-none"></IonInput>
              <UserIcon className="w-5 h-5 text-gray-400 ml-2" />
            </IonItem>
            <IonItem className="flex items-center border-b border-gray-300 py-2">
              <IonInput placeholder="Last name" value={lastName} onIonChange={(e) => setLastName(e.detail.value!)} className="w-full px-2 py-2 text-gray-700 focus:outline-none"></IonInput>
              <UserIcon className="w-5 h-5 text-gray-400 ml-2" />
            </IonItem>
            <IonItem className="flex items-center border-b border-gray-300 py-2">
              <IonInput placeholder="Username" value={username} onIonChange={(e) => setUsername(e.detail.value!)} className="w-full px-2 py-2 text-gray-700 focus:outline-none"></IonInput>
              <UserIcon className="w-5 h-5 text-gray-400 ml-2" />
            </IonItem>
            <IonItem className="flex items-center border-b border-gray-300 py-2">
              <IonInput type="date" placeholder="Date anniversaire" onIonChange={(e) => console.log(e.detail.value!)} className="w-full px-2 py-2 text-gray-700 focus:outline-none"></IonInput>
              <CalendarIcon className="w-5 h-5 text-gray-400 ml-2" />
            </IonItem>
            <IonItem className="flex items-center border-b border-gray-300 py-2">
              <IonInput type="email" placeholder="Email" value={email} onIonChange={(e) => setEmail(e.detail.value!)} className="w-full px-2 py-2 text-gray-700 focus:outline-none"></IonInput>
              <ArobaseIcon className="w-5 h-5 text-gray-400 ml-2" />
            </IonItem>
            <IonItem className="flex items-center border-b border-gray-300 py-2">
              <IonInput type="password" placeholder="Password" value={password} onIonChange={(e) => setPassword(e.detail.value!)} className="w-full px-2 py-2 text-gray-700 focus:outline-none">
                <IonInputPasswordToggle slot="end" className="w-8 h-12 text-gray-400 ml-2"></IonInputPasswordToggle>
              </IonInput>
            </IonItem>
            <IonItem className="flex items-center border-b border-gray-300 py-2">
              <IonInput type="password" placeholder="Confirm password" value={confirmPassword} onIonChange={(e) => setConfirmPassword(e.detail.value!)} className="w-full px-2 py-2 text-gray-700 focus:outline-none">
                <IonInputPasswordToggle slot="end" className="w-8 h-12 text-gray-400 ml-2"></IonInputPasswordToggle>
              </IonInput>
            </IonItem>
            <IonButton expand="block" onClick={handleRegister} className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md focus:outline-none">
              Register
            </IonButton>
            <div className="flex justify-center mt-2">
              <GoogleButton onClick={handleGoogleRegister} className="w-full" />
            </div>
          </IonList>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Register;