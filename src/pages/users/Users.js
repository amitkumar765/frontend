import React from "react";
import "./Users.css";
import PageMenu from "../../components/pageMenu/PageMenu";
import UsersStats from "../../components/usersStats/UsersStats";
import Search from "../../components/search/Search";
import { FaTrashAlt } from "react-icons/fa";
import ChangeRole from "../../components/changeRole/ChangeRole";

const Users = () => {
  return (
    <>
      <section className="--profile-section">
        <div className="--container-profile --container-change-password2">
          <PageMenu />
          <UsersStats />

          <div className="user-list">
            <div className="--flex-between">
              <span>
                <h3>All Users</h3>
              </span>
              <span>
                <Search />
              </span>
            </div>
            {/* Table */}
            <div className="table">
              <table>
                <thead>
                  <tr>
                    <th>s/n</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Change Role</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Amit</td>
                    <td>amit@gmail.com</td>
                    <td>Admin</td>
                    <td>
                      <ChangeRole />
                    </td>
                    <td>
                      <span>
                        <FaTrashAlt size={20} color="red" />
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Users;
