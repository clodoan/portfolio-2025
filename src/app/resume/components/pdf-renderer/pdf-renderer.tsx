import { Document, Page, View, StyleSheet, Text } from "@react-pdf/renderer";
import { resumeData } from "../../resume-data";

const FONT_SIZE = 6;
const SPACING_MEDIUM = 4;
const SPACING_SMALL = 2;
const SPACING_XSMALL = 1;

const styles = StyleSheet.create({
  page: {
    padding: 32,
    fontFamily: "Helvetica",
    backgroundColor: "#ffffff",
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: SPACING_MEDIUM,
  },
  contactInfoContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  contactInfo: {
    fontSize: FONT_SIZE,
    lineHeight: 1.5,
    color: "#374151",
    textAlign: "right",
    opacity: 0.8,
  },
  title: {
    fontSize: FONT_SIZE,
    fontWeight: "semibold",
    lineHeight: 1.5,
    color: "#1a1a1a",
  },
  subtitle: {
    fontSize: FONT_SIZE,
    color: "#6b7280",
    lineHeight: 1.5,
  },
  section: {
    marginBottom: SPACING_MEDIUM,
  },
  sectionTitle: {
    fontSize: FONT_SIZE,
    fontWeight: "semibold",
    marginBottom: SPACING_MEDIUM,
    borderBottom: "1px solid #ECECEC",
    paddingBottom: SPACING_XSMALL,
    lineHeight: 1.6,
    color: "#1a1a1a",
  },
  jobContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  jobTitleContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: SPACING_MEDIUM,
  },
  jobTitle: {
    fontSize: FONT_SIZE,
    fontWeight: "semibold",
    lineHeight: 1.5,
    color: "#1a1a1a",
  },
  company: {
    fontSize: FONT_SIZE,
    color: "#6b7280",
    lineHeight: 1.5,
  },
  date: {
    fontSize: FONT_SIZE,
    color: "#9ca3af",
    lineHeight: 1.5,
  },
  description: {
    fontSize: FONT_SIZE,
    marginBottom: SPACING_SMALL,
    lineHeight: 1.6,
    color: "#374151",
  },
  bulletPointContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: 4,
  },
  bulletPointText: {
    fontSize: FONT_SIZE,
    lineHeight: 1.6,
    color: "#374151",
  },
  bulletPoint: {
    fontSize: FONT_SIZE,
    marginLeft: SPACING_MEDIUM,
    lineHeight: 1.6,
    color: "#374151",
  },
  education: {
    fontSize: FONT_SIZE,
    fontWeight: "semibold",
    lineHeight: 1.5,
    color: "#1a1a1a",
  },
  school: {
    fontSize: FONT_SIZE,
    color: "#6b7280",
    lineHeight: 1.5,
  },
  skills: {
    fontSize: FONT_SIZE,
    lineHeight: 1.6,
    color: "#374151",
  },
});

// PDF Document Component
const PDFRenderer = () => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <View>
            <Text style={styles.title}>{resumeData.personal.name}</Text>
            <Text style={styles.subtitle}>{resumeData.personal.title}</Text>
          </View>

          <View style={styles.contactInfoContainer}>
            {resumeData.personal.contacts.map((contact, index) => {
              return (
                <Text
                  key={`${contact.type}-${index}`}
                  style={styles.contactInfo}
                >
                  {contact.label}
                </Text>
              );
            })}
          </View>
        </View>
        {/* About */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.description}>{resumeData.personal.about}</Text>
        </View>
        {/* Experience */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
          {resumeData.experience.map((exp, index) => (
            <View
              key={`${exp.title}-${exp.company}-${index}`}
              style={styles.section}
              // break={exp.title === "Head of Product Design"}
            >
              <View style={styles.jobContainer}>
                <View style={styles.jobTitleContainer}>
                  <Text style={styles.jobTitle}>{exp.title}</Text>
                  <Text style={styles.company}>|</Text>
                  <Text style={styles.company}>{exp.company}</Text>
                </View>
                <Text style={styles.date}>
                  {exp.startDate} - {exp.endDate || "Present"}
                </Text>
              </View>

              {exp.description && (
                <Text style={styles.description}>{exp.description}</Text>
              )}
              {exp.bullets?.map((bullet, bulletIndex) => (
                <View
                  key={`${exp.title}-bullet-${bulletIndex}`}
                  style={styles.bulletPointContainer}
                >
                  <Text style={styles.bulletPoint}>•</Text>
                  <Text style={styles.bulletPointText}>{bullet}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>

        {/* Education */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>

          {resumeData.education.map((edu, index) => (
            <View
              key={`${edu.degree}-${edu.school}-${index}`}
              style={styles.section}
            >
              <Text style={styles.education}>{edu.degree}</Text>
              <Text style={styles.school}>{edu.school}</Text>
              <Text style={styles.date}>
                {edu.startYear} - {edu.endYear || "Present"}
              </Text>
            </View>
          ))}
        </View>

        {/* Skills */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          {resumeData.skills.map((skillCategory) => (
            <Text key={skillCategory.title} style={styles.skills}>
              {skillCategory.title}: {skillCategory.skills.join(", ")}
            </Text>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default PDFRenderer;
