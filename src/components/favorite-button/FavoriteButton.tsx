import React from "react";
import { IconButton } from "rsuite";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { useAppDispatch } from "../../app/hooks";
import { setFavorite } from "../../features/breeds/breedSlice";

interface FavoriteButtonProps {
  favorites: string[];
  currentBreed: string;
}

export default function FavoriteButton({
  favorites,
  currentBreed,
}: FavoriteButtonProps) {
  const isFavorite = favorites.includes(currentBreed);
  const dispatch = useAppDispatch();
  return (
    <IconButton
      classPrefix="fav-btn"
      appearance="link"
      icon={
        !isFavorite ? (
          <MdFavoriteBorder color="#535353" size={27} />
        ) : (
          <MdFavorite color="#db0d36" size={27} />
        )
      }
      onClick={
        !isFavorite
          ? () => dispatch(setFavorite([...favorites, currentBreed]))
          : () =>
              dispatch(
                setFavorite(favorites.filter((elm) => currentBreed !== elm))
              )
      }
    >
      {!isFavorite ? "Add breed to favorites" : "Remove from favorites"}
    </IconButton>
  );
}
