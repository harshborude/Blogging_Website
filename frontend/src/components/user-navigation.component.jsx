import { Link } from "react-router-dom";
import AnimationWrapper from "../common/page-animation";
import { useContext } from "react";
import { UserContext } from "../App";
import { removeFromSession } from "../common/session";

const UserNavigationPanel = ({ dropdownRef }) => {
  const {
    userAuth: { username },
    setUserAuth,
  } = useContext(UserContext);

  const signOutUser = () => {
    removeFromSession("user");
    setUserAuth({ access_token: null });
  };

  return (
    <AnimationWrapper
      className="absolute right-0 z-50"
      transition={{ duration: 0.2 }}
    >
      <div
        ref={dropdownRef}
        className="bg-white absolute right-0 border-grey w-60 overflow-hidden duration-200"
      >
        <Link to="/editor" className="flex gap-2 link md:hidden pl-8 py-4">
          <i className="fi fi-rr-file-edit"></i>
          <p>Write</p>
        </Link>

        <Link to={`/user/${username}`} className="link py-4 pl-8">
          Profile
        </Link>

        <Link to="/dashboard/blogs" className="link py-4 pl-8">
          Dashboard
        </Link>

        <Link to="/settings/edit-profile" className="link py-4 pl-8">
          Setting
        </Link>

        <span className="absolute border-t border-grery w-full" />

        <button
          className="text-left p-4 hover:bg-grey w-full pl-8 py-4"
          onClick={signOutUser}
        >
          <h1 className="font-bold text-xl mb-1">Sign out</h1>
          <p className="text-dark-grey">@{username}</p>
        </button>
      </div>
    </AnimationWrapper>
  );
};

export default UserNavigationPanel;
