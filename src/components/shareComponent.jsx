import React from 'react';
import * as firebase from 'firebase';
import { Modal } from 'react-bootstrap';
import _ from 'lodash';

import styles from '.././main.scss';

export default class ShareComponent extends React.Component {
  constructor(){
    super();
    this.state = {
        userToShareWith: '',
        shareMessage: 'Grid is null',
        emptyShareMessage: 'no one',
        currentUsers: [ ],
        showModal: false
    }

    this.handleShare = this.handleShare.bind( this );
    this.onUpdate = this.onUpdate.bind( this );
    this.getUserEmails = this.getUserEmails.bind( this );
    this.open = this.open.bind( this );
    this.close = this.close.bind( this );
  }

  onUpdate( event ){
    this.setState({ userToShareWith: event.target.value });
  }

  open(){
    this.setState({ showModal: true });
  }

  close(){
    this.setState({ showModal: false });
  }

  getUserEmails( newestGridId ){
      if(newestGridId !== null)
      {
        const gridRef = firebase.database().ref( 'grids/' + newestGridId + '/users' );
        const usersRef = firebase.database().ref( 'users/' );

        let currentUserArray = [];
        let currentUserEmails = [];

        // gets keys of current grid users
        gridRef.once( 'value', gridRefSnapshot => {
          gridRefSnapshot.forEach( user => {
              if(user.key !== null) {
                  currentUserArray.push( user.key );
              }
          } );

          // retrieve emails of grid users by matching user keys with user list
          usersRef.once( 'value', userSnapshot => {
            userSnapshot.forEach( user => {
              if( _.includes( currentUserArray, user.key ) ){
                if(user.child( 'email' ).val() !== null ) {
                    currentUserEmails.push( user.child( 'email' ).val() );
                }
              }
            } );

            if(currentUserEmails.length === 0) {
                currentUserEmails.push(this.state.emptyShareMessage);
            }
          } );

        } );

        this.setState({ shareMessage: 'Currently sharing with ', currentUsers: currentUserEmails });
    }
  }

  componentWillReceiveProps( nextProps ){
    if( this.props.gridId !== nextProps.gridId ){
      this.getUserEmails( nextProps.gridId )
    }
  }

  handleShare(){
      if(this.props.gridId !== "null")
      {
        const usersRef = firebase.database().ref( 'users/' );

        usersRef.orderByChild( 'email' ).equalTo( this.state.userToShareWith ).once( "child_added", userSnapshot => {
          if( userSnapshot.val() !== null ){
            const gridRef = firebase.database().ref( 'grids/' + this.props.gridId );
            const newGridUserEntryRef = gridRef.child( 'users' ).child( userSnapshot.key );

            gridRef.once( 'value', gridRefSnapshot => {
                // only add user to grid if the user is not on the grid
                if( gridRefSnapshot.child( 'users' ).child( userSnapshot.key ).val() === null ){
                    // update the grid's list of users
                    newGridUserEntryRef.set( true );
                }
                else{
                    console.log( "The specified user already is already listed on this grid" );
                }

                // only add grid to user if the grid is not on the user
                if( userSnapshot.child( 'grids' ).child( this.props.gridId ).val() === null ){
                    // update the user's list of grids
                    const newUserGridEntryRef = firebase.database().ref( 'users/' + userSnapshot.key + '/grids/' + this.props.gridId );
                    newUserGridEntryRef.set( gridRefSnapshot.child( 'name' ).val() );
                }
                else{
                    console.log( "The specified grid already is already listed on this user" );
                }

                // closes modal window & updates user list
                this.setState({ showModal: false });
                this.getUserEmails( this.props.gridId );

            }, error => { console.log(error) });
          }
        } );
      }
      else {
          this.setState({ shareMessage: 'Grid is null'});
      }
  }

  render(){
    if(this.props.enabled == "enabled"){
      return (
        <div>
          <button className="btn btn-primary btn-sm" onClick={ this.open }>Share Grid</button>

          <Modal show={ this.state.showModal } onHide={ this.close }>
            <Modal.Header closeButton>
              <Modal.Title>Share this grid with other users</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <input type="text" className="form-control" placeholder="Enter an email address" onChange={ this.onUpdate }/>
              <p className={ styles.sharedWith }> { this.state.shareMessage }
                <span className={ styles.userList }> { this.state.currentUsers.join(', ') }</span>
              </p>
            </Modal.Body>
            <Modal.Footer>
                <button className={ "btn btn-default " + styles.modalButton } onClick={ this.close }>Close</button>
                <button className={ "btn btn-primary " + styles.modalButton } onClick={ this.handleShare }>Share</button>
            </Modal.Footer>
          </Modal>
        </div>
      );
    }
    else{

      return (
        <div>
          <button className="btn btn-primary btn-sm" disabled={this.props.enabled}>Share Grid</button>
        </div>
      );
    }
  }
}
