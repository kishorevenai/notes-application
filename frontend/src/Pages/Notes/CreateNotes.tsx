import { useState } from "react";
import { Addnote } from "../../types";
import { v4 } from "uuid";
import useAuth from "../../hook/useAuth";
import { Select } from "antd";
import { useSaveNotesMutation } from "./NotesApiSlice";
import { notification } from "antd";

const CreateNotes = () => {
  const [api, contextHolder] = notification.useNotification();
  const [noteDetail, setNoteDetail] = useState<Addnote>({
    id: v4(),
    title: "",
    body: "",
    tags: [],
  });

  const openNotification = (message: string, type: string) => {
    //@ts-ignore
    api[type]({
      message,
    });
  };

  const [saveNotes, { isLoading, isSuccess, isError, error }] =
    useSaveNotesMutation();

  const authDetails = useAuth();

  console.log(authDetails);

  const handleChange = (value: string) => {
    console.log(value);
    setNoteDetail((prev) => ({ ...prev, tags: [...value] }));
  };

  const handle_save_note = async (e) => {
    e.preventDefault();
    try {
      await saveNotes({
        noteDetail,
        id: authDetails.id,
      });

      openNotification("Notes successfully added", "success");
      setNoteDetail({
        id: v4(),
        title: "",
        body: "",
        tags: [],
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="h-[400px] mt-10 w-[400px] border-2 border-black rounded-[10px] flex flex-col justify-evenly items-center mb-5">
      {contextHolder}
      <p className="text-[13px]">Enter the notes</p>
      <div className="w-[90%] flex justify-between items-start">
        <label htmlFor="title">Title:</label>
        <input
          value={noteDetail.title}
          required
          id="title"
          name="title"
          className="pl-2 border rounded-[10px] h-[40px]"
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
          className="pl-2 pt-2 border rounded-[10px] h-[100px] max-h-[200px]"
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

      <div className="w-[90%] flex justify-between items-start">
        <label htmlFor="tags">tags:</label>
        <Select
          mode="tags"
          style={{ width: "60%" }}
          placeholder="Tags Mode"
          onChange={handleChange}
          value={noteDetail.tags}
        />
      </div>
      <button
        onClick={handle_save_note}
        className="border-2 py-1 px-5 rounded-xl hover:bg-orange-600 hover:text-white duration-150"
      >
        Save
      </button>
    </form>
  );
};

export default CreateNotes;
