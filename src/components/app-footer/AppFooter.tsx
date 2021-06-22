import React from "react";
import { Footer, Grid, Row, FlexboxGrid, Col } from "rsuite";
import { MdFavorite } from "react-icons/md";
import "./AppFooter.css";

export default function AppFooter() {
  return (
    <Footer classPrefix="app-footer">
      <Grid>
        <Row>
          <FlexboxGrid justify="center">
            <FlexboxGrid.Item componentClass={Col} xs={12}>
              <p className="footer-text">
                This site its only for a use of a practical test. All rights to
                the owners of images used here and{" "}
                <a rel="noreferrer" target="_blank" href="https://dog.ceo/">
                  Dog CEO API
                </a>
              </p>
              <p className="footer-text">
                Made with <MdFavorite color="red" size={27} /> React,Redux,Redux
                Toolkit, TypeScript
              </p>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Row>
      </Grid>
    </Footer>
  );
}
