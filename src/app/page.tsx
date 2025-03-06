import parse from "html-react-parser";

const content = {
  title: "Claudio Angrigiani",
  subtitle: "design & code",
  today: {
    title: "Today",
    content:
      "Design Engineer at " +
      "<a href='https://onefootprint.com' target='_blank' rel='noopener noreferrer'>Footprint</a>, " +
      "working across design and frontend teams with both Figma and production code. " +
      "See a dump of some of my Footprint <a href='/projects'>work</a>.",
  },
  before: {
    title: "Before",
    content:
      "Founded " +
      "<a href='https://www.f6s.com/company/comecasero.com' target='_blank' rel='noopener noreferrer'>ComeCasero</a> " +
      "and <a href='https://www.hidorothy.com' target='_blank' rel='noopener noreferrer'>Dorothy</a>. " +
      "Early designer at <a href='https://www.mainstreet.com' target='_blank' rel='noopener noreferrer'>Mainstreet</a> " +
      "and Design Manager at " +
      "<a href='https://www.bancogalicia.com.ar' target='_blank' rel='noopener noreferrer'>Banco Galicia</a>.",
  },
  contact: {
    findMe:
      "Find me on " +
      "<a href='https://x.com/clodoan' target='_blank' rel='noopener noreferrer'>X</a> " +
      "and <a href='https://github.com/clodoan' target='_blank' rel='noopener noreferrer'>GitHub</a>",
  },
};

const Home = () => {
  return (
    <div className="w-screen min-h-[100dvh]">
      <div className="flex flex-col gap-3 md:max-w-[600px] max-w-[90%] mx-auto justify-center h-screen p-5 rounded overflow-hidden motion-opacity-in-0 motion-blur-in-md motion-duration-1500 z-0">
        <div className="flex justify-between">
          <h1 className="text-label-1">{content.title}</h1>
          <span className="text-tertiary text-heading-1 italic">
            {content.subtitle}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-label-1 text-secondary">{content.today.title}</h2>
          <p className="text-body-1 text-secondary">
            {parse(content.today.content)}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-label-1 text-secondary">
            {content.before.title}
          </h2>
          <p className="text-body-1 text-secondary">
            {parse(content.before.content)}
          </p>
        </div>
        <div className="flex flex-col gap-1 border-t border-dashed border-primary my-2 h-[1px]" />
        <div className="inline-flex gap-1 text-body-1 text-secondary">
          {parse(content.contact.findMe)}
        </div>
      </div>
    </div>
  );
};

export default Home;
