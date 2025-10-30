import "./App.css";
import backgroundImage from "./assets/bg.png";
import logo from "./assets/logo.png";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  OrbitControls,
  Stage,
  Line,
  Text,
  Billboard,
  useProgress, // 👈 Import useProgress
} from "@react-three/drei";
// 👇 Import Suspense, useState, and useEffect
import { useRef, useMemo, Suspense, useState, useEffect } from "react";
import * as THREE from "three";
import Slider from "./Slider";
import carouselData from "./carouselData";
import "./Slider.css";
import companyLogo1 from "./assets/company1.png"; // Example: replace with your logo path
import companyLogo2 from "./assets/company2.png"; // Example: replace with your logo path
import companyLogo3 from "./assets/company3.png"; // Example: replace with your logo path
import { FaLinkedin, FaInstagram, FaTiktok } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

// --- NEW: LOADING SCREEN COMPONENT ---
// This component is pure HTML. It uses the 'useProgress' hook to
// track the global loading state of all assets.
function LoadingScreen() {
  const { active, progress } = useProgress();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // When loading is complete (active is false), start a fade-out
    if (!active) {
      const timer = setTimeout(() => setVisible(false), 500); // 0.5s delay
      return () => clearTimeout(timer);
    } else {
      // If loading starts again, make it visible
      setVisible(true);
    }
  }, [active]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "#111", // A dark background
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.5s ease-out",
        // Allow clicks to pass through when it's faded out
        pointerEvents: visible ? "all" : "none",
      }}
    >
      <h1
        style={{
          fontSize: "2rem",
          marginBottom: "1rem",
          paddingBottom: "0.5rem",
          color: "#FCA311",
          fontWeight: "bold",
        }}
      >
        Loading Experience...
      </h1>
      <h6 className="pb-2">The planets can be clicked and dragged ㋡</h6>
      {/* A simple progress bar */}
      <div style={{ width: "300px", height: "10px", backgroundColor: "#555" }}>
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            backgroundColor: "#FCA311", // Using your orange color
            transition: "width 0.3s ease",
          }}
        ></div>
      </div>
      <p style={{ marginTop: "1rem" }}>{Math.round(progress)}%</p>
    </div>
  );
}

/**
 * Model Component
 * (This is unchanged)
 */
function Model({ url, ...props }) {
  const { scene } = useGLTF(url);
  // useGLTF will automatically trigger the <Suspense> boundary
  return <primitive object={scene.clone()} {...props} />;
}

/**
 * OrbitingPlanet Component
 * (This is unchanged)
 */
function OrbitingPlanet({
  modelUrl,
  modelScale,
  orbitRadius,
  orbitSpeed,
  label,
}) {
  const planetRef = useRef();

  useFrame(({ clock }) => {
    if (planetRef.current) {
      const elapsedTime = clock.getElapsedTime();
      planetRef.current.position.x =
        Math.sin(elapsedTime * orbitSpeed) * orbitRadius;
      planetRef.current.position.z =
        Math.cos(elapsedTime * orbitSpeed) * orbitRadius;
    }
  });

  const orbitPoints = useMemo(() => {
    const curve = new THREE.EllipseCurve(
      0,
      0,
      orbitRadius,
      orbitRadius,
      0,
      2 * Math.PI,
      false,
      0
    );
    return curve.getPoints(100).map((p) => new THREE.Vector3(p.x, 0, p.y));
  }, [orbitRadius]);

  return (
    <group>
      <group ref={planetRef}>
        <Model url={modelUrl} scale={modelScale} />
        <Billboard position={[0, modelScale + 1.5, 0]}>
          <Text fontSize={2} color="white" anchorX="center" anchorY="middle">
            {label}
          </Text>
        </Billboard>
      </group>
      <Line
        points={orbitPoints}
        color="white"
        lineWidth={0.5}
        dashed={true}
        dashSize={0.2}
        gapSize={0.1}
      />
    </group>
  );
}

/**
 * PlanetSystem Component (For Section 1)
 * (This is unchanged)
 */
function PlanetSystem() {
  return (
    <group>
      <Model url="/Planet_1.gltf" scale={15} />
      <OrbitingPlanet
        modelUrl="/Planet_3.gltf"
        modelScale={1}
        orbitRadius={30}
        orbitSpeed={0.5}
        label=""
      />
    </group>
  );
}

