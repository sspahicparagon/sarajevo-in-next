interface Window {
    gtag: (...args: any[]) => void
    dataLayer: Record<string, any>
    adsbygoogle: { [key: string]: unknown }[]
}