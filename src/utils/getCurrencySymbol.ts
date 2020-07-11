const getCurrencySymbol = (value:any,currency: any) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency
    }).format(value)
}
export {
    getCurrencySymbol
}