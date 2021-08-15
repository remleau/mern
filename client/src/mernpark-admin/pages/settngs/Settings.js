import React, { useState, useEffect, useRef } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import styles from '../../assets/styles/main.module.css';
import FormError from '../../components/form';

import Modal from '../../components/modal';
import PageWrapper from '../../components/pageWrapper';
import HasRole from '../../components/hasRole';

import { socketInstance, addUser, deleteUser, formatDate } from '../../lib';

const Settings = () => {
  const refModalAddUser = useRef();
  const [error, setError] = useState();
  const { register, handleSubmit, errors } = useForm();
  const [users, setUsers] = useState(null);
  const [teams, setTeams] = useState(null);
  const [addUserPageState, setAddUserPageState] = useState(false);
  const [addTeamPageState, setAddTeamPageState] = useState(false);

  useEffect(() => {
    socketInstance.emit('getAllUsers');
    socketInstance.emit('getAllTeams');

    socketInstance.on('getAllUsers', data => {
      setUsers(JSON.parse(data));
    });

    socketInstance.on('getAllTeams', data => {
      setTeams(JSON.parse(data));
    });
  }, [])

  const meta = {
    pageTitle: "Settings",
    pageDescription: "In id aliquet ipsum, nec fermentum massa. Cras ultricies ultricies vestibulum.",
    bodyClass: "pageSettings"
  }

  const deleteUserById = (id) => {
    deleteUser(id).then((res) => {
      let userId = res.user_id;

      if(userId){
        socketInstance.emit('getAllUsers');
        socketInstance.emit('getAllTeams');
      }
    });
  }

  const addUserPage = (e) => {
    e.stopPropagation();
    setAddUserPageState(true);
  }

  const addTeamPage = (e) => {
    e.stopPropagation();
    setAddTeamPageState(true);
  }

  if (addTeamPageState) {
    return (
      <Redirect to={`/admin/settings/team/a/${parseInt(Math.floor(Math.random() * Date.now()))}`} />
    )
  }

  if (addUserPageState) {
    return (
      <Redirect to={`/admin/settings/users/a/${parseInt(Math.floor(Math.random() * Date.now()))}`} />
    )
  }

  return (
    <PageWrapper meta={meta}>

      <div className={styles.containerTitle}>
        <h3 className={styles.h3}>List of users and teams</h3>
        <div>
          <HasRole roles={["admin"]}>
            <div className={styles.multipleButtons}>
              <button className={styles.cta} onClick={(e) => addTeamPage(e)}>
                <span>Add a new team</span>
              </button>
              <button className={styles.cta} onClick={(e) => addUserPage(e)}>
                <span>Add a new user</span>
              </button>
            </div>
          </HasRole>
        </div>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th><p>Full Name</p></th>
            <th><p>Email</p></th>
            <th><p>Last connexion</p></th>
            <th><p>Actions</p></th>
          </tr>
        </thead>
        <tbody>
          {users && Object.keys(users).map(function (key) {
            return (
              <tr key={key}>
                <td>{users[key].firstName} {users[key].lastName}</td>
                <td>{users[key].email}</td>
                <td className={styles.date}>{formatDate(users[key].lastConnexion)}</td>
                <td className={styles.actions}>
                  <button className={styles.modifyUser}>
                    <NavLink to={`/admin/settings/users/m/${users[key].user_id}`} activeClassName={styles.actif}>
                      Modify
                    </NavLink>
                  </button>
                  <button className={styles.btnDeleteUser} onClick={() => deleteUserById(users[key].user_id)}>Delete</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      <table className={styles.table}>
        <thead>
          <tr>
            <th><p>Team name</p></th>
            <th><p>Members</p></th>
          </tr>
        </thead>
        <tbody>
          {teams && Object.keys(teams).map(function (key) {
            return (
              <tr key={key}>
                <td>{teams[key].team_name}</td>
                <td>{teams[key].count}</td>
              </tr>
            )
          })}
        </tbody>
      </table>

    </PageWrapper>
  );
}

export default Settings;
