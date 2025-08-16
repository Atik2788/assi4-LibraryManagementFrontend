const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 py-6 ">
      <div className="container mx-auto md:px-6 px-0 flex flex-col md:flex-row justify-between items-center">
        {/* Left side */}
        <p className="text-sm">&copy; {new Date().getFullYear()} Library Management. All rights reserved.</p>

        {/* Right side: GitHub */}
        <div className="mt-1 md:mt-0">
          <a
            href="https://github.com/Atik2788"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-gray-200 hover:text-white transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577v-2.234c-3.338.726-4.033-1.61-4.033-1.61-.546-1.385-1.333-1.754-1.333-1.754-1.09-.746.083-.73.083-.73 1.205.085 1.84 1.236 1.84 1.236 1.07 1.833 2.807 1.304 3.492.997.107-.774.418-1.305.762-1.605-2.665-.304-5.466-1.332-5.466-5.93 0-1.31.47-2.38 1.235-3.22-.123-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 013-.403c1.02.004 2.045.138 3 .403 2.29-1.552 3.296-1.23 3.296-1.23.653 1.653.242 2.873.12 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.804 5.624-5.475 5.922.43.37.813 1.102.813 2.222v3.293c0 .32.218.694.825.576C20.565 21.796 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            @Atik2788
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
