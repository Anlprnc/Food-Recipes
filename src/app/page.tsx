import Cards from "@/components/Cards";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="bg-[url('/background.jpg')] bg-cover bg-center min-h-screen">
      <Navbar />
      <Hero />
      <Cards />
    </div>
  );
}
