// pages/index.js
import Image from 'next/image'
import Layout from "@/components/layout";
import { getDocument, getCollection, getFile } from '@/firebase/firestore';
import React from 'react';

export default class Home extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    title: '',
    description_1: '',
    description_2: '',
    github: '',
    devpost: '',
    linkedin: '',
    whatsapp: '',
    githubUrl: "https://github.com/",
    devpostUrl: "https://devpost.com/",
    linkedinUrl: "https://www.linkedin.com/in/",
    whatsappUrl: "",
    profilepic: "",
    education: [],
    profilepicsrc: "",
    loading: true,
  };

  constructor(props: any) {
    super(props);
  }

  componentDidMount(): void {
    this.setState({ loading: true });
    const fetchData = async () => {
      try {
        const image = await getFile('profile_home.png');
        if (image) {
          this.state.profilepicsrc = image.result;
        }
      } catch (e) {

      }

      const educationCollection = (await getCollection("education")).result;
      this.state.education = [];
      educationCollection.forEach((doc: { data: any }) => { this.state.education.push(doc.data() as never) })
      const data = (await getDocument("profile", "1")).result?.data();
      this.setState({
        firstName: data?.firstname,
        lastName: data?.lastname,
        title: data?.title,
        description_1: data?.description_1,
        description_2: data?.description_2,
        github: data?.github,
        devpost: data?.devpost,
        linkedin: data?.linkedin,
        whatsapp: data?.whatsapp,
        githubUrl: "https://github.com/" + data?.github,
        devpostUrl: "https://devpost.com/" + data?.devpost,
        linkedinUrl: "https://www.linkedin.com/in/" + data?.linkedin,
        whatsappUrl: "tel:+1" + data?.whatsapp,
        profilepic: data?.profilepic,
      });
    };
    fetchData();
  }

  render() {
    return (
      <Layout loading={this.state.loading}>
        < div className="flex flex-col md:flex-row gap-10 md:gap-0 justify-between w-full h-full items-center my-10" >
          <div className="flex flex-col gap-2 max-w-full md:max-w-lg lg:max-w-2xl self-start mx-6 md:mx-0">
            <div className="flex flex-row items-center justify-between mb-6">
              <div className="mr-6">
                <h2 className="text-3xl font-mono mb-10">Namaste 🙏, <span style={{ whiteSpace: 'nowrap' }}>I{"'"}m <u className="underline-offset-4">{this.state.firstName}</u></span>
                </h2>
                <h3 className="text-xl mt-4">{this.state.title}</h3>
              </div>
              {this.state.profilepicsrc ?
                <Image src={this.state.profilepicsrc} alt="Profile Picture" height={180} width={180} onLoad={() => this.setState({ loading: false })}></Image> : <></>}
              {(!this.state.profilepicsrc && this.state.profilepic) ?
                <Image src={this.state.profilepic} alt="Profile Picture" height={180} width={180} onLoad={() => this.setState({ loading: false })}></Image> : <></>}
            </div>

            <p className="text-sm">--&gt; {this.state.description_1}</p>
            <p className="text-sm">--&gt; {this.state.description_2}</p>
            <p className="text-sm">--&gt; This website is made with Next.js + Tailwind and uses Firebase for deployment and data storage. <a style={{ color: "rgb(29 78 216)" }} href="https://github.com/moiiiiit/mohit-portfolio" target="_blank">[Github Link]</a></p>
          </div>
          <div className='flex flex-col gap-2 w-fit md:w-fit md:max-w-md self-center mx-6 md:mx-0'>
            <h2 className="text-xl font-mono mb-2 text-center md:text-left">Contact</h2>
            <div className="flex flex-row gap-16 items-center justify-between text-sm">
              <Image src="/github.png" alt="Github" width="24" height="24" style={{ borderRadius: '100px', overflow: 'hidden' }} />
              <a href={this.state.githubUrl} target="_blank">{this.state.github}</a>
            </div>
            <div className="flex flex-row gap-16 items-center justify-between text-sm">
              <Image src="/linkedin.png" alt="LinkedIn" width="24" height="24" />
              <a href={this.state.linkedinUrl} target="_blank">{this.state.linkedin}</a>
            </div>
            <div className="flex flex-row gap-16 items-center justify-between text-sm">
              <Image src="/devpost.png" alt="DevPost" width="24" height="24" />
              <a href={this.state.devpostUrl} target="_blank">{this.state.devpost}</a>
            </div>
            <div className="flex flex-row gap-16 items-center justify-between text-sm">
              <Image src="/whatsapp.avif" alt="Whatsapp" width="24" height="24" />
              <a href={this.state.whatsappUrl} target="_blank">{this.state.whatsapp}</a>
            </div>
          </div>
        </div >
        <div className='w-full mb-10 px-6 md:px-0'>
          <h2 className="text-3xl font-mono mt-10">Academic Background</h2>

          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-x-8 gap-y-16 border-t border-slate-200 mt-2 pt-6 sm:mt-4 sm:pt-10 lg:mx-0 lg:grid-cols-2">
            {this.state.education.map((education, index) => (
              <article key={index} className="flex max-w-xl flex-col items-start justify-start">
                <div className="flex items-center gap-x-4 text-xs">
                  <time dateTime={education['date']} className="text-slate-50">
                    {education['date']}
                  </time>
                  <p
                    className="relative z-10 rounded-full bg-slate-100 px-3 py-1.5 font-medium text-slate-800 hover:bg-slate-300"
                  >
                    {education['institution']}
                  </p>
                </div>
                <div className="group srelative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-slate-50">
                    <p>
                      {education['degree']}
                    </p>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-slate-400">{education['description']}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Layout >
    )
  }
}