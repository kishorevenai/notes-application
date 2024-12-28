import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { store } from "../../app/store";
import { notesApiSlice } from "./NotesApiSlice";
import useAuth from "../../hook/useAuth";
import { User } from "../../types";

export const PrefetchNotes = () => {
  const authDetails: User = useAuth();
  useEffect(() => {
    const notes = store.dispatch(
      notesApiSlice.endpoints.getAllNotes.initiate({
        id: authDetails.id,
      })
    );

    return () => {
      notes.unsubscribe();
    };
  }, []);

  return <Outlet />;
};
