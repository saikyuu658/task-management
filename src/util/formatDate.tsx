export const formatDate = (date: Date | string): string => {
    if(typeof date === 'string'){
        const newDate = new Date(date);
        return newDate.toLocaleDateString('pt-BR')
    }
    return date.toLocaleDateString('pt-BR')
}