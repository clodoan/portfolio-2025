"use client";

import parse from "html-react-parser";
import { useTheme } from "next-themes";

const content = {
  title: "Claudio Angrigiani.",
  subtitle: "I'm a designer & engineer based on the East Coast.",
  description:
    "I'm the first Design Engineer at " +
    "<a href='https://onefootprint.com' target='_blank' rel='noopener noreferrer'>Footprint</a>. " +
    "I work across design and frontend teams, working both with Figma and production-ready code.",
  before:
    "Before that, I founded a couple of startups, " +
    "<a href='https://www.f6s.com/company/comecasero.com' target='_blank' rel='noopener noreferrer'>ComeCasero</a> " +
    "and <a href='https://www.hidorothy.com' target='_blank' rel='noopener noreferrer'>Dorothy</a>, " +
    "and was part of early <a href='https://www.mainstreet.com' target='_blank' rel='noopener noreferrer'>Mainstreet</a>'s " +
    "design team. I was also the Design Manager of the first Design team at " +
    "<a href='https://www.bancogalicia.com.ar' target='_blank' rel='noopener noreferrer'>Banco Galicia</a>, " +
    "one of the largest banks in Argentina.",
};

const Home = () => {
  const theme = useTheme();
  return (
    <div
      className="w-screen h-screen"
      style={{
        backgroundImage: `url('/home/${theme.theme}.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col md:max-w-[600px] max-w-[90%] mx-auto justify-center h-screen p-5 rounded overflow-hidden motion-opacity-in-0 motion-blur-in-md motion-duration-1500 z-0">
        <div className="bg-backgroundTranslucid backdrop-blur-[2px] rounded-xl py-9 px-12 border-y border-solid border-x-transparent border-t-white/10 border-b-black/20">
          <h1 className="text-heading-1">{content.title}</h1>
          <p className="text-body-1 text-muted">{content.subtitle}</p>
          <p className="text-body-1 text-muted">{parse(content.description)}</p>
          <p className="text-body-1 text-muted">{parse(content.before)}</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
