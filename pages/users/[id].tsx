import { useEffect } from "react";
import MainContainer from "../../components/MainContainer";
import { User } from "../../users";

export default function () {
  let user: User | null = null

  if (typeof window !== 'undefined') {
    user = JSON.parse(localStorage.getItem('user'))
  }

  return (
    <MainContainer>
      <div className="container">
        {user ? (
          <div className="d-flex flex-column align-items-center">
            <img src={user.picture.large} alt="user image" width={200} />
            <h2>{`${user.name.title} ${user.name.first} ${user.name.last}`}</h2>
          </div>
        ) : (
          <h2>Cannot find this user</h2>
        )}
      </div>
    </MainContainer>
  );
};
