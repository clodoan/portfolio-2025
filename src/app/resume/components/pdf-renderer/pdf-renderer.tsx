import { Document, Page, View, StyleSheet, Text } from "@react-pdf/renderer";
import { resumeData } from "../../resume-data";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica",
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 15,
    color: "#666",
  },
  contactInfo: {
    fontSize: 10,
    marginBottom: 5,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    borderBottom: "1px solid #ccc",
    paddingBottom: 5,
  },
  jobTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 2,
  },
  company: {
    fontSize: 12,
    color: "#666",
    marginBottom: 2,
  },
  date: {
    fontSize: 10,
    color: "#999",
    marginBottom: 5,
  },
  description: {
    fontSize: 10,
    marginBottom: 5,
    lineHeight: 1.4,
  },
  bulletPoint: {
    fontSize: 10,
    marginBottom: 2,
    marginLeft: 10,
  },
  education: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 2,
  },
  school: {
    fontSize: 10,
    color: "#666",
    marginBottom: 2,
  },
  skills: {
    fontSize: 10,
    marginBottom: 5,
  },
});

// PDF Document Component
const PDFRenderer = () => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{resumeData.personal.name}</Text>
          <Text style={styles.subtitle}>{resumeData.personal.title}</Text>
          {resumeData.personal.contacts.map((contact, index) => (
            <Text key={`${contact.type}-${index}`} style={styles.contactInfo}>
              {contact.label}
            </Text>
          ))}
        </View>

        {/* About */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.description}>{resumeData.personal.about}</Text>
        </View>

        {/* Experience */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>

          {resumeData.experience.slice(0, 3).map((exp, index) => (
            <View
              key={`${exp.title}-${exp.company}-${index}`}
              style={styles.section}
            >
              <Text style={styles.jobTitle}>{exp.title}</Text>
              <Text style={styles.company}>{exp.company}</Text>
              <Text style={styles.date}>
                {exp.startDate} - {exp.endDate || "Present"}
              </Text>
              {exp.description && (
                <Text style={styles.description}>{exp.description}</Text>
              )}
              {exp.bullets?.map((bullet, bulletIndex) => (
                <Text
                  key={`${exp.title}-bullet-${bulletIndex}`}
                  style={styles.bulletPoint}
                >
                  • {bullet}
                </Text>
              ))}
            </View>
          ))}
        </View>

        {/* Education */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>

          {resumeData.education.slice(0, 2).map((edu, index) => (
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
