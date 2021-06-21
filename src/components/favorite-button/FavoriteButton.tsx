import React, { useState } from "react";
import { IconButton } from "rsuite";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

export default function FavoriteButton() {
  const [fav, setFav] = useState<boolean>(false);

  return (
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
      {!fav ? "Add breed to favorites" : "Remove from favorites"}
    </IconButton>
  );
}
