/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * Where the contact form POSTs its JSON. Set it in `.env.local`, see the
   * README. It is a public URL, not a secret.
   */
  readonly VITE_CONTACT_ENDPOINT?: string;
}
