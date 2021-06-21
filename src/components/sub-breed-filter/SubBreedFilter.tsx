import React from "react";
import { Button, Col } from "rsuite";
import { useAppDispatch } from "../../app/hooks";
import { setSubBreed } from "../../features/breeds/breedSlice";

interface SubBreedFilterProps {
  breedSelected: string;
  subBreedSelected: string;
  subBreedList: string[];
}

export default function SubBreedFilter({
  breedSelected,
  subBreedSelected,
  subBreedList,
}: SubBreedFilterProps) {
  const dispatch = useAppDispatch();
  return breedSelected && subBreedList.length > 0 ? (
    <>
      <Col xs={24}>
        <h5 className="filter-title">Filter by sub-breed:</h5>
      </Col>
      <Col xs={24} md={16}>
        <div className="filter-keywords-container">
          <Button
            onClick={() => dispatch(setSubBreed(""))}
            appearance="primary"
            classPrefix={!subBreedSelected ? "keyword selected" : "keyword"}
          >
            All
          </Button>
          {subBreedList.map((subBreed: string) => (
            <Button
              key={subBreed}
              onClick={() => dispatch(setSubBreed(subBreed))}
              appearance="primary"
              classPrefix={
                subBreed === subBreedSelected ? "keyword selected" : "keyword"
              }
            >
              {subBreed}
            </Button>
          ))}
        </div>
      </Col>
    </>
  ) : null;
}
