import Layout from "@/components/layout";
import { getDocument } from '@/firebase/firestore';
import { ArrowDownOnSquareIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from 'react';

export default function Resume() {
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    } as Record<string, number | undefined>);
    const [resumeUrl, setResumeUrl] = useState("")
    const [loading, setLoading] = useState(true)
    const handleWindowResize = () => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    useEffect(() => {
        setLoading(true);
        handleWindowResize();
        const fetchData = async () => {
            setResumeUrl((await getDocument("resume", "1")).result?.data()?.url);
            await new Promise(resolve => setTimeout(resolve, 1000));
            setLoading(false);
        };
        fetchData();
        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);



    return (
        <Layout loading={loading}>
            <span className="flex flex-row">
                <h2 className="text-3xl font-mono">Resume</h2>
                <a href={resumeUrl.replace('embed','download')}>
                    <ArrowDownOnSquareIcon color="rgb(29 78 216)" className="h-8 w-8 ml-2 mb-1" aria-hidden="true" />
                </a>
            </span>

            <iframe
                className="mt-6 border-t border-slate-200"
                style={{ height: (windowSize.width ?? 769) >= 768 ? 'calc(100vh - 231px)' : 'calc(100vh - 159px)' }}
                src={resumeUrl}
                width="100%"
                height="100%">

            </iframe>


        </Layout>
    )
}