import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "../ui/accordion"
  import { motion } from "framer-motion";
  import Balancer from 'react-wrap-balancer'
import { CardSpotlight } from '../ui/card-spotlight';



const Explain = () => {
  return (
    <div className='w-full'>
        <div className='min-h-screen flex flex-col lg:flex-row px-4 lg:px-8 py-8 lg:py-16 items-center lg:space-x-8 justify-center'>
        <div className='w-full lg:w-[580px] shadow-lg p-5 mb-2 lg:mb-0'>
          <div className='text-2xl lg:text-3xl font-bold text-white'>
             <Balancer>Create Notes Instantly With Youtube URL</Balancer></div>
             <div className='text-base lg:text-xl text-gray-200 mt-4'>
                    Does this ever happen to you that you are studying some concept on youtube but feels the need to get the notes out of it, I know some youtubers provides it but 
                    what if you want to make your own notes. We have got you covered, just paste the youtube URL and get the notes instantly. Rather than repeatedly watching the videos to make notes by your own you can save your time and energy by using our service.

                </div>
                </div>
                <div className='w-full lg:w-[550px] mt-5'>
                <motion.img 
                src='yt1.png' 
                alt="Create Notes Instantly With Youtube URL"
                initial={{ y:0 }}
                animate={{ y:[0,-20,0] }}
                transition={{ 
                  duration:2,
                  repeat:Infinity,
                  repeatType:"loop",
                  ease:"easeInOut"
                 }}
                className='rounded-xl w-full max-w-[500px] h-auto mx-auto'
                />
            </div>
        </div>

        <div className='flex flex-col lg:flex-row px-4 lg:px-8 py-8 space-y-8 lg:space-y-0 lg:space-x-8 items-center justify-center'>
        <div className="w-full lg:w-[580px]">
          <motion.img
            src="yt2.png"
            alt="How to Make AI-Generated Images"
            className="rounded-xl w-full"
            initial={{ y: 0 }}
            animate={{ y: [0, -20, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          />
        </div>
        <div className="w-full lg:w-[600px] text-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl lg:text-3xl font-bold mb-6 text-center lg:text-left">How to Make AI-Generated Notes</h2>
          <ul className="space-y-6">
            {[
              {
                number: "1",
                title: "Select the Language:",
                description: "Choose your preferred language for the notes. This ensures the notes are generated in a language that best suits your understanding."
              },
              {
                number: "2",
                title: "Paste the URL of the YouTube Video:",
                description: "Copy the link to the YouTube video from which you want to extract notes and paste it into the designated input field."
              },
              {
                number: "3",
                title: "Click on the Generate Notes Button:",
                description: "Once the URL is pasted, simply click the Generate Notes button to start the process. The system will analyze the video and create detailed notes based on its content."
              },
              {
                number: "4",
                title: "Download the Notes:",
                description: "After the notes are generated, you can review them and download the file for offline use. Save time by having well-structured notes instantly at your fingertips."
              }
            ].map((item, index) => (
              <li key={index} className="flex items-start">
                <div className="text-white font-bold rounded-full flex items-center justify-center w-8 h-8 mr-4">
                  {item.number}
                </div>
                <p>
                  <strong>{item.title}</strong> {item.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>

         <div id="features" className="px-4 lg:px-36 py-16">
         <div className='text-4xl text-white/90 font-bold mb-16 text-center'>Features</div>
        
        <div className="w-full max-w-6xl mx-auto">
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Convert to PDF Notes",
                description: "Turn YouTube videos into concise, organized PDF notes, perfect for study sessions or reference.",
              },
              {
                title: "Chat with PDF",
                description: "Interact with the generated notes using a chat-like interface for a more engaging experience.",
              },
              {
                title: "Get Customized PDF Notes",
                description: "Receive personalized notes based on your preferences and requirements for better understanding.",
              },
              {
                title: "Transcript Generation",
                description: "Automatically generate accurate transcripts for quick and efficient review of content.",
              },
              {
                title: "User-Friendly Interface",
                description: "Enjoy an intuitive and seamless experience, suitable for all users.",
              },
              {
                title: "Secure and Reliable",
                description: "Your data's security and privacy are our top priorities with robust measures.",
              },
            ].map((feature, index) => (
              <CardSpotlight>
              <motion.li
                key={index}
                className="relative p-4 w-full h-full  text-gray-50"
                whileHover={{
                  scale: 1.05,
                  rotateX: 10,
                  rotateY: -5,
                }}
                transition={{
                  type: "spring",
                  stiffness: 150,
                }}
              >
                <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
                <p>{feature.description}</p>
              </motion.li>
              </CardSpotlight>
            ))}
          </ul>
        </div>
        </div>
        
      <div id="faqs" className="px-4 lg:px-36 py-16">
      <div className='text-4xl text-white/90 font-bold mb-8 text-center'>FAQs</div>

      <Accordion 
          type="single" 
          collapsible 
          className="w-full max-w-4xl mx-auto text-white shadow-xl p-5 rounded-lg"
        ><AccordionItem value="item-1">
        <AccordionTrigger className="text-xl font-serif">Is it free?</AccordionTrigger>
        <AccordionContent className="font-bold text-black text-[17px] ">
          Hn but only for limited credits , thoda hume bhi kaamne do.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger className="text-xl font-serif">How to use?</AccordionTrigger>
        <AccordionContent className="font-bold text-black text-[17px] ">
         Kindly Read the instructions given above.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger className="text-xl font-serif">How is it useful?</AccordionTrigger>
        <AccordionContent className="font-bold text-black text-[17px]  ">
          It saves time and energy.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger className="text-xl font-serif">
          Can I use it for any YouTube video?
          </AccordionTrigger>
        <AccordionContent className="font-bold text-black text-[17px]  ">
          Yes, you can use it for any YouTube video,just paste the URL and get the notes.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-5">
        <AccordionTrigger className="text-xl font-serif ">
          In which language can I put the youtube url?
          </AccordionTrigger>
        <AccordionContent className="font-bold text-black text-[17px]  ">
         English.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-6">
        <AccordionTrigger className="text-xl font-serif">
          In which language the notes will be generated?
          </AccordionTrigger>
        <AccordionContent className="font-bold text-black text-[17px]  ">
          Abhi toh sirf english me hi aayenge.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
        
    </div>
    </div>
  )
}

export default Explain