import parse from "html-react-parser";

const content = {
  title: "Claudio Angrigiani.",
  subtitle: "I'm a designer & engineer based on the East Coast.",
  description:
    "I'm the first Design Engineer at <a href='https://onefootprint.com' target='_blank' rel='noopener noreferrer'>Footprint</a>. I work across design and frontend teams, working both with Figma and production-ready code.",
  before:
    "Before that, I founded a couple of startups, <a href='https://www.f6s.com/company/comecasero.com' target='_blank' rel='noopener noreferrer'>ComeCasero</a> and <a href='https://www.hidorothy.com' target='_blank' rel='noopener noreferrer'>Dorothy</a>, and was part of early <a href='https://www.mainstreet.com' target='_blank' rel='noopener noreferrer'>Mainstreet</a>'s design team.",
};

const Home = () => {
  return (
    <div className="flex flex-col md:max-w-[600px] max-w-[90%] mx-auto justify-center h-screen motion-opacity-in-0 motion-blur-in-md motion-duration-1500 z-0">
      <h1 className="text-heading-1">{content.title}</h1>
      <p className="text-body-1 text-muted">{content.subtitle}</p>
      <p className="text-body-1 text-muted">{parse(content.description)}</p>
      <p className="text-body-1 text-muted">{parse(content.before)}</p>
    </div>
  );
};

export default Home;
