import React from 'react';
import authStyle from "@/styles/auth/auth.module.css";

const GoogleSignInButton = ({ hasAccount }) => {
    return (
        <div className={authStyle.google_ctn}>
            <script src="https://accounts.google.com/gsi/client" async></script>
            <meta name="google-signin-client_id" content="620524066900-t3tmu60anvbkrfjqvcc86mpfp5pk6klm.apps.googleusercontent.com" />
            <div id="g_id_onload"
                 data-client_id="620524066900-t3tmu60anvbkrfjqvcc86mpfp5pk6klm.apps.googleusercontent.com"
                 data-context="signin"
                 data-ux_mode="popup"
                 data-login_uri="http://localhost/auth/login?provider=google"
                 data-auto_prompt="false">
            </div>

            <div className="g_id_signin"
                 // data-type="standard"
                 data-shape="rectangular"
                 data-theme="filled_black"
                 data-text="signin_with"
                 data-size="large"
                 data-logo_alignment="left">
            </div>
        </div>
    );
};

export default GoogleSignInButton;
