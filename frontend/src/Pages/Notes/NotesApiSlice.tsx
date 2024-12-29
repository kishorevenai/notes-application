import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";
import { v4 as uuid } from "uuid";

const notesAdapter = createEntityAdapter();

const initialState = notesAdapter.getInitialState();

export const notesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllNotes: builder.query({
      query: ({ id }) => ({
        url: `/user/user-detail/${id}`,
        method: "GET",
      }),
      transformResponse: (Response) => {
        const loadedNotes = Response.map((notes) => {
          notes.id = notes.id;
          return notes;
        });

        return notesAdapter.setAll(initialState, loadedNotes);
      },
      providesTags: (result, error, arg) => {
        return [
          { type: "Note", id: "LIST" },
          ...result?.ids.map((id) => ({ type: "Note", id })),
        ];
      },
    }),
    saveNotes: builder.mutation({
      query: ({ noteDetail, id }) => ({
        url: `/user/add-note/?userId=${id}`,
        method: "POST",
        body: {
          ...noteDetail,
          id: uuid(),
        },
      }),
      invalidatesTags: [{ type: "Note", id: "LIST" }],
    }),
    deleteSpecificNote: builder.mutation({
      query: ({ userId, noteId }) => ({
        url: `/user/delete-note/?userId=${userId}&notesId=${noteId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        {
          type: "Note",
          id: arg.noteId,
        },
      ],
    }),
    getSpecificNotes: builder.query({
      query: ({ noteId, userId }) => ({
        url: `/user/get-specific-note/?noteId=${noteId}&userId=${userId}`,
        method: "GET",
      }),
    }),
    editSpecificNote: builder.mutation({
      query: ({ noteDetail, userId, noteId }) => ({
        url: `/user/edit-note/?userId=${userId}&notesId=${noteId}`,
        method: "POST",
        body: {
          ...noteDetail,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        {
          type: "Note",
          id: arg.noteId,
        },
      ],
    }),
  }),
});

export const {
  useGetAllNotesQuery,
  useSaveNotesMutation,
  useDeleteSpecificNoteMutation,
  useEditSpecificNoteMutation,
  useGetSpecificNotesQuery,
} = notesApiSlice;

export const selectNotesResult = notesApiSlice.endpoints.getAllNotes.select();

const selectNotesData = createSelector(
  selectNotesResult,
  (notesResult) => notesResult
);

export const {
  selectAll: selectAllNotes,
  selectById: selectNotesById,
  selectIds: selectNotesIds,
} = notesAdapter.getSelectors(
  (state) => selectNotesData(state) ?? initialState
);
