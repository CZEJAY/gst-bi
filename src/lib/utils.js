
export const saveToLocalStorage = (data, key) => {
  return localStorage.setItem(key, JSON.stringify(data))
}
export const getFromLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key))
}

export const clearLocalStorage = (key) => {
 return localStorage.removeItem(key)
}

export const decodeBase64 = (base64String) => {
  try {
    // Replace URL-safe characters with standard Base64 characters
    let base64 = base64String.replace(/_/g, '/').replace(/-/g, '+');

    // Add padding characters if needed
    while (base64.length % 4 !== 0) {
      base64 += '=';
    }

    // Decode the base64 string
    const binaryString = atob(base64);

    // Convert binary string to byte array
    const byteArray = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      byteArray[i] = binaryString.charCodeAt(i);
    }

    return base64;
  } catch (error) {
    console.error('Failed to decode base64 string:', error);
    return null;
  }
};

export const encodeToBase64 = (input) => {
  // Check if the input is a string or binary data
  if (typeof input === 'string') {
    // For a string, simply use btoa
    return btoa(input);
  } else if (input instanceof Uint8Array) {
    // For binary data, convert the byte array to a string and then encode
    let binaryString = '';
    input.forEach((byte) => {
      binaryString += String.fromCharCode(byte);
    });
    return btoa(binaryString);
  } else {
    throw new Error('Unsupported input type for base64 encoding');
  }
};

/**
 * Get the user IP throught the webkitRTCPeerConnection
 * @param onNewIP {Function} listener function to expose the IP locally
 * @return undefined
 */
export function getUserIP(onNewIP) { //  onNewIp - your listener function for new IPs
  //compatibility for firefox and chrome
  var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
  var pc = new myPeerConnection({
      iceServers: []
  }),
  noop = function() {},
  localIPs = {},
  ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
  key;

  function iterateIP(ip) {
      if (!localIPs[ip]) onNewIP(ip);
      localIPs[ip] = true;
  }

   //create a bogus data channel
  pc.createDataChannel("");

  // create offer and set local description
  pc.createOffer().then(function(sdp) {
      sdp.sdp.split('\n').forEach(function(line) {
          if (line.indexOf('candidate') < 0) return;
          line.match(ipRegex).forEach(iterateIP);
      });
      
      pc.setLocalDescription(sdp, noop, noop);
  }).catch(function(reason) {
      // An error occurred, so handle the failure to connect
  });

  //listen for candidate events
  pc.onicecandidate = function(ice) {
      if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
      ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
  };
}

// Usage


