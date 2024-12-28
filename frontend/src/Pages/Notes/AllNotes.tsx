import useAuth from "../../hook/useAuth";
import CreateNotes from "./CreateNotes";
import ShowAllNotes from "./ShowAllNotes";
import { useGetAllNotesQuery } from "./NotesApiSlice";
import { User } from "../../types";

const AllNotes = () => {
  const userDetail: User = useAuth();

  console.log("CHECKING AGAIN THE DATA", userDetail);

  const { data, isSuccess, isLoading } = useGetAllNotesQuery({
    id: userDetail.id,
  });

  let content;

  if (isSuccess) {
    console.log("IS SUCCESS", data);
    content = <ShowAllNotes notes={data} />;
  } else if (isLoading) {
    content = <div>Loading</div>;
  }

  return (
    <div className="flex h-full flex-col justify-start  items-center">
      <CreateNotes />
      <div className="overflow-y-auto w-8/12 mx-auto h-2/6">{content}</div>
    </div>
  );
};

export default AllNotes;
