import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "../ui/accordion"
  import { motion } from "framer-motion";
  import Balancer from 'react-wrap-balancer'



const Explain = () => {
  return (
    <div>
        <div className='min-h-screen flex flex-row -mt-20 p-2 items-center space-x-16 justify-center'>
            <div className=' mr-2 w-[580px] ml-4 shadow-lg p-5 '>
                <div className='text-3xl font-bold  text-yellow-100'>
                  <Balancer>Create Notes Instantly With Youtube URL</Balancer></div>
                <div className=' font-lg text-xl  text-gray-200 mt-2'>
                    Does this ever happen to you that you are studying some concept on youtube but feels the need to get the notes out of it, I know some youtubers provides it but 
                    what if you want to make your own notes. We have got you covered, just paste the youtube URL and get the notes instantly. Rather than repeatedly watching the videos to make notes by your own you can save your time and energy by using our service.

                </div>
                </div>
            <div className='w-[550px] mt-5'>
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
                className=' rounded-xl w-[500px] h-[500px]'
                />
            </div>
        </div>

        <div className='flex flex-row p-2 space-x-16 ml-16 items-center justify-center'>            
        <div className="w-[580px] mt-8">
          <motion.img
            src="yt2.png"
            alt="How to Make AI-Generated Images"
            className="rounded-xl"
            initial={{ y: 0 }}
            animate={{ y: [0, -20, 0] }} // Moves up by 20px and back
            transition={{
              duration: 2, // Time for one cycle
              repeat: Infinity, // Loops infinitely
              repeatType: "loop", // Restarts smoothly
              ease: "easeInOut", // Easing for smooth animation
            }}
            />
          </div>
                    <div className="mr-2 w-[600px] ml-10 text-yellow-100 p-6 rounded-lg shadow-lg">
                    <h2 className="text-3xl ml-8 font-bold mb-4">How to Make AI-Generated Notes</h2>
                    <ul className="space-y-4 ">
                        <li className="flex items-start">
                        <div className=" text-white text-sm font-bold rounded-full flex items-center justify-center w-5 h-5 mr-4">
                            1
                        </div>
                        <p>
                            <strong>Select the Language:</strong> Choose your preferred language for the notes. This ensures the notes are generated in a language that best suits your understanding.
                        </p>
                        </li>
                        <li className="flex items-start">
                        <div className=" text-white font-bold rounded-full flex items-center justify-center w-8 h-8 mr-4">
                            2
                        </div>
                        <p>
                            <strong>Paste the URL of the YouTube Video:</strong> Copy the link to the YouTube video from which you want to extract notes and paste it into the designated input field.
                        </p>
                        </li>
                        <li className="flex items-start">
                        <div className=" text-white font-bold rounded-full flex items-center justify-center w-8 h-8 mr-4">
                            3
                        </div>
                        <p>
                            <strong>Click on the Generate Notes Button:</strong> Once the URL is pasted, simply click the "Generate Notes" button to start the process. The system will analyze the video and create detailed notes based on its content.
                        </p>
                        </li>
                        <li className="flex items-start">
                        <div className=" text-white font-bold rounded-full flex items-center justify-center w-8 h-8 mr-4">
                            4
                        </div>
                        <p>
                            <strong>Download the Notes:</strong> After the notes are generated, you can review them and download the file for offline use. Save time by having well-structured notes instantly at your fingertips.
                        </p>
                        </li>
                    </ul>
                    </div>

        </div>
         <div id="features"></div>
        <div className='ml-[81px]  mt-32 text-3xl text-white font-bold' >Features</div>
        
        {/* Features Section */}
      <div className="w-full ml-[62px] max-w-6xl p-4 mt-7 ">
        {/* <h3 className="text-3xl font-bold text-white mb-6">Features</h3> */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Convert to PDF Notes",
              description:
                "Turn YouTube videos into concise, organized PDF notes, perfect for study sessions or reference.",
            },
            {
              title: "Chat with PDF",
              description:
                "Interact with the generated notes using a chat-like interface for a more engaging experience.",
            },
            {
              title: "Get Customized PDF Notes",
              description:
                "Receive personalized notes based on your preferences and requirements for better understanding.",
            },
            {
              title: "Transcript Generation",
              description:
                "Automatically generate accurate transcripts for quick and efficient review of content.",
            },
            {
              title: "User-Friendly Interface",
              description:
                "Enjoy an intuitive and seamless experience, suitable for all users.",
            },
            {
              title: "Secure and Reliable",
              description:
                "Your data's security and privacy are our top priorities with robust measures.",
            },
          ].map((feature, index) => (
            <motion.li
              key={index}
              className="relative p-4 bg-gradient-to-r from-purple-600 via-pink-700 to-blue-600 rounded-lg shadow-lg text-gray-50 "
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
              <h4 className="text-xl font-semibold">{feature.title}</h4>
              <p className="mt-2">{feature.description}</p>
            </motion.li>
          ))}
        </ul>
      </div>
        
      <div id="features"></div>
        <div className='ml-[81px]  mt-32 text-3xl text-white font-bold' id='faqs'>FAQs</div>
         
        <Accordion type="single" collapsible className="w-[1200px] mt-2  ml-[80px] text-white shadow-xl p-5 rounded-lg">
      <AccordionItem value="item-1">
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
  )
}

export default Explain