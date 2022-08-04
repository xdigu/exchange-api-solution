const STATUS_CODE = {
  SUCESS: 200,
  BAD_REQUEST: 400,
  UNPROCESSABLE_ENTITY: 422,
  ERROR: 500,
};

const timeOutMin = 10;

const timeOutMax = 3000;

function randomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

function sleep(time: number) {
  return new Promise((resolve) => setTimeout(() => resolve(null), time));
}

function controllerTimeout() {
  return sleep(randomNumber(timeOutMin, timeOutMax));
}

export { controllerTimeout, randomNumber, sleep, STATUS_CODE };
