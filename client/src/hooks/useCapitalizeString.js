const useCapitalizeString = () => {
    const capitalize = (str) => {
        const capitalized = str.replace(/^./, str[0].toUpperCase());

        return capitalized;
    }
    return capitalize
}

export default useCapitalizeString