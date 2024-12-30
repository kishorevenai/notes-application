import useAuth from "../../hook/useAuth";
import CreateNotes from "./CreateNotes";
import ShowAllNotes from "./ShowAllNotes";
import { useGetAllNotesQuery } from "./NotesApiSlice";
import { User } from "../../types";
import Header from "../../Components/Header";
import { useState, useRef, useEffect } from "react";
import searchIcon from "../../assets/searchIcon.svg";
import { SignellingManager } from "../../SignellingManager/SignellingManager";

const AllNotes = () => {
  const userDetail: User = useAuth();
  const [search, setSearch] = useState<string>("");
  const [users, setUsers] = useState([]);

  console.log("CHECKING ALL THE USERS", users);

  useEffect(() => {
    SignellingManager.getInstance().registerCallback({
      type: "ACTIVEUSERS",
      callback: (data) => {
        console.log("checking user data", data);
        setUsers(data);
      },
    });
    SignellingManager.getInstance().sendMessage({
      type: "SUBSCRIBE",
      id: userDetail.id,
      username: userDetail.name,
    });
  }, []);

  const { data, isSuccess, isLoading } = useGetAllNotesQuery({
    id: userDetail.id,
  });

  const handle_search = (e) => {
    setSearch(e.target.value);
  };

  const filteredNotes =
    isSuccess &&
    (() => {
      const query = search.toLowerCase();
      const filteredEntities = Object.entries(data.entities).filter(
        ([, note]) =>
          note.title.toLowerCase().includes(query) ||
          note.body.toLowerCase().includes(query) ||
          note.tags.some((tag) => tag.toLowerCase().includes(query))
      );

      const filteredIds = filteredEntities.map(([id]) => id);
      const filteredEntitiesObj = Object.fromEntries(filteredEntities);

      return {
        ids: filteredIds,
        entities: filteredEntitiesObj,
      };
    })();

  let content;

  if (isSuccess) {
    content = (
      <ShowAllNotes notes={search.trim() === "" ? data : filteredNotes} />
    );
  } else if (isLoading) {
    content = <div>Loading</div>;
  }

  return (
    <div className="flex h-full flex-col justify-start  items-center">
      <Header />
      <div className="w-11/12 h-full mx-auto flex justify-between items-center ">
        <div className="w-6/12 h-full flex flex-col justify-start items-center">
          <CreateNotes />

          {data?.ids.length !== 0 && (
            <div className="relative w-4/12 flex justify-center items-center">
              <div className="w-[20px] h-[20px] flex absolute right-3 top-4 justify-center items-center">
                <img className="w-full" src={searchIcon} title="search"></img>
              </div>
              <input
                className="border-2 border-black w-full h-[50px] pl-5 rounded-xl mb-3"
                placeholder="Search"
                onChange={handle_search}
                value={search}
              ></input>
            </div>
          )}

          <div className="overflow-y-auto w-full mx-auto h-2/6">{content}</div>
        </div>
        <div className="border-2 border-black aspect-square w-2/12 h-5/6 rounded-[10px]">
          {users.length === 0 ? (
            <p className="text-center">No users online yet</p>
          ) : (
            users.map((eachUser) => {
              if (userDetail.name !== eachUser.username) {
                return (
                  <div className="w-3/12 mx-auto flex justify-between items-center mb-2">
                    <p className="text-[10px]" key={eachUser.id}>
                      {eachUser.username}
                    </p>
                    <div className="w-[10px] aspect-square bg-green-300 rounded-full"></div>
                  </div>
                );
              }
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default AllNotes;
