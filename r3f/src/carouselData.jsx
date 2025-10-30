import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCameraRetro,
  faDragon,
  faGlassCheers,
} from "@fortawesome/free-solid-svg-icons";
import project1Img from "./assets/project1.png";
import project2Img from "./assets/project2.png";
import project3Img from "./assets/project3.png";

export default [
  {
    id: 1,
    bgColor: "#F54748",
    icon: <FontAwesomeIcon icon={faCameraRetro} size="3x" />,
    title: "Custom Programming Language",
    // 👇 --- ADD THESE LINES --- 👇
    img: project1Img,
    repo: "https://github.com/BenjaminTham/Custom-Programming-Language",
    // 👆 --- END OF ADDED LINES --- 👆
    desc: "Siao Language (or SiaoLang) is an esoteric language created from Singlish",
  },
  {
    id: 2,
    bgColor: "#7952B3",
    icon: <FontAwesomeIcon icon={faGlassCheers} size="3x" />,
    title: "Fiscal City",
    // 👇 --- ADD THESE LINES --- 👇
    img: project2Img,
    repo: "https://github.com/BenjaminTham/Budget-Tracker",
    // 👆 --- END OF ADDED LINES --- 👆
    desc: "Gamified budget tracker where you use your savings to build a city",
  },
  {
    id: 3,
    bgColor: "#1597BB",
    icon: <FontAwesomeIcon icon={faDragon} size="3x" />,
    title: "VishingDefender",
    // 👇 --- ADD THESE LINES --- 👇
    img: project3Img,
    repo: "https://ieeexplore.ieee.org/document/10425272",
    // 👆 --- END OF ADDED LINES --- 👆
    desc: "An IEEE conference paper utilizing DSA techniques to guard against vishing",
  },
  // ... repeat for all 5 items
  //   {
  //     id: 4,
  //     bgColor: "#185ADB",
  //     icon: <FontAwesomeIcon icon={faFootballBall} size="3x" />,
  //     title: "Project Four",
  //     img: "https://via.placeholder.com/300x150.png?text=Project+4+Snippet",
  //     repo: "https://github.com/your-username/project-four",
  //     desc: "A brief description of Project Four and the technologies used.",
  //   },
  //   {
  //     id: 5,
  //     bgColor: "#FF616D",
  //     icon: <FontAwesomeIcon icon={faHelicopter} size="3x" />,
  //     title: "Project Five",
  //     img: "https://via.placeholder.com/300x150.png?text=Project+5+Snippet",
  //     repo: "https://github.com/your-username/project-five",
  //     desc: "A brief description of Project Five and the technologies used.",
  //   },
];
