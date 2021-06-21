import React, { useState, useEffect } from "react";
import { FlexboxGrid, AutoComplete, Button } from "rsuite";
import { useAppDispatch } from "../../app/hooks";
import Spinner from "../../components/spinner/Spinner";
import { MdSearch, MdClose } from "react-icons/md";
import ModalBreedList from "../breed-list-modal/ModalBreedList";
import { validateBreed } from "../../utils/utils";
import { setBreed, setSubBreed } from "../../features/breeds/breedSlice";

interface SearchbarProps {
  isLoading: boolean;
  breeds: string[];
}
export default function Searchbar({ isLoading, breeds }: SearchbarProps) {
  const [visible, setVisible] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
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
      <ModalBreedList
        breeds={breeds}
        show={visible}
        onClose={() => setVisible(false)}
        onSetBreed={(val: string) => setValue(val)}
      />
    </>
  );
}
