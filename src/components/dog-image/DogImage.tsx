import React from "react";
import { Col } from "rsuite";

interface DogImageProps {
  breed: string | { breed: string; subBreed: string };
  hook: Function;
}
export default function DogImage({ breed, hook }: DogImageProps) {
  const breedImageState = hook(breed);
  const imageList = breedImageState.data?.message || [];
  return imageList.length > 0
    ? imageList.map((imageUri: string) => (
        <Col xs={24} md={8} key={imageUri}>
          <div className="thumbnail-container">
            <img src={imageUri} />
          </div>
        </Col>
      ))
    : null;
}
