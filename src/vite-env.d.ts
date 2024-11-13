/// <reference types="vite/client" />

interface ImportMetaEnv {
   [key: string]: any; // Allow any environment variable with any type
}

interface ImportMeta {
   readonly env: ImportMetaEnv;
}
