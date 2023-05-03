import Layout from "@/components/layout";
import React from "react";
import { getCollection } from '@/firebase/firestore';

export default class Experience extends React.Component {
    state = {
        workExperience: []
    }
    constructor(props: any) {
        super(props);
        const fetchData = async () => {
            const workExperienceCollection = (await getCollection("work_experience")).result;
            workExperienceCollection.forEach((doc: { data: any }) => {
                this.state.workExperience.push(doc.data() as never)
            });
            this.setState({});
        }
        fetchData();
    }
    render() {
        return (
            <Layout>
                <h2 className="text-3xl font-mono mt-10">Work Experience</h2>

                <div className="mx-auto grid max-w-6xl grid-cols-1 gap-x-8 gap-y-16 border-t border-slate-200 mt-2 pt-6 sm:mt-4 sm:pt-10 lg:mx-0 lg:grid-cols-2">
                    {this.state.workExperience.map((experience, index) => (
                        <article key={index} style={{breakInside: 'avoid'}} className="flex max-w-xl flex-col items-start justify-between h-min">
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
            </Layout>
        )
    }
}