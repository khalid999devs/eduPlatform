import axios from 'axios';
import reqs from '../../assets/requests';
import ZoomMtgEmbedded from '@zoomus/websdk/embedded';

const ZoomEntry = () => {
  const client = ZoomMtgEmbedded.createClient();

  var authEndpoint = '';
  var meetingNumber = '123456789';
  var role = 0;
  // var userEmail = '';
  // var registrantToken = '';
  // var zakToken = '';
  var leaveUrl = 'http://localhost:3000';

  function getSignature(e) {
    e.preventDefault();

    // fetch(authEndpoint, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     meetingNumber: meetingNumber,
    //     role: role,
    //   }),
    // }).then((res) => res.json());

    axios
      .post(reqs.ZOOM_CRED)
      .then((res) => {
        const {
          signature,
          sdkKey,
          username: zoomUsername,
          password,
          meetingNo,
        } = res.data;
        console.log(res);
        startMeeting(signature, sdkKey, zoomUsername, password, meetingNo);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function startMeeting(signature, sdkKey, zoomUsername, password, meetingNo) {
    console.log(zoomUsername);
    let meetingSDKElement = document.getElementById('meetingSDKElement');
    meetingSDKElement.classList.add('zoomView');

    client
      .init({ zoomAppRoot: meetingSDKElement, language: 'en-US' })
      .then(() => {
        client
          .join({
            signature: signature,
            sdkKey: sdkKey,
            meetingNumber: meetingNo,
            password: password,
            userName: zoomUsername,
          })
          .then(() => {
            console.log('joined succesfully');
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className='min-h-screen w-full'>
      <h1>Zoom Meeting SDK Sample React</h1>

      {/* For Component View */}
      <div id='meetingSDKElement' className='h-full w-full '>
        {/* Zoom Meeting SDK Component View Rendered Here */}
      </div>
      <button
        className='p-8 bg-onPrimary-main text-white rounded-ms text-md'
        onClick={getSignature}
      >
        Join Meeting
      </button>
    </div>
  );
};

export default ZoomEntry;
