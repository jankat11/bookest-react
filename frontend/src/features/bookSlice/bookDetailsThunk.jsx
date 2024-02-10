import axios from "axios";
const BASE_URL = "https://www.googleapis.com/books/v1/volumes";
/* const NOTE_URL = "https://bookest-server.up.railway.app/api/users/"; */
const NOTE_URL = "http://127.0.0.1:8000/api/users/";

export const fetchBook = async (idData, thunkAPI) => {
  try {
    const bookData = await axios.get(
      `${BASE_URL}${idData.id ? "/" + idData.id : "?q=isbn:" + idData.isbn}`
    );
    let book = idData.isbn ? bookData.data.items[0] : bookData.data;
    if (idData.isbn) {
      const { data } = await axios.get(`${BASE_URL}${"/" + book.id}`);
      book = data;
    }
    return book;
  } catch (error) {
    return thunkAPI.rejectWithValue("Sorry! the book data is not available");
  }
};

export const fetchResult = async (selfLink, thunkAPI) => {
  try {
    const { data } = await axios.get(selfLink);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
};

export const fetchAddNote = async (userData, thunkAPI) => {
  try {
    const { data } = await axios.post(
      `${NOTE_URL}addreview/`,
      userData.noteItem,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData.user.token}`,
        },
      }
    );
    return userData.noteItem;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
};

export const fetchGetNotes = async (userData, thunkAPI) => {
  try {
    const { data } = await axios.post(
      `${NOTE_URL}myreviews/`,
      userData.bookItem,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData.user.token}`,
        },
      }
    );
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
};

export const fetchDeleteNote = async (noteData, thunkAPI) => {
  try {
    const { data } = await axios.post(`${NOTE_URL}deletenote/`, noteData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${noteData.user.token}`,
      },
    });
    return noteData.noteId;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
};
