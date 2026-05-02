import axios from "axios";

const BASE_URL = import.meta.env.VITE_BOOKEST_GENRE_URL;
const GOOGLE_URL = import.meta.env.VITE_GOOGLE_URL;
const GOOGLE_ENDPOINT = (
  GOOGLE_URL || "https://www.googleapis.com/books/v1/volumes"
).split("?")[0];
const BOOK_AMOUNT_PER_PAGE = 36;
const SEARCH_RETRY_DELAYS = [450, 1100];

const fetchBooks = async (genre, thunkAPI) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/${genre}`);
    return data.results.books;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
};
export default fetchBooks;

const getGoogleBooksUrl = ({ words, start }) => {
  const params = new URLSearchParams({
    q: words,
    startIndex: String(start),
    maxResults: String(BOOK_AMOUNT_PER_PAGE),
    printType: "books",
  });

  return `${GOOGLE_ENDPOINT}?${params.toString()}`;
};

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

const isRetryableSearchError = (error) => {
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

const getSearchErrorMessage = (error) => {
  const status = error.response?.status;

  if (status === 429) {
    return "Google Books is busy right now. Please try again.";
  }

  if (status === 503 || status === 504) {
    return "Google Books is temporarily unavailable. Please try again.";
  }

  if (status) {
    return `Google Books request failed (${status}). Please try again.`;
  }

  return error.message || "Google Books request failed. Please try again.";
};

const requestGoogleBooksWithRetry = async (requestUrl, signal) => {
  let lastError;

  for (let attempt = 0; attempt <= SEARCH_RETRY_DELAYS.length; attempt += 1) {
    try {
      return await axios.get(requestUrl, { signal });
    } catch (error) {
      lastError = error;

      if (signal.aborted || !isRetryableSearchError(error)) {
        throw error;
      }

      const retryDelay = SEARCH_RETRY_DELAYS[attempt];
      if (!retryDelay) {
        break;
      }

      await wait(retryDelay, signal);
    }
  }

  throw lastError;
};

export const searchBooks = async (searchData, thunkAPI) => {
  const page = Number(searchData.searchPage || 1);
  const words = searchData.words.trim();
  const start = (page - 1) * BOOK_AMOUNT_PER_PAGE;
  const requestUrl = getGoogleBooksUrl({ words, start });

  try {
    const { data } = await requestGoogleBooksWithRetry(
      requestUrl,
      thunkAPI.signal
    );

    return {
      items: Array.isArray(data.items) ? data.items : [],
      totalItems: Number(data.totalItems || 0),
      page,
      words,
      start,
      pageSize: BOOK_AMOUNT_PER_PAGE,
    };
  } catch (error) {
    return thunkAPI.rejectWithValue({
      message: getSearchErrorMessage(error),
      status: error.response?.status,
      page,
      words,
    });
  }
};

/* const fetchBooks = async (genre, thunkAPI) => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}${genre}.json?api-key=${API_KEY}`
    );
    return data.results.books;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
};
export default fetchBooks; */
