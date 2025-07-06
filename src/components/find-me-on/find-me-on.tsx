import CustomLink from "../custom-link";

type SocialLink = {
  label: string;
  url: string;
};

export type FindMeOnProps = {
  socialLinks: SocialLink[];
};

const FindMeOn = ({ socialLinks }: FindMeOnProps) => (
  <div className="inline-flex text-label-1 mt-auto pt-8 pb-4 justify-center">
    <span className="mr-1">Find me on</span>
    {socialLinks.map(({ label, url }, index) => {
      const isLast = index === socialLinks.length - 1;
      const isNotFirst = index > 0;

      return (
        <div key={url} className="inline-flex">
          {isNotFirst && !isLast && <span className="mr-1">,</span>}
          {isNotFirst && isLast && <span className="mx-1">or</span>}
          <CustomLink key={url} href={url}>
            {label}
          </CustomLink>
        </div>
      );
    })}
  </div>
);

export default FindMeOn;
