'use client'
import React, {useEffect} from 'react';
import authStyle from "@/styles/auth/auth.module.css";
import useAuthHandler from "@/hooks/AuthOperations";
import Script from 'next/script'
import {GoogleLogin, GoogleOAuthProvider} from '@react-oauth/google';

export default function GoogleSignInButton({hasAccount}) {
    const {onSignin, onSignup} = useAuthHandler();

    const handleGoogle = async (googleUser) => {
        let payload = {
            "credential": googleUser['credential']
        }
        if (hasAccount) {
            onSignin(payload, "google")
        } else {
            onSignup(payload, "google")
        }
    };

    useEffect(() => {
        window.handleGoogle = handleGoogle;
    }, []);

    return (
        <div className={authStyle.google_ctn}>
            <GoogleOAuthProvider clientId="620524066900-t3tmu60anvbkrfjqvcc86mpfp5pk6klm.apps.googleusercontent.com">
                <GoogleLogin
                    onSuccess={googleUser => {
                        let payload = {
                            "credential": googleUser['credential']
                        }
                        if (hasAccount) {
                            onSignin(payload, "google")
                        } else {
                            onSignup(payload, "google")
                        }
                    }}
                    onError={(err) => {
                        console.error('Failed to obtain the credential', err);
                    }}
                />;
            </GoogleOAuthProvider>;

        </div>
    );
};
