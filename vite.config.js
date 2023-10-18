// @ts-check
import reactPlugin from "vite-plugin-react";

/**
 * @type { import('vite').UserConfig }
 */
const config = {
  jsx: "react",
  // plugins: [reactPlugin]  //lỗi này là lỗi plugins do không trùng khớp với phiên bản
};

export default config;
