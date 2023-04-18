export const itemInMyList = (myList, item) => {
    if(myList.includes(item)) {
      return true
    } else {
      return false
    }
  }