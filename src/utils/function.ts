export const itemInMyList = (myList, item) => {
    if(myList.find(obj => obj.id === item.id)) {
      return true
    } else {
      return false
    }
  }

export const convertMinutesToHours = (minutes: number | undefined) => {
  if(minutes === undefined) return null;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
}

export const getYearFromDate = (dateString) => {
  let date = new Date(dateString);
  return date.getFullYear();
}