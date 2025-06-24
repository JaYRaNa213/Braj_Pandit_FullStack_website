// import React, { useEffect, useState } from "react";
// import axiosInstance from "../../../services/axios";

// const LiveBhajanSection = () => {
//   const [liveVideos, setLiveVideos] = useState([]);

//   useEffect(() => {
//     const fetchLive = async () => {
//       try {
//         const res = await axiosInstance.get("/user/live-bhajans");
//         setLiveVideos(res.data);
//       } catch (err) {
//         console.error("Error fetching live bhajans:", err);
//       }
//     };

//     fetchLive();
//     const interval = setInterval(fetchLive, 60000); // Auto-refresh every 60 sec
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <section className="py-16 bg-gradient-to-b from-white via-red-50 to-white" style={{ backgroundImage: "url('/images/bg-bhajan.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
//       <div className="container mx-auto px-4 text-center">
//         <h2 className="text-4xl font-bold text-red-600 mb-12">Live Bhajan & Kirtan</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {liveVideos.length === 0 ? (
//             <p className="col-span-3 text-lg text-gray-600">No live bhajan currently. Please check back later.</p>
//           ) : liveVideos.map((item, i) => (
//             <div key={i} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition overflow-hidden">
//               <iframe
//                 src={`https://www.youtube.com/embed/${item.videoId}?autoplay=0`}
//                 className="w-full h-56"
//                 allow="autoplay; encrypted-media"
//                 allowFullScreen
//                 title={item.title}
//               />
//               <div className="p-4 text-left">
//                 <h3 className="text-xl font-semibold text-[#4A1C1C]">{item.title}</h3>
//                 <p className="text-sm text-gray-600">{item.channelTitle}</p>
//                 <p className="mt-2 text-sm text-gray-700">{item.description.slice(0, 100)}...</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default LiveBhajanSection;








import React, { useEffect, useState } from "react";
import axiosInstance from "../../../services/axios";

const LiveBhajanSection = () => {
  const [liveVideos, setLiveVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLive = async () => {
      try {
        const res = await axiosInstance.get("/user/live-bhajans");
        setLiveVideos(res.data);
      } catch (err) {
        console.error("Error fetching live bhajans:", err);
        setLiveVideos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLive();
    const interval = setInterval(fetchLive, 5 * 60 * 1000); // ✅ Every 5 minutes

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="py-16 bg-gradient-to-b from-white via-red-50 to-white"
      style={{
        backgroundImage: "url('/images/bg-bhajan.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-red-600 mb-12">
          Live Bhajan & Kirtan
        </h2>

        {loading ? (
          <p className="text-lg text-gray-600">Loading bhajans...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {liveVideos.length === 0 ? (
              <p className="col-span-3 text-gray-500 text-center">
                No bhajans available at this moment.
              </p>
            ) : (
              liveVideos.map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition overflow-hidden"
                >
                  <iframe
                    src={`https://www.youtube.com/embed/${item.videoId}?autoplay=0`}
                    className="w-full h-56"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    title={item.title}
                  />
                  <div className="p-4 text-left">
                    <h3 className="text-xl font-semibold text-[#4A1C1C]">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {item.channelTitle}{" "}
                      {!item.isFallback ? (
                        <span className="text-red-500 font-semibold"> 🔴 LIVE</span>
                      ) : (
                        <span className="text-gray-500 text-xs">(Recorded)</span>
                      )}
                    </p>
                    <p className="mt-2 text-sm text-gray-700">
                      {item.description?.slice(0, 100)}...
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default LiveBhajanSection;
