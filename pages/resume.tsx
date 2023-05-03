import Layout from "@/components/layout";
import getDocument from "@/firebase/firestore";
import { useState, useEffect } from 'react';

export default function Resume() {
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    } as Record<string, number | undefined>);
    const [resumeUrl, setResumeUrl] = useState("")
    const handleWindowResize = () => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    useEffect(() => {
        handleWindowResize();
        const fetchData = async () => setResumeUrl((await getDocument("resume", "1")).result?.data()?.url);
        fetchData();
        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    return (
        <Layout>
            <h1 className="text-3xl font-bold font-mono bold antialiased tracking-wider underline underline-offset-8 decoration-1">Resume</h1>
            <iframe
                className="mt-6"
                style={{ height: (windowSize.width ?? 769) >= 768 ? 'calc(100vh - 231px)' : 'calc(100vh - 159px)' }}
                src={resumeUrl}
                width="100%"
                height="100%">

            </iframe>
        </Layout>
    )
}