import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Track } from '@models/Track';
import TracksApi from '@services/tracks-api';

export const fetchTracks = createAsyncThunk('musicLibrary/fetchTracks', async () =>
  TracksApi.fetchTracks(),
);

export interface MusicLibraryState {
  tracks: Track[];
  isLoading: boolean;
  isError: boolean;
}

const initialState: MusicLibraryState = {
  tracks: [],
  isLoading: false,
  isError: false,
};

export const musicLibrarySlice = createSlice({
  name: 'musicLibrary',
  initialState,
  reducers: {
    setTracks: (state, action: PayloadAction<Track[]>) => {
      state.tracks = action.payload;
    },
  },
  extraReducers: {
    [fetchTracks.fulfilled.type]: (state, action: PayloadAction<Track[]>) => {
      state.tracks = action.payload;
      state.isLoading = false;
      state.isError = false;
    },
    [fetchTracks.pending.type]: (state) => {
      state.tracks = [];
      state.isLoading = true;
      state.isError = false;
    },
    [fetchTracks.rejected.type]: (state) => {
      state.tracks = [];
      state.isLoading = false;
      state.isError = true;
    },
  },
});

export const actions = musicLibrarySlice.actions;

export default musicLibrarySlice.reducer;
