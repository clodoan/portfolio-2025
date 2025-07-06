import CustomLink from "../custom-link";

type SocialLink = {
  label: string;
  url: string;
};

export type FindMeOnProps = {
  socialLinks: SocialLink[];
};

const FindMeOn = ({ socialLinks }: FindMeOnProps) => (
  <div className="flex gap-1 text-label-1 mt-auto pt-8 pb-4 justify-center">
    <span>Find me on</span>
    {socialLinks.map(({ label, url }, index) => {
      return (
        <div key={url} className="flex gap-2">
          {index > 0 && index === socialLinks.length - 1 && (
            <span className="mx-1">and</span>
          )}
          <CustomLink key={url} href={url}>
            {label}
          </CustomLink>
        </div>
      );
    })}
  </div>
);

export default FindMeOn;
