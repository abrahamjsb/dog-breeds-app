import React from "react";
import {
  FlexboxGrid,
  Col,
  Header,
  Content,
  Container,
  Footer,
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
import { useBreeds } from "../../app/hooks";

export default function Home() {
  const { isLoading, breedSelected, subBreedSelected, breeds, subBreedList } =
    useBreeds();
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
              <Searchbar isLoading={isLoading} breeds={breeds} />
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Header>
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
                      <FavoriteButton />
                    </FlexboxGrid>
                  </Col>
                )}
              </Row>
              <Row>
                {breedSelected && (
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
                )}
              </Row>
            </Row>
          </Grid>
        </Content>
        <Footer>
          <p>Footer</p>
        </Footer>
      </Container>
    </>
  );
}
