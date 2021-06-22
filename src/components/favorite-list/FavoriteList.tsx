import React from "react";
import { MdClose } from "react-icons/md";
import { List, Button, Drawer, Sidebar, FlexboxGrid } from "rsuite";
import { useAppDispatch } from "../../app/hooks";
import { setBreed, setFavorite } from "../../features/breeds/breedSlice";
import { isMobile } from "../../utils/utils";
import "./FavoriteList.css";

interface FavoriteListProps {
  favorites: string[];
  show: boolean;
  setShow: (value: boolean) => void;
}

export default function FavoriteList({
  favorites,
  show,
  setShow,
}: FavoriteListProps) {
  const dispatch = useAppDispatch();
  const mobile = isMobile(window.innerWidth);
  const content = (
    <>
      <h4 className="fav-title">Favorites:</h4>
      <List>
        {favorites.length > 0 &&
          favorites.map((favorite) => (
            <List.Item classPrefix="fav-list-item" key={favorite}>
              <Button
                onClick={() => {
                  dispatch(setBreed(favorite));
                  if (mobile) {
                    setShow(false);
                  }
                }}
                appearance="link"
              >
                {favorite}
              </Button>
              <MdClose
                onClick={() =>
                  dispatch(
                    setFavorite(favorites.filter((elm) => favorite !== elm))
                  )
                }
                color="#535353"
                size={20}
              />
            </List.Item>
          ))}
      </List>
    </>
  );
  return mobile ? (
    <Drawer
      size="sm"
      placement="left"
      show={show}
      onHide={() => setShow(false)}
    >
      <Drawer.Header>
        <FlexboxGrid>
          <MdClose color="#535353" size={20} onClick={() => setShow(false)} />
        </FlexboxGrid>
      </Drawer.Header>
      <Drawer.Body>{content}</Drawer.Body>
    </Drawer>
  ) : (
    <Sidebar>{content}</Sidebar>
  );
}
