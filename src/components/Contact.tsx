interface ContactLink {
  label: string;
  href: string;
}

interface ContactProps {
  message: string;
  emails: readonly string[];
  github: ContactLink;
}

const linkClass = "font-medium text-primary hover:underline";

export function Contact({ message, emails, github }: ContactProps) {
  return (
    <div className="space-y-4 text-center">
      <p className="text-muted-foreground">{message}</p>
      <ul className="space-y-2">
        {emails.map((email) => (
          <li key={email}>
            <a href={`mailto:${email}`} className={linkClass}>
              {email}
            </a>
          </li>
        ))}
        <li>
          <a
            href={github.href}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            {github.label}
          </a>
        </li>
      </ul>
    </div>
  );
}
