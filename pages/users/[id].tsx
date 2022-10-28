import MainContainer from "../../components/MainContainer";
import { User } from "../../users";

export default function () {
  const user: User = JSON.parse(localStorage.getItem('user'));

  return (
    <MainContainer>
      <div className="container">
        <div className="d-flex flex-column align-items-center">
          <img src={user.picture.large} alt="user image" width={200} />
          <h2>{`${user.name.title} ${user.name.first} ${user.name.last}`}</h2>
          {/* <h3>user.</h3> */}
        </div>
      </div>

      <style>
        {`
          .container
        `}
      </style>
    </MainContainer>
  );
};
