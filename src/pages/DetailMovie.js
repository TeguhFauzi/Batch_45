import { useParams, Link } from "react-router-dom";
import moviesData from "../data/FakeData.json";
import ReactPlayer from "react-player";

function DetailFilms() {
  const { id } = useParams();

  // Cari data film dengan id yang sesuai di file JSON
  const movie = moviesData.MV[`Movie${id}`];
  // jika id sama dengan 1, maka prevId akan menjadi null
  const prevId = parseInt(id) !== 1 ? parseInt(id) - 1 : 12;

  // jika id lebih kecil dari atau sama dengan 11, maka nextId akan diberi nilai selanjutnya
  // jika id lebih besar dari 11, maka nextId menjadi null
  const nextId = parseInt(id) <= 11 ? parseInt(id) + 1 : 1;

  return (
    <div className="black">
      <div className="backgrounds">
        <ReactPlayer url={movie.url} />
      </div>
      <div className="bottom">
        <div className="padss">
          <div className="bottoms">
            <div className="lefting">
              <img
                src={require(`../image/${movie.image}.png`)}
                alt="Background"
              />
              <div className="context">
                <h1>{movie.name}</h1>
                <div className="yires">
                  <p className="yiresa">{movie.year}</p>
                  <p className="movs">Movies</p>
                </div>
                <p className="descir">{movie.description}</p>
              </div>
            </div>
            <div className="rights">
              <Link to={`/Detail-Movie/${prevId}`} className="buttpin">
                <i class="fa fa-chevron-left"></i>
              </Link>
              <a className="linknya" href={movie.href}>
                <i class="fa fa-play"></i>
                <div style={{width:"500px",height:"300px"}}>
                  <img
                    style={{ opacity: "50%" }}
                    src={require(`../image/play/${movie.play}.jpg`)}
                    alt="Background"
                  />
                </div>
              </a>
              <Link to={`/Detail-Movie/${nextId}`} className="buttpin">
                <i class="fa fa-chevron-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailFilms;
