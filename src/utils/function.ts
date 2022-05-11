export const newListUtility = (p, movies, series) => {
    const list = [...movies, ...series];
    const cleanList = list.map(({__typename, ...rest}) => rest)
    let newList;
    let finalList

    if(p.profile.kid === true) {
        newList = cleanList.filter(({ genre_ids }) => genre_ids.includes(10751) || genre_ids.includes(16)|| genre_ids.includes(10762));
    } else {
        newList = cleanList;
    }

    if(newList.length > 0) {
        finalList = newList.filter(({original_language}) => original_language === "fr" || original_language === "en" || original_language === "th");
    }

    return finalList
}