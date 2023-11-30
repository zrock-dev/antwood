import React, {useEffect} from 'react';
import authStyle from "@/styles/auth/auth.module.css";
import useAuthHandler from "@/hooks/AuthOperations";
import Script from 'next/script'

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
            <Script src="https://accounts.google.com/gsi/client" async></Script>
            <div id="g_id_onload"
                 data-client_id="620524066900-t3tmu60anvbkrfjqvcc86mpfp5pk6klm.apps.googleusercontent.com"
                 data-context="use"
                 data-ux_mode="popup"
                 data-callback="handleGoogle"
                 data-auto_prompt="false">
            </div>

            <div className="g_id_signin"
                // data-type="standard"
                 data-shape="pill"
                 data-theme="outline"
                 data-text="continue_with"
                 data-size="large"
                 data-locale="en-US"
                 data-logo_alignment="left">
            </div>
        </div>
    );
};
