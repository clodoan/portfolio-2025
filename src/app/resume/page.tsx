"use client";

import {
  EnvelopeIcon,
  MapPinIcon,
  GlobeAltIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import PDFRenderer from "./components/pdf-renderer";
import { useGeneratePDF } from "./hooks/use-generate-pdf";
import { resumeData } from "./resume-data";
import ContactInfo from "./components/contact-info";
import EducationItem from "./components/education-item";
import ExperienceItem from "./components/experience-item";
import SkillCategory from "./components/skill-category";

const CVPage = () => {
  const { isGenerating, generatePDF } = useGeneratePDF({
    filename: "claudio-angrigiani-resume.pdf",
  });

  const handleDownloadPDF = () => {
    generatePDF(<PDFRenderer />);
  };

  return (
    <div className="min-h-screen bg-primary relative py-12">
      <div className="max-w-4xl mx-auto px-12 py-12 bg-primary shadow-lg rounded-lg border border-tertiary box-border min-h-screen">
        <header className="mb-12">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-label-1 text-primary mb-2">
                {resumeData.personal.name}
              </h1>
              <p className="text-body-1 text-secondary">
                {resumeData.personal.title}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-body-2 text-tertiary">
            {resumeData.personal.contacts.map((contact) => {
              const Icon =
                contact.type === "location"
                  ? MapPinIcon
                  : contact.type === "email"
                    ? EnvelopeIcon
                    : GlobeAltIcon;

              return (
                <ContactInfo key={contact.type} icon={Icon}>
                  {contact.url ? (
                    <Link href={contact.url}>{contact.label}</Link>
                  ) : (
                    <span>{contact.label}</span>
                  )}
                </ContactInfo>
              );
            })}
          </div>
        </header>

        <section className="mb-12">
          <h2 className="text-label-1 text-primary mb-4">About</h2>
          <p className="text-body-1 text-secondary leading-relaxed">
            {resumeData.personal.about}
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-label-1 text-primary mb-6">Experience</h2>
          <div className="space-y-8">
            {resumeData.experience.map((exp, index) => (
              <div key={`${exp.title}-${exp.company}-${index}`}>
                <ExperienceItem
                  title={exp.title}
                  company={exp.company}
                  location={exp.location}
                  startDate={exp.startDate}
                  endDate={exp.endDate}
                  description={exp.description}
                  bullets={exp.bullets}
                />
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-label-1 text-primary mb-6">Education</h2>
          <div className="space-y-6">
            {resumeData.education.map((edu, index) => (
              <div key={`${edu.degree}-${edu.school}-${index}`}>
                <EducationItem
                  degree={edu.degree}
                  school={edu.school}
                  field={edu.field}
                  startYear={edu.startYear}
                  endYear={edu.endYear}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="mb-12">
          <h2 className="text-label-1 text-primary mb-6">Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resumeData.skills.map((skillCategory) => (
              <SkillCategory
                key={skillCategory.title}
                title={skillCategory.title}
                skills={skillCategory.skills}
              />
            ))}
          </div>
        </section>
        <footer className="text-center text-body-3 text-tertiary pt-8 border-t border-dashed">
          <p>Last updated: {resumeData.lastUpdated}</p>
        </footer>
      </div>
      <div className="fixed bottom-0 right-0">
        <button
          type="button"
          onClick={handleDownloadPDF}
          disabled={isGenerating}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-label-2 rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ArrowDownTrayIcon className="w-4 h-4" />
          {isGenerating ? "Generating PDF..." : "Download PDF"}
        </button>
      </div>
    </div>
  );
};

export default CVPage;
