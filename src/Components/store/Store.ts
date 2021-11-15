import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './Slice';


const store = configureStore({
  reducer: {
    diaries: counterReducer
  }
})
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;