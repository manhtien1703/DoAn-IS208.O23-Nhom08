import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage
import authReducer from "./slices/authSlice";
import { encryptTransform } from "redux-persist-transform-encrypt";

const encryptionKey = "my-super-secret-key";

const encryptionTransform = encryptTransform({
  secretKey: encryptionKey,
  onError: (error) => {
    // Handle the error
    console.error("Encryption error:", error);
  },
});

const persistConfig = {
  key: "root",
  storage,
  transforms: [encryptionTransform],
};

const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    auth: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
