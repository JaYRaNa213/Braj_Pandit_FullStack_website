import ThemeToggle from "../components/ThemeToggle"; // ✅

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="min-h-[80vh]">{children}</main>
      <Footer />
      {/* <ThemeToggle /> */}
    </>
  );
};
