// pages/index.js
import Image from 'next/image'
import Layout from "@/components/layout";
import { useEffect } from 'react';
import getDocument from '@/firebase/firestore';
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
    profilepic: ""
  };

  constructor(props: any) {
    super(props);
    const fetchData = async () => {
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
        profilepic: data?.profilepic
      });
    };
    fetchData();

  }

  render() {
    return (
      <Layout>
        {/* <h1 className="text-4xl italic bold antialiased tracking-wider underline underline-offset-8 decoration-1">Mohit Bhole</h1> */}
        < div className="flex flex-col md:flex-row gap-10 md:gap-0 justify-between w-full h-full items-center mt-10" >
          <div className="flex flex-col gap-2 max-w-md md:max-w-lg lg:max-w-xl self-start ml-6 md:ml-0">
            <div className="flex flex-row items-center justify-between mb-6">
              <h2 className="text-3xl font-mono mb-10">Namaste 🙏, I'm <u className="underline-offset-4">{this.state.firstName}</u>
              <h3 className="text-xl mt-4">{this.state.title}</h3></h2>
              {this.state.profilepic ?
                <Image src={this.state.profilepic} alt="Profile Picture" height={180} width={180}></Image> : <></>}
            </div>
            
            <p className="text-md">{this.state.description_1}</p>
            <p className="text-sm">{this.state.description_2}</p>
          </div>
          <div className='flex flex-col gap-2 max-w-md self-end mr-6 md:mr-0'>
            <h2 className="text-xl font-mono mb-2">Contact</h2>
            <div className="flex flex-row gap-4 items-center justify-between">
              <Image src="/github.png" alt="Github" width="36" height="36" style={{ borderRadius: '100px', overflow: 'hidden' }} />
              <a href={this.state.githubUrl} target="_blank">{this.state.github}</a>
            </div>
            <div className="flex flex-row gap-4 items-center justify-between">
              <Image src="/linkedin.png" alt="LinkedIn" width="36" height="36" />
              <a href={this.state.linkedinUrl} target="_blank">{this.state.linkedin}</a>
            </div>
            <div className="flex flex-row gap-4 items-center justify-between">
              <Image src="/devpost.png" alt="DevPost" width="36" height="36" />
              <a href={this.state.githubUrl} target="_blank">{this.state.devpost}</a>
            </div>
            <div className="flex flex-row gap-4 items-center justify-between">
              <Image src="/whatsapp.avif" alt="Whatsapp" width="36" height="36" />
              <a href={this.state.whatsappUrl} target="_blank">{this.state.whatsapp}</a>
            </div>
          </div>
        </div >
      </Layout >
    )
  }
}