type ContactInfoProps = {
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
};

const ContactInfo = ({ icon: Icon, children }: ContactInfoProps) => (
  <div className="flex items-center gap-2">
    <Icon className="w-4 h-4" />
    {children}
  </div>
);

export default ContactInfo;
