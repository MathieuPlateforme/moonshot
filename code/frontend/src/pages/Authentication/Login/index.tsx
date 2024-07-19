import React from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonInput, IonItem, IonList, IonInputPasswordToggle } from "@ionic/react";
// import { dbPost } from "../../api/network.js";
import { post } from "../../../libs/utils"
import { ArobaseIcon } from '../../../icons/ArobaseIcon';
import GoogleButton from "react-google-button";


const Login: React.FC = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = async () => {
    // const request = await post("login", {email, password});

  };

  const handleGoogleLogin = () => {
    console.log('Google Login button clicked');
    // Ajoutez votre logique de gestion de la connexion avec Google ici
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center">Login</h2>
          <img
            src="https://via.placeholder.com/400x150"
            alt="Illustration"
            className="w-full h-20 object-cover"
          />
          <IonList className="space-y-4">
            <IonItem className="flex items-center border-b border-gray-300 py-2">
              <IonInput placeholder="Email" value={email} onIonChange={(e) => setEmail(e.detail.value!)} className="w-full px-2 py-2 text-gray-700 focus:outline-none"></IonInput>
              <ArobaseIcon className="w-5 h-5 text-gray-400 ml-2" />
            </IonItem>
            <IonItem className="flex items-center border-b border-gray-300 py-2">
              <IonInput placeholder="Password" value={password} onIonChange={(e) => setPassword(e.detail.value!)} className="w-full px-2 py-2 text-gray-700 focus:outline-none">
                <IonInputPasswordToggle slot="end" className="w-8 h-12 text-gray-400 ml-2"></IonInputPasswordToggle>
              </IonInput>
            </IonItem>
            <IonItem>
              <IonButton onClick={() => { handleLogin() }} className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md focus:outline-none">
                Login
              </IonButton>
            </IonItem>
            <IonContent className="flex justify-center mt-2 h-20">
              <div className="flex justify-center mt-2">
                <GoogleButton label="Log In with Google" onClick={() => { handleGoogleLogin() }} className="w-full" />
              </div>
            </IonContent>
          </IonList>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
