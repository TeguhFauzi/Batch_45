import Prof from "../image/Vectors.png";
import Gmail from "../image/Gmail.png";
import Shape from "../image/Shape.png";
import Gender from "../image/Gender.png";
import HP from "../image/HP.png";
import Loc from "../image/Loc.png";
import Profs from "../image/zinjok.png";
function Profile() {
  const loggedInUser =
      JSON.parse(localStorage.getItem("setUserData")) || [];
  return (
    <div className="Profilesz">
      <div className="flexx">
        <div className="colour">
          <div className="cardb">
            <h1>Personal Info</h1>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <div>
                <img src={Prof} alt="" />
          </div>
          <div className="texty">
                <h3>{loggedInUser.fullName}</h3>
                <p>Full Name</p>
                </div>
              </li>
              <li className="list-group-item">
                <img src={Gmail} alt=""/>
                <div className="texty">
                <h3>{loggedInUser.email}</h3>
                <p>Email</p>
                </div>
              </li>
              <li className="list-group-item">
                <img src={Shape} alt="" />
                <div className="texty">
                <h3>Active</h3>
                <p>Status</p>
                </div>
              </li>
              <li className="list-group-item">
                <img src={Gender} alt="" />
                <div className="texty">
                <h3>{loggedInUser.gender}</h3>
                <p>Gender</p>
                </div>
              </li>
              <li className="list-group-item">
                <img src={HP} alt="" />
                <div className="texty">
                <h3>{loggedInUser.phone}</h3>
                <p>Mobile Phone</p>
                </div>
              </li>
              <li className="list-group-item">
                <img src={Loc} alt=""/>
                <div className="texty">
                <h3>{loggedInUser.address}</h3>
                <p>Addres</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="cardb">
            <img src={Profs} class="card-img-top" alt="..." />
            <div className="card-body">
              <label className="btn btn-danger">
                Change Photo Profile
                <input
                  type="file"
                  style={{ display: "none" }}
                  onChange={(e) => console.log(e.target.files)}
                />
              </label>


            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Profile;
