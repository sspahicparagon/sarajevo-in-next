function convertDateToString2DigitsShortMonth(date: Date, locale: string = 'en') {
    return date.toLocaleDateString(locale, { day: '2-digit', month: 'short' })
}

function convertStringToNormalDate(date: string): Date {
    return new Date(date);
}

function normalizeDateToDate(date: string | Date): Date {
    if(typeof(date) === 'string')
        date = convertStringToNormalDate(date);
    
    return date;
}

export {
    convertDateToString2DigitsShortMonth,
    convertStringToNormalDate,
    normalizeDateToDate
}