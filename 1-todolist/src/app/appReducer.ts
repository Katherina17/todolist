import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

const slice = createSlice({
  name: "app",
  initialState: {
    status: "idle" as RequestStatusType,
    error: null as null | string, //the second can be type
    isInitialized: false as boolean,
  },
  reducers: {
    setStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
      state.status = action.payload.status;
    },
    setError: (state, action: PayloadAction<{ error: null | string }>) => {
      state.error = action.payload.error;
    },
    setInitialize: (state, action: PayloadAction<{ isInitialize: boolean }>) => {
      state.isInitialized = action.payload.isInitialize;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => {
          return action.type.endsWith("/pending");
        },
        (state, action) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        (action) => {
          return action.type.endsWith("/fulfilled");
        },
        (state, action) => {
          state.status = "succeeded";
        }
      )
      .addMatcher(
        (action) => {
          return action.type.endsWith("/rejected");
        },
        (state, action) => {
          const { payload, error } = action;
          if (payload) {
            if (payload.showGlobalError) {
              state.error = payload.data.messages.length
                ? payload.data.messages[0]
                : "Some error occurred";
            }
          } else {
            state.error = error.message.length
              ? error.message
              : "Some error occurred";
          }
          state.status = "failed";
        }
      );
  },
});

export const appReducer = slice.reducer;
export const appAction = slice.actions;
