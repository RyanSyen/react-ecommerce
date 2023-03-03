export function getDateTime() {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const formattedToday = dd + "/" + mm + "/" + yyyy;

  const timeFromDate = date => date.toTimeString().slice(0, 8);

const dateTime = formattedToday + " " + timeFromDate(new Date());
  return dateTime;
}
