import { FaGithub } from 'react-icons/fa';
import Link from 'next/link';

export default function GithubCorner() {
  return (
    <Link
      href="https://github.com/sergot/personal-portfolio"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200"
      aria-label="View source on GitHub"
    >
      <FaGithub className="w-6 h-6" />
    </Link>
  );
} 