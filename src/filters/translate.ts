import locales from '../locales'

export const translate = (locale:string,word:string) => {
    return locales[locale][word]
}