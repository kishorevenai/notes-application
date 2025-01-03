import { useEffect, useMemo, useState } from "react";
import { Addnote, User } from "../../types";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Select } from "antd";
import {
  useEditSpecificNoteMutation,
  useGetSpecificNotesMutation,
} from "./NotesApiSlice";
import useAuth from "../../hook/useAuth";
import { notification } from "antd";
import { SignellingManager } from "../../SignellingManager/SignellingManager";

const EditNote = () => {
  const location = useLocation();
  const { id } = useParams();
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const specificNote: Addnote = location.state;
  const authDetails: User = useAuth();

  const [editSpecificNote, { isLoading, isSuccess, isError, error }] =
    useEditSpecificNoteMutation();

  const [getSpecificNotes, { data: Note, isSuccess: getSpecificNoteSuccess }] =
    useGetSpecificNotesMutation();

  const [noteDetail, setNoteDetail] = useState<Addnote>({
    id: getSpecificNoteSuccess ? Note.id : "",
    title: getSpecificNoteSuccess ? Note.title : "",
    body: getSpecificNoteSuccess ? Note.body : "",
    tags: getSpecificNoteSuccess ? Note.tags : [],
  });

  useEffect(() => {
    SignellingManager.getInstance().sendMessage({
      type: "NOTEAUTHORSUBSCRIBE",
      noteId: id,
      userId: authDetails.id,
      noteContent: noteDetail,
    });
  }, [noteDetail]);
  const openNotification = (message: string, type: string) => {
    //@ts-ignore
    api[type]({
      message,
    });
  };

  const shouldFetchNote = useMemo(
    () => id && authDetails?.id,
    [id, authDetails?.id]
  );

  useEffect(() => {
    getSpecificNotes({
      noteId: id,
      userId: authDetails.id,
    });
  }, [shouldFetchNote]);

  useEffect(() => {
    if (getSpecificNoteSuccess) {
      console.log(Note);
      setNoteDetail({
        id: Note.id,
        title: Note.title,
        body: Note.body,
        tags: Note.tags,
      });
    }
  }, [getSpecificNoteSuccess]);

  const handleChange = (value: string) => {
    setNoteDetail((prev) => ({ ...prev, tags: [...value] }));
  };

  const handle_save_note = async (e) => {
    e.preventDefault();
    try {
      await editSpecificNote({
        noteDetail,
        noteId: specificNote.id,
        userId: authDetails.id,
      });

      openNotification("Notes Edited Successfully", "success");

      navigate("/Notes");
    } catch (error) {
      openNotification("Unable to edit the note", "error");
    }
  };

  return (
    <div className="h-full w-full flex justify-center items-center">
      <form
        onSubmit={handle_save_note}
        className="h-[500px] w-[500px]  border-2 border-black rounded-[10px] shadow-xl flex flex-col justify-evenly items-center "
      >
        {contextHolder}
        <div className="w-[90%] flex justify-between items-start">
          <label htmlFor="title">Title:</label>

          <input
            required
            value={noteDetail.title}
            id="title"
            name="title"
            className="pl-2 border h-[50px] rounded-[10px] w-[70%]"
            onChange={(e) =>
              setNoteDetail((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
          ></input>
        </div>

        <div className="w-[90%] flex justify-between items-start">
          <label htmlFor="body">Body:</label>

          <textarea
            value={noteDetail.body}
            required
            className="pl-2 border rounded-[10px] h-[250px] w-[70%] pt-2"
            id="body"
            name="body"
            onChange={(e) =>
              setNoteDetail((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
          ></textarea>
        </div>

        <div className="w-[90%] flex justify-between items-center">
          <label htmlFor="tags">tags:</label>

          <Select
            mode="tags"
            style={{ width: "70%" }}
            placeholder="Tags Mode"
            onChange={handleChange}
            value={noteDetail.tags}
          />
        </div>
        <button
          type="submit"
          className="border-2 py-1 px-5 rounded-xl hover:bg-orange-600 hover:text-white duration-150"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default EditNote;
