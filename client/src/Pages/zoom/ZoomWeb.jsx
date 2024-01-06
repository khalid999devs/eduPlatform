import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ZoomMtg } from '@zoomus/websdk';
import reqs from '../../assets/requests';

function ZoomWeb() {
  const [meetingData, setMeetingData] = useState(null);
  const [isSdkReady, setIsSdkReady] = useState(false);

  useEffect(() => {
    ZoomMtg.setZoomJSLib('https://source.zoom.us/2.18.2/lib', '/av');
    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareWebSDK();
    ZoomMtg.i18n.load('en-US');
    ZoomMtg.i18n.reload('en-US');
    setIsSdkReady(true);
  }, []);

  const getSignature = (e) => {
    e.preventDefault();

    let isMounted = true;
    axios
      .post(`http://localhost:8001${reqs.ZOOM_CRED}`, { courseId: 3 })
      .then((res) => {
        if (isMounted) {
          setMeetingData(res.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });

    return () => {
      isMounted = false;
    };
  };

  useEffect(() => {
    if (meetingData && isSdkReady) {
      startMeeting(meetingData);
    }
  }, [meetingData, isSdkReady]);

  const startMeeting = ({
    signature,
    sdkKey,
    username: zoomUsername,
    password,
    meetingNo,
  }) => {
    document.getElementById('zmmtg-root').style.display = 'block';
    ZoomMtg.init({
      leaveUrl: 'http://localhost:3000',
      success: () => {
        ZoomMtg.join({
          signature,
          sdkKey,
          meetingNumber: meetingNo,
          passWord: password,
          userName: zoomUsername,
          success: (success) => {
            console.log('Join Meeting Success', success);
          },
          error: (error) => {
            console.log('Join Meeting Error', error);
          },
        });
      },
      error: (error) => {
        console.log('Zoom Init Error', error);
      },
    });
  };

  return (
    <div className='zoomWeb'>
      <main>
        <h1>Zoom Meeting SDK Sample React</h1>
        {isSdkReady && (
          <button
            className='bg-black text-white text-md rounded-lg px-5 py-4'
            onClick={getSignature}
          >
            Join Meeting
          </button>
        )}
      </main>
    </div>
  );
}

export default ZoomWeb;
