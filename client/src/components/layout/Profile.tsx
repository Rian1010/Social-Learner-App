import React from 'react';
import { useAuthStore } from '../../stores/useAuthStore';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { useQuery } from 'react-query';

const Profile = () => {
  const { payload } = useAuthStore();

  //   interface IObjectUser {
  //     avatar: string;
  //     name: string;
  //     email: string;
  //     date: Date;
  //     id: string;
  //   }

  //   interface IObjectProfile {
  //     _id: string;
  //     user: string;
  //     company: string;
  //     skills: Array<object>;
  //     status: string;
  //     experience: Array<object>;
  //     education: Array<object>;
  //     date: Date;
  //   }

  //   interface IObjectPost {
  //     user: string;
  //     name: string;
  //     text: string;
  //     avatar: string;
  //     likes: Array<object>;
  //     comments: Array<object>;
  //     date: Date;
  //   }

  //   interface IPayload {
  //     exp: number;
  //     iat: number;
  //     user: {
  //       avatar: string;
  //       name: string;
  //       email: string;
  //       date: Date;
  //       id: string;
  //     };
  //     profile?: {
  //       [keys: string]: IObjectProfile;
  //     };
  //     post?: {
  //       [keys: string]: IObjectPost;
  //     };
  //   }
  interface IPayload {
    exp: number;
    iat: number;
    user: {
      avatar: string;
      name: string;
      email: string;
      date: Date;
      id: string;
    };
    profile: {
      _id: string;
      user: string;
      company: string;
      skills: Array<object>;
      status: string;
      experience: Array<object>;
      education: Array<object>;
      date: Date;
    };
    post: {
      user: string;
      name: string;
      text: string;
      avatar: string;
      likes: Array<object>;
      comments: Array<object>;
      date: Date;
    };
  }

  localStorage.setItem('userToken', payload);
  localStorage.getItem('userToken');
  console.log(localStorage, localStorage.userToken);
  const decode = jwt_decode<IPayload>(localStorage.userToken);
  console.log(decode?.user.name);

  const useProfileQuery = () =>
    useQuery('profileDetails', async () => {
      const res = await axios.get(`/api/profile/user${decode?.profile?.user}`);
    });

  return (
    <section>
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <h1>{decode?.user.name}'s Profile</h1>
            <p className='lead'>{decode?.user.email}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
