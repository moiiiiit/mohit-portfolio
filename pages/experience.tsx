import Layout from "@/components/layout";
import React from "react";
import { getCollection } from '@/firebase/firestore';
import Image from 'next/image'
import { motion } from "framer-motion"

export default class Experience extends React.Component {
    state = {
        workExperience: [],
        projectExperience: [],
        loading: true,
        railDimensions: {
            height: 38,
            width: 553
        }
    }
    constructor(props: any) {
        super(props);
    }

    componentDidMount(): void {
        this.setState({ loading: true });
        const fetchData = async () => {
            const workExperienceCollection = (await getCollection("work_experience")).result;
            this.state.workExperience = [];
            workExperienceCollection.forEach((doc: { data: any }) => {
                this.state.workExperience.push(doc.data() as never)
            });
            const projectExperienceCollection = (await getCollection("project_experience")).result;
            this.state.projectExperience = [];
            projectExperienceCollection.forEach((doc: { data: any }) => {
                this.state.projectExperience.push(doc.data() as never)
            });
            await new Promise(resolve => setTimeout(resolve, 800));
            this.setState({ loading: false });
        }
        fetchData();
    }
    
    render() {
        return (
            <Layout loading={this.state.loading}>
                <div className="mx-6">
                    <h2 className="text-3xl font-mono mt-10">Work Experience</h2>

                    <div className="mx-auto overflow-hidden max-w-6xl w-full border-t border-slate-200 mt-2 pt-6 sm:mt-4 sm:pt-10 items-center justify-center">
                        {/* Rovr animation */}
                        <Image src="/Rail.png" alt="rail" height={38} width={553}
                            className="z-10 mt-6"
                        >
                        </Image>
                        <motion.div initial={{ x: 0 }} animate={{ x: (553 - 150 - 5) }} transition={{
                            duration: 6,
                            repeat: Infinity,
                            repeatType: 'reverse',
                            ease: 'linear',
                            type: 'tween'
                        }}>
                            <Image src="/ROVR.png" alt="drone" height={34} width={150}
                                className="z-20 relative" style={{ bottom: '34px', left: '5px' }}
                            ></Image>
                        </motion.div>
                    </div>

                    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-x-8 gap-y-16 mb-10 lg:grid-cols-2">
                        {this.state.workExperience.map((experience, index) => (
                            <article key={index} style={{ breakInside: 'avoid' }} className="flex max-w-xl flex-col items-start justify-between h-min">
                                <div className="flex items-center gap-x-4 text-xs">
                                    <p className="text-slate-50">
                                        {experience['company']}
                                    </p>
                                    <p
                                        className="relative z-10 rounded-full bg-slate-100 px-3 py-1.5 font-medium text-slate-800 hover:bg-slate-300"
                                    >
                                        {experience['team']}
                                    </p>
                                </div>
                                <div className="group srelative">
                                    <h3 className="mt-3 text-lg font-semibold leading-6 text-slate-50">
                                        <p>
                                            {experience['title']}
                                        </p>
                                    </h3>
                                    {experience['bullet1'] != undefined && (
                                        <p className="mt-5 line-clamp-3 text-sm leading-6 text-slate-400">--&gt; {experience['bullet1']}</p>
                                    )}
                                    {experience['bullet2'] != undefined && (
                                        <p className="mt-5 line-clamp-3 text-sm leading-6 text-slate-400">--&gt; {experience['bullet2']}</p>
                                    )}
                                    {experience['bullet3'] != undefined && (
                                        <p className="mt-5 line-clamp-3 text-sm leading-6 text-slate-400">--&gt; {experience['bullet3']}</p>
                                    )}
                                    {experience['bullet4'] != undefined && (
                                        <p className="mt-5 line-clamp-3 text-sm leading-6 text-slate-400">--&gt; {experience['bullet4']}</p>
                                    )}
                                    {experience['bullet5'] != undefined && (
                                        <p className="mt-5 line-clamp-3 text-sm leading-6 text-slate-400">--&gt; {experience['bullet5']}</p>
                                    )}
                                </div>
                            </article>
                        ))}
                    </div>

                    {this.state.projectExperience.length > 0 && (
                        <><h2 className="text-3xl font-mono mt-10">Project Experience</h2><div className="mx-auto grid max-w-6xl grid-cols-1 gap-x-8 gap-y-16 mb-10 border-t border-slate-200 mt-2 pt-6 sm:mt-4 sm:pt-10 lg:mx-0 lg:grid-cols-2">
                            {this.state.projectExperience.map((experience, index) => (
                                <article key={index} style={{ breakInside: 'avoid' }} className="flex max-w-xl flex-col items-start justify-between h-min">
                                    <div
                                        className="w-full h-fit border-2 rounded-md border-white my-4 flex items-center justify-center"
                                        style={{ height: "320px" }}
                                    >
                                        <video autoPlay muted playsInline loop
                                            src={experience['videoUrl']}
                                            style={{ height: "300px" }}
                                        />
                                    </div>

                                    <div className="flex items-center gap-x-4 text-xs">
                                        <p className="text-slate-50">
                                            {experience['company']}
                                        </p>
                                        <p
                                            className="relative z-10 rounded-full bg-slate-100 px-3 py-1.5 font-medium text-slate-800 hover:bg-slate-300"
                                        >
                                            {experience['heading']}
                                        </p>
                                    </div>
                                    <div className="group srelative">
                                        <h3 className="mt-3 text-lg font-semibold leading-6 text-slate-50">
                                            {experience['title']} {experience['link'] && <a href={experience['link']} style={{ color: "rgb(29 78 216)" }} target="_blank">[Link]</a>}
                                        </h3>
                                        {experience['bullet1'] != undefined && (
                                            <p className="mt-5 line-clamp-3 text-sm leading-6 text-slate-400">--&gt; {experience['bullet1']}</p>
                                        )}
                                        {experience['bullet2'] != undefined && (
                                            <p className="mt-5 line-clamp-3 text-sm leading-6 text-slate-400">--&gt; {experience['bullet2']}</p>
                                        )}
                                    </div>
                                </article>
                            ))}
                        </div></>)
                    }
                </div>
            </Layout>
        )
    }
}