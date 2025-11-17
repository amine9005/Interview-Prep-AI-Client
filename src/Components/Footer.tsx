const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal footer-center bg-base-200 text-base-content py-8 p-4 border-t border-orange-400">
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by{" "}
          <a
            href="https://mohamed-amine-portfolio.firebaseapp.com/"
            className="link link-hover text-orange-400 font-semibold"
            target="_blank"
          >
            Amine Selmi
          </a>
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
