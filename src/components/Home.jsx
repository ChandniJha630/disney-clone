import { useState, useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ImgSlider from "./ImgSlider";
import NewDisney from "./NewDisney";
import Originals from "./Originals";
import Recommends from "./Recommended";
import Trending from "./Trending";
import Viewers from "./Viewers";
import db from "../firebase";
import { setMovies } from "../features/movie/movieSlice";
import { selectUserName, selectUserPhoto } from "../features/user/userSlice";
import {collection, getDocs} from "firebase/firestore"

function Home(){
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userName = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);
  const [recommends, setRecommends] = useState([]);
  const [newDisneys, setNewDisneys] = useState([]);
  const [originals, setOriginals] = useState([]);
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = await getDocs(collection(db, "movie"));
        const newRecommends = [];
        const newNewDisneys = [];
        const newOriginals = [];
        const newTrending = [];
  
        docRef.forEach((doc) => {
          switch (doc.data().type) {
            case "recommend":
              newRecommends.push({ id: doc.id, ...doc.data() });
              break;
  
            case "new":
              newNewDisneys.push({ id: doc.id, ...doc.data() });
              break;
  
            case "original":
              newOriginals.push({ id: doc.id, ...doc.data() });
              break;
  
            case "trending":
              newTrending.push({ id: doc.id, ...doc.data() });
              break;
          }
        });
  
        setRecommends(newRecommends);
        setNewDisneys(newNewDisneys);
        setOriginals(newOriginals);
        setTrending(newTrending);
  
        dispatch(
          setMovies({
            recommend: newRecommends,
            newDisney: newNewDisneys,
            original: newOriginals,
            trending: newTrending,
          })
        );
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
  
    fetchData();
  }, [dispatch]);
  

  return (
    <Container>
      <ImgSlider />
      <Viewers />
      <Recommends />
      <NewDisney />
      <Originals />
      <Trending />
    </Container>
  );
};

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);

  &:after {
    background: url("/images/home-background.png") center center / cover
      no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;

export default Home;