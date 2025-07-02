import Link from "next/link";
import {
  FaGithub,
  FaHome,
  FaList,
  FaEnvelope,
  FaUser,
  FaFolderOpen,
  FaInstagram,
} from "react-icons/fa";

export default function MiddleFooter() {
  return (
    <footer className="mt-16 py-2">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Link
            href="/"
            className="flex items-center gap-3 p-4 rounded-lg border border-[var(--border)] hover:border-[var(--primary)] transition-all duration-200 group"
          >
            <FaHome className="text-[var(--primary)] text-lg group-hover:scale-110 transition-transform" />
            <span className="text-[var(--text)] font-medium">Home</span>
          </Link>

          <Link
            href="/about"
            className="flex items-center gap-3 p-4 rounded-lg border border-[var(--border)] hover:border-[var(--primary)] transition-all duration-200 group"
          >
            <FaUser className="text-[var(--primary)] text-lg group-hover:scale-110 transition-transform" />
            <span className="text-[var(--text)] font-medium">About</span>
          </Link>
          <Link
            href="/posts"
            className="flex items-center gap-3 p-4 rounded-lg border border-[var(--border)] hover:border-[var(--primary)] transition-all duration-200 group"
          >
            <FaList className="text-[var(--primary)] text-lg group-hover:scale-110 transition-transform" />
            <span className="text-[var(--text)] font-medium">Posts</span>
          </Link>

          <Link
            href="/projects"
            className="flex items-center gap-3 p-4 rounded-lg border border-[var(--border)] hover:border-[var(--primary)] transition-all duration-200 group"
          >
            <FaFolderOpen className="text-[var(--primary)] text-lg group-hover:scale-110 transition-transform" />
            <span className="text-[var(--text)] font-medium">Projects</span>
          </Link>
        </div>
        <div className="flex justify-center gap-4 mb-8">
          {" "}
          <Link
            href="https://github.com/whddltjdwhd"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-lg border border-[var(--border)] hover:border-[var(--primary)] transition-all duration-200 group"
            title="GitHub"
          >
            <FaGithub className="text-xl text-[var(--text)] group-hover:text-[var(--primary)] transition-colors" />
          </Link>
          <Link
            href="mailto:sungjong5k@naver.com"
            className="p-3 rounded-lg border border-[var(--border)] hover:border-blue-400 transition-all duration-200 group"
            title="Contact"
          >
            <FaEnvelope className="text-xl text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors" />
          </Link>
          <Link
            href="https://instagram.com/m_castle_bell"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-lg border border-[var(--border)] hover:border-pink-400 transition-all duration-200 group"
            title="Instagram"
          >
            <FaInstagram className="text-xl text-pink-600 dark:text-pink-400 group-hover:text-pink-700 dark:group-hover:text-pink-300 transition-colors" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
