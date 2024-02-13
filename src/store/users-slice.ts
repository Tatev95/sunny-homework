import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AddUserType, UsersType } from "../types/types";
import { store } from ".";

type usersState = {
  usersList: UsersType[];
  isLoading: boolean;
  addValues: UsersType | null
  editedUser: {
    name: string,
    age: number
  },
  editedId: string
};

const initialState: usersState = {
  usersList: [],
  isLoading: false,
  addValues: {
    id: '0',
    name: '',
    age: 0
  },
  editedUser: {
    name: '',
    age: 0
  },
  editedId: ''
};

export const getUsers = createAsyncThunk(
  "users/getUsers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("http://localhost:8080/users");
      return await res.json();
    } catch (e) {
      rejectWithValue("my error");
    }
  }
);


export const addUser = createAsyncThunk(
  "users/addUser",
  async (newUser: AddUserType, { rejectWithValue }) => {
    try {
      const res = await fetch("http://localhost:8080/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      return await res.json();
    } catch (e) {
      rejectWithValue("error with add  new user");
    }
  }
);

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async ({ userId, updatedUser }: { userId: string; updatedUser: AddUserType }, { rejectWithValue }) => {
    try {
      const res = await fetch(`http://localhost:8080/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });

      return await res.json();
    } catch (e) {
      return rejectWithValue('Error updating user: ');
    }
  }
);

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (userId: string, { rejectWithValue }) => {
    try {
      const res = await fetch(`http://localhost:8080/users/${userId}`, {
        method: 'DELETE',
      });
      return userId;
    } catch (e) {
      rejectWithValue('Error deleting user');
    }
  });


const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.usersList = action.payload;
    },
    setAddValues: (state, action) => {
      state.addValues = action.payload;
    },
    editUser: (state, action) => {
      state.editedUser = action.payload;
    },
    setEditedId: (state, action) => {
      state.editedId = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;

        state.usersList = action.payload;
      }),
      builder.addCase(getUsers.rejected, (state) => {
        state.isLoading = true;
      });
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.usersList.push(action.payload);
    });
    builder.addCase(addUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.usersList = state.usersList.filter(user => user.id !== action.payload);
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      console.log('reject delete');

    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      const i = state.usersList.findIndex((user) => user.id === action.payload.id);
      if (i !== -1) {
        state.usersList[i] = action.payload;
      }
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      console.log('rejected')
    })
  },
});

export const {
  setUsers,
  editUser,
  setAddValues,
  setEditedId
} = usersSlice.actions;

export default usersSlice.reducer;
