"use client";

import Script from "next/script";
import { getSiteSettings } from "@/lib/site";

export function MarquizWidget() {
  const marquizId = getSiteSettings().integrations.marquizId?.trim();
  if (!marquizId) return null;

  return (
    <Script id="marquiz-quiz" strategy="afterInteractive">
      {`(function(w,d,s,o,f,js,fjs){
w['MarquizObject']=o;w[o]=w[o]||function(){(w[o].q=w[o].q||[]).push(arguments)};
js=d.createElement(s),fjs=d.getElementsByTagName(s)[0];
js.id=o;js.src=f;js.async=1;fjs.parentNode.insertBefore(js,fjs);
}(window,document,'script','marquiz','https://script.marquiz.ru/v2.js'));
marquiz('init', { id: ${JSON.stringify(marquizId)}, autoOpen: false, autoOpenFreq: 'once' });`}
    </Script>
  );
}
