import Navbar from "../components/Navbar";
import Posts from "../components/Posts";
import Footer from "../components/Footer";
export default function Home() {
  return (
    <main className="bg-white overflow-hidden w-full min-h-screen flex flex-col">
      <Posts />
    </main>
  );
}
