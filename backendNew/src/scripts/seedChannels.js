// =====================================
// 🔐 Seed 30 Live Bhajan Channel IDs
// Run: node scripts/seedChannels.js
// =====================================

import mongoose from "mongoose";
import dotenv from "dotenv";
import Channel from "../models/Channel.js";

dotenv.config();
await mongoose.connect(process.env.MONGO_URI);

const ids = [
  { channelId: "UC4R8DWoMoI7CAwX8_LjQHig", title: "ISKCON Vrindavan", defaultVideo: "sq-1yTTP5xM", image: "https://res.cloudinary.com/djtq2eywl/image/upload/v1750851970/radha-raman-ji-murthi_gzfglc.jpg", description: "Radha Raman Ji Live Bhajan" },
  { channelId: "UCAA6IsLVfbHrP1I_lzxv09Q", title: "Desire Tree", defaultVideo: "4y1LZQsyuSQ", image: "https://res.cloudinary.com/djtq2eywl/image/upload/v1750852044/Premanand-Ji-Maharaj_yb93dt.jpg", description: "Premanand Ji Maharaj" },
  { channelId: "UChMnnF7UolzyVhnIgmBZBUA", title: "Bhakti Sadhana", defaultVideo: "C-lEOBuR8Wg", image: "https://res.cloudinary.com/djtq2eywl/image/upload/v1750852100/bhakti_sadhana.jpg", description: "Morning Sadhana Bhajan" },
  { channelId: "UCgGK7lAcF-dpMjA_OO7FGzA", title: "Vrindavan TV", defaultVideo: "1a2b3c4d5e", image: "https://res.cloudinary.com/djtq2eywl/image/upload/v1750852123/vrindavan_tv.jpg", description: "Live Kirtan from Vrindavan" },
  { channelId: "UCrE4rRgtnyWg1rxGaP7yVhQ", title: "Vrinda Channel", defaultVideo: "8IhzG0_4zMw", image: "https://res.cloudinary.com/djtq2eywl/image/upload/v1750852055/anirudh_rxh0fi.jpg", description: "Evening Aarti Live" },
  { channelId: "UCFA-gDtL7dI6HcJG59kALyg", title: "Bhaktivedanta Live", defaultVideo: "GQ7aZuEuI84", image: "https://res.cloudinary.com/djtq2eywl/image/upload/v1750852080/bhaktivedanta.jpg", description: "Shree Krishna Bhajan" },
  { channelId: "UCUxco3YDT6lwougoLKzmsLQ", title: "Shiv Shakti Films", defaultVideo: "ShivaAbhi234", image: "https://res.cloudinary.com/djtq2eywl/image/upload/v1750852150/shiv_shakti.jpg", description: "Shiv Bhakti Darshan" },
  { channelId: "UC-h-rg7llUccXWHr2QlGrcg", title: "Kedarnath Dham", defaultVideo: "kedarnath12", image: "https://res.cloudinary.com/djtq2eywl/image/upload/v1750852170/kedarnath_darshan.jpg", description: "Live Kedarnath Darshan" },
  { channelId: "UCyXzDCrcUCPkPqsRZk_UUgA", title: "Bhole Baba Live", defaultVideo: "bholeLive123", image: "https://res.cloudinary.com/djtq2eywl/image/upload/v1750852180/bhole_baba.jpg", description: "Bhole Baba Darshan" },
  { channelId: "UCwZOGDj9L2HjHBO5sDFkSXA", title: "Hanuman Bhakti Sagar", defaultVideo: "hanumanLive456", image: "https://res.cloudinary.com/djtq2eywl/image/upload/v1750852200/hanuman_bhakti.jpg", description: "Hanuman Bhajan" },
  { channelId: "UCbbPKvdOncdcmQ40U8shInQ", title: "Bihari Ji Maharaj", defaultVideo: "bihari001", image: "https://res.cloudinary.com/djtq2eywl/image/upload/v1750852220/bihari_maharaj.jpg", description: "Live from Vrindavan" },
  { channelId: "UCzr6Q5v4dVx5pBtb3pdaT0g", title: "Shri Banke Bihari Mandir", defaultVideo: "banke123", image: "https://res.cloudinary.com/djtq2eywl/image/upload/v1750852240/banke_bihari.jpg", description: "Banke Bihari Darshan" },
  { channelId: "UCdqR8L5y0OH8ZXX6McxSv4Q", title: "Kedarnath Mandir Official", defaultVideo: "kedarOfficial", image: "https://res.cloudinary.com/djtq2eywl/image/upload/v1750852260/kedar_official.jpg", description: "Live Kedarnath Bhajan" },
  { channelId: "UCkNKN-kEHeDMMfejPbcNcbg", title: "Shree Krishna Bhakti", defaultVideo: "krishna789", image: "https://res.cloudinary.com/djtq2eywl/image/upload/v1750852280/krishna_bhakti.jpg", description: "Bhagavad Bhajan" },
  { channelId: "UCgE3exSfiML2AKOaU7UEPmw", title: "Anand Vrindavan Dham", defaultVideo: "vrind123", image: "https://res.cloudinary.com/djtq2eywl/image/upload/v1750852300/anand_vrindavan.jpg", description: "Morning Bhajan" },
  { channelId: "UC_zdYvBbyFqCMzJr5Y8DRAw", title: "Jai Shri Radhe", defaultVideo: "radhe101", image: "https://res.cloudinary.com/djtq2eywl/image/upload/v1750852320/jai_radhe.jpg", description: "Radha Krishna Bhajan" },
  { channelId: "UCGINuJJ4-X7y7UMzDnRU59Q", title: "Hari Bhakti", defaultVideo: "hariLive", image: "https://res.cloudinary.com/djtq2eywl/image/upload/v1750852340/hari_bhakti.jpg", description: "Bhajan from Hari Bhakti" },
  { channelId: "UCZDKMpbET1erMPCj_GnMNXQ", title: "Gauranga Das", defaultVideo: "gaurangaLive", image: "https://res.cloudinary.com/djtq2eywl/image/upload/v1750852360/gauranga.jpg", description: "Spiritual Discourse" },
  { channelId: "UCezBQBRyiYA1YqMIVG2IgNg", title: "Rudra Abhishek Live", defaultVideo: "rudraAbhi", image: "https://res.cloudinary.com/djtq2eywl/image/upload/v1750852380/rudra_abhishek.jpg", description: "Rudra Abhishek" },
  { channelId: "UC0-FR1s4Ew2vPtd-3V0DjNg", title: "Vishnu Sahasranamam", defaultVideo: "vishnuLive", image: "https://res.cloudinary.com/djtq2eywl/image/upload/v1750852400/vishnu.jpg", description: "Sahasranamam Chanting" },
  { channelId: "UCgr6vY6DL8B2_7ULeFqkHrw", title: "Shri Krishna Leela", defaultVideo: "krishnaLeela", image: "https://res.cloudinary.com/djtq2eywl/image/upload/v1750852420/krishna_leela.jpg", description: "Krishna Leela Bhajan" },
  { channelId: "UCYV7e6v3twPRMRYCP-x8r4w", title: "Bhole Baba Bhakt", defaultVideo: "bholeBhakt", image: "https://res.cloudinary.com/djtq2eywl/image/upload/v1750852440/bhole_bhakt.jpg", description: "Shiv Bhajan" },
  { channelId: "UCfi3fxE-C-n0P7aJmGcmKiw", title: "Mahadev Bhakti Ras", defaultVideo: "mahadevLive", image: "https://res.cloudinary.com/djtq2eywl/image/upload/v1750852460/mahadev_ras.jpg", description: "Mahadev Live Kirtan" },
  { channelId: "UC5SyRZWE0NGB9snBQp6HZyQ", title: "Ram Bhajan Mandli", defaultVideo: "ramMandli", image: "https://res.cloudinary.com/djtq2eywl/image/upload/v1750852480/ram_bhajan.jpg", description: "Ram Bhajan" },
  { channelId: "UC19upbg9DzJ_BQvGVGjU1ag", title: "Badrinath Kedarnath", defaultVideo: "badrikedar", image: "https://res.cloudinary.com/djtq2eywl/image/upload/v1750852500/badrinath.jpg", description: "Live Darshan" },
  { channelId: "UC74Xz0s_PoSnOZ4A5eRmvnw", title: "Hanuman Chalisa TV", defaultVideo: "hanumanChalisa", image: "https://res.cloudinary.com/djtq2eywl/image/upload/v1750852520/hanuman_chalisa.jpg", description: "Chalisa Bhakti" },
  { channelId: "UC1ciNc9zZ93XYM-tPhFLS8g", title: "Vaishno Devi Bhakti", defaultVideo: "vaishnoLive", image: "https://res.cloudinary.com/djtq2eywl/image/upload/v1750852540/vaishno_devi.jpg", description: "Vaishno Devi Darshan" },
  { channelId: "UCbmYgaRo30dR-KsVh9m9_NA", title: "Gopi Bhakti Dham", defaultVideo: "gopiBhakti", image: "https://res.cloudinary.com/djtq2eywl/image/upload/v1750852560/gopi_bhakti.jpg", description: "Live Bhajan Darshan" },
  { channelId: "UCmj7MDRYVb7Ig8RpzkPbY6Q", title: "Vrindavan Mahima", defaultVideo: "vrindaMahima", image: "https://res.cloudinary.com/djtq2eywl/image/upload/v1750852580/vrindavan_mahima.jpg", description: "Mahima Kirtan" },
  { channelId: "UCeNvGRFtOV1uK3WX1uRlxUQ", title: "Shree Radha Rani Mandir", defaultVideo: "radhaMandir", image: "https://res.cloudinary.com/djtq2eywl/image/upload/v1750852600/radha_rani.jpg", description: "Radha Rani Bhajan" },
  { channelId: "UCYaBdB1ybvE5J4r8HTAX7Ag", title: "Divya Bhakti Bhajan", defaultVideo: "divyaBhajan", image: "https://res.cloudinary.com/djtq2eywl/image/upload/v1750852620/divya_bhakti.jpg", description: "Divine Bhajan Channel" },
];

await Channel.insertMany(ids);
console.log("✅ Inserted", ids.length, "channel IDs");
process.exit();
