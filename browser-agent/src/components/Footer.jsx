import { FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";
import userContext from "@/lib/userContext";

export default function Footer() {
  const { socialLinks, personalInfo } = userContext || {};

  const links = [
    {
      key: "linkedin",
      href: socialLinks?.linkedin,
      label: "LinkedIn",
      Icon: FaLinkedin,
      color: "hover:text-[#0A66C2]",
    },
    {
      key: "github",
      href: socialLinks?.github,
      label: "GitHub",
      Icon: FaGithub,
      color: "hover:text-white",
    },
    {
      key: "leetcode",
      href: socialLinks?.leetcode,
      label: "LeetCode",
      Icon: SiLeetcode,
      color: "hover:text-[#FFA116]",
    },
    {
      key: "x",
      href: socialLinks?.x,
      label: "X (Twitter)",
      Icon: FaXTwitter,
      color: "hover:text-white",
    },
    {
      key: "portfolio",
      href: socialLinks?.portfolio,
      label: "Portfolio",
      Icon: FaGlobe,
      color: "hover:text-[var(--accent)]",
    },
  ].filter((l) => Boolean(l.href));

  const author = personalInfo?.firstName && personalInfo?.lastName
    ? `${personalInfo.firstName} ${personalInfo.lastName}`
    : "Kenil";

  return (
    <footer className="fixed inset-x-0 bottom-0 z-50 h-16 border-t border-white/10 bg-[var(--background)]/85 backdrop-blur supports-[backdrop-filter]:bg-[var(--background)]/65">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between gap-3 px-3 sm:gap-4 sm:px-4">
        <p className="truncate text-xs text-white/70 sm:text-sm">
          Made with <span className="text-[var(--accent)]">❤</span> by {author}
        </p>

        <nav aria-label="Social links" className="shrink-0">
          <ul className="flex items-center gap-2 sm:gap-3">
            {links.map(({ key, href, label, Icon, color }) => (
              <li key={key}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  className={`inline-flex h-8 w-8 items-center justify-center rounded-md bg-white/5 text-white/70 transition hover:bg-white/10 sm:h-9 sm:w-9 ${color}`}
                >
                  <Icon className="h-[18px] w-[18px] sm:h-5 sm:w-5" />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}