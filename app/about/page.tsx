import { Card, CardContent } from "../../components/ui/card";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";

export default function About() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white font-['Anonymous_Pro',_sans-serif]">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-12">
        <Card className="border-black hover:bg-[#141414] hover:border-white hover:shadow-xl transition-all">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-white">ABOUT ELIA</h2>
            <p className="text-gray-300 mb-4">
              {"I'm a math kid with a background in computer science."}
            </p>
            <ul className="list-disc list-inside text-gray-300 mb-4">
              <li>
                I got to work and study in top institutions around the world,
              </li>
              <li>
                I&apos;m focused on working on interesting problems at the
                intersection of mathematics, computer science, and finance.
              </li>
            </ul>
            <p className="text-gray-300">
              I love meeting interesting individuals working on interesting
              problems.
            </p>
            <p className="text-gray-300">
              contact me at:{" "}
              <a href="mailto:elia.zontaa@gmail.com" className="text-white">
                elia [dot] zontaa [at] gmail.com
              </a>
            </p>
          </CardContent>
        </Card>

        <div className="grid gap-8 md:grid-cols-2">
          <Card className="bg-black hover:bg-[#141414] border-black hover:border-white hover:shadow-xl transition-all">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 text-white">EXPERIENCE</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    Bosch Research
                  </h3>
                  <p className="text-gray-400">Research Engineer Intern</p>
                  <p className="text-gray-500">San Francisco (remote), USA</p>
                  <ul className="list-disc list-inside text-gray-300 mt-2">
                    <li>
                      Data preprocessing and feature engineering pipelines for
                      Graph Machine Learning on GPUs
                    </li>
                    <li>
                      Spatio-temporal graph neural networks (PyTorch + CUDA +
                      Bash)
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    Cornell University
                  </h3>
                  <p className="text-gray-400">Visiting Researcher</p>
                  <p className="text-gray-500">Ithaca, NY, USA</p>
                  <ul className="list-disc list-inside text-gray-300 mt-2">
                    <li>
                      Distributed Graph Algorithms on Multi-GPUs for
                      High-Performance Machine Learning (Prof. Giulia Guidi)
                    </li>
                    <li>
                      Analysis and benchmarking of large-scale graph algorithms
                      on Multi-GPU clusters
                    </li>
                    <li>
                      Contributions to novel graph routines (C/C++ + CUDA +
                      bash/SLURM/OpenPBS + Python)
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    Pirelli & C. S.p.A.
                  </h3>
                  <p className="text-gray-400">Data Scientist Intern</p>
                  <p className="text-gray-500">Milan, Italy</p>
                  <ul className="list-disc list-inside text-gray-300 mt-2">
                    <li>High-dimensional data preprocessing pipelines</li>
                    <li>Outliers classifier development and deployment</li>
                    <li>
                      Pipeline automation and monitoring (Python + Airflow)
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    Forschungszentrum Jülich
                  </h3>
                  <p className="text-gray-400">Research Intern</p>
                  <p className="text-gray-500">Jülich, Germany</p>
                  <ul className="list-disc list-inside text-gray-300 mt-2">
                    <li>
                      Data-driven & data-free (Physics informed) Graph Neural
                      Networks
                    </li>
                    <li>
                      Graph Convolution Networks for CFD simulations (OpenFOAM)
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    Fondazione Bruno Kessler
                  </h3>
                  <p className="text-gray-400">Research Intern</p>
                  <p className="text-gray-500">Trento, Italy</p>
                  <ul className="list-disc list-inside text-gray-300 mt-2">
                    <li>EdgeAI inference</li>
                    <li>TinyML models deployment on microcontrollers</li>
                    <li>
                      (Tiny) Graph Convolution Networks for object detection
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <Card className="border-black hover:bg-[#141414] hover:border-white hover:shadow-xl transition-all">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-white">
                  EDUCATION
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      Polytechnic University of Turin
                    </h3>
                    <p className="text-gray-400">
                      M.Eng. Applied Mathematics (Mathematical Engineering)
                    </p>
                    <p className="text-gray-500">Turin, Italy</p>
                    <ul className="list-disc list-inside text-gray-300 mt-2">
                      <li>Research Assistant</li>
                      <li>
                        Stochastic Processes, Computational Statistics,
                        Deterministic & Stochastic Optimization, ...
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      Cornell University - University of Trento
                    </h3>
                    <p className="text-gray-400">
                      B.Eng. Computer Science & Engineering
                    </p>
                    <p className="text-gray-500">Ithaca, NY - Trento, Italy</p>
                    <ul className="list-disc list-inside text-gray-300 mt-2">
                      <li>Tuition merit & Research Thesis scholarship</li>
                      <li>
                        Attended MSc/PhD level computer science and math courses
                        as a 1st & 2nd year undergraduate
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      E. Fermi Institute
                    </h3>
                    <p className="text-gray-400">High School</p>
                    <p className="text-gray-500">Bassano del Grappa, Italy</p>
                    <p className="text-gray-300 mt-2">
                      Graduated top of class with a focus on Math, Physics, and
                      Computer Science.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-black hover:bg-[#141414] hover:border-white hover:shadow-xl transition-all">
              <CardContent className="p-6 space-y-6">
                <h2 className="text-2xl font-bold text-white">Interests</h2>

                <ul className="space-y-4 text-gray-300">
                  <li className="flex gap-3">
                    <span className="text-gray-500">•</span>
                    <span>
                      Apart from chaotic systems and game theory, I like
                      running, swimming and applied gravity sports (I lift
                      weights).
                    </span>
                  </li>

                  <li className="flex gap-3">
                    <span className="text-gray-500">•</span>
                    <span>
                      Fluent in Italian, English, and{" "}
                      <span className="font-mono">python</span>.
                    </span>
                  </li>

                  <li className="flex gap-3">
                    <span className="text-gray-500">•</span>
                    <span>
                      Hablo español sin problema, je parle un peu de français,
                      und ich verstehe Deutsch nur wenn er nett ist.
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
