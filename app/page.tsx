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
      <div className="mt-10 px-4 md:py-10">
        <ScrollVelocity
          texts={['IPB University', 'Entus Azi Bachtiar']}
          scrollerClassName="text-white"
          velocity={50}
          numCopies={4}
        />
      </div>

      {/* What I Do Section */}
      <section className="py-16 md:py-30 px-4 md:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Side - Header & Profile Card */}
            <div className="xl:col-span-4 space-y-8">
              <div className="text-center xl:text-left">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 bg-gradient-to-r from-white to-[#00d1b2] bg-clip-text text-transparent">
                  What I Do
                </h2>
                <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
                  Crafting digital experiences with modern technologies and creative solutions
                </p>
              </div>
              
              <div className="flex justify-center xl:justify-start">
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
            </div>

            {/* Right Side - Skill Cards */}
            <div className="xl:col-span-8 space-y-4 lg:space-y-5">
              {/* DEVELOP Card */}
              <SpotlightCard>
                <div className="p-4 md:p-9">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#00d1b2] to-[#80D8C3] rounded-lg flex items-center justify-center shadow-md">
                      <span className="text-black font-bold text-lg">💻</span>
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-1">DEVELOP</h3>
                      <div className="w-16 h-0.5 bg-gradient-to-r from-[#00d1b2] to-transparent rounded-full"></div>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-5">
                    <DecryptedText text="Started creating Web Development using NextJS, React, and Tailwind and eventually switched to Mobile Development using React Native. Passionate about creating scalable applications." />
                  </p>

                  <div className="space-y-3">
                    <h4 className="text-sm md:text-base font-semibold text-[#00d1b2] mb-3">Technologies & Tools</h4>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { name: "Next.js", color: "from-blue-500 to-blue-600" },
                        { name: "React", color: "from-cyan-500 to-cyan-600" },
                        { name: "TypeScript", color: "from-blue-600 to-indigo-600" },
                        { name: "Tailwind", color: "from-teal-500 to-cyan-500" },
                        { name: "Node.js", color: "from-green-500 to-emerald-600" },
                        { name: "React Native", color: "from-purple-500 to-purple-600" },
                        { name: "MongoDB", color: "from-green-600 to-green-700" },
                        { name: "Express JS", color: "from-gray-600 to-gray-700" },
                        { name: "MySQL", color: "from-orange-500 to-orange-600" },
                        { name: "Python", color: "from-yellow-500 to-yellow-600" }
                      ].map((skill) => (
                        <span
                          key={skill.name}
                          className={`px-3 py-1.5 rounded-full bg-gradient-to-r ${skill.color} text-white text-xs font-medium shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer`}
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </SpotlightCard>

              {/* CREATE Card */}
              <SpotlightCard>
                <div className="p-4 md:p-9">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-md">
                      <span className="text-white font-bold text-lg">🎨</span>
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-1">CREATE</h3>
                      <div className="w-16 h-0.5 bg-gradient-to-r from-purple-500 to-transparent rounded-full"></div>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-5">
                    <DecryptedText text="Aspiring content creator and junior developer, passionate about telling stories through both words and code. Currently learning and building beautiful digital experiences." />
                  </p>

                  <div className="space-y-3">
                    <h4 className="text-sm md:text-base font-semibold text-purple-400 mb-3">Design & Creation Tools</h4>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { name: "Figma", color: "from-purple-500 to-pink-500" },
                        { name: "Canva", color: "from-blue-500 to-purple-600" },
                        { name: "CapCut", color: "from-gray-600 to-gray-800" }
                      ].map((tool) => (
                        <span
                          key={tool.name}
                          className={`px-3 py-1.5 rounded-full bg-gradient-to-r ${tool.color} text-white text-xs font-medium shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer`}
                        >
                          {tool.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </div>
          </div>
        </div>
      </section>

       {/* My Journey Section - Enhanced */}
        <section className="pt-10 pb-20 px-4 md:px-8 bg-gradient-to-b from-transparent via-gray-900/20 to-transparent">
          <div className="container mx-auto max-w-6xl">
            {/* Header */}
            <div className="text-center mb-16 md:mb-20">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                My Journey
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#00d1b2] to-[#80D8C3] mx-auto rounded-full mb-6"></div>
              <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                From student to developer - a timeline of growth, learning, and continuous improvement
              </p>
            </div>
            
            {/* Timeline Container */}
            <div className="relative max-w-4xl mx-auto">
              {/* Central Timeline Line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-1 transform -translate-x-1/2">
                <div className="w-full h-full bg-gradient-to-b from-[#00d1b2] via-purple-500 to-orange-500 rounded-full shadow-lg"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-[#00d1b2] via-purple-500 to-orange-500 rounded-full blur-sm opacity-50"></div>
              </div>
              
              {/* Timeline Items */}
              <div className="space-y-16 md:space-y-20 relative">
                
                {/* Timeline Item 1 - Education Start */}
                <div className="flex flex-col lg:flex-row items-start relative">
                  <div className="w-full lg:w-[70%] lg:pr-25 mb-10 lg:mb-0 lg:-ml-40">
                    <div className="group bg-gradient-to-r from-gray-900/90 to-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-[#00d1b2]/50 transition-all duration-500 shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                      {/* Date Badge */}
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-[#00d1b2] to-[#80D8C3] rounded-full text-black font-semibold text-xs mb-4">
                        <div className="w-1.5 h-1.5 bg-black rounded-full animate-pulse"></div>
                        2021 - Present
                      </div>
                      
                      {/* Content */}
                      <div className="space-y-3">
                        <h3 className="text-xl font-bold text-white group-hover:text-[#00d1b2] transition-colors duration-300">
                          Software Engineering Technology
                        </h3>
                        <p className="text-sm font-medium text-[#00d1b2]">Bogor Agricultural University</p>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          Learning fundamental programming concepts, data structures, and software development methodologies.
                        </p>
                        
                        {/* Skills gained */}
                        <div className="flex flex-wrap gap-2 mt-3">
                          <span className="px-3 py-1 bg-[#00d1b2]/20 text-[#00d1b2] rounded-full text-xs border border-[#00d1b2]/30">
                            Programming
                          </span>
                          <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs border border-blue-500/30">
                            Data Structures
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                    <div className="w-6 h-6 bg-gradient-to-br from-[#00d1b2] to-[#80D8C3] rounded-full border-4 border-gray-900 shadow-lg z-10 flex items-center justify-center">
                      <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                    </div>
                    <div className="absolute w-8 h-8 bg-[#00d1b2] rounded-full opacity-20 animate-ping"></div>
                  </div>
                  
                  <div className="hidden lg:block lg:w-[45%]"></div>
                </div>

                {/* Timeline Item 2 - Web Development */}
                <div className="flex flex-col lg:flex-row items-start relative">
                  <div className="hidden lg:block lg:w-[60%]"></div>
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                    <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full border-4 border-gray-900 shadow-lg z-10 flex items-center justify-center">
                      <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                    </div>
                    <div className="absolute w-8 h-8 bg-purple-500 rounded-full opacity-20 animate-ping"></div>
                  </div>
                  
                  <div className="w-full lg:w-[70%] lg:pl-6 mt-4 lg:mt-0 lg:-mr-50">
                    <div className="group bg-gradient-to-r from-purple-900/40 to-pink-900/30 backdrop-blur-sm rounded-xl p-6 border border-purple-700/50 hover:border-purple-500/60 transition-all duration-500 shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                      {/* Date Badge */}
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-semibold text-xs mb-4">
                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                        2022 - 2024
                      </div>
                      
                      {/* Content */}
                      <div className="space-y-3">
                        <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300">
                          Web Development Journey
                        </h3>
                        <p className="text-sm font-medium text-purple-300">Self-taught & Practical Learning</p>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          Mastering React, Next.js, and the JavaScript ecosystem through hands-on projects.
                        </p>
                        
                        {/* Skills gained */}
                        <div className="flex flex-wrap gap-2 mt-3">
                          <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs border border-blue-500/30">
                            React & Next.js
                          </span>
                          <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-xs border border-yellow-500/30">
                            TypeScript
                          </span>
                          <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-xs border border-green-500/30">
                            Tailwind
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Timeline Item 3 - Mobile Development */}
                <div className="flex flex-col lg:flex-row items-start relative">
                  <div className="w-full lg:w-[70%] lg:pr-25 mb-10 lg:mb-0 lg:-ml-40">
                    <div className="group bg-gradient-to-r from-emerald-900/40 to-teal-900/30 backdrop-blur-sm rounded-xl p-6 border border-emerald-700/50 hover:border-emerald-500/60 transition-all duration-500 shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                      {/* Date Badge */}
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full text-white font-semibold text-xs mb-4">
                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                        2023 - Present
                      </div>
                      
                      {/* Content */}
                      <div className="space-y-3">
                        <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors duration-300">
                          Mobile Development
                        </h3>
                        <p className="text-sm font-medium text-emerald-300">React Native & Cross-platform</p>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          Expanding expertise into mobile app development with React Native and cross-platform solutions.
                        </p>
                        
                        {/* Skills gained */}
                        <div className="flex flex-wrap gap-2 mt-3">
                          <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs border border-emerald-500/30">
                            React Native
                          </span>
                          <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs border border-blue-500/30">
                            Mobile UI/UX
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                    <div className="w-6 h-6 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full border-4 border-gray-900 shadow-lg z-10 flex items-center justify-center">
                      <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                    </div>
                    <div className="absolute w-8 h-8 bg-emerald-500 rounded-full opacity-20 animate-ping"></div>
                  </div>
                  
                  <div className="hidden lg:block lg:w-[45%]"></div>
                </div>

                {/* Timeline Item 4 - Future Goals */}
                <div className="flex flex-col lg:flex-row items-start relative">
                  <div className="hidden lg:block lg:w-[60%]"></div>
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                    <div className="w-6 h-6 bg-gradient-to-br from-orange-500 to-red-500 rounded-full border-4 border-gray-900 shadow-lg z-10 flex items-center justify-center">
                      <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                    </div>
                    <div className="absolute w-8 h-8 bg-orange-500 rounded-full opacity-20 animate-ping"></div>
                  </div>
                  
                  <div className="w-full lg:w-[70%] lg:pl-6 mt-4 lg:mt-0 lg:-mr-50">
                    <div className="group bg-gradient-to-r from-orange-900/40 to-red-900/30 backdrop-blur-sm rounded-xl p-6 border border-orange-700/50 hover:border-orange-500/60 transition-all duration-500 shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                      {/* Date Badge */}
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-white font-semibold text-xs mb-4">
                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                        2024 - Future
                      </div>
                      
                      {/* Content */}
                      <div className="space-y-3">
                        <h3 className="text-xl font-bold text-white group-hover:text-orange-300 transition-colors duration-300">
                          Ready for Professional Growth
                        </h3>
                        <p className="text-sm font-medium text-orange-300">Career Development & Innovation</p>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          Seeking opportunities to contribute to innovative projects and grow as a professional developer.
                        </p>
                        
                        {/* Goals */}
                        <div className="flex flex-wrap gap-2 mt-3">
                          <span className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-xs border border-orange-500/30">
                            Full-Stack
                          </span>
                          <span className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-xs border border-red-500/30">
                            Team Work
                          </span>
                          <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-xs border border-yellow-500/30">
                            Innovation
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* My Projects Section */}
        <section className="py-16 md:py-20 px-4 md:px-8 bg-transparent">
          <div className="container mx-auto max-w-7xl">
            {/* Header */}
            <div className="text-center mb-16 md:mb-20">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                My Projects
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#00d1b2] to-[#80D8C3] mx-auto rounded-full mb-6"></div>
              <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                A showcase of my creative development work, featuring modern web applications and innovative solutions
              </p>
            </div>

            {/* GitHub Activity Section */}
            <div className="mb-16 lg:mb-20">
              <SpotlightCard>
                <div className="p-6 md:p-8">
                  <div className="flex flex-col lg:flex-row items-center gap-6 mb-8">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-[#00d1b2] to-[#80D8C3] rounded-2xl flex items-center justify-center shadow-lg">
                        <span className="text-black font-bold text-xl">📊</span>
                      </div>
                      <div>
                        <h3 className="text-2xl md:text-2xl font-bold text-white mb-2">GitHub Activity</h3>
                        <div className="w-20 h-1 bg-gradient-to-r from-[#00d1b2] to-transparent rounded-full"></div>
                      </div>
                    </div>
                    <div className="text-center lg:text-left">
                      <p className="text-gray-400">Consistent development activity and continuous learning</p>
                    </div>
                  </div>
                  
                  {/* Month Labels */}
                  <div className="hidden md:flex justify-between text-gray-400 text-sm mb-4 px-2">
                    {['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'].map((month) => (
                      <span key={month} className="font-medium">{month}</span>
                    ))}
                  </div>
                  
                  {/* Contribution Grid */}
                  <div className="grid grid-cols-26 md:grid-cols-53 gap-1 mb-8 overflow-x-auto">
                    {Array.from({ length: 371 }, (_, i) => {
                      const intensity = Math.random();
                      let bgColor = 'bg-gray-800/60';
                      let hoverColor = 'hover:bg-gray-700';
                      
                      if (intensity > 0.8) {
                        bgColor = 'bg-gradient-to-br from-[#00d1b2] to-[#80D8C3]';
                        hoverColor = 'hover:from-[#00d1b2]/80 hover:to-[#80D8C3]/80';
                      } else if (intensity > 0.6) {
                        bgColor = 'bg-[#00d1b2]/80';
                        hoverColor = 'hover:bg-[#00d1b2]';
                      } else if (intensity > 0.4) {
                        bgColor = 'bg-[#00d1b2]/60';
                        hoverColor = 'hover:bg-[#00d1b2]/80';
                      } else if (intensity > 0.2) {
                        bgColor = 'bg-[#00d1b2]/40';
                        hoverColor = 'hover:bg-[#00d1b2]/60';
                      }
                      
                      return (
                        <div
                          key={i}
                          className={`w-3 h-3 rounded-sm ${bgColor} ${hoverColor} hover:scale-125 transition-all duration-300 cursor-pointer hover:ring-2 hover:ring-[#00d1b2] hover:ring-opacity-50 shadow-sm`}
                          title={`${Math.floor(intensity * 10)} contributions`}
                        />
                      );
                    })}
                  </div>
                  
                  {/* Enhanced Stats */}
                  <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex flex-col md:flex-row items-center gap-4">
                      <span className="text-gray-300 font-medium">
                        <span className="text-[#00d1b2] text-lg font-bold">199</span> contributions in the last year
                      </span>
                      <div className="flex items-center gap-3 text-sm text-gray-400">
                        <span>🔥 12 day streak</span>
                        <span>📈 24% more than last year</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <span className="text-gray-400 text-sm font-medium">Less</span>
                      <div className="flex space-x-1">
                        <div className="w-4 h-4 bg-gray-800/60 rounded-sm border border-gray-700"></div>
                        <div className="w-4 h-4 bg-[#00d1b2]/40 rounded-sm"></div>
                        <div className="w-4 h-4 bg-[#00d1b2]/60 rounded-sm"></div>
                        <div className="w-4 h-4 bg-[#00d1b2]/80 rounded-sm"></div>
                        <div className="w-4 h-4 bg-gradient-to-br from-[#00d1b2] to-[#80D8C3] rounded-sm"></div>
                      </div>
                      <span className="text-gray-400 text-sm font-medium">More</span>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
              {/* Project 1 - Campus Bridge */}
              <SpotlightCard>
                <div className="p-6 md:p-8 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-5xl md:text-6xl font-black text-gray-700/20 select-none">01</div>
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full shadow-lg animate-pulse"></div>
                      <div className="w-3 h-3 bg-[#00d1b2] rounded-full shadow-lg animate-pulse" style={{animationDelay: '0.5s'}}></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full shadow-lg animate-pulse" style={{animationDelay: '1s'}}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-[#00d1b2] transition-colors duration-300">
                      Campus Bridge
                    </h3>
                    <p className="text-[#00d1b2] text-lg font-medium">Empowering Connections And Progress</p>
                    <p className="text-gray-400 leading-relaxed flex-grow">
                      A comprehensive mobile application designed to bridge the gap between students and campus resources, featuring real-time notifications, event management, and academic tools.
                    </p>
                  </div>
                  
                  {/* Enhanced Mobile Mockup */}
                  <div className="mb-8 flex-grow flex items-center justify-center">
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                      <div className="relative bg-gradient-to-br from-purple-900/40 to-indigo-900/40 rounded-2xl p-8 border border-purple-700/30 backdrop-blur-sm">
                        <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-3xl w-20 h-32 p-4 shadow-2xl transform rotate-3 group-hover:rotate-0 group-hover:scale-105 transition-all duration-500">
                          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 w-full h-full rounded-2xl flex items-center justify-center relative overflow-hidden">
                            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-white/30 rounded-full"></div>
                            <div className="text-white text-2xl animate-bounce">📱</div>
                            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-white/20 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-2 bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-300 rounded-xl text-sm font-medium border border-blue-500/30 hover:border-blue-400/50 transition-colors duration-300">
                        React Native
                      </span>
                      <span className="px-3 py-2 bg-gradient-to-r from-[#00d1b2]/20 to-emerald-500/20 text-[#00d1b2] rounded-xl text-sm font-medium border border-[#00d1b2]/30 hover:border-[#00d1b2]/50 transition-colors duration-300">
                        Node.js
                      </span>
                      <span className="px-3 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-300 rounded-xl text-sm font-medium border border-yellow-500/30 hover:border-yellow-400/50 transition-colors duration-300">
                        MongoDB
                      </span>
                    </div>
                    
                    <div className="flex gap-3 pt-4">
                      <button className="flex-1 px-4 py-3 bg-gradient-to-r from-[#00d1b2] to-[#80D8C3] text-black font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 text-sm">
                        View Project
                      </button>
                      <button className="px-4 py-3 bg-gray-800/50 text-gray-300 rounded-xl hover:bg-gray-700/50 hover:text-white transition-all duration-300 border border-gray-700">
                        <span className="text-lg">📱</span>
                      </button>
                    </div>
                  </div>
                </div>
              </SpotlightCard>

              {/* Project 2 - Unimovie */}
              <SpotlightCard>
                <div className="p-6 md:p-8 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-5xl md:text-6xl font-black text-gray-700/20 select-none">02</div>
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full shadow-lg animate-pulse"></div>
                      <div className="w-3 h-3 bg-[#00d1b2] rounded-full shadow-lg animate-pulse" style={{animationDelay: '0.5s'}}></div>
                      <div className="w-3 h-3 bg-pink-500 rounded-full shadow-lg animate-pulse" style={{animationDelay: '1s'}}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-[#00d1b2] transition-colors duration-300">
                      Unimovie
                    </h3>
                    <p className="text-[#00d1b2] text-lg font-medium">Discover Your Next Favorite Movie</p>
                    <p className="text-gray-400 leading-relaxed flex-grow">
                      An intuitive movie discovery platform that helps users find their next favorite film through personalized recommendations, detailed reviews, and curated collections.
                    </p>
                  </div>
                  
                  {/* Enhanced Web Mockup */}
                  <div className="mb-8 flex-grow flex items-center justify-center">
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                      <div className="relative bg-gradient-to-br from-red-900/40 to-pink-900/40 rounded-2xl p-8 border border-red-700/30 backdrop-blur-sm">
                        <div className="bg-gradient-to-br from-red-600 to-pink-600 rounded-2xl w-28 h-18 shadow-2xl flex items-center justify-center group-hover:scale-105 transition-all duration-500 relative overflow-hidden">
                          <div className="absolute top-1 left-2 w-2 h-2 bg-white/20 rounded-full"></div>
                          <div className="absolute top-1 left-5 w-2 h-2 bg-white/20 rounded-full"></div>
                          <div className="absolute top-1 left-8 w-2 h-2 bg-white/20 rounded-full"></div>
                          <div className="text-white text-3xl animate-pulse">▶</div>
                          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-white text-xs font-semibold">
                            MOVIE
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 rounded-xl text-sm font-medium border border-blue-500/30 hover:border-blue-400/50 transition-colors duration-300">
                        React
                      </span>
                      <span className="px-3 py-2 bg-gradient-to-r from-[#00d1b2]/20 to-emerald-500/20 text-[#00d1b2] rounded-xl text-sm font-medium border border-[#00d1b2]/30 hover:border-[#00d1b2]/50 transition-colors duration-300">
                        Next.js
                      </span>
                      <span className="px-3 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-300 rounded-xl text-sm font-medium border border-yellow-500/30 hover:border-yellow-400/50 transition-colors duration-300">
                        TMDB API
                      </span>
                    </div>
                    
                    <div className="flex gap-3 pt-4">
                      <button className="flex-1 px-4 py-3 bg-gradient-to-r from-[#00d1b2] to-[#80D8C3] text-black font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 text-sm">
                        View Project
                      </button>
                      <button className="px-4 py-3 bg-gray-800/50 text-gray-300 rounded-xl hover:bg-gray-700/50 hover:text-white transition-all duration-300 border border-gray-700">
                        <span className="text-lg">🌐</span>
                      </button>
                    </div>
                  </div>
                </div>
              </SpotlightCard>

              {/* Project 3 - Dalleye Cafe Voucher */}
              <SpotlightCard>
                <div className="p-6 md:p-8 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-5xl md:text-6xl font-black text-gray-700/20 select-none">03</div>
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full shadow-lg animate-pulse"></div>
                      <div className="w-3 h-3 bg-[#00d1b2] rounded-full shadow-lg animate-pulse" style={{animationDelay: '0.5s'}}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-[#00d1b2] transition-colors duration-300">
                      Dalleye Cafe Voucher
                    </h3>
                    <p className="text-[#00d1b2] text-lg font-medium">Digital Voucher Management</p>
                    <p className="text-gray-400 leading-relaxed flex-grow">
                      A comprehensive digital voucher system for cafes featuring QR code generation, validation, analytics dashboard, and customer management for business owners.
                    </p>
                  </div>
                  
                  {/* Enhanced Voucher Mockup */}
                  <div className="mb-8 flex-grow flex items-center justify-center">
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                      <div className="relative bg-gradient-to-br from-emerald-900/40 to-teal-900/40 rounded-2xl p-8 border border-emerald-700/30 backdrop-blur-sm">
                        <div className="bg-white rounded-2xl w-24 h-32 p-4 shadow-2xl transform -rotate-3 group-hover:rotate-0 group-hover:scale-105 transition-all duration-500 relative">
                          <div className="h-full flex flex-col justify-between">
                            <div className="space-y-2">
                              <div className="h-2 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full"></div>
                              <div className="h-2 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full w-3/4"></div>
                              <div className="text-center">
                                <div className="text-emerald-600 text-xs font-bold">CAFE VOUCHER</div>
                              </div>
                            </div>
                            <div className="w-full h-12 bg-black rounded-xl mx-auto flex items-center justify-center relative overflow-hidden">
                              <div className="absolute inset-1 bg-gradient-to-br from-white to-gray-200 rounded-lg"></div>
                              <div className="relative text-black text-xs font-bold z-10">QR</div>
                            </div>
                            <div className="space-y-1">
                              <div className="h-1 bg-gray-300 rounded-full"></div>
                              <div className="h-1 bg-gray-300 rounded-full w-2/3"></div>
                              <div className="text-center text-emerald-600 text-xs font-semibold">
                                $5.00 OFF
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 rounded-xl text-sm font-medium border border-green-500/30 hover:border-green-400/50 transition-colors duration-300">
                        Vue.js
                      </span>
                      <span className="px-3 py-2 bg-gradient-to-r from-red-500/20 to-pink-500/20 text-red-300 rounded-xl text-sm font-medium border border-red-500/30 hover:border-red-400/50 transition-colors duration-300">
                        Laravel
                      </span>
                      <span className="px-3 py-2 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 text-orange-300 rounded-xl text-sm font-medium border border-orange-500/30 hover:border-orange-400/50 transition-colors duration-300">
                        MySQL
                      </span>
                    </div>
                    
                    <div className="flex gap-3 pt-4">
                      <button className="flex-1 px-4 py-3 bg-gradient-to-r from-[#00d1b2] to-[#80D8C3] text-black font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 text-sm">
                        View Project
                      </button>
                      <button className="px-4 py-3 bg-gray-800/50 text-gray-300 rounded-xl hover:bg-gray-700/50 hover:text-white transition-all duration-300 border border-gray-700">
                        <span className="text-lg">🎫</span>
                      </button>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </div>

            {/* Enhanced Call to Action */}
            <div className="text-center">
              <SpotlightCard>
                <div className="p-8 md:p-12">
                  <div className="max-w-3xl mx-auto">
                    <div className="mb-8">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#00d1b2] to-[#80D8C3] rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-2xl">
                        <span className="text-black text-2xl">🚀</span>
                      </div>
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 bg-gradient-to-r from-white to-[#00d1b2] bg-clip-text text-transparent">
                        Ready to Collaborate?
                      </h3>
                      <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
                        Let's build something amazing together. I'm always excited to work on innovative projects and bring creative ideas to life.
                      </p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                      <button className="group px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-[#00d1b2] to-[#80D8C3] text-black font-bold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 text-base relative overflow-hidden">
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          <span>View More Projects</span>
                          <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                        </span>
                      </button>
                      <button className="group px-6 md:px-8 py-3 md:py-4 bg-transparent border-2 border-[#00d1b2] text-[#00d1b2] font-bold rounded-xl hover:bg-[#00d1b2]/10 hover:scale-105 transition-all duration-300 text-base relative overflow-hidden">
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          <span>Contact Me</span>
                          <span className="group-hover:rotate-12 transition-transform duration-300">📧</span>
                        </span>
                      </button>
                    </div>
                    
                    {/* Social Stats */}
                    <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="text-xl md:text-2xl font-bold text-[#00d1b2] mb-2">15+</div>
                        <div className="text-gray-400 text-sm">Projects Completed</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl md:text-2xl font-bold text-[#00d1b2] mb-2">3+</div>
                        <div className="text-gray-400 text-sm">Years Experience</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl md:text-2xl font-bold text-[#00d1b2] mb-2">100%</div>
                        <div className="text-gray-400 text-sm">Client Satisfaction</div>
                      </div>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </div>
          </div>
        </section>
        
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
