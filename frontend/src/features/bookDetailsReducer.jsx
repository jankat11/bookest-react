export const shelfReducer = (state, action) => {
  switch (action.type) {
    case "ADD_BOOK_IDS":
      const { googleId, title, isbn, noCover } = action.payload;
      return {
        ...state,
        googleId,
        title,
        isbn,
        noCover,
      };
    case "SWITCH_CHECKBOXES":
      return {
        ...state,
        willBeRead: action.payload === "will_be_read",
        hasBeenRead: action.payload === "has_been_read",
      };
  }
};
export const shelfInitialState = {
  googleId: "",
  isbn: "",
  noCover: false,
  title: "",
  willBeRead: true,
  hasBeenRead: false,
};
