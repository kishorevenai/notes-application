import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import { useParams } from "react-router-dom";
import { useGetAllNotesOfUserMutation } from "../Notes/NotesApiSlice";
import { SignellingManager } from "../../SignellingManager/SignellingManager";
import useAuth from "../../hook/useAuth";

const UsersNote = () => {
  const { id } = useParams();
  const authDetails = useAuth();
  const [contenttype, setContent] = useState(null);
  const [getAllNotesOfUser, { data, isLoading, isSuccess, isError, error }] =
    useGetAllNotesOfUserMutation();

  console.log("CHECK IN FRONTEND", contenttype);

  useEffect(() => {
    getAllNotesOfUser({ userId: id });

    SignellingManager.getInstance().registerCallback({
      type: "NOTETYPE",
      callback: (data) => {
        console.log(data);
        setContent(data);
      },
    });
    SignellingManager.getInstance().sendMessage({
      type: "NOTESUBSCRIBE",
      RemoteId: id,
      id: authDetails.id,
    });
  }, []);

  let content;

  if (isLoading) {
    content = <div>Loading</div>;
  } else if (isSuccess) {
    content = (
      <div className="flex">
        {data.Notes.map((note) => {
          console.log(note);
          return <NotesReader changedContent={contenttype} note={note} />;
        })}
      </div>
    );
  } else if (isError) {
    content = <div>Faced an issue while fetching the notes.</div>;
  }

  return (
    <div>
      <Header />
      <div className="border-2 flex justify-center items-center h-[500px]">
        {content}
      </div>
    </div>
  );
};

const NotesReader = ({ note, changedContent }) => {
  let content = null;
  if (note?.id === changedContent?.id) {
    content = changedContent;
  }

  console.log(content);
  return (
    <div
      key={changedContent?.id ?? note.id}
      className="flex flex-col justify-between items-center w-fit"
    >
      <div className="flex justify-between items-start h-[50px] mb-5 w-[350px]">
        <label className="p_3 font-bold">Title:</label>
        <input
          disabled
          className="border-2 border-black rounded-xl h-full pl-3 w-[80%]"
          value={content?.title ?? note.title}
        />
      </div>
      <div className="flex justify-between items-start w-[350px] ">
        <label className="p_3 font-bold">Body:</label>
        <textarea
          disabled
          className="border-2 border-black rounded-xl pl-3 pt-1 w-[80%]"
          value={content?.body ?? note.body}
        />
      </div>
    </div>
  );
};

export default UsersNote;
