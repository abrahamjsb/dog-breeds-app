import React, { useState, useEffect } from "react";
import { FlexboxGrid, AutoComplete, Button } from "rsuite";
import { useAppDispatch } from "../../app/hooks";
import Spinner from "../../components/spinner/Spinner";
import { MdSearch, MdClose } from "react-icons/md";
import ModalBreedList from "../breed-list-modal/ModalBreedList";
import { validateBreed } from "../../utils/utils";
import { setBreed, setSubBreed } from "../../features/breeds/breedSlice";
import { isMobile } from "../../utils/utils";

interface SearchbarProps {
  isLoading: boolean;
  breeds: string[];
  setShow: (value: boolean) => void;
}
export default function Searchbar({
  isLoading,
  breeds,
  setShow,
}: SearchbarProps) {
  const [visible, setVisible] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const mobile = isMobile(window.innerWidth);
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
      <FlexboxGrid justify="center" align="middle">
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
            <FlexboxGrid>
              <Button
                classPrefix="show-list"
                appearance="link"
                onClick={() => {
                  setVisible(true);
                }}
              >
                Show list
              </Button>
              {mobile && (
                <Button
                  classPrefix="show-list"
                  appearance="link"
                  onClick={() => {
                    setShow(true);
                  }}
                >
                  Show favorites
                </Button>
              )}
            </FlexboxGrid>
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
