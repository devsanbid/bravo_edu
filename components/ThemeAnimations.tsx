'use client';

import { useTheme } from '@/context/ThemeContext';
import { SnowEffect, SantaAnimation, ChristmasGifts } from '@/components/animations/ChristmasAnimations';
import { GhostAnimation, BatAnimation, PumpkinAnimation } from '@/components/animations/HalloweenAnimations';
import { FlowerPetalsEffect, KiteAnimation, TikaAnimation } from '@/components/animations/DashainAnimations';
import { DiyaAnimation, SkyLanternAnimation, TwinklingStars } from '@/components/animations/TiharAnimations';
import { ColorPowderEffect, WaterBalloonAnimation, ColorSplashEffect } from '@/components/animations/HoliAnimations';
import { FireworkEffect, ConfettiAnimation, BalloonAnimation } from '@/components/animations/NewYearAnimations';

export default function ThemeAnimations() {
  const { currentTheme, themeConfig } = useTheme();

  if (currentTheme === 'normal') {
    return null;
  }

  return (
    <>
      {currentTheme === 'christmas' && (
        <>
          <SnowEffect />
          <SantaAnimation />
          <ChristmasGifts />
        </>
      )}

      {currentTheme === 'halloween' && (
        <>
          <GhostAnimation />
          <BatAnimation />
          <PumpkinAnimation />
        </>
      )}

      {currentTheme === 'dashain' && (
        <>
          <FlowerPetalsEffect />
          <KiteAnimation />
          <TikaAnimation />
        </>
      )}

      {currentTheme === 'tihar' && (
        <>
          <DiyaAnimation />
          <SkyLanternAnimation />
          <TwinklingStars />
        </>
      )}

      {currentTheme === 'holi' && (
        <>
          <ColorPowderEffect />
          <WaterBalloonAnimation />
          <ColorSplashEffect />
        </>
      )}

      {currentTheme === 'newYear' && (
        <>
          <FireworkEffect />
          <ConfettiAnimation />
          <BalloonAnimation />
        </>
      )}

      {(currentTheme === 'teej' || currentTheme === 'losar') && (
        <>
          <FlowerPetalsEffect />
        </>
      )}
    </>
  );
}
