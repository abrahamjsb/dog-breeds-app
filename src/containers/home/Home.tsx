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
  IconButton,
} from "rsuite";
import "./Home.css";
import {
  MdSearch,
  MdClose,
  MdFavoriteBorder,
  MdFavorite,
} from "react-icons/md";
import { useFetchBreedsQuery } from "../../services/api";
import Spinner from "../../components/spinner/Spinner";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { setBreed, setSubBreed } from "../../features/breeds/breedSlice";

const validateBreed = (breed: string, breedList: string[]): boolean =>
  breedList.includes(breed);

export default function Home() {
  const { data, error, isLoading } = useFetchBreedsQuery("");
  const { breedSelected, subBreedSelected } = useAppSelector(
    (store) => store.breed
  );
  const [visible, setVisible] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [showClear, setShowClear] = useState<boolean>(false);
  const [fav, setFav] = useState<boolean>(false);
  const breeds = data ? Object.keys(data.message) : [];
  const subBreedList = breedSelected ? data.message[breedSelected] : [];
  const dispatch = useAppDispatch();
  useEffect(() => {
    console.log("breedState", subBreedList);
    const isValidBreed = validateBreed(value, breeds);
    if (isValidBreed) {
      dispatch(setBreed(value));
    } else {
      dispatch(setBreed(""));
    }
    if (value) {
      setShowClear(true);
    } else {
      setShowClear(false);
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
                        {showClear && (
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
                <Col xs={24}>
                  <h5 className="filter-title">Filter by sub-breed:</h5>
                </Col>
                <Col xs={16}>
                  <div className="filter-keywords-container">
                    <Button
                      appearance="primary"
                      classPrefix={
                        !subBreedSelected ? "keyword selected" : "keyword"
                      }
                    >
                      All
                    </Button>
                    {subBreedList.map((subBreed: string) => (
                      <Button
                        onClick={() => dispatch(setSubBreed(subBreed))}
                        appearance="primary"
                        classPrefix={
                          subBreed === subBreedSelected
                            ? "keyword selected"
                            : "keyword"
                        }
                      >
                        {subBreed}
                      </Button>
                    ))}
                  </div>
                </Col>
                <Col xs={8}>
                  <FlexboxGrid justify="end">
                    <IconButton
                      classPrefix="fav-btn"
                      appearance="link"
                      icon={
                        !fav ? (
                          <MdFavoriteBorder color="#535353" size={27} />
                        ) : (
                          <MdFavorite color="#db0d36" size={27} />
                        )
                      }
                      onClick={!fav ? () => setFav(true) : () => setFav(false)}
                    >
                      {!fav
                        ? "Add breed to favorites"
                        : "Remove from favorites"}
                    </IconButton>
                  </FlexboxGrid>
                </Col>
              </Row>
              <Row>
                <Col xs={24} md={8}>
                  <div className="thumbnail-container">
                    <img src="https://images.dog.ceo/breeds/labradoodle/labradoodle-forrest.png" />
                  </div>
                </Col>
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
