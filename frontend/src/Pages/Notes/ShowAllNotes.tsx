import { Addnote, User } from "../../types";
import deleteIcon from "../../assets/deleteIcon.svg";
import editIcon from "../../assets/editIcon.svg";
import { Link } from "react-router-dom";
import { useDeleteSpecificNoteMutation } from "./NotesApiSlice";
import useAuth from "../../hook/useAuth";
import { useMemo } from "react";

const ShowAllNotes = ({ notes }: { notes: Addnote[] }) => {
  let content;

  if (notes?.ids.length !== 0) {
    content = notes.ids.map((id) => {
      return <NoteCard note={notes.entities[id]} noteId={id} />;
    });
  } else {
    content = <p className="text-[15px]">Notes That You Add Appear Here</p>;
  }

  return <div className="w-8/12 mx-auto h-fit">{content}</div>;
};

const NoteCard = ({ note, noteId }) => {
  const authDetails: User = useAuth();

  useMemo(() => {}, [noteId]);

  const [deleteSpecificNote, { isLoading, isSuccess }] =
    useDeleteSpecificNoteMutation();

  const handle_delete = async () => {
    await deleteSpecificNote({
      userId: authDetails.id,
      noteId,
    });
  };
  return (
    <div className="w-11/12 h-fit relative mx-auto duration-150 border-2 rounded-xl px-5 py-1 mb-2 hover:shadow-xl">
      <div className="h-full absolute top-0 left-0 bg-black w-[10px] rounded-tl-[10px] rounded-bl-[10px]"></div>
      <div className="flex justify-between items-center mb-5">
        <p className="text-[18px] font-bold">{note.title.toUpperCase()}</p>

        <div className="w-[80px] flex justify-between items-center">
          <Link to={`/note/${note.id}`} state={note}>
            <button className="flex justify-between w-[25px] items-center">
              <img src={editIcon} alt="edit"></img>
            </button>
          </Link>
          <button
            onClick={handle_delete}
            className="flex justify-between w-[25px] items-center"
          >
            <img src={deleteIcon} alt="delete"></img>
          </button>
        </div>
      </div>

      <textarea
        disabled
        className="text-[13px] h-fit border-none rounded-[10px] pl-2 pt-2 w-full overflow-hidden border-2"
      >
        {note.body}
      </textarea>
    </div>
  );
};

export default ShowAllNotes;
