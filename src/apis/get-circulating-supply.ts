import { JoyApi } from "../apis/joyApi";

const api = new JoyApi();

const getCirculatingSupply = async () => {
  await api.init;

  const circulatingSupply = await api.calculateCirculatingSupply();

  return { circulatingSupply };
};

export default getCirculatingSupply;
