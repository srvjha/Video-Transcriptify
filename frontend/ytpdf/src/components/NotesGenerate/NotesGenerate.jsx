import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";
import getVideoId from 'get-video-id';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import { Oval } from 'react-loader-spinner';
import FileProcessing from '../../utils/FileProcessing';

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    color: "black",
  },
  section: {
    padding: 3,
    marginLeft: 23
  },
  viewer: {
    width: "100%",
    height: "100vh",
  },
  title: {
    fontSize: 25,
    fontWeight: 'extrabold',
    marginBottom: 10,
    color: 'black',
    textDecoration: 'underline',
    marginLeft: 260
  },
});

const NotesGenerate = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errorUrl, setErrorURL] = useState("");
  const [transcript, setTranscript] = useState("");
  const [langchange,setLangChange] = useState(false)
  const [fileName, setFileName] = useState("")
  const inputRef = useRef()

  const removeAsterisks = (text) => {
    return text.replace(/\*\*/g, '').replace(/\*/g, '•');
  };

  const isValidYouTubeUrl = (url) => {
    const regex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
    return regex.test(url);
  };

  const fetchAndStoreTranscript = async () => {
    if(isValidYouTubeUrl(url)){
      // const { id } = getVideoId(url);
      setLoading(true);
      try {
        const response = await axios.post('https://video-transcriptify-backend.vercel.app/api/v1/video/give-notes', { url });
        console.log("RESPONSE : ", response)
       // const cleanedTranscript = removeAsterisks(response.data.transcript); // Clean the transcript
        setTranscript(response.data.data.transcript);
        setError(null);
      } catch (error) {
        setError("Error fetching transcript. Please try again.", error);
        setTranscript("");
      }
      setLoading(false);
    }
    else{
      setErrorURL("Please enter a valid YouTube URL")
    }
   
  };

  const fieldReset = () => {
    setUrl("")
  }
  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const handleOptionChange = (e) => {
    
    console.log(e.target.value);
    if(e.target.value=="option1")
      {
        setLangChange(true)
       
      }
    else
    {
      setLangChange(false)
      
    }
   
   
}
 const handleURL = (e)=>{
  if(langchange)
    {
      setUrl(e.target.value)
      setErrorURL("")
    }
    else
    {
      setErrorURL("Please select the language!");
      setTimeout(() => setErrorURL(""), 2000);
    }
 
 

 }

  return (
    <>
      <div className='mt-20'>
        <div className=' flex flex-col'>
        <div className="flex  p-2 rounded-2xl mx-auto w-full max-w-[700px]">
      <select className="cursor-pointer bg-white rounded-md p-2 w-[220px] text-center bg-transparent border-none focus:outline-none" onChange={handleOptionChange}>
                    <option value="">Select Language</option>
                    <option value="option1">English</option>
       </select>
        </div>
        <div className=' ml-[425px] mr-[780px]'>
        {errorUrl && 
        <div className=' flex flex-row '>
         <div class="h-[44px] mt-[4px] w-2 border  rounded-s-lg bg-red-700 mx-4 ml-[1px]  "></div>
        <div className="text-white-600  p-2 border rounded-e-lg  bg-gray-200 text-black font-semibold -ml-4 mt-1">{errorUrl}</div>
        </div>
        }
        </div>
       
        </div>
     
        <div className="flex justify-center p-2 rounded-2xl mx-auto w-full max-w-[700px]">
          
          <input
            type="text"
            className="outline-none p-2 h-14 w-full text-black placeholder-white bg-transparent border-none rounded-md text-lg"
            value={url}
            onChange={(e) => handleURL(e)}
            required
            ref={inputRef}
            placeholder='Enter Your Youtube URL...'
          />
        </div>

        <div className="flex justify-center p-2 rounded-2xl mx-auto w-full max-w-[700px] mt-4">
          <input
            type="text"
            className="outline-none p-2 h-14 w-full text-black placeholder-white bg-transparent border-none rounded-md text-lg"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            required
            placeholder='Enter Your PDF File Name...'
          />
        </div>

        <div className='flex flex-col items-center mt-6'>
          <div
            className='bg-black p-3 h-12 w-32 text-white text-center text-[15px] rounded-md cursor-pointer'
            onClick={() => { fetchAndStoreTranscript(); fieldReset() }}
          >
            Generate PDF
          </div>
          <div className='flex flex-col justify-center items-center mt-4'>
            {loading ? (
              <div className='flex flex-col justify-center items-center'>
              <Oval
                height={50}
                width={50}
                color="white"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel='oval-loading'
                secondaryColor="black"
                strokeWidth={4}
                strokeWidthSecondary={4}
              />
              <p className='mt-2 text-xl'>Loading...</p>
              </div>
            ) : error ? (
              <div className=' font-bold bg-white text-black text-xl p-2'>
               Failed to locate a transcript for this video,Try Another Video😔!
              </div>
              
            ) : transcript ? (
              <>
                <PDFDownloadLink document={
                  <Document>
                    <Page size="A4" style={styles.page}>
                      <View style={styles.section}>
                        <Text style={styles.title}>NOTES</Text>
                      </View>
                      <View style={styles.section}>
                        <Text>{transcript}</Text>
                      </View>
                    </Page>
                  </Document>
                } fileName={fileName.endsWith('.pdf') ? fileName : `${fileName}.pdf`}>
                  {({ blob, url, loading, error }) =>
                    loading ? "Loading document..." :
                      <div
                        className='bg-black p-3 h-12 w-32 text-white text-center text-[15px] rounded-md cursor-pointer mt-6'
                      >
                        Download PDF
                      </div>
                  }
                </PDFDownloadLink>
              </>
            ) : (
              "Download Button Will Generate Here"
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NotesGenerate;
