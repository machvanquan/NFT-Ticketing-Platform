import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import queryString from 'query-string';

function QRCodeGenerator() {
  const href = window.location.href;
  const parsed = queryString.parseUrl(href);
  const nftAddress = parsed.query.nft_address;
  const [qrData] = useState(nftAddress);

  const qrCodeSize = 370;

  return (
    <>
    <section className="section hero">
      <div className="container">
        <h1 className="headline-lg hero-title">
          <span className="span">QR CODE</span>
        </h1>
      </div>
    </section>
    <section className='d-flex justify-content-center'>
     <QRCode value={qrData} size={qrCodeSize} />
    </section>
    </>
  );
}

export default QRCodeGenerator;
