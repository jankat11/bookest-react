import axios from "axios";

const GOOGLE_BOOKS_URL = "https://www.googleapis.com/books/v1/volumes";
const NOTE_URL = "https://bookest-server.up.railway.app/api/users/";
const GOOGLE_RETRY_DELAYS = [450, 1100];
/* const NOTE_URL = "http://127.0.0.1:8000/api/users/"; */

const wait = (delay, signal) =>
  new Promise((resolve, reject) => {
    if (signal.aborted) {
      reject(new DOMException("Request aborted", "AbortError"));
      return;
    }

    let timeoutId;
    const cleanup = () => signal.removeEventListener("abort", abort);
    const abort = () => {
      clearTimeout(timeoutId);
      cleanup();
      reject(new DOMException("Request aborted", "AbortError"));
    };

    timeoutId = setTimeout(() => {
      cleanup();
      resolve();
    }, delay);
    signal.addEventListener("abort", abort, { once: true });
  });

const isRetryableGoogleError = (error) => {
  const status = error.response?.status;

  return (
    !status ||
    status === 429 ||
    status === 500 ||
    status === 502 ||
    status === 503 ||
    status === 504
  );
};

const requestGoogleBooksWithRetry = async (url, signal) => {
  let lastError;

  for (let attempt = 0; attempt <= GOOGLE_RETRY_DELAYS.length; attempt += 1) {
    try {
      return await axios.get(url, { signal });
    } catch (error) {
      lastError = error;

      if (signal.aborted || !isRetryableGoogleError(error)) {
        throw error;
      }

      const retryDelay = GOOGLE_RETRY_DELAYS[attempt];
      if (!retryDelay) {
        break;
      }

      await wait(retryDelay, signal);
    }
  }

  throw lastError;
};

const getVolumeUrl = (id) => `${GOOGLE_BOOKS_URL}/${encodeURIComponent(id)}`;

const getIsbnSearchUrl = (isbn) => {
  const params = new URLSearchParams({
    q: `isbn:${isbn}`,
    printType: "books",
    maxResults: "1",
  });

  return `${GOOGLE_BOOKS_URL}?${params.toString()}`;
};

const getKeylessGoogleUrl = (url) => {
  const parsedUrl = new URL(url, GOOGLE_BOOKS_URL);
  parsedUrl.searchParams.delete("key");

  return parsedUrl.toString();
};

const rejectBookUnavailable = (thunkAPI) =>
  thunkAPI.rejectWithValue("Sorry! the book data is not available");

export const fetchBook = async (idData, thunkAPI) => {
  try {
    if (idData.id) {
      const { data } = await requestGoogleBooksWithRetry(
        getVolumeUrl(idData.id),
        thunkAPI.signal
      );
      return data;
    }

    const { data: searchData } = await requestGoogleBooksWithRetry(
      getIsbnSearchUrl(idData.isbn),
      thunkAPI.signal
    );
    const bookId = searchData.items?.[0]?.id;

    if (!bookId) {
      return rejectBookUnavailable(thunkAPI);
    }

    const { data } = await requestGoogleBooksWithRetry(
      getVolumeUrl(bookId),
      thunkAPI.signal
    );
    return data;
  } catch (error) {
    return rejectBookUnavailable(thunkAPI);
  }
};

export const fetchResult = async (selfLink, thunkAPI) => {
  try {
    const { data } = await requestGoogleBooksWithRetry(
      getKeylessGoogleUrl(selfLink),
      thunkAPI.signal
    );
    return data;
  } catch (error) {
    return rejectBookUnavailable(thunkAPI);
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
