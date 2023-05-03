import Layout from "@/components/layout";
import Image from 'next/image'
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

export default function Life() {
    return (
        <Layout loading={false}>
            <h1 className="text-3xl font-bold font-mono antialiased tracking-wider underline underline-offset-8 decoration-1 mb-6">Life</h1>
            <div style={{height: '60vh'}} className="w-full items-center justify-center flex flex-col">
                <div className="flex justify-center items-center bg-black">
                    <Image
                        src="/MBLogo.png"
                        alt="Mohit Bhole"
                        width="80"
                        height="80" />
                    <ClimbingBoxLoader
                        color='#ffffff'
                        aria-label='Loading Spinner'>
                    </ClimbingBoxLoader>
                </div>
                <h2>Page still in production...</h2>
            </div>
            <div className="mb-10"></div>
        </Layout>
    )
}