/**
 * Section2System Component
 * (This is unchanged)
 */
function Section2System() {
  return (
    <group>
      <Model url="/Planet_11.gltf" scale={2} />
      <OrbitingPlanet
        modelUrl="/Planet_7.gltf"
        modelScale={0.8}
        orbitRadius={10}
        orbitSpeed={0.4}
        label="Web Dev"
      />
      <OrbitingPlanet
        modelUrl="/Planet_8.gltf"
        modelScale={1.0}
        orbitRadius={15}
        orbitSpeed={0.3}
        label="Game Dev"
      />
      <OrbitingPlanet
        modelUrl="/Planet_9.gltf"
        modelScale={0.7}
        orbitRadius={20}
        orbitSpeed={0.2}
        label="Video Editing"
      />
      <OrbitingPlanet
        modelUrl="/Planet_10.gltf"
        modelScale={0.7}
        orbitRadius={25}
        orbitSpeed={0.1}
        label="Business Pitch"
      />
    </group>
  );
}

function RotatingPlanet6({ scale, position }) {
  const planetRef = useRef();

  useFrame(() => {
    if (planetRef.current) {
      planetRef.current.rotation.y += 0.005; // Adjust rotation speed here
    }
  });

  return (
    <group ref={planetRef}>
      <Model url="/Planet_6.gltf" scale={scale} position={position} />{" "}
    </group>
  );
}

