import Image from "next/image";
import Lanyard from "./components/Lanyard/Lanyard";
import BlurText from "./components/BlurText/BlurText";
import RotatingText from "./components/RotatingText/RotatingText";
import ScrollVelocity from "./components/ScrollVelocity/ScrollVelocity";
import TrueFocus from "./components/TrueFocus/TrueFocus";

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#19222D]">
      <div className="container mx-auto h-screen flex items-center">
        <div className="grid grid-cols-12 gap-8 w-full">
          <div className="col-span-6 flex flex-col justify-center">
            <div className="space-y-4">
              <BlurText 
                text="ENTUS AZI BACHTIAR"
                delay={600}
                animateBy="words"
                direction="top"
                className="text-7xl font-bold text-white leading-tight tracking-tight whitespace-nowrap flex-nowrap"
              />
              
              <div className="flex items-center gap-4">
                <h1 className="text-2xl text-white font-bold">I'm Ready For Job</h1>
                <RotatingText 
                  texts={['Web Developer', 'UI/UX Designer', 'Freelancer']}
                  mainClassName="px-3 bg-[#80D8C3] text-black overflow-hidden py-2 justify-center rounded-lg text-2xl font-bold inline-flex transition-all"
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

              {/* <div className="flex justify-center gap-4">
                <TrueFocus 
                  sentence="Web Developer Desain UI/UX Freelancer"
                  manualMode={true}
                  blurAmount={3}
                  borderColor="#00FFFF"
                  glowColor="#00FFFF"
                  animationDuration={0.2}
                  pauseBetweenAnimations={0.1}
                  focusWords={2}
                />
              </div> */}
            </div>
          </div>

          <div className="col-span-6 flex items-end justify-center">
            <Lanyard position={[0, 0, 14]} gravity={[0, -40, 0]}/>
          </div>
        </div>
      </div>
      
      {/* ScrollVelocity at bottom */}
      <div className="">
        <ScrollVelocity
          texts={['IPB University', 'Entus Azi Bachtiar']}
          // className="text-white text-2xl font-bold"
          // parallaxClassName="bg-black/20 backdrop-blur-sm py-4"
          scrollerClassName="text-white"
          velocity={50}
          numCopies={4}
        />
      </div>
    </div>
  );
}
