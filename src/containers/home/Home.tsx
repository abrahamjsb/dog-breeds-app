import React from "react";
import { FlexboxGrid, Col, Header, Content, Container, Footer } from "rsuite";
import "./Home.css";

export default function Home() {
  return (
    <Container>
      <Header>
        <FlexboxGrid
          className="home-search-container"
          justify="center"
          align="middle"
        >
          <FlexboxGrid.Item componentClass={Col} colspan={6}>
            <div className="app-logo">
              <img
                src="https://dog.ceo/img/dog-api-logo.svg"
                alt="Dog"
                title="Dog"
              />
              <h1>Find Your Dog</h1>
            </div>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Header>
      <Content>
        <p>Content</p>
      </Content>
      <Footer>
        <p>Footer</p>
      </Footer>
    </Container>
  );
}
