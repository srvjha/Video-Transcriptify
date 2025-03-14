import React, { useEffect, useRef, useState } from 'react';
import axios from "axios";
import { Mode } from '../../config/ApplicationMode';
const VideoDownload = () => {
  const [url, setUrl] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const envNode = Mode();
  let envURL = envNode.url;

  const handleDownload = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(`${envURL}/api/v1/users/download-video?url=${encodeURIComponent(url)}`,
      { 
        withCredentials: true 
      }
    
    );
     // console.log("RES :", response);
      if (response.status === 200 && response.data) {
        setData(response.data);
        setError(null);
      } else {
        setError("Error downloading video. Please try again.");
        setData(null);
      }
    } catch (error) {
      setError("Error downloading video. Please try again.");
      //console.log("ERROR: ", error);
      setData(null);
    }
    setLoading(false);
    setUrl("");
  };

  return (
    <>
      <div className="flex justify-center mt-10 px-4 sm:px-0">
        <input
          type="text"
          className="outline-none p-2 h-14 w-full max-w-[700px] text-black placeholder-white bg-transparent border-none rounded-md text-lg"
          value={url}
          ref={inputRef}
          onChange={(e) => setUrl(e.target.value)}
          required
          placeholder='Enter Your Youtube URL...'
        />
      </div>

      <div
        className='bg-black pb-3 pt-3 pl-2 mt-6 h-12 w-32 mx-auto sm:ml-[740px] text-white text-[15px] rounded-md cursor-pointer'
        onClick={(e) => handleDownload(e)}
      >
        Download Video
      </div>

      {loading && <div className="my-4 flex justify-center">Loading...</div>}
      {error && <div className="text-red-700 font-bold mt-4 text-center">{error}</div>}
      {data && (
        <>
          <div className="my-4 flex justify-center">
            <iframe
              width="100%"
              height="320"
              src={data.url}
              title="video"
              className="max-w-[570px]"
            />
          </div>
          <div className='flex justify-center px-4'>
            <table className='bg-blue-500 border border-black w-full max-w-[800px]'>
              <thead className='bg-red-300 p-2 border border-black'>
                <tr className='text-xl border border-gray-600'>
                  <th className="p-2">Media Type</th>
                  <th className="p-2">Resolution</th>
                  <th className="p-2">Codec</th>
                  <th className="p-2">Download Link</th>
                </tr>
              </thead>
              <tbody className='bg-blue-500'>
                {data.info.map((format, index) => (
                  <tr key={index} className='text-lg border-t border-gray-600'>
                    <td className="p-2">{format.hasVideo===true ? "Video" : "Audio"}</td>
                    <td className="p-2">{format.hasVideo ? `${format.height}p` : "-"}</td>
                    <td className="p-2">{format.mimeType.split(";")[0]}</td>
                    <td className="p-2">
                      <a
                        href={format.url}
                        target="_blank"
                        rel="noopener noreferrer"
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

export default VideoDownload;
