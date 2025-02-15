import {useEffect, useRef} from 'react';
import WebViewer from '@pdftron/webviewer'

const CustomizePdf = () => {
    const viewer = useRef(null);
    
    useEffect(() => {
        WebViewer(
          {
            path: 'updated-pdf',
            licenseKey: 'demo:1739605186710:617c1e7f03000000005d34f11c19de76826b932184c9fc7f4c853926ee',
            initialDoc: 'https://pdftron.s3.amazonaws.com/downloads/pl/demo-annotated.pdf',
          },
          viewer.current,
        ).then((instance) => {
            const { documentViewer } = instance.Core;
            console.log(documentViewer)
            // you can now call WebViewer APIs here...
          });
      }, []);
  return (
    <div className='w-[1200px] mx-auto'>
         <div className="bg-transparent" ref={viewer} style={{height: "100vh"}}></div>
         <div>
            {/* <form action="">
                <input type="file" />
            </form> */}
         </div>
        
    </div>
  )
}

export default CustomizePdf

