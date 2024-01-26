import { DashboardIcon, StarIcon, SettingsIcon, PasswordIcon, ImportPasswordIcon, ExportPasswordIcon, AccountIcon, EmailIcon, UserShieldIcon } from './assets'

const serverPort = process.env.PORT || 8081
const clientPort = process.env.CLIENT_PORT || 8080

let domain
// If we build a specific staging instance
if (process.env.NODE_APP_INSTANCE === 'dev') {
  domain = 'https://passwise.dev.tristan-greffe.xyz'
} else if (process.env.NODE_APP_INSTANCE === 'test') {
  domain = 'https://passwise.test.tristan-greffe.xyz'
} else if (process.env.NODE_APP_INSTANCE === 'prod') {
  domain = 'https://passwise.tristan-greffe.xyz'
} else {
  // Otherwise we are on a developer machine
  if (process.env.NODE_ENV === 'development') {
    domain = 'http://localhost:' + clientPort
  } else {
    domain = 'http://localhost:' + serverPort
  }
}

let origin
process.env.NODE_ENV === 'development' ? origin = 'http://localhost:' + serverPort : origin = domain

const navLinks = [
  {
    title: 'navbar.DASHBOARD',
    to: '/dashboard',
    Icon: DashboardIcon,
    spacer: true
  },
  {
    title: 'navbar.PASSWORDS',
    to: '/vault',
    Icon: StarIcon,
    spacer: true
  },
  {
    title: 'navbar.SETTINGS',
    to: '/settings',
    Icon: SettingsIcon,
    spacer: false
  }
]

const passwordSettings = {
  id: 'manage-password',
  title: 'settings.PASSWORD_SECTION_TITLE',
  IconTitle: PasswordIcon,
  content: [
    {
      id: 'import-password',
      title: 'settings.IMPORT_PASSWORD_TITLE',
      description: 'settings.IMPORT_PASSWORD_DESCRIPTION',
      Icon: ImportPasswordIcon
    },
    {
      id: 'export-password',
      title: 'settings.EXPORT_PASSWORD_TITLE',
      description: 'settings.EXPORT_PASSWORD_DESCRIPTION',
      Icon: ExportPasswordIcon
    }
  ]
}

const accountSettings = {
  id: 'manage-account',
  title: 'settings.ACCOUNT_SECTION_TITLE',
  IconTitle: AccountIcon,
  content: [
    {
      id: 'email-manager',
      title: 'settings.EMAIL_TITLE',
      Icon: EmailIcon
    },
    {
      id: 'password-manager',
      title: 'settings.PASSWORD_TITLE',
      Icon: PasswordIcon
    },
    {
      id: 'delete-account-manager',
      title: 'settings.DELETE_ACCOUNT_TITLE',
      Icon: UserShieldIcon
    }
  ]
}

export default {
  domain,
  origin,
  apiPath: '/api',
  apiJwt: 'passwise-jwt',
  apiTimeout: 20000,
  transport: 'websocket', // Could be 'http' or 'websocket',
  storage: {
    useProxy: true
  },
  navLinks,
  passwordSettings,
  accountSettings
}
