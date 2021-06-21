const validateBreed = (breed: string, breedList: string[]): boolean =>
  breedList.includes(breed);

export {validateBreed}