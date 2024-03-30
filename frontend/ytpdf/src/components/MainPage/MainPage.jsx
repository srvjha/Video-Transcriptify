import React, { useState } from 'react';
import axios from "axios";
import { YoutubeTranscript } from 'youtube-transcript';
import getVideoId from 'get-video-id';



// Rest of the code remains the same


const MainPage = () => {
  const [url, setUrl] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [transcript, setTranscript] = useState("");

  const handleDownload = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3000/download?url=${url}`);
      setData(response.data);
      setError(null);
    } catch (error) {
      setError("Error downloading video. Please try again.");
      setData(null);
    }
    setLoading(false);
    setUrl("");
  };

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


  return (
    <>
      <div className="mt-10">
        <label htmlFor="Youtube-Link" className="text-2xl font-medium">Youtube Link:</label>
        <input
          type="text"
          className="ml-2 p-2 h-14 w-[700px] bg-transparent border border-black rounded-md text-lg"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          placeholder='Enter Your Youtube URL...'
        />
      </div>

      <div
        className='bg-black pb-4 pt-3 h-12 w-32 ml-[730px] text-white mt-2 text-[15px] rounded-md cursor-pointer'
        onClick={(e) => handleDownload(e)}
      >
        Download Video
      </div>
      <div >
            <div className="text-2xl font-medium cursor-pointer" onClick={fetchAndStoreTranscript}>Transcript:</div>
            <div>
            {loading ? (
          "Loading..."
        ) : error ? (
          "Error fetching transcript"
        ) : transcript ? (
          transcript.map((item, index) => (
            <div key={index}>
              <p>{item.text}</p>
             
            </div>
          ))
        ) : (
          "Transcript will appear here once generated."
        )}
              </div>
          </div>
      
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-700 font-bold mt-4">{error}</div>}
      {data && (
        <>
          <div className="my-4 flex justify-center">
            <iframe
              width="570"
              height="320"
              src={data.url}
              title="video"
            />
          </div>
          <div className=' flex justify-center'>
          <table className='bg-blue-500 border border-black'>
            <thead className=' bg-red-300 p-2 border border-black '>
              <tr className=' text-xl border border-gray-600'>
                <th>Media Type</th>              
                <th>Resolution</th>               
                <th>Codec</th>
                <th>Download Link</th>
               
              </tr>
            </thead>
            <tbody className=' bg-blue-500'>
              {data.info.map((formatName, index) => (
                <tr key={index} className=' text-lg'>
                  <td>{formatName.mimeType.startsWith("video/") ? "Video" : "Audio"}</td>
                  <td>{formatName.hasVideo ? formatName.height + "p" : "-"}</td>
                  <td>{formatName.mimeType.split(";")[0]}</td>
                  <td>
                    <a
                      href={formatName.url}
                      target="_blank"
                      download
                      className="outline-none italic underline"
                    >
                      Download
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          
          
        </>
      )}
    </>
  );
};

export default MainPage;
