type SkillCategoryProps = {
  title: string;
  skills: string[];
};

const SkillCategory = ({ title, skills }: SkillCategoryProps) => (
  <div>
    <h3 className="text-label-1 text-primary mb-3">{title}</h3>
    <div className="flex flex-wrap gap-2">
      {skills.map((skill) => (
        <span
          key={skill}
          className="px-3 py-1 border border-tertiary text-primary rounded-full text-body-3"
        >
          {skill}
        </span>
      ))}
    </div>
  </div>
);

export default SkillCategory;
