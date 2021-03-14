type Preloader = {
  preload: (...string) => void;
};

export function createPreloader(): Preloader {
  let images = [];
  return {
    preload(...imagesURLs): void {
      images = [];
      for (const imageURL of imagesURLs) {
        const img = new Image();
        img.src = imageURL;
        images.push(img);
      }
    }
  };
}
