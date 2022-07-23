import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

import { Headerflow } from '../../components'
import GridContainer from '../../kit-components/Grid/GridContainer';
import GridItem from '../../kit-components/Grid/GridItem';
import styles from '../../assets/jss/material-kit-react/views/componentsSections/tabsStyle';

import './style.scss';

const useStyles = makeStyles(styles);
interface ProfileProps {
  username: string;
}
const Profile: React.FC<ProfileProps> = () => {
  const classes = useStyles();
  return (
    <div className="profile-main-container" >
      <div className={classes.container} >

        <div className="profile-container">

          <div className="profile-sub-container">
            <div className="profile-sub-container-header">
              <div className="profile-heading-text">User Profile</div>
              <div className="edit-profile-btn-container">
                <Button variant="contained">Edit Profile</Button>
              </div>
            </div>
            <GridContainer>
              <GridItem xs={12} md={12} lg={8}>
                <div className="profile-container-left">
                  <GridContainer>
                    <GridItem md={6} lg={6} >
                      <div className="profile-container-heading">Email:</div>
                    </GridItem>
                    <GridItem md={6} lg={6} >
                      <div className="profile-container-sub-heading">shoaibraza@gmail.com</div>
                    </GridItem>
                    <GridItem md={6} lg={6} >
                      <div className="profile-container-heading">Username:</div>
                    </GridItem>
                    <GridItem md={6} lg={6} >
                      <div className="profile-container-sub-heading">shoaib786</div>
                    </GridItem>
                    <GridItem md={6} lg={6} >
                      <div className="profile-container-heading">First Name:</div>
                    </GridItem>
                    <GridItem md={6} lg={6} >
                      <div className="profile-container-sub-heading">Shoaib</div>
                    </GridItem>
                    <GridItem md={6} lg={6} >
                      <div className="profile-container-heading">Last Name:</div>
                    </GridItem>
                    <GridItem md={6} lg={6} >
                      <div className="profile-container-sub-heading">Raza</div>
                    </GridItem>
                    <GridItem md={6} lg={6} >
                      <div className="profile-container-heading">Staff</div>
                    </GridItem>
                    <GridItem md={6} lg={6} >
                      <div className="profile-container-sub-heading">Yes</div>
                    </GridItem>
                    <GridItem md={6} lg={6} >
                      <div className="profile-container-heading">Super Admin</div>
                    </GridItem>
                    <GridItem md={6} lg={6} >
                      <div className="profile-container-sub-heading">Yes</div>
                    </GridItem>
                  </GridContainer>
                </div>
              </GridItem>
              <GridItem xs={12} md={12} lg={4}>
                <div className="profile-container-right">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXhmhnLv5Vnc0HzuCLiIW1UxioOZ_IjHy6WA&usqp=CAU" className="profile-container-right-image" />
                </div>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile