export type AppConfig = {
    apiPrefix: string
    authenticatedEntryPath: string
    unAuthenticatedEntryPath: string
    tourPath: string
    locale: string
    enableMock: boolean
}

const appConfig: AppConfig = {
    /*  apiPrefix: '/', */
    /* apiPrefix: 'https://amate.onrender.com/', */
    apiPrefix: 'https://amate.onrender.com/',
    /*     authenticatedEntryPath: '/home', */
    authenticatedEntryPath: '/OrdersOverview',
    unAuthenticatedEntryPath: '/sign-in',
    tourPath: '/',
    locale: 'en',
    enableMock: false,
}

export default appConfig
