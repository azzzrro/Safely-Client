import { RecaptchaVerifierInstance,ConfirmationResult } from "firebase/app";

declare global {
    interface Window {
        recaptchaVerifier: RecaptchaVerifierInstance;
    }
}


declare global {
    interface Window {
      confirmationResult: ConfirmationResult; // Use a more specific type if available
    }
  }