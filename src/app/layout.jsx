import Wrapper from "@/app/wrapper"
import { GA_MEASUREMENT_ID } from "@/config"
import '@/app/css/app.scss'
import Script from "next/script"

const RootLayout = ({ children }) => {

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.zuzcdn.net" />
        <link rel="stylesheet" href="https://fonts.zuzcdn.net/public/qjLs8fXhj/style.css" />
      </head>
      <body>
        <Wrapper>{children}</Wrapper>        
        {GA_MEASUREMENT_ID != "__" && <Script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />}
        {GA_MEASUREMENT_ID != "__" && <Script>
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');`}
        </Script>}
      </body>
    </html>
  )

}

export default RootLayout