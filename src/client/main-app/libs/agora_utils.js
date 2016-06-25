function generateVideoProfile(resolution, frameRate) {
  let result = '480P_2';
  switch (resolution) {
  case '120p':
    result = '120P';
    break;
  case '240p':
    result = '240P';
    break;
  case '360p':
    result = '360P';
    break;
  case '480p':
    if (frameRate === '15') {
      result = '480P';
    } else {
      result = '480P_2';
    }
    break;
  case '720p':
    if (frameRate === '15') {
      result = '720P';
    } else {
      result = '720P_2';
    }
    break;
  case '1080p':
    if (frameRate === '15') {
      result = '1080P';
    } else {
      result = '1080P_2';
    }
    break;
  default:
    // 480p, 30
    // Do nothing
    break;
  }

  return result;
}

function getResolutionArray(reso) {
  switch (reso) {
  case '120p':
    return [160, 120];
  case '240p':
    return [320, 240];
  case '360p':
    return [640, 360];
  case '480p':
    return [640, 480];
  case '720p':
    return [1280, 720];
  case '1080p':
    return [1920, 1080];
  default:
    return [1280, 720];
  }
}

function calculateVideoSize(multiple, windowWidth, windowHeight, resolution) {
  const viewportWidth = windowWidth;
  const viewportHeight = windowHeight;
  const curResolution = getResolutionArray(resolution);
  let width;
  let height;
  let newWidth;
  let newHeight;

  if (multiple) {
    width = viewportWidth / 2 - 50;
    height = viewportHeight / 2 - 40;
  } else {
    width = viewportWidth - 100;
    height = viewportHeight - 80;
  }
  const ratioWindow = width / height;
  const ratioVideo = curResolution[0] / curResolution[1];
  if (ratioVideo > ratioWindow) {
    // calculate by width
    newWidth = width;
    newHeight = width * curResolution[1] / curResolution[0];
  } else {
    // calculate by height
    newHeight = height;
    newWidth = height * curResolution[0] / curResolution[1];
  }

  newWidth = Math.max(newWidth, 160);
  newHeight = Math.max(newHeight, 120);
  return {
    width: newWidth,
    height: newHeight,
  };
}

export default {
  generateVideoProfile,
  calculateVideoSize,
};
