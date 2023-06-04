function convertDateToString(date: Date, locale: string = 'en-US') {
    return date.toLocaleDateString(locale, { day: '2-digit', month: 'short' })
}

export {
    convertDateToString
}