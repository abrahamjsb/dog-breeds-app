import React, { useState } from "react";
import {
  FlexboxGrid,
  Col,
  Header,
  Content,
  Container,
  Grid,
  Row,
} from "rsuite";
import "./Home.css";
import FavoriteButton from "../../components/favorite-button/FavoriteButton";
import SubBreedFilter from "../../components/sub-breed-filter/SubBreedFilter";
import DogImage from "../../components/dog-image/DogImage";
import {
  useFetchBreedImagesQuery,
  useFetchSubBreedImagesQuery,
} from "../../services/api";
import Searchbar from "../../components/searchbar/Searchbar";
import Logo from "../../components/logo/Logo";
import FavoriteList from "../../components/favorite-list/FavoriteList";
import { useBreeds } from "../../app/hooks";
import AppFooter from "../../components/app-footer/AppFooter";

export default function Home() {
  const {
    isLoading,
    breedSelected,
    subBreedSelected,
    breeds,
    subBreedList,
    favorites,
  } = useBreeds();
  const [show, setShow] = useState<boolean>(false);
  return (
    <>
      <Container>
        <Header>
          <FlexboxGrid
            className="home-search-container"
            justify="center"
            align="middle"
          >
            <FlexboxGrid.Item componentClass={Col} colspan={24} md={6}>
              <Logo />
              <Searchbar
                setShow={setShow}
                isLoading={isLoading}
                breeds={breeds}
              />
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Header>
        <Container>
          <FavoriteList show={show} setShow={setShow} favorites={favorites} />
          <Content>
            <Grid>
              <Row className="show-grid">
                <Row>
                  <SubBreedFilter
                    subBreedList={subBreedList}
                    subBreedSelected={subBreedSelected}
                    breedSelected={breedSelected}
                  />
                  {breedSelected && (
                    <Col
                      xs={24}
                      md={breedSelected && subBreedList.length > 0 ? 8 : 24}
                    >
                      <FlexboxGrid justify="end">
                        <FavoriteButton
                          currentBreed={breedSelected}
                          favorites={favorites}
                        />
                      </FlexboxGrid>
                    </Col>
                  )}
                </Row>
                <Row>
                  {breedSelected && !isLoading ? (
                    <DogImage
                      breed={
                        subBreedSelected
                          ? { breed: breedSelected, subBreed: subBreedSelected }
                          : breedSelected
                      }
                      hook={
                        subBreedSelected
                          ? useFetchSubBreedImagesQuery
                          : useFetchBreedImagesQuery
                      }
                    />
                  ) : null}
                </Row>
              </Row>
            </Grid>
          </Content>
        </Container>
        <AppFooter />
      </Container>
    </>
  );
}
