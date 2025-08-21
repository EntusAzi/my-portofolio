'use client'
import Image from "next/image";
import Lanyard from "./components/Lanyard/Lanyard";
import BlurText from "./components/BlurText/BlurText";
import RotatingText from "./components/RotatingText/RotatingText";
import ScrollVelocity from "./components/ScrollVelocity/ScrollVelocity";
import TrueFocus from "./components/TrueFocus/TrueFocus";
import Orb from "./components/Orb/Orb";
import ProfileCard from "./components/ProfileCard/ProfileCard";
import Dock from "./components/Dock/Dock";
import { VscHome, VscArchive, VscAccount } from "react-icons/vsc";
import SpotlightCard from "./components/SpotlightCard/SpotlightCard";
import DecryptedText from "./components/DecryptedText/DecryptedText";
import SplashCursor from "./components/SplashCursor/SplashCursor";
import ScrollLine from "./components/ScrollLine/ScrollLine";
import { useRef } from "react";
import ScrambledText from "./components/ScrambledText/ScrambledText";

export default function Home() {

  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleStepChange = (step: number) => {
    if (stepRefs.current[step - 1]) {
      stepRefs.current[step - 1]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  // Function untuk set ref
  const setStepRef = (index: number) => (el: HTMLDivElement | null) => {
    stepRefs.current[index] = el;
  };

  const items = [
    { icon: <VscHome size={18} />, label: 'Home', onClick: () => alert('Home!') },
    { icon: <VscArchive size={18} />, label: 'Archive', onClick: () => alert('Archive!') },
    { icon: <VscAccount size={18} />, label: 'Profile', onClick: () => alert('Profile!') },
  ];
  
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#000000]">
      {/* Background Orb */}
      <div className="absolute top-0 left-0 w-full h-full">
        <Orb 
          hoverIntensity={0.5}
          rotateOnHover={true}
          hue={0}
          forceHoverState={false}
        />
      </div>
      
      {/* Hero Section */}
      <div className="container mx-auto h-screen flex items-center px-8">
        <div className="grid grid-cols-12 gap-12 w-full overflow-visible">
          {/* Left Side - Text */}
          <div className="col-span-6 flex flex-col justify-center">
            <div className="space-y-4 px-6">
              <div className="flex justify-start w-full overflow-visible mr-8">
                <BlurText 
                  text="ENTUS AZI BACHTIAR"
                  delay={600}
                  animateBy="words"
                  direction="top"
                  className="text-9xl font-bold text-white leading-tight tracking-tight"
                />  
              </div>
              
              <div className="flex items-center gap-4">
                <h1 className="text-4xl text-white font-bold">I'm Ready For Job</h1>
                <RotatingText 
                  texts={['Web Developer', 'UI/UX Designer', 'Freelancer']}
                  mainClassName="px-7 bg-[#80D8C3] text-black overflow-hidden py-3 justify-center rounded-lg text-3xl font-bold inline-flex transition-all"
                  staggerFrom={"last"}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                  staggerDuration={0.025}
                  splitLevelClassName="overflow-hidden pb-1"
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  rotationInterval={2000}
                />
              </div>

              <div className="flex justify-start w-full overflow-visible mr-8">
                <TrueFocus 
                  sentence="Web Developer Desain UI/UX Freelancer"
                  manualMode={true}
                  blurAmount={5}
                  borderColor="#00ffff"
                  glowColor="rgba(0, 255, 255, 0.6)"
                  animationDuration={0.3}
                  pauseBetweenAnimations={1}
                />
              </div>
            </div>
          </div>

          {/* Right Side - Lanyard */}
          <div className="col-span-6 flex items-end justify-center">
            <Lanyard position={[0, 0, 15]} gravity={[0, -40, 0]}/>
          </div>
        </div>
      </div>
      
      {/* Scroll Velocity Section */}
      <div className="mt-10">
        <ScrollVelocity
          texts={['IPB University', 'Entus Azi Bachtiar']}
          scrollerClassName="text-white"
          velocity={50}
          numCopies={4}
        />
      </div>

      {/* Profile Card Section */}
      <div className="px-70 py-20 flex gap-10 items-start mt-10">
        {/* Kiri - Profile Card */}
        <div className="flex flex-col">
          <h1 className="text-6xl font-bold text-white mb-5">What I Do</h1>
          <ProfileCard
            name="Entus Azi Bachtiar"
            title="Web Developer"
            handle="entusazibachtiar"
            status="Online"
            contactText="Contact Me"
            avatarUrl="/new (1).jpg"
            showUserInfo={true}
            enableTilt={true}
            enableMobileTilt={false}
            onContactClick={() => console.log('Contact clicked')}
          />
        </div>

        {/* Kanan - Dua SpotlightCard */}
        <div className="flex flex-col gap-8 flex-1">
          {/* Card 1 - DEVELOP */}
          <SpotlightCard>
            <h2 className="text-3xl font-bold text-white mb-4">DEVELOP</h2>
            <p className="text-gray-300 mb-6">
              <DecryptedText text="Started creating Web Development using NextJS, React, and Tailwind
              and eventually switched to Mobile Development using React Native." />
            </p>

            <h3 className="text-lg font-bold text-[#00d1b2] mb-4">Skillset &amp; tools</h3>
            <div className="flex flex-wrap gap-3">
              {[
                "Next.js",
                "Tailwind",
                "React",
                "Javascript",
                "Node.js",
                "Python",
                "React Native",
                "MongoDB",
                "Express JS",
                "MySQL"
              ].map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 rounded-full border border-gray-500 text-gray-200 text-sm transition-colors duration-300 hover:bg-[#00d1b2] hover:text-black hover:border-[#00d1b2]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </SpotlightCard>

          {/* Card 2 - CREATE */}
          <SpotlightCard>
            <h2 className="text-3xl font-bold text-white mb-4">CREATE</h2>
            <p className="text-gray-300 mb-6">
              <DecryptedText text="Aspiring content creator and junior developer, passionate about telling
                stories through both words and code. Currently learning and building as I go." />
            </p>

            <h3 className="text-lg font-bold text-[#00d1b2] mb-4">Skillset &amp; Tools</h3>
            <div className="flex flex-wrap gap-3">
              {["Figma", "Canva", "Capcut"].map((tool) => (
                <span
                  key={tool}
                  className="px-4 py-2 rounded-full border border-gray-500 text-gray-200 text-sm transition-colors duration-300 hover:bg-[#00d1b2] hover:text-black hover:border-[#00d1b2]"
                >
                  {tool}
                </span>
              ))}
            </div>
          </SpotlightCard>
        </div>
      </div>

      {/* === Stepper Section === */}
      <div className="py-20 relative mx-auto px-2"> {/* Tambahkan container dan padding */}
        <h2 className="text-center text-8xl font-bold text-white mb-10">My Journey</h2>
        <div className="relative h-[800px] mt-30 flex justify-end"> {/* Tambahkan container dengan height tertentu dan posisi text di sebelah kanan */}
          <ScrollLine 
            color="#00ffff"
            glowColor="rgba(0, 255, 255, 0.6)"
            thickness={4}
            height="100%"
          />
          
          {/* Text di kiri atas */}
          <div className="absolute left-0 top-6 flex flex-col items-start justify-start py-1 px-8 ml-4 -translate-y-2">
            <ScrambledText
              className="scrambled-text-demo"
              radius={100}
              duration={1.2}
              speed={0.5}
            >
              <h1 className="text-2xl font-bold text-white text-left">Teknologi Rekayasa Perangkat Lunak</h1>
              <p className="text-2xl font-bold text-white text-left">Institut Pertanian Bogor</p>
            </ScrambledText>
          </div>

          {/* Text di kanan tengah */}
          <div className="absolute right-0 top-48 flex flex-col items-end justify-start py-1 px-8 mr-4 -translate-y-2">
            <ScrambledText
              className="scrambled-text-demo"
              radius={100}
              duration={1.2}
              speed={0.5}
            >
              <h1 className="text-2xl font-bold text-white text-right">Teknologi Rekayasa Perangkat Lunak</h1>
              <p className="text-2xl font-bold text-white text-right">Institut Pertanian Bogor</p>
            </ScrambledText>
          </div>

          {/* Text di kiri tengah bawah */}
          <div className="absolute left-0 top-96 flex flex-col items-start justify-start py-1 px-8 ml-4 -translate-y-2">
            <ScrambledText
              className="scrambled-text-demo"
              radius={100}
              duration={1.2}
              speed={0.5}
            >
              <h1 className="text-2xl font-bold text-white text-left">Teknologi Rekayasa Perangkat Lunak</h1>
              <p className="text-2xl font-bold text-white text-left">Institut Pertanian Bogor</p>
            </ScrambledText>
          </div>

          {/* Text di kanan bawah */}
          <div className="absolute right-0 top-[36rem] flex flex-col items-end justify-start py-1 px-8 mr-4 -translate-y-2">
            <ScrambledText
              className="scrambled-text-demo"
              radius={100}
              duration={1.2}
              speed={0.5}
            >
              <h1 className="text-2xl font-bold text-white text-right">Teknologi Rekayasa Perangkat Lunak</h1>
              <p className="text-2xl font-bold text-white text-right">Institut Pertanian Bogor</p>
            </ScrambledText>
          </div>
          
        </div>
      </div>

      {/* Dock Section */}
      <div className="fixed bottom-0 left-0 w-full">
        <Dock 
        items={items}
        panelHeight={68}
        baseItemSize={50}
        magnification={70}
        />
      </div>
    </div>
  );
}
