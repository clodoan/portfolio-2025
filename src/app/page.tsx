import parse from "html-react-parser";

const content = {
  title: "Claudio Angrigiani.",
  subtitle: "Design & Code",
  today: {
    title: "Today",
    content:
      "I'm the first Design Engineer at " +
      "<a href='https://onefootprint.com' target='_blank' rel='noopener noreferrer'>Footprint</a>. " +
      "I work across design and frontend teams, tinkering with both Figma and production-ready code.",
  },
  before: {
    title: "Before",
    content:
      "I founded a couple of startups, " +
      "<a href='https://www.f6s.com/company/comecasero.com' target='_blank' rel='noopener noreferrer'>ComeCasero</a> " +
      "and <a href='https://www.hidorothy.com' target='_blank' rel='noopener noreferrer'>Dorothy</a>, " +
      "and was part of early <a href='https://www.mainstreet.com' target='_blank' rel='noopener noreferrer'>Mainstreet</a>'s " +
      "design team. I was also the Design Manager of the first Design team at " +
      "<a href='https://www.bancogalicia.com.ar' target='_blank' rel='noopener noreferrer'>Banco Galicia</a>, " +
      "one of the largest banks in Argentina.",
  },
};

const Home = () => {
  return (
    <div className="w-screen h-screen">
      <div className="flex flex-col gap-3 md:max-w-[600px] max-w-[90%] mx-auto justify-center h-screen p-5 rounded overflow-hidden motion-opacity-in-0 motion-blur-in-md motion-duration-1500 z-0">
        <div className="flex justify-between">
          <h1 className="text-label-1">{content.title}</h1>
          <span className="text-tertiary text-heading-1">
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
      </div>
    </div>
  );
};

export default Home;
