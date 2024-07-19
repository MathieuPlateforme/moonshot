// RegisterForm.tsx
import React from 'react';
import { ArobaseIcon } from '../icons/ArobaseIcon';
import { CalendarIcon } from '../icons/CalendarIcon';
import { UserIcon } from '../icons/UserIcon';
import GoogleButton from 'react-google-button';
import { IonInput, IonInputPasswordToggle } from '@ionic/react';


const RegisterForm: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center">Register</h2>
                <img
                    src="https://via.placeholder.com/400x150"
                    alt="Illustration"
                    className="w-full h-40 object-cover"
                />
                <form className="space-y-4">
                    <div className="flex items-center border-b border-gray-300 py-2">
                        <input
                            type="text"
                            placeholder="First name"
                            className="w-full px-2 py-2 text-gray-700 focus:outline-none"
                        />
                        <UserIcon className="w-5 h-5 text-gray-400 ml-2" />
                    </div>
                    <div className="flex items-center border-b border-gray-300 py-2">
                        <input
                            type="text"
                            placeholder="Last name"
                            className="w-full px-2 py-2 text-gray-700 focus:outline-none"
                        />
                        <UserIcon className="w-5 h-5 text-gray-400 ml-2" />
                    </div>
                    <div className="flex items-center border-b border-gray-300 py-2">
                        <input
                            type="text"
                            placeholder="Username"
                            className="w-full px-2 py-2 text-gray-700 focus:outline-none"
                        />
                        <UserIcon className="w-5 h-5 text-gray-400 ml-2" />
                    </div>
                    <div className="flex items-center border-b border-gray-300 py-2">
                        <input
                            type="date"
                            placeholder="Date anniversaire"
                            className="w-full px-2 py-2 text-gray-700 focus:outline-none"
                        />
                        <CalendarIcon className="w-5 h-5 text-gray-400 ml-2" />
                    </div>
                    <div className="flex items-center border-b border-gray-300 py-2">
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full px-2 py-2 text-gray-700 focus:outline-none"
                        />
                        <ArobaseIcon className="w-5 h-5 text-gray-400 ml-2" />
                    </div>
                    <div className="flex items-center border-b border-gray-300 py-2">
                        {/* <input
                            type="password"
                            placeholder="Password"
                            className="w-full px-2 py-2 text-gray-700 focus:outline-none"
                        /> */}
                        <IonInput type="password" placeholder="Password" value="" className="w-full px-2 py-2 text-gray-700 focus:outline-none">
                            <IonInputPasswordToggle slot="end" className="w-8 h-12 text-gray-400 ml-2"></IonInputPasswordToggle>
                        </IonInput>
                    </div>
                    <div>
                        <button type="submit" className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md focus:outline-none">
                            Register
                        </button>
                    </div>
                    <div className="flex justify-center mt-2">
                        <GoogleButton onClick={() => { console.log("Google button clicked") }} className="w-full" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;
