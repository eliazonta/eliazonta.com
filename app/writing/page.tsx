import { Card, CardContent } from "../../components/ui/card";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";

export default function Blog() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white font-['Anonymous_Pro',_sans-serif]">
      <Header />

      <main className="flex flex-grow items-center justify-center">
        <Card className="bg-black border-black mb-8">
          <h1 className="text-3xl font-bold mb-4 text-white text-center">
            I moved my bla bla to{" "}
            <a
              className="text-[#FF6719] underline"
              href="https://substack.com/@eliazonta?"
              target="_blank"
            >
              Substack
            </a>
          </h1>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
