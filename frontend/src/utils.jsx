export const getUserData = () => {
  const user = localStorage.getItem("user");
  if (!user) {
    return null;
  } else {
    return JSON.parse(user);
  }
};

export const getImageUrl = (id) => {
  return `https://books.google.com/books/content?id=${id}&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api`;
};

export const getNoteTimestamp = () => {
  const allMonth = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  const date = new Date();
  const month = allMonth[date.getMonth()];
  const year = date.getFullYear();
  return `${month} ${year}`;
};

export const blacklist = [
  "@",
  "{",
  "}",
  "<",
  ">",
  "=",
  "!",
  '"',
  "'",
  ",",
  "?",
  "+",
  "(",
  ")",
  ":",
  ";",
  "%",
  "&",
  "^",
  "/",
  "|",
  ".",
  "*",
  "_",
  "-",
  "`",
  "$",
  "#",
  "[",
  "]",
];
