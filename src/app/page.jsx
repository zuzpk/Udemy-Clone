"use client"
import { Box, Button, Image, Size, Text, TextWheel, TRANSITION_CURVES, TRANSITIONS, useDelayed } from "@zuzjs/ui"
import { APP_NAME, APP_VERSION } from "@/config"
import { useEffect, useState } from "react"
import { useStore } from "@zuzjs/store"
import Courses from "./courses"

const Page = () => {

  const { version, dispatch } = useStore(`app`)
  const [ _version, setVersion ] = useState(`v0.0.0`)
  const mounted = useDelayed()
  const anim = {
    transition: TRANSITIONS.SlideInTop,
    curve: TRANSITION_CURVES.Bounce,
    duration: 0.5,
    when: mounted
  }

  useEffect(() => {
    document.title = APP_NAME
    setTimeout(() => setVersion(`v${version}`), 200)
  }, [])

  return <Box as={`landing flex cols`}>

    <Box as={`banner flex aic p:25,15%`}>

    <Box as={`flex flex:1 cols aic jcc gap:20 rel zIndex:3`}>
        <Image 
          animate={{
            transition: TRANSITIONS.SlideInLeft,
            curve: TRANSITION_CURVES.Bounce,
            duration: 1,
            when: mounted
          }}
          src={"/imgs/landing2.png"} as={`rel zIndex:3 w:400`} />
      </Box>

      <Box as={`flex flex:1 cols gap:20 rel zIndex:3`}>

          <Text 
            animate={anim}
            as={`s:80 b:900 text-clip bgi:gradient-to-right-red-purple`}>You're back Kamran</Text>
          <Text 
            animate={{
              ...anim,
              delay: 0.15
            }}
            as={`s:30 bold`}>Stand out from the crowd with the latest skills. Get courses from $10.99 during this special offer.</Text>

          <Button 
            animate={{
              ...anim,
              delay: 0.25
            }}
            size={Size.Small} as={`s:20! bold! p:15,50! mt:50 bgi:gradient-to-right-red-purple! r:25!`}>Start Learning with Magic</Button>

      </Box>

      
        

      <Box as={`bgi:gradient-to-right-red-purple w:100vh h:100vh abs right:0 zIndex:1 blur:100 opacity:0.15`} />

    </Box>

    <Courses />


  </Box>
}

export default Page