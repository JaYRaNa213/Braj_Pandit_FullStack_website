// ✅ Final and Clean Backend Setup for Live Bhajan Management
// 🔐 Code by Jay Rana © 2025

// =====================================
// 1. models/Channel.js
// =====================================
import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
  channelId: { type: String, required: true, unique: true },
  title: String,
  description: String,
  defaultVideo: String,
  image: String,
});

const Channel = mongoose.model("Channel", channelSchema);
export default Channel;


// UC4R8DWoMoI7CAwX8_LjQHig  // ISKCON Vrindavan
// UCAA6IsLVfbHrP1I_lzxv09Q  // ISKCON Desire Tree
// UChMnnF7UolzyVhnIgmBZBUA  // Bhakti Sadhana
// UCgGK7lAcF-dpMjA_OO7FGzA  // Vrindavan TV
// UCrE4rRgtnyWg1rxGaP7yVhQ  // Vrinda Channel
// UCFA-gDtL7dI6HcJG59kALyg  // Bhaktivedanta Live
// UCUxco3YDT6lwougoLKzmsLQ  // Shiv Shakti Films
// UC-h-rg7llUccXWHr2QlGrcg  // Baba Kedarnath Dham
// UCyXzDCrcUCPkPqsRZk_UUgA  // Bhole Baba Live Darshan
// UCwZOGDj9L2HjHBO5sDFkSXA  // Hanuman Bhakti Sagar
// UCbbPKvdOncdcmQ40U8shInQ  // Bihari Ji Maharaj
// UCzr6Q5v4dVx5pBtb3pdaT0g  // Shri Banke Bihari Ji Mandir
// UCdqR8L5y0OH8ZXX6McxSv4Q  // Kedarnath Mandir Official
// UCkNKN-kEHeDMMfejPbcNcbg  // Shree Krishna Bhakti
// UCgE3exSfiML2AKOaU7UEPmw  // Anand Vrindavan Dham
// UC_zdYvBbyFqCMzJr5Y8DRAw  // Jai Shri Radhe
// UCGINuJJ4-X7y7UMzDnRU59Q  // Hari Bhakti
// UCZDKMpbET1erMPCj_GnMNXQ  // Gauranga Darshan Das
// UCezBQBRyiYA1YqMIVG2IgNg  // Rudra Abhishek Live
// UC0-FR1s4Ew2vPtd-3V0DjNg  // Vishnu Sahasranamam
// UCgr6vY6DL8B2_7ULeFqkHrw  // Shri Krishna Leela
// UCYV7e6v3twPRMRYCP-x8r4w  // Bhole Baba Bhakt
// UCfi3fxE-C-n0P7aJmGcmKiw  // Mahadev Bhakti Ras
// UC5SyRZWE0NGB9snBQp6HZyQ  // Ram Bhajan Mandli
// UC19upbg9DzJ_BQvGVGjU1ag  // Badrinath Kedarnath Mandir
// UC74Xz0s_PoSnOZ4A5eRmvnw  // Hanuman Chalisa TV
// UC1ciNc9zZ93XYM-tPhFLS8g  // Vaishno Devi Bhakti
// UCbmYgaRo30dR-KsVh9m9_NA  // Gopi Bhakti Dham
// UCmj7MDRYVb7Ig8RpzkPbY6Q  // Vrindavan Mahima
// UCeNvGRFtOV1uK3WX1uRlxUQ  // Shree Radha Rani Mandir
// UCYaBdB1ybvE5J4r8HTAX7Ag  // Divya Bhakti Bhajan