// --- Main App Component ---
function App() {
  return (
    <>
      {/* 👇 STEP 1: Render the HTML LoadingScreen here.
        It will float on top of everything.
      */}
      <LoadingScreen />

      <nav className="fixed flex justify-evenly items-center top-0 backdrop-blur-sm left-0 w-full p-4 z-50">
        {/* ... navbar links ... */}
        <ul className="flex justify-center items-center gap-x-8 md:gap-x-12">
          <li>
            <a
              href="#section2"
              className="text-white font-medium hover:text-gray-300"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#section3"
              className="text-white font-medium hover:text-gray-300"
            >
              Projects
            </a>
          </li>
          <li>
            <a href="#section1">
              <img src={logo} alt="Logo" className="h-20 w-auto" />
            </a>
          </li>
          <li>
            <a
              href="#section4"
              className="text-white font-medium hover:text-gray-300"
            >
              Experience
            </a>
          </li>
          <li>
            <a
              href="#section5"
              className="text-white font-medium hover:text-gray-300"
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>
      <div
        style={{ backgroundImage: `url(${backgroundImage})` }}
        className="w-screen bg-cover bg-no-repeat bg-center justify-center items-center"
      >
        <div id="section1" className="grid h-[200vh] w-full items-center p-8">
          <div className="col-start-1 row-start-1 z-10 flex flex-col items-center justify-start w-full h-full pt-20">
            {/* ... text content ... */}
            <div className="flex justify-start items-center w-full h-10">
              <h6>Hi I am Benjamin</h6>
            </div>
            <div className="flex flex-col justify-start items-center h-full w-full">
              <h6>You are about to experience something</h6>
              <h1 className="text-[15rem] font-bold text-[#FCA311]">AMAZING</h1>
            </div>
          </div>

          <div className="col-start-1 row-start-1 z-20 h-full w-full">
            <Canvas camera={{ position: [0, -0.5, 0], fov: 50 }}>
              {/* 👇 STEP 2: Wrap your 3D scene in <Suspense>
                The fallback is 'null' because our HTML <LoadingScreen>
                is already handling the UI.
              */}
              <Suspense fallback={null}>
                <Stage environment="city" intensity={0.5} margin={1.5}>
                  <PlanetSystem />
                </Stage>
              </Suspense>
              <OrbitControls enableZoom={false} />
            </Canvas>
          </div>
        </div>

        <div
          id="section2"
          className="flex flex-col justify-center items-center h-[150vh] w-full bg-transparent pb-20"
        >
          <div className="h-40 w-full"></div>
          <h6>I am a software engineering student specializing in. . . </h6>
          <Canvas camera={{ position: [0, 40, 0.1], fov: 50 }}>
            {/* 👇 STEP 2 (Repeat): Wrap this scene in <Suspense> too.
             */}
            <Suspense fallback={null}>
              <Stage environment="city" intensity={0.6}>
                <Section2System />
              </Stage>
            </Suspense>
            <OrbitControls enableZoom={false} />
          </Canvas>

          <h6 className=" font-bold text-[#FCA311] underline mt-12">
            <a href="https://drive.google.com/file/d/1IG8to_L_IJ5DBNT6h5i74Pa-vpsDWa0E/view?usp=sharing">
              And Many More
            </a>
          </h6>
        </div>
        <div className=" w-full h-10"></div>
        <div
          id="section3"
          className="h-[150vh] w-full bg-transparent p-8 flex flex-col justify-center items-center"
        >
          <h6>Here are some of my</h6>
          <h1 className="text-6xl font-bold text-[#FCA311] mb-24">
            Best Works
          </h1>

          {/* Add the Slider component here */}
          <Slider data={carouselData} activeSlide={2} />
        </div>

        <div
          id="section4"
          className="h-screen w-full bg-transparent p-8 relative"
        >
          {/* This is your content overlay */}
          {/* I've changed 'opacity-60' to 'bg-opacity-60' so only the background is transparent, not the text/logos */}
          <div className="h-full w-full flex flex-col justify-center items-center bg-black/50">
            <h6>My experience as a developer</h6>
            <h1 className="text-6xl font-bold text-[#FCA311] mb-12">
              {" "}
              {/* Reduced margin a bit */}
              My Journey So Far
            </h1>

            {/* Container for the white logos */}
            <div className="flex justify-around items-center w-full max-w-2xl mt-8 space-x-8">
              <img
                src={companyLogo1}
                alt="Company 1 Logo"
                className="h-12 w-auto filter grayscale brightness-0 invert"
                // Adjust h-12 (height) as needed
              />
              <img
                src={companyLogo2}
                alt="Company 2 Logo"
                className="h-12 w-auto filter grayscale brightness-0 invert"
              />
              <img
                src={companyLogo3}
                alt="Company 3 Logo"
                className="h-12 w-auto filter grayscale brightness-0 invert"
              />
            </div>
          </div>

          {/* This is the peeking planet in the background */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "-20%",
              transform: "translateY(-50%)",
              width: "50vw",
              height: "100%",
              zIndex: 0, // Explicitly set to be in the background
            }}
          >
            <Canvas camera={{ position: [0, 0, 50], fov: 30 }}>
              <Suspense fallback={null}>
                <Stage environment="city" intensity={0.8}>
                  <RotatingPlanet6 scale={10} position={[0, 0, 0]} />
                </Stage>
              </Suspense>
              <OrbitControls />
            </Canvas>
          </div>
        </div>

        <div id="section5" className="flex h-screen w-full bg-transparent p-8">
          <div className="flex flex-col justify-center items-baseline h-full w-1/2 ">
            <h6>Enjoy what I did?</h6>
            <h1 className="text-8xl font-bold text-[#FCA311]">
              Let's Start Something Together!
            </h1>
          </div>
          <div className="flex flex-col justify-center items-center h-full w-1/2  border-l  border-white/20">
            <div className="flex flex-row space-x-6">
              <a
                href="https://www.linkedin.com/in/thamyubin/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-4xl hover:text-gray-300 transition-colors"
              >
                <FaLinkedin />
              </a>

              <a
                href="https://www.instagram.com/biggabenja/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-4xl hover:text-gray-300 transition-colors"
              >
                <FaInstagram />
              </a>

              <a
                href="https://www.tiktok.com/@thedookiedev"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="text-4xl hover:text-gray-300 transition-colors"
              >
                <FaTiktok />
              </a>
            </div>

            {/* Email Address at the bottom */}
            <div className="flex flex-col justify-center items-center mt-8 pt-8  w-full ">
              <a
                href="mailto:benjamin.thamyubin@gmail.com"
                className="flex items-center text-lg hover:text-gray-300 transition-colors"
              >
                <HiOutlineMail className="mr-3 text-2xl" />
                benjamin.thamyubin@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end items-center w-full h-6 bg-black pr-10">
        <h6 className="text-sm">Made by Benjamin - 2025</h6>
      </div>
    </>
  );
}

export default App;
