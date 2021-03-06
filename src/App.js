import React, { useEffect, useState } from "react";
import "./App.css";
import Tmdb from "./Tmdb.js";
import MovieRow from "./components/MovieRow.js";
import FeaturedMovie from "./components/FeaturedMovie";
import Header from "./components/Header.js";

export default () => {
  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      //pegando a lista TOTAL
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      //Pegando o Featured
      let originals = list.filter((i) => i.slug === "originals");

      if (originals && originals.length > 0) {
        let randomChosen = Math.floor(
          Math.random() * (originals[0].items.results.length - 1)
        );
        let chosen = originals[0].items.results[randomChosen];
        let chosenInfo = await Tmdb.getMovieInfo(chosen.id, "tv");
        setFeaturedData(chosenInfo);
      }
    };
    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    };

    window.addEventListener("scroll", scrollListener);
    return () => {
      window.removeEventListener("scroll".scrollListener);
    };
  }, []);

  return (
    <div className="page">
      <Header black={blackHeader} />

      {featuredData && <FeaturedMovie item={featuredData} />}
      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>

      <footer>
        Feito com{" "}
        <span role="img" aria-label="coração">
          ❤
        </span>{" "}
        por <a href="https://github.com/iaans">Ian</a>
        <br />
        Direitos de imagem para Netflix, Amazon, Disney+, etc... <br />
        Dados utilizados do site{" "}
        <a href="https://www.themoviedb.org/">The Moviebd.org </a>
      </footer>

        {movieList.length <= 0 && 
          <div className="loading">
            <img src="https://i.gifer.com/8Etj.gif" alt="Carregando" />
          </div>
        }

    </div>
  );
};
