const typeClient = (money) => {
  if (money >= 0 && money < 5000000) return "Vãng Lai";
  if (money >= 5000000 && money < 10000000) return "Tiềm Năng";
  if (money >= 10000000 && money < 50000000) return "VIP";
  if (money >= 50000000) return "Đặc Biệt";
};
export default typeClient;
