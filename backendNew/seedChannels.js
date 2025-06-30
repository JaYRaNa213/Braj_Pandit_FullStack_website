import mongoose from "mongoose";
import dotenv from "dotenv";
import Channel from "./models/Channel.js";

dotenv.config();

// ✅ 30 Channel IDs
const ids = [
  "UC4R8DWoMoI7CAwX8_LjQHig",
  "UCAA6IsLVfbHrP1I_lzxv09Q",
  "UChMnnF7UolzyVhnIgmBZBUA",
  "UCgGK7lAcF-dpMjA_OO7FGzA",
  "UCrE4rRgtnyWg1rxGaP7yVhQ",
  "UCFA-gDtL7dI6HcJG59kALyg",
  "UCUxco3YDT6lwougoLKzmsLQ",
  "UC-h-rg7llUccXWHr2QlGrcg",
  "UCyXzDCrcUCPkPqsRZk_UUgA",
  "UCwZOGDj9L2HjHBO5sDFkSXA",
  "UCbbPKvdOncdcmQ40U8shInQ",
  "UCzr6Q5v4dVx5pBtb3pdaT0g",
  "UCdqR8L5y0OH8ZXX6McxSv4Q",
  "UCkNKN-kEHeDMMfejPbcNcbg",
  "UCgE3exSfiML2AKOaU7UEPmw",
  "UC_zdYvBbyFqCMzJr5Y8DRAw",
  "UCGINuJJ4-X7y7UMzDnRU59Q",
  "UCZDKMpbET1erMPCj_GnMNXQ",
  "UCezBQBRyiYA1YqMIVG2IgNg",
  "UC0-FR1s4Ew2vPtd-3V0DjNg",
  "UCgr6vY6DL8B2_7ULeFqkHrw",
  "UCYV7e6v3twPRMRYCP-x8r4w",
  "UCfi3fxE-C-n0P7aJmGcmKiw",
  "UC5SyRZWE0NGB9snBQp6HZyQ",
  "UC19upbg9DzJ_BQvGVGjU1ag",
  "UC74Xz0s_PoSnOZ4A5eRmvnw",
  "UC1ciNc9zZ93XYM-tPhFLS8g",
  "UCbmYgaRo30dR-KsVh9m9_NA",
  "UCmj7MDRYVb7Ig8RpzkPbY6Q",
  "UCeNvGRFtOV1uK3WX1uRlxUQ",
  "UCYaBdB1ybvE5J4r8HTAX7Ag",
];

try {
  await mongoose.connect(process.env.MONGODB_URI);
  await Channel.deleteMany(); // Optional: clear previous data
  await Channel.insertMany(ids.map(id => ({ channelId: id })));
  console.log("✅ Successfully inserted 30 channel IDs");
  process.exit();
} catch (err) {
  console.error("❌ Error seeding:", err.message);
  process.exit(1);
}
