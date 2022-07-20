import { Column, Container, Link, Row, Titles, Wrapper } from './footer.module';

export default function Footer({ children, ...restProps }) {
    return <Container {...restProps}>{children}</Container>;
  }
  
  Footer.Wrapper = function FooterWrapper({ children, ...restProps }) {
    return <Wrapper {...restProps}>{children}</Wrapper>;
  };
  
  Footer.Row = function FooterRow({ children, ...restProps }) {
    return <Row {...restProps}>{children}</Row>;
  };
  
  Footer.Column = function FooterColumn({ children, ...restProps }) {
    return <Column {...restProps}>{children}</Column>;
  };
  
  Footer.Link = function FooterLink({ children, ...restProps }) {
    return <Link {...restProps}>{children}</Link>;
  };
  
  Footer.Titles = function FooterTitles({ children, ...restProps }) {
    return <Titles {...restProps}>{children}</Titles>;
  };
  