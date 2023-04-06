import React from "react";
import HeroSlider, { Slide } from "hero-slider";
import { ECimages } from "../../../../assets";

const HeroSliderComp = () => {
  return (
    <HeroSlider
      height="78vh"
      autoplay
      controller={{
        initialSlide: 1,
        slidingDuration: 500,
        slidingDelay: 100,
        onSliding: (nextSlide) =>
          console.debug("onSliding(nextSlide): ", nextSlide),
        onBeforeSliding: (previousSlide, nextSlide) =>
          console.debug(
            "onBeforeSliding(previousSlide, nextSlide): ",
            previousSlide,
            nextSlide
          ),
        onAfterSliding: (nextSlide) =>
          console.debug("onAfterSliding(nextSlide): ", nextSlide),
      }}
    >
      <Slide
        background={{
          backgroundImageSrc: ECimages.shop1,
          backgroundAttachment: "fixed",
        }}
      />
      <Slide
        background={{
          backgroundImageSrc: ECimages.shop2,
          backgroundAttachment: "fixed",
        }}
      />
      <Slide
        background={{
          backgroundImageSrc: ECimages.shop3,
          backgroundAttachment: "fixed",
        }}
      />
      <Slide
        background={{
          backgroundImageSrc: ECimages.shop4,
          backgroundAttachment: "fixed",
        }}
      />
      <Slide
        background={{
          backgroundImageSrc: ECimages.shop5,
          backgroundAttachment: "fixed",
        }}
      />
      <Slide
        background={{
          backgroundImageSrc: ECimages.shop6,
          backgroundAttachment: "fixed",
        }}
      />
    </HeroSlider>
  );
};

export default HeroSliderComp;
