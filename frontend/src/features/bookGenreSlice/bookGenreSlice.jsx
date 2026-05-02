import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import fetchBooks, { searchBooks } from "./bookGenreThunk";

const normalizeSearchWords = (words = "") => words.trim();
const getSearchRequestKey = (words, page) =>
  `${normalizeSearchWords(words).toLowerCase()}::${Number(page || 1)}`;

export const getBooks = createAsyncThunk(
  "booksGenreSlice/getBooks",
  fetchBooks
);
export const getResults = createAsyncThunk(
  "booksGenreSlice/getResults",
  searchBooks,
  {
    condition: (searchData, { getState }) => {
      const { books } = getState();
      const words = normalizeSearchWords(searchData.words);
      const page = Number(searchData.searchPage || 1);

      if (!words) {
        return false;
      }

      if (page > 1) {
        if (
          books.activeSearchRequest ||
          books.searchWords !== words ||
          !books.isFromResults ||
          books.finishSearch
        ) {
          return false;
        }
      }

      return books.activeSearchRequest !== getSearchRequestKey(words, page);
    },
  }
);

const initialState = {
  books: [],
  results: [],
  isLoading: true,
  isError: false,
  genre: "hardcover-nonfiction",
  message: "",
  isResultsLoading: false,
  isFromResults: false,
  isSearchActive: false,
  searchWords: "",
  searchPage: 1,
  finishSearch: false,
  activeSearchRequest: null,
  loadMoreError: false,
  loadMoreMessage: "",
};

const mapGoogleBooks = (items) =>
  items.map((book) => ({
    title: book.volumeInfo?.title,
    author: book.volumeInfo?.authors,
    book_image: book.volumeInfo?.imageLinks?.thumbnail,
    google_id: book.id,
    selfLink: book.selfLink,
  }));

const getPayloadMessage = (payload, fallback) => {
  if (typeof payload === "string") {
    return payload;
  }

  return payload?.message || fallback;
};

const isCurrentSearchResponse = (state, words, page) => {
  return (
    state.searchWords === normalizeSearchWords(words) &&
    state.activeSearchRequest === getSearchRequestKey(words, page)
  );
};

const bookGenreSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setBooks(state, action) {
      state.books = action.payload;
    },
    getGenre(state, action) {
      state.genre = action.payload;
    },
    changeSearchActiveStatus(state) {
      state.isSearchActive = !state.isSearchActive;
    },
    setSearchWords(state, action) {
      state.searchWords = normalizeSearchWords(action.payload);
    },
    startSearch(state, action) {
      const words = normalizeSearchWords(action.payload);

      state.books = [];
      state.searchWords = words;
      state.searchPage = 1;
      state.isSearchActive = true;
      state.isFromResults = true;
      state.finishSearch = false;
      state.isError = false;
      state.message = "";
      state.loadMoreError = false;
      state.loadMoreMessage = "";
    },
    resetSearch(state) {
      state.isSearchActive = false;
      state.isFromResults = false;
      state.searchWords = "";
      state.searchPage = 1;
      state.finishSearch = false;
      state.activeSearchRequest = null;
      state.loadMoreError = false;
      state.loadMoreMessage = "";
      state.message = "";
      state.isError = false;
    },
    nextPage(state) {
      state.searchPage = state.searchPage + 1;
    },
    resetPage(state) {
      state.searchPage = 1;
      state.finishSearch = false;
      state.loadMoreError = false;
      state.loadMoreMessage = "";
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBooks.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getBooks.fulfilled, (state, { payload }) => {
        if (state.isSearchActive) {
          return;
        }

        state.isLoading = false;
        state.books = payload;
        state.isError = false;
        state.isFromResults = false;
        state.finishSearch = false;
        state.loadMoreError = false;
        state.loadMoreMessage = "";
      })
      .addCase(getBooks.rejected, (state, { payload }) => {
        if (state.isSearchActive) {
          return;
        }

        state.isLoading = false;
        state.isError = true;
        state.message = getPayloadMessage(payload, "Could not load books");
      })
      .addCase(getResults.pending, (state, action) => {
        const words = normalizeSearchWords(action.meta.arg.words);
        const requestedPage = Number(action.meta.arg.searchPage || 1);

        state.activeSearchRequest = getSearchRequestKey(words, requestedPage);
        state.isSearchActive = true;
        state.isFromResults = true;
        state.isResultsLoading = requestedPage > 1;
        state.isLoading = requestedPage === 1;
        state.isError = false;
        state.message = "";
        state.loadMoreError = false;
        state.loadMoreMessage = "";

        if (requestedPage === 1) {
          state.books = [];
          state.searchWords = words;
          state.searchPage = 1;
          state.finishSearch = false;
        }
      })
      .addCase(getResults.fulfilled, (state, { payload }) => {
        const {
          items = [],
          totalItems = 0,
          page = 1,
          words = "",
          start = 0,
          pageSize = 0,
        } = payload || {};

        if (!isCurrentSearchResponse(state, words, page)) {
          return;
        }

        const results = mapGoogleBooks(items);
        const hasKnownTotal = Number.isFinite(totalItems) && totalItems > 0;

        state.books = page === 1 ? results : [...state.books, ...results];
        state.searchPage = page + 1;
        state.finishSearch =
          items.length === 0 ||
          (hasKnownTotal
            ? start + items.length >= totalItems
            : items.length < pageSize);
        state.activeSearchRequest = null;
        state.isResultsLoading = false;
        state.isLoading = false;
        state.isError = false;
        state.isFromResults = true;
        state.loadMoreError = false;
        state.loadMoreMessage = "";
      })
      .addCase(getResults.rejected, (state, { payload, meta }) => {
        const words = normalizeSearchWords(meta.arg.words);
        const requestedPage = Number(meta.arg.searchPage || 1);

        if (!isCurrentSearchResponse(state, words, requestedPage)) {
          return;
        }

        const message = getPayloadMessage(
          payload,
          "Could not load Google Books results"
        );

        state.activeSearchRequest = null;
        state.isResultsLoading = false;
        state.isLoading = false;
        state.isError = true;
        state.message = message;
        state.isFromResults = true;

        if (requestedPage === 1) {
          state.books = [];
          state.searchPage = 1;
          state.finishSearch = true;
          state.loadMoreError = false;
          state.loadMoreMessage = "";
        } else {
          state.loadMoreError = true;
          state.loadMoreMessage = message;
        }
      });
  },
});

export default bookGenreSlice.reducer;

export const bookGenreActions = bookGenreSlice.actions;
