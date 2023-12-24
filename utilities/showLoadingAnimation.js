// Function to display loading animation.
const showLoadingAnimation = (loadingAnimation, loadingAnimationIndex) => {
  process.stdout.write(`\r${loadingAnimation[loadingAnimationIndex]} Loading`);
  return (loadingAnimationIndex + 1) % loadingAnimation.length;
};

module.exports = { showLoadingAnimation };
