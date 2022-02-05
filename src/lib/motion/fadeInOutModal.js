export const fadeInOutModal = (duration = 0.3) => {
  return {
    from: {
      opacity: 0,

      transition: {
        type: "easeInOut",
        duration: duration,
      },
    },
    to: {
      opacity: 1,


      transition: {
        type: "easeInOut",
        duration: duration,
      },
    },
  };
};
