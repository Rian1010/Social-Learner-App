import { useAuthStore } from '../../stores/useAuthStore';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { useQuery } from 'react-query';
import { IFullPayload } from '../../interfaces';

const Profile = () => {
  const { payload } = useAuthStore();

  localStorage.setItem('userToken', payload);
  localStorage.getItem('userToken');
  const decode = jwt_decode<IFullPayload>(localStorage.userToken);

  const useProfileQuery = () =>
    useQuery('profileDetails', async () => {
      return await axios.get(`/api/profile/user/${decode?.profile?.user}`);
    });

  const { data: userData, status, error } = useProfileQuery();

  console.log(userData, status, error);

  return (
    <section>
      <div className='container'>
        <div className='row'>
          <div className='col-12 d-flex flex-column align-items-center mt-5'>
            <div
              style={{
                width: '100px',
                height: '100px',
                backgroundImage: `url('http:${decode?.user?.avatar}')`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
              }}
            ></div>
            <h1>{decode?.user.name}'s Profile</h1>
            <p className='lead'>{decode?.user.email}</p>
            <p>
              <b>Company:</b> {userData?.data?.company}
            </p>
            <p>
              <b>Status:</b> {userData?.data?.status}
            </p>
            <div className='d-flex'>
              <p>
                <b>Skills:</b>
              </p>
              <ul>
                {userData?.data?.skills?.map((skill: string) => (
                  <li>{skill}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
