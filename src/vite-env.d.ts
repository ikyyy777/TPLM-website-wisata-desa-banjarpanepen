/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_AGENDA_API: string
  readonly VITE_GALLERY_API: string
  readonly VITE_LOGIN_API: string
  readonly VITE_UPDATE_PASSWORD_API: string
  readonly VITE_UPLOAD_IMAGE_API: string
  readonly VITE_WISATA_CATEGORY_API: string
  readonly VITE_WISATA_API: string
  readonly VITE_PUBLIC_URL: string
  readonly VITE_MAIN_DOMAIN: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
  