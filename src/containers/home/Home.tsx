import React, { useState, useEffect } from "react";
import {
  FlexboxGrid,
  Col,
  Header,
  Content,
  Container,
  Footer,
  AutoComplete,
  Grid,
  Row,
  Modal,
  Button,
} from "rsuite";
import "./Home.css";
import { MdSearch, MdClose } from "react-icons/md";
import { useFetchBreedsQuery } from "../../services/api";
import Spinner from "../../components/spinner/Spinner";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { setBreed, setSubBreed } from "../../features/breeds/breedSlice";
import FavoriteButton from "../../components/favorite-button/FavoriteButton";
import SubBreedFilter from "../../components/sub-breed-filter/SubBreedFilter";
import DogImage from "../../components/dog-image/DogImage";
import {
  useFetchBreedImagesQuery,
  useFetchSubBreedImagesQuery,
} from "../../services/api";
import { validateBreed } from "../../utils/utils";

export default function Home() {
  const { data, isLoading } = useFetchBreedsQuery("");
  const { breedSelected, subBreedSelected } = useAppSelector(
    (store) => store.breed
  );
  const [visible, setVisible] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const breeds = data ? Object.keys(data.message) : [];
  const subBreedList = breedSelected && data ? data.message[breedSelected] : [];
  const dispatch = useAppDispatch();
  useEffect(() => {
    const isValidBreed = validateBreed(value, breeds);
    if (isValidBreed) {
      dispatch(setBreed(value));
      dispatch(setSubBreed(""));
    }
  }, [value]);
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
              <div className="app-header">
                <div className="app-logo-container">
                  <img
                    src="https://dog.ceo/img/dog-api-logo.svg"
                    alt="Dog"
                    title="Dog"
                  />
                  <h1>Find Your Dog</h1>
                </div>
                <FlexboxGrid align="middle">
                  {isLoading ? (
                    <Spinner />
                  ) : (
                    <>
                      <div className="searchbar">
                        <MdSearch size={24} color="#535353" />
                        <AutoComplete
                          classPrefix="breed-autocomplete"
                          data={breeds}
                          placeholder="Type a dog breed and watch cute photos..."
                          onSelect={(item) => setValue(item.value)}
                          value={value}
                          onChange={(val) => setValue(val)}
                        />
                        {value && (
                          <MdClose
                            className="clear-btn"
                            size={24}
                            color="#535353"
                            onClick={() => setValue("")}
                          />
                        )}
                      </div>
                      <div>
                        <Button
                          classPrefix="show-list"
                          appearance="link"
                          onClick={() => {
                            setVisible(true);
                          }}
                        >
                          Show list
                        </Button>
                      </div>
                    </>
                  )}
                </FlexboxGrid>
              </div>
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
                <Col xs={breedSelected && subBreedList.length > 0 ? 8 : 24}>
                  <FlexboxGrid justify="end">
                    <FavoriteButton />
                  </FlexboxGrid>
                </Col>
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
      <ModalBreedList
        breeds={breeds}
        show={visible}
        onClose={() => setVisible(false)}
        onSetBreed={(val) => setValue(val)}
      />
    </>
  );
}

interface ModalBreedListProps {
  show: boolean;
  onClose: () => void;
  breeds: string[];
  onSetBreed: (val: string) => void;
}
const ModalBreedList = ({
  show,
  onClose,
  breeds,
  onSetBreed,
}: ModalBreedListProps) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header>
        <Modal.Title>Select a breed</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ul style={{ height: 500 }}>
          {breeds.map((breed) => (
            <li key={breed}>
              <Button
                onClick={() => {
                  onSetBreed(breed);
                  onClose();
                }}
                appearance="link"
              >
                {breed}
              </Button>
            </li>
          ))}
        </ul>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};
