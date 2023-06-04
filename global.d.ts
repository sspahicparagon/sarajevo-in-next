interface Window {
    gtag: (...args: any[]) => void
    dataLayer: Record<string, any>
    adsbygoogle: { [key: string]: unknown }[]
}

type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;