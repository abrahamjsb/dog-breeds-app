import  {MOBILE_SIZE_SCREEN} from './constants'

function validateBreed (breed: string, breedList: string[]): boolean {
  return breedList.includes(breed);
}

function getDefaultBreed(favorites:string[], breeds:string[]) {
    return favorites.length > 0 ? favorites[Math.floor(Math.random() * favorites.length)] : breeds[Math.floor(Math.random() * breeds.length)]
}

function isMobile(screenSize: number) {
  return screenSize < MOBILE_SIZE_SCREEN
}

export {validateBreed, getDefaultBreed, isMobile}