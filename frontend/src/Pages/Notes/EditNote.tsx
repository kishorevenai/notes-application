import { useState } from "react";
import { Addnote, User } from "../../types";
import { useLocation, useNavigate } from "react-router-dom";
import { Select } from "antd";
import { useEditSpecificNoteMutation } from "./NotesApiSlice";
import useAuth from "../../hook/useAuth";
import { notification } from "antd";

const EditNote = () => {
  const location = useLocation();
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const specificNote: Addnote = location.state;
  const authDetails: User = useAuth();

  const [editSpecificNote, { isLoading, isSuccess, isError, error }] =
    useEditSpecificNoteMutation();

  const openNotification = (message: string, type: string) => {
    //@ts-ignore
    api[type]({
      message,
    });
  };

  const [noteDetail, setNoteDetail] = useState<Addnote>({
    id: specificNote.id ?? "",
    title: specificNote.title ?? "",
    body: specificNote.body ?? "",
    tags: specificNote.tags ?? [],
  });

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
