import { useState } from 'react';
import { ReactReader } from 'react-reader';

function EpubReader() {
  const [location, setLocation] = useState<string>(''); 

  return (
    <div style={{ height: '100vh' }}>
      <ReactReader
  url="/doc-sach/buoi-sang-dieu-ky-danh-cho-doanh-nhan.epub"
  location={location}
  locationChanged={(loc) => {
    console.log("Location Changed:", loc);
    setLocation(loc);
  }}
  getRendition={(rendition) => {
    console.log("Rendition:", rendition);
  }}
/>
    </div>
  );
}

export default EpubReader;