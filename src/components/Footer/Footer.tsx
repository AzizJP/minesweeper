import {FC, memo} from 'react';

import './Footer.scss';

const Footer: FC = memo(() => {
  return (
    <footer className="footer">
      <h3 className="footer__title">Pet project</h3>
      <section className="footer__author">
        <div className="footer__links">
          <a href="https://t.me/aziz_jp" target="_blank" className="footer__link" rel="noreferrer">
            Джумаев Азиз
          </a>
          <a href="https://github.com/AzizJP" target="_blank" className="footer__link" rel="noreferrer">
            Github
          </a>
        </div>
        <span className="footer__copyright">&copy;{new Date().getFullYear()}</span>
      </section>
    </footer>
  );
});

export default Footer;
