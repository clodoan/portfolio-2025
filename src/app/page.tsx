import parse from "html-react-parser";

const content = {
	title: "Claudio Angrigiani.",
	subtitle: "I'm a designer and engineer based on the East Coast.",
	description:
		"I'm the first Design Engineer at <a href='https://onefootprint.com' target='_blank' rel='noopener noreferrer'>Footprint</a>, where I live between Figma prototypes and production-ready code, blurring the lines between design and engineering.",
};

const Home = () => {
	return (
		<div className="flex flex-col max-w-[800px] mx-auto justify-center h-screen">
			<h1 className="">{content.title}</h1>
			<p className="text-body-1 text-muted">{content.subtitle}</p>
			<p className="text-body-1 text-muted">{parse(content.description)}</p>
		</div>
	);
};

export default Home;
