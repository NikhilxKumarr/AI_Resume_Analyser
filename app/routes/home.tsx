import type { Route } from "./+types/home";
import Navbar from "~/Components/Navbar";
import ScoreCircle from "~/Components/ScoreCircle";
import { type JSX, useEffect } from "react";
import { usePuterStore } from "~/lib/puter";
import { useNavigate } from "react-router";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "CVision" },
        { name: "description", content: "Smart Feedback for your dream job" },
    ];
}

export default function Home() {
    const { auth } = usePuterStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth.isAuthenticated) {
            navigate("/auth?next=/");
        }
    }, [auth.isAuthenticated]);

    const resumeImages = [
        { src: "/images/resume_01.png", company: "Google", job: "Software Engineer", score: 85 },
        { src: "/images/resume_02.png", company: "Amazon", job: "Backend Developer", score: 70 },
        { src: "/images/resume_03.png", company: "Microsoft", job: "ML Engineer", score: 92 },
        { src: "/images/resume_01.png", company: "Goldman Sachs", job: "Software Engineer", score: 78 },
        { src: "/images/resume_02.png", company: "De Shaw", job: "Backend Developer", score: 97 },
        { src: "/images/resume_03.png", company: "Texas Instrumentation", job: "ML Engineer", score: 91 },
    ];

    return (
        <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen">
            <Navbar />

            <section className="main-section pb-20">
                <div className="page-heading text-center py-4">
                    <h1 className="text-2xl font-semibold">
                        Track Your Applications & Resume Ratings
                    </h1>
                    <h2 className="text-sm text-gray-600">
                        Review your submissions and AI-powered feedback
                    </h2>
                </div>

                <div className="resumes-section flex justify-center items-center gap-6 flex-wrap px-4">
                    {resumeImages.map((resume, index) => (
                        <div
                            key={index}
                            className="resume-card bg-white shadow-lg p-4 rounded-lg max-w-sm"
                        >
                            {/* Company name and ScoreCircle */}
                            <div className="flex justify-between items-start gap-4 mb-1">
                                <div className="flex flex-col flex-grow min-w-0 leading-snug">
                                    <h2 className="text-lg font-semibold break-words">{resume.company}</h2>
                                    <p className="text-sm text-gray-500 break-words">{resume.job}</p>
                                </div>
                                <div className="flex-shrink-0">
                                    <ScoreCircle score={resume.score} />
                                </div>
                            </div>



                            {/* Resume Image */}
                            <img
                                src={resume.src}
                                alt={`Resume ${index + 1}`}
                                className="w-full h-[380px] object-cover object-top rounded"
                            />
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
