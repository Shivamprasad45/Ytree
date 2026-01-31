import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBlog } from "../../../type";

interface BlogState {
    blogs: IBlog[];
    selectedBlog: IBlog | null;
    selectedCategory: string | null;
    selectedTag: string | null;
    searchQuery: string;
    loading: boolean;
    error: string | null;
}

const initialState: BlogState = {
    blogs: [],
    selectedBlog: null,
    selectedCategory: null,
    selectedTag: null,
    searchQuery: "",
    loading: false,
    error: null,
};

const blogSlice = createSlice({
    name: "blog",
    initialState,
    reducers: {
        setBlogs: (state, action: PayloadAction<IBlog[]>) => {
            state.blogs = action.payload;
        },
        setSelectedBlog: (state, action: PayloadAction<IBlog | null>) => {
            state.selectedBlog = action.payload;
        },
        setSelectedCategory: (state, action: PayloadAction<string | null>) => {
            state.selectedCategory = action.payload;
        },
        setSelectedTag: (state, action: PayloadAction<string | null>) => {
            state.selectedTag = action.payload;
        },
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        clearFilters: (state) => {
            state.selectedCategory = null;
            state.selectedTag = null;
            state.searchQuery = "";
        },
    },
});

export const {
    setBlogs,
    setSelectedBlog,
    setSelectedCategory,
    setSelectedTag,
    setSearchQuery,
    setLoading,
    setError,
    clearFilters,
} = blogSlice.actions;

export default blogSlice.reducer;
