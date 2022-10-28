import Link from "next/link";

export default function ({ href, text }) {
  return (
    <Link legacyBehavior href={href} >
      <a className="navbar-brand text-light">{text}</a>
    </Link>
  );
};
