import { Hero } from '@/components/sections/Hero';
import { Features } from '@/components/sections/Features';
import { Sustainability } from '@/components/sections/Sustainability';
import { WhatWeBuy } from '@/components/sections/WhatWeBuy';
import { HowToSell } from '@/components/sections/HowToSell';
import { WhatsAppCta } from '@/components/sections/WhatsAppCta';
import { ResourceCards } from '@/components/sections/ResourceCards';
import { Faq } from '@/components/sections/Faq';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <Sustainability />
      <WhatWeBuy />
      <HowToSell />
      <WhatsAppCta />
      <ResourceCards />
      <Faq />
    </>
  );
}
