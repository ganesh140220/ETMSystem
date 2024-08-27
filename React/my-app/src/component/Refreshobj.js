// refreshObj.js
import { useDispatch, useSelector } from 'react-redux';
import { setallprojobj, setclientobj, setobj, setprojobj, setteamobj } from './slicefile';

export const refreshObj = async (dispatch, empobj) => {
    
  try {
    const uid = empobj.login.username;
    const pwd = empobj.login.password;
    const response = await fetch('https://localhost:7018/ETMS/validate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uid, pwd }),
    });
    if (response.ok) {
      const data = await response.json();
      if (data.login === undefined) {
        console.error(data.err);
      } else {
        data.login.password=pwd;
        dispatch(setobj(data));
        console.log("data obj set");

        if (data.login.role.role1 === "Associate" || data.login.role.role1 === "Manager") {
          await fetch("https://localhost:7018/ETMS/team?pid=" + data.teamMembers[0].projectId)
            .then(res => res.json())
            .then(d => dispatch(setteamobj(d)));

          await fetch("https://localhost:7018/ETMS/project?pid=" + data.teamMembers[0].projectId)
            .then(res => res.json())
            .then(d => dispatch(setprojobj(d)));

          console.log("refresh obj set");
        } else {
          await fetch("https://localhost:7018/ETMS/clients")
            .then(res => res.json())
            .then(d => dispatch(setclientobj(d)));
        }
      }
    } else {
      console.log("Refresh Failed: bad response");
    }
  } catch (error) {
    console.error('Refresh Error:', error);
  }
};
