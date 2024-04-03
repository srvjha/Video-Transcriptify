import React, { useState ,useEffect,useRef} from 'react';
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

const styles = StyleSheet.create({
  page: {
    backgroundColor:"white",
    color: "black",
  },
  section: {
    padding: 3,
    marginLeft:23
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
    marginLeft:260
  },
});

const GeneratePDF = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [transcript, setTranscript] = useState("");
  const inputRef = useRef()

  const fetchAndStoreTranscript = async () => {
    const { id } = getVideoId(url);
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3000/transcript?url=${id}`);
      setTranscript(response.data.transcript);
      setError(null);
    } catch (error) {
      setError("Error fetching transcript. Please try again.");
      setTranscript("");
      
    }
    setLoading(false);
  };

  const fieldReset = ()=>{
    setUrl("")
  }
  useEffect(()=>{
    inputRef.current.focus()
},[])

  return (
    <>
      <div className='mt-20'>
        <div className="flex justify-center  ml-[360px] p-2 rounded-2xl mr-[300px]">
          
          <input
            type="text"
            className="outline-none ml-[200px] p-2 h-14 w-[700px] text-black placeholder-white bg-transparent border-none rounded-md text-lg"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            ref={(input)=>(inputRef.current=input)}
            placeholder='Enter Your Youtube URL...'
          />
        </div>

        <div className='flex flex-col justify-center'>
          <div
            className='bg-black pb-3 pt-3 pl-4 mt-6  h-12 w-32 ml-[740px] text-white text-[15px] rounded-md cursor-pointer'
            onClick={()=>{ fetchAndStoreTranscript();fieldReset() }}
          >
            Generate PDF
          </div>
          <div className='flex flex-col justify-center items-center ml-[83px] mt-4 '>
            {loading ? (
              "Loading..."
            ) : error ? (
              "Error generating notes"
            ) : transcript ? (
              <>
                <PDFDownloadLink document={
                  <Document>
                    <Page size="A4" style={styles.page}>
                      <View style={styles.section}>
                        <Text style={styles.title}>NOTES</Text>
                      </View>
                      {transcript.map((item, index) => (
                        <View key={index} style={styles.section}>
                          <Text>{item.text}</Text>
                        </View>
                      ))}
                    </Page>
                  </Document>
                } fileName="notes.pdf">
                  {({ blob, url, loading, error }) =>
                    loading ? "Loading document..." :
                    <div
                    className='bg-black pb-3 pt-3 pl-4 mt-6 mr-2  h-12 w-32  text-white text-[15px] rounded-md cursor-pointer'
                    
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

export default GeneratePDF;
